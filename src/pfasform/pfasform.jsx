import React, { useEffect, useMemo, useRef, useState } from "react";
import "./pfasform.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const EMPTY_PARTY = {
  entityName: "",
  mainContact: "",
  phone: "",
  email: "",
  address: "",
};

const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const numericLikeChars = (v) => /^[0-9()\-+\s#]*$/.test(v);
const phoneChars = (v) => /^[0-9+\-() ]*$/.test(v);

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID5;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID5;
const PUBLIC_KEY = import.meta.env.VITE_USER_ID5;

const MAX_ATTACHMENT_BYTES = 1_900_000; // ~1.90 MB (decimal MB)

function formatMB(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1_000_000).toFixed(2)} MB`; // decimal MB
}

const toastError = (msg) => {
  toast.dismiss();
  toast.error(msg, {
    position: "top-right",
    autoClose: 3500,
    pauseOnHover: true,
    closeOnClick: true,
    draggable: true,
  });
};

const buildEmailJsParams = (form) => {
  const now = new Date();
  const pad2 = (n) => String(n).padStart(2, "0");

  const yyyy = String(now.getFullYear());
  const mm = pad2(now.getMonth() + 1);
  const dd = pad2(now.getDate());

  const signatureDateISO = `${yyyy}-${mm}-${dd}`;

  return {
    time: now.toLocaleString(),

    signed_line: form.client.signatureName || "",
    signed_day: dd,
    signed_month: mm,
    signed_year: yyyy,

    client_entity_name: form.client.clientEntityName || "",
    authorized_rep: form.client.authorizedRep || "",
    signature_date: signatureDateISO,

    contact_email: form.client.contactEmail || "",
    contact_phone: form.client.contactPhone || "",
    street_address: form.client.streetAddress || "",
    city_state_zip: form.client.cityStateZip || "",

    main_contact_1_entity_name: form.parties.mainContact1.entityName || "",
    main_contact_1_main_contact: form.parties.mainContact1.mainContact || "",
    main_contact_1_phone: form.parties.mainContact1.phone || "",
    main_contact_1_email: form.parties.mainContact1.email || "",
    main_contact_1_address: form.parties.mainContact1.address || "",

    legal_counsel_2_entity_name: form.parties.legalCounsel2.entityName || "",
    legal_counsel_2_main_contact: form.parties.legalCounsel2.mainContact || "",
    legal_counsel_2_phone: form.parties.legalCounsel2.phone || "",
    legal_counsel_2_email: form.parties.legalCounsel2.email || "",
    legal_counsel_2_address: form.parties.legalCounsel2.address || "",

    public_works_3_entity_name: form.parties.publicWorks3.entityName || "",
    public_works_3_main_contact: form.parties.publicWorks3.mainContact || "",
    public_works_3_phone: form.parties.publicWorks3.phone || "",
    public_works_3_email: form.parties.publicWorks3.email || "",
    public_works_3_address: form.parties.publicWorks3.address || "",

    env_firm_4_entity_name: form.parties.envFirm4.entityName || "",
    env_firm_4_main_contact: form.parties.envFirm4.mainContact || "",
    env_firm_4_phone: form.parties.envFirm4.phone || "",
    env_firm_4_email: form.parties.envFirm4.email || "",
    env_firm_4_address: form.parties.envFirm4.address || "",

    has_testing: form.testing.hasTesting || "",
    testing_explain:
      form.testing.hasTesting === "yes" ? form.testing.testingExplain || "" : "",

    tax_id_ein: form.system.taxIdEin || "",
    num_pumping_stations: form.system.numPumpingStations || "",
    gallons_per_day: form.system.gallonsPerDay || "",
    gallons_per_minute: form.system.gallonsPerMinute || "",
    supporting_doc: form.system.supportingDoc?.name || "",

    sheet_row: "",
  };
};

// These must match your template variables exactly
const EMAILJS_FIELD_NAMES = [
  "time",
  "signed_line",
  "signed_day",
  "signed_month",
  "signed_year",

  "client_entity_name",
  "authorized_rep",
  "signature_date",
  "contact_email",
  "contact_phone",
  "street_address",
  "city_state_zip",

  "main_contact_1_entity_name",
  "main_contact_1_main_contact",
  "main_contact_1_phone",
  "main_contact_1_email",
  "main_contact_1_address",

  "legal_counsel_2_entity_name",
  "legal_counsel_2_main_contact",
  "legal_counsel_2_phone",
  "legal_counsel_2_email",
  "legal_counsel_2_address",

  "public_works_3_entity_name",
  "public_works_3_main_contact",
  "public_works_3_phone",
  "public_works_3_email",
  "public_works_3_address",

  "env_firm_4_entity_name",
  "env_firm_4_main_contact",
  "env_firm_4_phone",
  "env_firm_4_email",
  "env_firm_4_address",

  "has_testing",
  "testing_explain",

  "tax_id_ein",
  "num_pumping_stations",
  "gallons_per_day",
  "gallons_per_minute",
  "supporting_doc",

  "sheet_row",
];

const buildPartyEmailChecks = (form) => [
  {
    key: "mainContact1Email",
    label: "Main contact person Email address",
    value: form.parties.mainContact1.email,
  },
  {
    key: "legalCounsel2Email",
    label: "Legal counsel Email address",
    value: form.parties.legalCounsel2.email,
  },
  {
    key: "publicWorks3Email",
    label: "Public Works Superintendent Email address",
    value: form.parties.publicWorks3.email,
  },
  {
    key: "envFirm4Email",
    label: "Environmental Engineering Firm Email address",
    value: form.parties.envFirm4.email,
  },
];

function Field({ label, required, error, hint, children, col2 }) {
  return (
    <div className={`pfas-field ${col2 ? "pfas-col2" : ""}`}>
      <label className="pfas-label">
        {label} {required ? <span className="req">*</span> : null}
      </label>
      {children}
      {hint ? <div className="pfas-hint">{hint}</div> : null}
      {error ? <div className="pfas-error">{error}</div> : null}
    </div>
  );
}

function TextInput({
  value,
  onChange,
  onBlur,
  placeholder,
  type = "text",
  invalid,
  inputMode,
  id,
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      inputMode={inputMode}
      className={`pfas-input ${invalid ? "pfas-inputInvalid" : ""}`}
    />
  );
}

function TextArea({ value, onChange, placeholder }) {
  return (
    <textarea
      className="pfas-textarea"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

function PartyBlock({
  title,
  note,
  optional,
  party,
  onPartyChange,
  emailError,
  onEmailBlur,
}) {
  return (
    <section className="pfas-subsection">
      <h3 className="pfas-h3">
        {title}{" "}
        {optional ? <span className="pfas-optional">(optional)</span> : null}
      </h3>

      {note ? <p className="pfas-paragraph">{note}</p> : null}

      <div className="pfas-grid">
        <Field label={title === "Main contact person" ? "Client" : `${title} Name`} required={!optional} col2>
          <TextInput
            value={party.entityName}
            onChange={(e) => onPartyChange("entityName", e.target.value)}
            placeholder={title === "Main contact person" ? "Client *" : `${title} Name`}
          />
        </Field>

        <Field label="Main contact person">
          <TextInput
            value={party.mainContact}
            onChange={(e) => onPartyChange("mainContact", e.target.value)}
            placeholder="Main contact person"
          />
        </Field>

        <Field label="Phone number">
          <TextInput
            value={party.phone}
            onChange={(e) => {
              const v = e.target.value;
              if (!phoneChars(v)) return;
              onPartyChange("phone", v);
            }}
            inputMode="tel"
            placeholder="Phone number"
          />
        </Field>

        <Field label="Email address" error={emailError}>
          <TextInput
            type="email"
            value={party.email}
            onChange={(e) => onPartyChange("email", e.target.value)}
            onBlur={onEmailBlur}
            placeholder="Email address"
            invalid={!!emailError}
          />
        </Field>

        <Field label="Address" col2>
          <TextInput
            value={party.address}
            onChange={(e) => onPartyChange("address", e.target.value)}
            placeholder="Address"
          />
        </Field>
      </div>
    </section>
  );
}

function RadioPill({ checked, onChange, label, name }) {
  return (
    <label className={`pfas-radioPill ${checked ? "is-checked" : ""}`}>
      <input type="radio" name={name} checked={checked} onChange={onChange} />
      <span className="pfas-radioMark" aria-hidden="true" />
      <span>{label}</span>
    </label>
  );
}

function Dropzone({ file, onPickFile }) {
  const fileInputRef = React.useRef(null);

  const validateAndPick = (f) => {
    if (!f) return;

    if (f.size > MAX_ATTACHMENT_BYTES) {
      toast.dismiss();
      toast.error(
        `File too large (${formatMB(f.size)} MB). Please upload a file under ${formatMB(
          MAX_ATTACHMENT_BYTES
        )} MB.`
      );

      // reset the native input so selecting the same file again triggers onChange
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    onPickFile(f);
  };

  const onDrop = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    const f = ev.dataTransfer?.files?.[0];
    if (f) validateAndPick(f);
  };

  return (
    <div
      className="pfas-dropzone"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      onClick={() => fileInputRef.current?.click()}
      role="button"
      tabIndex={0}
      aria-label="Upload supporting document"
    >
      <div className="pfas-dropTitle">
        <span className="pfas-uploadIcon" aria-hidden="true">
          ⭱
        </span>
        <span>Upload Supporting Document</span>
      </div>

      <div className="pfas-dropHint">
        Drag &amp; drop a file here, or click to browse
        <div className="pfas-dropSubHint">
          Max file size: {formatMB(MAX_ATTACHMENT_BYTES)}
        </div>
      </div>

      {file ? (
        <div className="pfas-filePill" title={file.name}>
          <span className="pfas-fileName">{file.name}</span>
          <span className="pfas-fileSize">({formatMB(file.size)})</span>
        </div>
      ) : null}


      <input
        ref={fileInputRef}
        id="supportingDocInput"
        name="attachment"
        className="pfas-hiddenInput"
        type="file"
        onChange={(e) => validateAndPick(e.target.files?.[0] || null)}
      />
    </div>
  );
}


const initialForm = {
  client: {
    clientEntityName: "",
    authorizedRep: "",
    contactEmail: "",
    contactPhone: "",
    streetAddress: "",
    cityStateZip: "",
    signatureName: "",
  },
  parties: {
    mainContact1: { ...EMPTY_PARTY },
    legalCounsel2: { ...EMPTY_PARTY },
    publicWorks3: { ...EMPTY_PARTY },
    envFirm4: { ...EMPTY_PARTY },
  },
  testing: {
    hasTesting: "",
    testingExplain: "",
  },
  system: {
    taxIdEin: "",
    numPumpingStations: "",
    gallonsPerDay: "",
    gallonsPerMinute: "",
    supportingDoc: null,
  },
};

export default function Pfasform() {
  const formRef = useRef(null);
  const [confirmed, setConfirmed] = useState(false);


  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [globalNote, setGlobalNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);


  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    document.title = "Contact Us – David Grossman & Associates";
    return () => {
      document.title = "David Grossman & Associates";
    };
  }, []);

  const partyEmailChecks = useMemo(() => buildPartyEmailChecks(form), [form]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const refreshPage = () => {
    window.location.reload();
  };


  const setClient = (key, value) =>
    setForm((prev) => ({ ...prev, client: { ...prev.client, [key]: value } }));

  const setSystem = (key, value) =>
    setForm((prev) => ({ ...prev, system: { ...prev.system, [key]: value } }));

  const setTesting = (key, value) =>
    setForm((prev) => ({ ...prev, testing: { ...prev.testing, [key]: value } }));

  const setParty = (partyKey, key, value) =>
    setForm((prev) => ({
      ...prev,
      parties: {
        ...prev.parties,
        [partyKey]: { ...prev.parties[partyKey], [key]: value },
      },
    }));

  const setError = (key, message) =>
    setErrors((prev) => ({ ...prev, [key]: message }));

  const clearError = (key) =>
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });

  const onEmailBlur = (key, label, value) => () => {
    const v = (value || "").trim();
    if (!v) {
      clearError(key);
      return;
    }
    if (!isValidEmail(v)) {
      const msg = `Please enter a valid email for: ${label}.`;
      setError(key, msg);
      toastError(msg);
      return;
    }
    clearError(key);
  };

  const onEmailChange = (key, setter) => (e) => {
    setter(e.target.value);
    clearError(key);
  };

  const onNumericChange = (setter) => (e) => {
    const v = e.target.value;
    if (!numericLikeChars(v)) return;
    setter(v);
  };

  const onPhoneChange = (setter) => (e) => {
    const v = e.target.value;
    if (!phoneChars(v)) return;
    setter(v);
  };

  const validate = () => {
    setGlobalNote("");
    let ok = true;

    const requiredClient = [
      ["clientEntityName", form.client.clientEntityName, "Client Entity Name"],
      ["authorizedRep", form.client.authorizedRep, "Authorized Representative"],
      ["contactEmail", form.client.contactEmail, "Contact Email"],
      ["contactPhone", form.client.contactPhone, "Contact Phone"],
    ];

    for (const [key, value, label] of requiredClient) {
      if (!String(value || "").trim()) {
        setError(key, `${label} is required.`);
        ok = false;
      }
    }

    if (
      String(form.client.contactEmail || "").trim() &&
      !isValidEmail(form.client.contactEmail.trim())
    ) {
      const msg = "Please enter a valid Contact Email address.";
      setError("contactEmail", msg);
      toastError(msg);
      ok = false;
    }

    for (const item of partyEmailChecks) {
      const v = (item.value || "").trim();
      if (v && !isValidEmail(v)) {
        const msg = `Please enter a valid email for: ${item.label}.`;
        setError(item.key, msg);
        toastError(msg);
        ok = false;
      }
    }

    if (!String(form.system.taxIdEin || "").trim()) {
      setError("taxIdEin", "Tax ID / EIN # is required.");
      ok = false;
    } else if (!numericLikeChars(form.system.taxIdEin.trim())) {
      setError("taxIdEin", "Tax ID / EIN # contains invalid characters.");
      ok = false;
    }

    const numericOptional = [
      ["numPumpingStations", form.system.numPumpingStations, "Number of Pumping stations"],
      ["gallonsPerDay", form.system.gallonsPerDay, "Gallons per Day"],
      ["gallonsPerMinute", form.system.gallonsPerMinute, "Gallons per minute"],
    ];

    for (const [key, value, label] of numericOptional) {
      const v = String(value || "").trim();
      if (v && !numericLikeChars(v)) {
        setError(key, `${label} contains invalid characters.`);
        ok = false;
      }
    }

    if (!form.testing.hasTesting) {
      setGlobalNote("Please answer the PFAS/contaminants testing question (Yes/No).");
      ok = false;
    }

    if (
      form.testing.hasTesting === "yes" &&
      !String(form.testing.testingExplain || "").trim()
    ) {
      setError("testingExplain", "Please explain detectable levels for the testing question.");
      ok = false;
    }

    return ok;
  };

  const syncHiddenFields = (params) => {
    const el = formRef.current;
    if (!el) return;

    for (const name of EMAILJS_FIELD_NAMES) {
      const input = el.querySelector(`input[name="${name}"]`);
      if (input) input.value = params[name] ?? "";
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (isSubmitting) return;

    const ok = validate();
    if (!ok) return;

    setIsSubmitting(true);

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      toastError("Missing EmailJS environment variables (.env).");
      setIsSubmitting(false);
      return;
    }


    const payload = {
      ...form,
      testing: {
        hasTesting: form.testing.hasTesting,
        testingExplain:
          form.testing.hasTesting === "yes" ? form.testing.testingExplain : "",
      },
    };

    const emailParams = buildEmailJsParams(payload);
    syncHiddenFields(emailParams);

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);

      setGlobalNote("Submitted successfully! Email sent via EmailJS (sendForm).");
      toast.dismiss();
      toast.success("Email sent!", { position: "top-right", autoClose: 2500 });

      scrollToTop();

      // optional: clear form state before reload (nice UX)
      setForm(initialForm);
      setConfirmed(false);
      setErrors({});

      // refresh after user sees success
      setTimeout(() => {
        refreshPage();
      }, 2800);

    } catch (err) {
      console.error("EmailJS error:", err);
      toastError(
        "Email failed to send. Check EmailJS IDs, template variables, and attachment limits."
      );
    }finally {
      setIsSubmitting(false);
    }

  };

  return (
    <div className="pfas-page">
      <ToastContainer />

      <form ref={formRef} className="pfas-card" onSubmit={onSubmit} noValidate>
        {/* Hidden inputs for your EmailJS template variables */}
        {EMAILJS_FIELD_NAMES.map((name) => (
          <input key={name} type="hidden" name={name} defaultValue="" />
        ))}

        <header className="pfas-header pfas-formHeader">
          <Link to="/pfaspage" className="pfas-backIcon" aria-label="Back to PFAS page">
            <ArrowLeft size={34} />
          </Link>

          <div className="pfas-headerText">
            <h2>LEGAL SERVICES CONTRACT — PFAS Intake</h2>
            <p className="pfas-subtitle">
              Enter the details that appear in the retainer’s <b>Client Section</b>{" "}
              and <b>Information Details</b>.
            </p>
          </div>
        </header>


        {/* CLIENT SECTION */}
        <section className="pfas-section">
          <h1 className="pfas-h1">CLIENT SECTION</h1>

          <div className="pfas-grid">
            <Field label="Please print Client Entity Name" required error={errors.clientEntityName} col2>
              <TextInput
                value={form.client.clientEntityName}
                onChange={(e) => {
                  setClient("clientEntityName", e.target.value);
                  clearError("clientEntityName");
                }}
                placeholder="Client Entity Name *"
                invalid={!!errors.clientEntityName}
              />
            </Field>

            <Field label="Print Name & Title of Authorized Representative" required error={errors.authorizedRep} col2>
              <TextInput
                value={form.client.authorizedRep}
                onChange={(e) => {
                  setClient("authorizedRep", e.target.value);
                  clearError("authorizedRep");
                }}
                placeholder="Authorized Representative (Name & Title) *"
                invalid={!!errors.authorizedRep}
              />
            </Field>

            <Field label="Contact Email" required error={errors.contactEmail}>
              <TextInput
                id="contact-email"
                type="email"
                value={form.client.contactEmail}
                onChange={onEmailChange("contactEmail", (v) => setClient("contactEmail", v))}
                onBlur={onEmailBlur("contactEmail", "Contact Email", form.client.contactEmail)}
                placeholder="Contact Email *"
                invalid={!!errors.contactEmail}
              />
            </Field>

            <Field label="Contact Phone" required error={errors.contactPhone}>
              <TextInput
                value={form.client.contactPhone}
                onChange={onPhoneChange((v) => setClient("contactPhone", v))}
                inputMode="tel"
                placeholder="Contact Phone *"
                invalid={!!errors.contactPhone}
              />
            </Field>

            <Field label="Address (Street + Suite if Applicable)" col2>
              <TextInput
                value={form.client.streetAddress}
                onChange={(e) => setClient("streetAddress", e.target.value)}
                placeholder="Address (Street + Suite if Applicable)"
              />
            </Field>

            <Field label="City, State, Zip" col2>
              <TextInput
                value={form.client.cityStateZip}
                onChange={(e) => setClient("cityStateZip", e.target.value)}
                placeholder="City, State, Zip"
              />
            </Field>

          </div>
        </section>

        {/* INFORMATION DETAILS */}
        <section className="pfas-section">
          <h1 className="pfas-h1">INFORMATION DETAILS</h1>

          <PartyBlock
            title="Main contact person"
            party={form.parties.mainContact1}
            onPartyChange={(k, v) => {
              setParty("mainContact1", k, v);
              if (k === "email") clearError("mainContact1Email");
            }}
            emailError={errors.mainContact1Email}
            onEmailBlur={onEmailBlur(
              "mainContact1Email",
              "Main contact person Email address",
              form.parties.mainContact1.email
            )}
          />

          <PartyBlock
            title="Legal counsel"
            party={form.parties.legalCounsel2}
            onPartyChange={(k, v) => {
              setParty("legalCounsel2", k, v);
              if (k === "email") clearError("legalCounsel2Email");
            }}
            emailError={errors.legalCounsel2Email}
            onEmailBlur={onEmailBlur(
              "legalCounsel2Email",
              "Legal counsel Email address",
              form.parties.legalCounsel2.email
            )}
          />

          <PartyBlock
            title="Public Works Superintendent"
            party={form.parties.publicWorks3}
            onPartyChange={(k, v) => {
              setParty("publicWorks3", k, v);
              if (k === "email") clearError("publicWorks3Email");
            }}
            emailError={errors.publicWorks3Email}
            onEmailBlur={onEmailBlur(
              "publicWorks3Email",
              "Public Works Superintendent Email address",
              form.parties.publicWorks3.email
            )}
          />

          <PartyBlock
            title="Environmental Engineering Firm"
            note="(if applicable)"
            optional
            party={form.parties.envFirm4}
            onPartyChange={(k, v) => {
              setParty("envFirm4", k, v);
              if (k === "email") clearError("envFirm4Email");
            }}
            emailError={errors.envFirm4Email}
            onEmailBlur={onEmailBlur(
              "envFirm4Email",
              "Environmental Engineering Firm Email address",
              form.parties.envFirm4.email
            )}
          />
        </section>

        {/* TESTING */}
        <section className="pfas-section">
          <h1 className="pfas-h1">PFAS / CONTAMINANTS TESTING</h1>

          <p className="pfas-paragraph">
            Have you conducted any PFAS or other contaminants tests in your water supply or other
            property (soil, sludge, ponds, among others)?
          </p>

          <div className="pfas-inlineRadios" role="radiogroup" aria-label="Testing question">
            <RadioPill
              name="hasTesting"
              label="Yes"
              checked={form.testing.hasTesting === "yes"}
              onChange={() => setTesting("hasTesting", "yes")}
            />
            <RadioPill
              name="hasTesting"
              label="No"
              checked={form.testing.hasTesting === "no"}
              onChange={() => setTesting("hasTesting", "no")}
            />
          </div>

          {form.testing.hasTesting === "yes" ? (
            <Field
              label="If yes, were there detectable levels – please explain:"
              required
              error={errors.testingExplain}
            >
              <TextArea
                value={form.testing.testingExplain}
                onChange={(e) => {
                  setTesting("testingExplain", e.target.value);
                  clearError("testingExplain");
                }}
                placeholder="Explain detectable levels..."
              />
            </Field>
          ) : null}
        </section>

        {/* SYSTEM DETAILS */}
        <section className="pfas-section">
          <h1 className="pfas-h1">SYSTEM DETAILS</h1>

          <div className="pfas-grid">
            <Field label="Tax ID / EIN #" required error={errors.taxIdEin}>
              <TextInput
                value={form.system.taxIdEin}
                onChange={onNumericChange((v) => {
                  setSystem("taxIdEin", v);
                  clearError("taxIdEin");
                })}
                inputMode="numeric"
                placeholder="Tax ID / EIN # *"
                invalid={!!errors.taxIdEin}
              />
            </Field>

            <Field label="Number of Pumping stations" error={errors.numPumpingStations}>
              <TextInput
                value={form.system.numPumpingStations}
                onChange={onNumericChange((v) => {
                  setSystem("numPumpingStations", v);
                  clearError("numPumpingStations");
                })}
                inputMode="numeric"
                placeholder="Number of Pumping stations"
                invalid={!!errors.numPumpingStations}
              />
            </Field>

            <Field label="Gallons per Day for each station" col2 error={errors.gallonsPerDay}>
              <TextInput
                value={form.system.gallonsPerDay}
                onChange={onNumericChange((v) => {
                  setSystem("gallonsPerDay", v);
                  clearError("gallonsPerDay");
                })}
                inputMode="numeric"
                placeholder="Gallons per Day for each station"
                invalid={!!errors.gallonsPerDay}
              />
            </Field>

            <Field label="Gallons per minute per each station" col2 error={errors.gallonsPerMinute}>
              <TextInput
                value={form.system.gallonsPerMinute}
                onChange={onNumericChange((v) => {
                  setSystem("gallonsPerMinute", v);
                  clearError("gallonsPerMinute");
                })}
                inputMode="numeric"
                placeholder="Gallons per minute per each station"
                invalid={!!errors.gallonsPerMinute}
              />
            </Field>
          </div>

          <div className="pfas-subsection">
            <p className="pfas-paragraph pfas-italic">
              (You may submit an attached document to provide this information)
            </p>

            <Dropzone
              file={form.system.supportingDoc}
              onPickFile={(file) => {
                setSystem("supportingDoc", file);
                setGlobalNote("");
              }}
            />
          </div>
        </section>

        {globalNote ? <div className="pfas-globalNote">{globalNote}</div> : null}

        <footer className="pfas-footer">
          <label className="pfas-confirmRow">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
            />
            <span>
              I confirm that the information provided above is true, complete, and accurate to the best of my knowledge.
            </span>
          </label>

          <button
            type="submit"
            className="pfas-btn pfas-btn-primary pfas-btn-lg"
            disabled={isSubmitting || !confirmed}
            aria-disabled={isSubmitting || !confirmed}
            title={!confirmed ? "Please confirm the checkbox to submit." : undefined}
          >
            {isSubmitting ? (
              <span className="pfas-btnContent">
                <span className="pfas-spinner" aria-hidden="true" />
                Saving...
              </span>
            ) : (
              "Submit Claim"
            )}
          </button>
        </footer>

      </form>
    </div>
  );
}

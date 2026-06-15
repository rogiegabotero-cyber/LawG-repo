import "./pfasclaim.css";
import { useEffect, useState } from "react";
import davidGrossmanPhoto from "../assets/david-grossman_1ba42d4f.png";
import janSchlichtmannPhoto from "../assets/jan-schlichtmann.webp";

const deadline = new Date("2026-07-31T00:00:00");

const getTimeLeft = () => {
  const difference = Math.max(deadline.getTime() - Date.now(), 0);

  return [
    [Math.floor(difference / (1000 * 60 * 60 * 24)), "DAYS"],
    [Math.floor((difference / (1000 * 60 * 60)) % 24), "HOURS"],
    [Math.floor((difference / (1000 * 60)) % 60), "MINUTES"],
    [Math.floor((difference / 1000) % 60), "SECONDS"],
  ];
};

const faqItems = [
  {
    question: "We are EPA compliant. Can we still qualify?",
    answer:
      "Yes. EPA compliance status does not determine eligibility for funding recovery opportunities tied to PFAS settlements. Many fully compliant utilities have incurred significant costs related to PFAS monitoring, testing, infrastructure upgrades, and treatment modifications. These costs may be recoverable regardless of your current compliance standing.",
  },
  {
    question: "We already settled. Are there additional opportunities?",
    answer:
      "Potentially. The PFAS settlement landscape is complex and multi-layered, involving multiple defendants, ongoing proceedings, and programs that operate independently of one another. A prior settlement with one party does not necessarily preclude participation in other programs.",
  },
  {
    question:
      "We don't have a PFAS problem. Should we still review our situation?",
    answer:
      "A review is still worthwhile. Many entities that do not currently have a detectable PFAS issue have nonetheless incurred costs related to precautionary testing, monitoring, infrastructure assessments, or regulatory compliance activities. The definition of 'affected' under various programs is broader than many administrators assume.",
  },
  {
    question:
      "Will participation require significant effort from our organization?",
    answer:
      "The initial review is designed to be low-burden. The process begins with a confidential consultation to assess your situation. If you proceed, the documentation and analysis work is handled by experienced professionals. Most organizations find the process far less demanding than anticipated.",
  },
  {
    question: "Is there a deadline?",
    answer:
      "Yes. July 31 is a significant registration deadline. After that date, certain funding opportunities and program participation windows may no longer be available. We strongly encourage any potentially eligible organization to schedule a confidential review before that date.",
  },
];

const Card = ({ icon, title }) => (
  <div className="glass-card">
    <div className="icon">{icon}</div>
    <strong>{title}</strong>
  </div>
);

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="timer" aria-label="Countdown to July 31 registration deadline">
      {timeLeft.map(([num, label]) => (
        <div className="time-box" key={label}>
          <b>{String(num).padStart(2, "0")}</b>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
};

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (question) => {
    setOpenItems((current) => {
      const next = new Set(current);

      if (next.has(question)) {
        next.delete(question);
      } else {
        next.add(question);
      }

      return next;
    });
  };

  return (
    <div className="faq">
      {faqItems.map(({ question, answer }) => {
        const isOpen = openItems.has(question);

        return (
          <div className="faq-item" key={question}>
            <button
              aria-expanded={isOpen}
              className="faq-question"
              type="button"
              onClick={() => toggleItem(question)}
            >
              {question}
              <span>{isOpen ? "^" : "v"}</span>
            </button>
            {isOpen && <p className="faq-answer">{answer}</p>}
          </div>
        );
      })}
    </div>
  );
};

const goToContact = () => {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
};



const contactStepLabels = ["Contact Info", "Organization", "Details"];

export default function PFASClaim() {
  const [contactStep, setContactStep] = useState(1);
  const [contactForm, setContactForm] = useState({
    fullName: "",
    organization: "",
    title: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    population: "",
    waterSource: "",
    yearsExposure: "",
    healthConditions: "",
    comments: "",
  });

  const updateContactForm = (key) => (event) => {
    setContactForm((current) => ({
      ...current,
      [key]: event.target.value,
    }));
  };

  const nextContactStep = () => {
    setContactStep((current) => Math.min(current + 1, contactStepLabels.length));
  };

  const previousContactStep = () => {
    setContactStep((current) => Math.max(current - 1, 1));
  };

  return (
    <main className="pfasclaim-page">
      

      <section className="hero section-bg" id="top">
        <p className="top-text">
          Public water systems, utilities, water authorities, wastewater
          operators, airports, landfills, and other public entities may qualify
          for funding tied to ongoing PFAS settlements.
        </p>

        <div className="pill">• TIME-SENSITIVE REGISTRATION WINDOW</div>

        <h1>July 31</h1>
        <h3>REGISTRATION DEADLINE</h3>

        <Timer />

        <div className="divider" />

        <h2>
          Your Water System May Be Eligible For Funding You Never Knew Was
          Available
        </h2>

        <div className="actions">
          <button onClick={goToContact}>Schedule a Confidential Review</button>
          <button className="ghost" onClick={goToContact}>Learn More</button>
        </div>
      </section>

      <section className="section video-section alt-bg">
        <p className="kicker">FEATURED BRIEFING</p>
        <h2>Watch: What Every Water Provider Should Know Before July 31</h2>
        <p className="sub">
          A concise overview of the funding landscape, eligibility criteria, and
          what your organization should do before the deadline.
        </p>
        <div className="video">
          <iframe
            title="vimeo-player"
            src="https://player.vimeo.com/video/1201108719?h=e91e6b72e0"
            width="640"
            height="360"
            frameBorder="0"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            allowFullScreen
          />
        </div>
      </section>

      <section className="section section-bg" id="about">
        <h2>This Is Not About Blame</h2>

        <div className="card-row">
          <Card icon="⚖" title="This is not an EPA enforcement action." />
          <Card icon="💧" title="This is not a claim that your water is unsafe." />
          <Card
            icon="🏛"
            title="This is not an allegation that your organization did anything wrong."
          />
        </div>

        <div className="statement">
          Many utilities and public entities have invested millions of dollars
          protecting public health, upgrading infrastructure, maintaining
          compliance, and improving water systems. The question is whether some
          of those costs may be recoverable.
          <br />
          <button onClick={goToContact}>Schedule a Confidential Review</button>
        </div>
      </section>

      <section className="section alt-bg" id="faq">
        <p className="kicker">COMMON QUESTIONS</p>
        <h2>Answers For Decision Makers</h2>
        <p className="sub">
          Straightforward answers to what we hear most often from utility
          directors and public administrators.
        </p>

        <FAQ />
      </section>

      <section className="section section-bg" id="qualifies">
        <h2>Potentially Eligible Organizations</h2>
        <p className="sub">
          A broad range of public and private entities may qualify. If your
          organization has incurred costs related to PFAS monitoring, testing,
          treatment, or infrastructure, a review is warranted.
        </p>

        <div className="qual-grid">
          {[
            ["💧", "Public Water Systems"],
            ["🏛", "Water Authorities"],
            ["🌊", "Water Districts"],
            ["♻", "Wastewater Systems"],
            ["🏙", "Cities & Counties"],
            ["✈", "Airports"],
            ["🗑", "Landfills"],
            ["🚒", "Fire Departments"],
            ["🔥", "Fire Training Facilities"],
            ["⚡", "Public Utilities"],
            ["🔌", "Private Utilities"],
          ].map(([icon, title]) => (
            <Card key={title} icon={icon} title={title} />
          ))}
        </div>
      </section>

      <section className="section alt-bg">
        <p className="kicker">YOUR LEGAL TEAM</p>
        <h2>Meet the Attorneys</h2>
        <p className="sub">
          Decades of environmental litigation experience, working on your behalf.
        </p>

        <div className="attorneys">
          <div className="attorney">
            <div className="avatar">
              <img src={davidGrossmanPhoto} alt="David Grossman" />
            </div>
            <h3>David Grossman</h3>
            <b>ENVIRONMENTAL ATTORNEY</b>
            <p>
            David Grossman is a seasoned trial attorney with over
            three decades of experience in environmental and civil
            litigation. He has represented plaintiffs in complex
            mass tort and public health cases, with a focused
            practice in PFAS cost recovery for public entities.
            Grossman has secured multi-million-dollar verdicts
            and works as lead counsel and co-counsel on high-
            stakes environmental matters across the country. His
            practice is built on the principle that communities
            harmed by contamination deserve skilled, tenacious representation.
            </p>
          </div>

          <div className="attorney">
            <div className="avatar">
              <img src={janSchlichtmannPhoto} alt="Jan Schlichtmann" />
            </div>
            <h3>Jan Schlichtmann</h3>
            <b>CO-COUNSEL / ENVIRONMENTAL ATTORNEY</b>
            <p>
             Jan Schlichtmann is one of America's most recognized 
             environmental litigators. His pioneering work in the Woburn, 
             Massachusetts water contamination case, which first united 
             experts in science, medicine, and engineering to prove industrial 
             harm to public health, was chronicled in the national bestseller 
             and major motion picture "A Civil Action," in which he was portrayed 
             by John Travolta. A Cornell Law graduate and Phi Beta Kappa scholar, 
             Schlichtmann has spent his career fighting for communities and public 
             entities against the most powerful industrial defendants in the country.
            </p>
          </div>
        </div>
      </section>

      <section className="section deadline alt-bg">
        <p className="kicker">TIME-SENSITIVE OPPORTUNITY</p>
        <h2>
          The Deadline Is
          <br />
          July 31
        </h2>
        <p className="sub">
          After that date, certain opportunities may no longer be available.
        </p>
        <Timer />
        <div className="actions">
          <button onClick={goToContact}>Schedule a Confidential Review</button>
          <button className="ghost" onClick={goToContact}>Send Us a Message</button>
        </div>
      </section>

      <section className="section section-bg contact" id="contact">
        <p className="kicker">GET STARTED</p>
        <h2>Schedule a Confidential Review</h2>
        <p className="sub contact-sub">
          Complete the form below. All inquiries are handled with complete
          confidentiality. There is no obligation.
        </p>

        <div className="contact-grid">
          <aside className="contact-card">
            <div className="mini-card">
              <b>CONFIDENTIAL REVIEW</b>
              <p>
                Complete the form and we will be in touch within one business
                day. No obligation.
              </p>
            </div>
            <p className="email">✉ dgrossman@grossmankelly.com</p>
            <div className="mini-card">
              <b>DEADLINE</b>
              <strong>July 31, 2026</strong>
              <p>Registration closes at midnight</p>
            </div>
          </aside>

          <form className="contact-form">
            <div className="contact-stepper full" aria-label="Review request steps">
              {contactStepLabels.map((label, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber === contactStep;
                const isComplete = stepNumber < contactStep;

                return (
                  <div
                    className={`contact-step ${isActive ? "is-active" : ""} ${isComplete ? "is-complete" : ""}`}
                    key={label}
                  >
                    <span className="contact-step-number">{stepNumber}</span>
                    {stepNumber < contactStepLabels.length ? (
                      <span className="contact-step-line" aria-hidden="true" />
                    ) : null}
                    <span className="contact-step-label">{label}</span>
                  </div>
                );
              })}
            </div>

            {contactStep === 1 ? (
              <>
                <label className="contact-label">
                  NAME *
                  <input
                    placeholder="Full Name"
                    value={contactForm.fullName}
                    onChange={updateContactForm("fullName")}
                  />
                </label>
                <label className="contact-label">
                  ORGANIZATION
                  <input
                    placeholder="Organization Name"
                    value={contactForm.organization}
                    onChange={updateContactForm("organization")}
                  />
                </label>
                <label className="contact-label">
                  TITLE
                  <input
                    placeholder="Your Title / Role"
                    value={contactForm.title}
                    onChange={updateContactForm("title")}
                  />
                </label>
                <label className="contact-label">
                  EMAIL *
                  <input
                    placeholder="email@organization.gov"
                    value={contactForm.email}
                    onChange={updateContactForm("email")}
                  />
                </label>
                <label className="contact-label full">
                  PHONE
                  <input
                    placeholder="(555) 000-0000"
                    value={contactForm.phone}
                    onChange={updateContactForm("phone")}
                  />
                </label>
              </>
            ) : null}

            {contactStep === 2 ? (
              <>
                <label className="contact-label full">
                  ADDRESS
                  <input
                    placeholder="Street Address"
                    value={contactForm.address}
                    onChange={updateContactForm("address")}
                  />
                </label>
                <label className="contact-label">
                  CITY
                  <input
                    placeholder="City"
                    value={contactForm.city}
                    onChange={updateContactForm("city")}
                  />
                </label>
                <label className="contact-label">
                  STATE
                  <input
                    placeholder="State"
                    value={contactForm.state}
                    onChange={updateContactForm("state")}
                  />
                </label>
                <label className="contact-label">
                  ZIP CODE
                  <input
                    placeholder="ZIP"
                    value={contactForm.zip}
                    onChange={updateContactForm("zip")}
                  />
                </label>
                <label className="contact-label">
                  POPULATION SERVED
                  <input
                    placeholder="e.g. 25,000"
                    value={contactForm.population}
                    onChange={updateContactForm("population")}
                  />
                </label>
              </>
            ) : null}

            {contactStep === 3 ? (
              <>
                <label className="contact-label">
                  WATER SOURCE
                  <input
                    placeholder="e.g. Surface water, groundwater"
                    value={contactForm.waterSource}
                    onChange={updateContactForm("waterSource")}
                  />
                </label>
                <label className="contact-label">
                  YEARS OF EXPOSURE
                  <input
                    placeholder="e.g. 10"
                    value={contactForm.yearsExposure}
                    onChange={updateContactForm("yearsExposure")}
                  />
                </label>
                <label className="contact-label full">
                  HEALTH CONDITIONS (IF APPLICABLE)
                  <input
                    placeholder="Any relevant health conditions"
                    value={contactForm.healthConditions}
                    onChange={updateContactForm("healthConditions")}
                  />
                </label>
                <label className="contact-label full">
                  COMMENTS
                  <textarea
                    placeholder="Brief description of your organization and any relevant background..."
                    value={contactForm.comments}
                    onChange={updateContactForm("comments")}
                  />
                </label>
              </>
            ) : null}

            <div className="contact-actions full">
              <div className="contact-actions-left">
                {contactStep > 1 ? (
                  <button
                    className="contact-secondary-button"
                    type="button"
                    onClick={previousContactStep}
                  >
                    Back
                  </button>
                ) : null}
              </div>
              <div className="contact-actions-right">
                {contactStep < contactStepLabels.length ? (
                  <button type="button" onClick={nextContactStep}>
                    Next Step
                  </button>
                ) : (
                  <button type="button">Schedule Review</button>
                )}
              </div>
            </div>

            <div className="contact-disclaimer full">
              <small className="contact-note">
                All submissions are confidential. No obligation.
              </small>
            </div>
          </form>
        </div>
      </section>

      <footer>
        <div>
          <div className="brand footer-brand">
            <span className="shield">♢</span>
            <div>
              <b>PFAS Recovery Resource</b>
              <small>PUBLIC ENTITY FUNDING ADVISORY</small>
            </div>
          </div>
          <p>
            Helping public entities understand and access funding recovery
            opportunities related to PFAS settlements and environmental recovery
            programs.
          </p>
        </div>
        <div>
          <b className="footer-title">CONTACT</b>
          <p>David Grossman & Associates</p>
          <p>A National Environmental Litigation Group</p>
          <p>dgrossman@grossmankelly.com</p>
        </div>
        <div>
          <b className="footer-title">REGISTRATION DEADLINE</b>
          <p>
            July 31. After this date, certain funding opportunities may no
            longer be available.
          </p>
          <button onClick={goToContact}>Submit Your Information</button>
        </div>
        <small className="legal">
          Legal Disclaimer: The information provided on this website is for
          general informational purposes only and does not constitute legal
          advice. © 2026 PFAS Recovery Resource. All rights reserved.
        </small>
      </footer>
    </main>
  );
}

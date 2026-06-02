import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import { Loader2 } from "lucide-react";
import "./crcstyle.css";

const Crc_e = () => {

    const form = useRef();
    const [isSending, setIsSending] = useState(false);
    const [contactRelation, setContactRelation] = useState("");
    const [claimantDOB, setClaimantDOB] = useState("");
    const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
    const [claimantGender, setClaimantGender] = useState("");

    // Claimant field states
    const [claimantFirstName, setClaimantFirstName] = useState("");
    const [claimantMiddleName, setClaimantMiddleName] = useState("");
    const [claimantLastName, setClaimantLastName] = useState("");
    const [claimantSuffix, setClaimantSuffix] = useState("");
    const [claimantStreet, setClaimantStreet] = useState("");
    const [claimantCity, setClaimantCity] = useState("");
    const [claimantState, setClaimantState] = useState("");
    const [claimantZip, setClaimantZip] = useState("");
    const [claimantPhone, setClaimantPhone] = useState("");
    const [claimantEmail, setClaimantEmail] = useState("");
    const [showEmailPopup, setShowEmailPopup] = useState(false); 
    const [emailToConfirm, setEmailToConfirm] = useState(""); 
    const navigate = useNavigate();

    const collectCheckedValues = () => {
    const fields = [
    "Gaming_Platforms",
    "Games_Played",
    "Injuries",
    "Life_Effects",
    "Medical_Treatments"
    ];

    fields.forEach((field) => {
    const checkboxes = form.current.querySelectorAll(`input[name="${field}[]"]:checked`);
    const values = Array.from(checkboxes).map((c) => c.value);
    const hiddenInput = form.current.querySelector(`#${field}_hidden`);
    if (hiddenInput) {
    hiddenInput.value = values.join(", ");
    }
    });
    };

    // Contact form data for mirroring
    const [contactData, setContactData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: ""
    });

    useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "VGC Questionnaire – David Grossman & Associates";

    return () => {
    document.title = "David Grossman & Associates";
    };
    }, []);

    // Mirror Claimant info to Contact info if relation is "myself"
    useEffect(() => {
    if (contactRelation === "myself") {
    setContactData({
    firstName: claimantFirstName,
    middleName: claimantMiddleName,
    lastName: claimantLastName,
    suffix: claimantSuffix,
    street: claimantStreet,
    city: claimantCity,
    state: claimantState,
    zip: claimantZip,
    phone: claimantPhone,
    email: claimantEmail
    });
    }
    }, [
    contactRelation,
    claimantFirstName,
    claimantMiddleName,
    claimantLastName,
    claimantSuffix,
    claimantStreet,
    claimantCity,
    claimantState,
    claimantZip,
    claimantPhone,
    claimantEmail
    ]);

    useEffect(() => {
    if (contactRelation && contactRelation !== "myself") {
    setContactData({
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: ""
    });
    }
    }, [contactRelation]);

    // Phone number formatting
    const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
    return !match[2]
        ? match[1]
        : `${match[1]}-${match[2]}${match[3] ? `-${match[3]}` : ""}`;
    }
    return value;
    };

    // Calculate if claimant is a minor
    const isMinor = () => {
    if (!claimantDOB) return "";
    const today = new Date();
    const birthDate = new Date(claimantDOB);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
    }
    return age < 18 ? "Yes" : "No";
    };

    // Handle contact data change
    const handleContactChange = (field, value) => {
    setContactData(prev => ({
    ...prev,
    [field]: value
    }));
    };

    //  Validate email with regex
    const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    //  Intercept Submit and show popup
    const handleInitialSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(contactData.email)) {
    alert("Please enter a valid email address before proceeding.");
    return;
    }
    setEmailToConfirm(contactData.email);
    setShowEmailPopup(true); // show popup instead of sending
    };

    //  Proceed with sending after popup confirmation
    const handleConfirmAndSend = () => {
    setIsSending(true);
    setShowEmailPopup(false);

    collectCheckedValues(); 

    const deathDateField = form.current.querySelector('input[name="Claimant_Date_of_Death"]');
    if (deathDateField && !deathDateField.value.trim()) {
    deathDateField.value = "NA";
    }

    emailjs
    .sendForm(
        import.meta.env.VITE_SERVICE_ID4,
        import.meta.env.VITE_TEMPLATE_ID4,
        form.current,
        import.meta.env.VITE_USER_ID4
    )
    .then(
        () => {
        navigate("/form-processing", { state: { contactEmail: contactData.email } });
        },
        (error) => {
        console.error(error);
        alert("Failed to submit form. Please try again.");
        setIsSending(false);
        }
    );
    };

    //  Handle actual form submit
    const handleSubmit = (e) => {
    e.preventDefault();
    handleInitialSubmit(e);
    };

    return (
    <div className="claim-form-page">
        <h2>Video Game Claim Questionnaire</h2>

        {/*  Popup Container */}
        {showEmailPopup && (
        <div className="email-popup-overlay">
            <div className="email-popup">
            <h3>Confirm Your Email</h3>
            <p>Please make sure that you have provided a valid email address to receive the Retainer.</p>
            <label>
                Proceed using this email:
                <input
                type="email"
                value={emailToConfirm}
                onChange={(e) => {
                    setEmailToConfirm(e.target.value);
                    setContactData((prev) => ({ ...prev, email: e.target.value })); // real-time sync
                }}
                />
            </label>
            
            <div className="popup-buttons">
                <button
                className="cancel_btn"
                onClick={() => setShowEmailPopup(false)}
                disabled={isSending}
                id="cancel_btn"
                >
                Cancel
                </button>
                <button
                className="proceed_btn"
                onClick={handleConfirmAndSend}
                disabled={isSending || !isValidEmail(emailToConfirm)}
                id="proceed_btn"
                >
                {isSending ? (
                    <>
                    <Loader2 className="animate_spin" size={18} /> Sending...
                    </>
                ) : (
                    "Proceed"
                )}
                </button>
                
            </div>
            </div>
        </div>
        )}

        <div className="intro-text">
        <p>
            Video game addiction (VGA), also known as gaming disorder or internet gaming disorder, 
            is generally defined as a behavioural addiction involving problematic, compulsive use of video 
            games that results in significant impairment to an individual's ability to function in various life 
            domains over a prolonged period of time. This and associated concepts have been the subject 
            of considerable research, debate, and discussion among experts in several disciplines and has 
            generated controversy within the medical, scientific, and gaming communities. Such disorders 
            can be diagnosed when an individual engages in gaming activities at the cost of fulfilling daily 
            responsibilities or pursuing other interests without regard for the negative consequences. As 
            defined by the ICD-11, the main criterion for this disorder is a lack of self control over gaming.
        </p>
        </div>

        <form ref={form} onSubmit={handleSubmit}>
        <h3>Contact Information</h3>
        <label>
            <span>Contact's relation to claimant *</span>
            <select
            name="Contact_relation"
            required
            value={contactRelation}
            onChange={(e) => setContactRelation(e.target.value)}
            >
            <option value="">Select Relation</option>
            <option value="myself">Myself</option>
            <option value="parent">Parent</option>
            <option value="legal guardian">Legal Guardian</option>
            <option value="relative">Relative</option>
            <option value="friend">Friend</option>
            <option value="healthcare worker">Healthcare Worker</option>
            </select>
        </label>

        <div className={`contact-fields ${contactRelation === "myself" ? "slide-up" : ""}`}>
            <div className="name-row">
            <label>
                <span>First Name *</span>
                <input
                name="Contact_First_Name"
                value={contactData.firstName}
                onChange={(e) => handleContactChange("firstName", e.target.value)}
                required
                
                />
            </label>
            <label>
                <span>Middle Name</span>
                <input
                name="Contact_Middle_Name"
                value={contactData.middleName}
                onChange={(e) => handleContactChange("middleName", e.target.value)}
                
                />
            </label>
            <label>
                <span>Last Name *</span>
                <input
                name="Contact_Last_Name"
                value={contactData.lastName}
                onChange={(e) => handleContactChange("lastName", e.target.value)}
                required
                
                />
            </label>
            <label>
                <span>Suffix</span>
                <input
                name="Contact_Suffix"
                value={contactData.suffix}
                onChange={(e) => handleContactChange("suffix", e.target.value)}
                />
            </label>
            </div>

            <label>
            <span>Street Address *</span>
            <input
                name="Contact_Street_Address"
                value={contactData.street}
                onChange={(e) => handleContactChange("street", e.target.value)}
                required
                
            />
            </label>

            <div className="address-row">
            <label>
                <span>City *</span>
                <input
                name="Contact_City"
                value={contactData.city}
                onChange={(e) => handleContactChange("city", e.target.value)}
                required
                
                />
            </label>
            <label>
                <span>State (Eg. NY,TX...) *</span>
                <input
                name="Contact_State"
                value={contactData.state}
                onChange={(e) => handleContactChange("state", e.target.value)}
                required
                
                />
            </label>
            <label>
                <span>Zip Code *</span>
                <input
                name="Contact_Zip"
                value={contactData.zip}
                onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
                    handleContactChange("zip", value);
                }}
                pattern="[0-9]{5}"
                maxLength="5"
                required
                />
            </label>
            </div>

            <div className="contact-row">
            <label>
                <span>Phone Number *</span>
                <input
                name="Contact_Phone"
                type="tel"
                value={contactData.phone}
                onChange={(e) => handleContactChange("phone", formatPhoneNumber(e.target.value))}
                maxLength="12"
                required
                
                />
            </label>

            <label>
                <span>Email *</span>
                <input
                name="Contact_Email"
                type="email"
                value={contactData.email}
                onChange={(e) => handleContactChange("email", e.target.value)}
                required
                
                />
            </label>
            </div>
        </div>

        <h3>Claimant Information</h3>

        <div className="name-row">
            <label>
            <span>First Name *</span>
            <input
                name="Claimant_First_Name"
                value={claimantFirstName}
                onChange={(e) => setClaimantFirstName(e.target.value)}
                required
            />
            </label>
            <label>
            <span>Middle Name</span>
            <input
                name="Claimant_Middle_Name"
                value={claimantMiddleName}
                onChange={(e) => setClaimantMiddleName(e.target.value)}
            />
            </label>
            <label>
            <span>Last Name *</span>
            <input
                name="Claimant_Last_Name"
                value={claimantLastName}
                onChange={(e) => setClaimantLastName(e.target.value)}
                required
            />
            </label>
            <label>
            <span>Suffix</span>
            <input
                name="Claimant_Suffix"
                value={claimantSuffix}
                onChange={(e) => setClaimantSuffix(e.target.value)}
            />
            </label>
        </div>

        <label>
            <span>Street Address *</span>
            <input
            name="Claimant_Street_Address"
            value={claimantStreet}
            onChange={(e) => setClaimantStreet(e.target.value)}
            required
            />
        </label>

        <div className="address-row">
            <label>
            <span>City *</span>
            <input
                name="Claimant_City"
                value={claimantCity}
                onChange={(e) => setClaimantCity(e.target.value)}
                required
            />
            </label>
            <label>
            <span>State (Eg. NY,TX...) *</span>
            <input
                name="Claimant_State"
                value={claimantState}
                onChange={(e) => setClaimantState(e.target.value)}
                required
            />
            </label>
            <label>
            <span>Zip Code *</span>
            <input
                name="Claimant_Zip"
                value={claimantZip}
                onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 5);
                setClaimantZip(value);
                }}
                pattern="[0-9]{5}"
                maxLength="5"
                required
            />
            </label>
        </div>

        <div className="contact-row">
            <label>
            <span>Phone Number *</span>
            <input
                name="Claimant_Phone"
                type="tel"
                value={claimantPhone}
                onChange={(e) => setClaimantPhone(formatPhoneNumber(e.target.value))}
                maxLength="12"
                required
            />
            </label>

            <label>
            <span>Email *</span>
            <input
                name="Claimant_Email"
                type="email"
                value={claimantEmail}
                onChange={(e) => setClaimantEmail(e.target.value)}
                required
            />
            </label>
        </div>

        <div className="dob-gender-row">
            <label>
            <span>Date of Birth *</span>
            <input
                name="Claimant_DOB"
                type="date"
                value={claimantDOB}
                onChange={(e) => setClaimantDOB(e.target.value)}
                required
            />
            </label>

            <label>
            <span>Gender *</span>
            <select
                name="Claimant_Gender"
                value={claimantGender}
                onChange={(e) => setClaimantGender(e.target.value)}
                required
            >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="undisclosed">Undisclosed</option>
            </select>
            </label>

        </div>

        {/* Hidden field for auto-computed minor status */}
        <input type="hidden" name="Claimant_a_minor" value={isMinor()} />

        <h3>Claim Details</h3>
        
        <label>
            <span>Date of Death (if applicable)</span>
            <input
            name="Claimant_Date_of_Death"
            type="date"
            onChange={(e) => {
                const hiddenField = form.current.querySelector('#Claimant_Date_of_Death_hidden');
                hiddenField.value = e.target.value.trim() === "" ? "NA" : e.target.value;
            }}
            />
            {/* Hidden fallback field */}
            <input type="hidden" name="Claimant_Date_of_Death_fallback" id="Claimant_Date_of_Death_hidden" value="NA" />
        </label>


        <label>
            <span>Are you working with another law firm? *</span>
            <select name="Not_working_with_another_law_firm" required>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            </select>
        </label>

        <label>
            <span>Legal authorization to pursue claim</span>
            <textarea
            name="Legal_authorization"
            rows="4"
            />
        </label>

        <h3>Gaming Information</h3>

        <label>
            <span>Estimate the date that you first started playing video games</span>
            <input
            name="Start_Play_Date"
            type="date"
            required
            />
        </label>

        <label>
            <span>How many hours a day do you play video games? *</span>
            <select name="Hours_Per_Day" required>
            <option value="">Select</option>
            <option value="Less than one hour">Less than one hour</option>
            <option value="1 hour">1 hour</option>
            <option value="2 hours">2 hours</option>
            <option value="3 hours">3 hours</option>
            <option value="4 hours">4 hours</option>
            <option value="5 hours">5 hours</option>
            <option value="6 hours">6 hours</option>
            <option value="7 hours">7 hours</option>
            <option value="8 or more hours">8 or more hours</option>
            </select>
        </label>

        <fieldset>
            <legend>Select all of the gaming platforms that have been used</legend>
            <div className="checkbox-grid">
            {[
                "PlayStation Console",
                "XBOX Console",
                "Nintendo Switch",
                "Gaming Computer or Laptop",
                "Steam Deck",
                "Apple phone",
                "Android Phone",
                "Oculus VR",
                "Meta Quest",
                "Other Gaming Device",
            ].map((platform) => (
                <label key={platform} className="checkbox-item">
                <input type="checkbox" name="Gaming_Platforms[]" value={platform}/>
                <span>{platform}</span>
                </label>
            ))}
            <input type="hidden" name="Gaming_Platforms" id="Gaming_Platforms_hidden" />
            </div>
        </fieldset>

        <fieldset>
            <legend>Select all video games that have been played</legend>
            <div className="checkbox-grid">
            {[
                "Apex Legends",
                "Call of Duty",
                "Counter-Strike",
                "Fortnite",
                "GTA 5",
                "League of Legends",
                "Minecraft",
                "Overwatch",
                "Rainbow Six: Siege",
                "Roblox",
                "Rocket League",
                "Teamfight Tactics",
                "Valorant",
                "World of Warcraft",
                "Other Game",
            ].map((game) => (
                <label key={game} className="checkbox-item">
                <input type="checkbox" name="Games_Played[]" value={game}/>
                <span>{game}</span>
                </label>
            ))}
            <input type="hidden" name="Games_Played" id="Games_Played_hidden" />
            </div>
        </fieldset>

        <h3>Injuries and Medical Information</h3>

        <fieldset>
            <legend>Have you had any of the following injuries or diagnoses due to video games?</legend>
            <div className="checkbox-grid">
            {[
                "Video Game Addiction",
                "Opposition defiant disorder (ODD)",
                "Suicide attempt",
                "Depression",
                "ADHD",
                "Gamers rage",
                "Gamers thumb",
                "Seizures",
                "Computer vision syndrome",
                "Carpal tunnel syndrome",
                "Orthopedic Injury",
                "Other injury",
                "No injury",
            ].map((injury) => (
                <label key={injury} className="checkbox-item">
                <input type="checkbox" name="Injuries[]" value={injury}/>
                <span>{injury}</span>
                </label>
            ))}
            <input type="hidden" name="Injuries" id="Injuries_hidden" />
            </div>
        </fieldset>

        <fieldset>
            <legend>Have video games affected your life in any of the following ways?</legend>
            <div className="checkbox-grid">
            {[
                "Drop in grades",
                "Dropout of school",
                "Hiding Game Playing Time",
                "Inability to stop playing games",
                "Poor Hygiene",
                "Individual Education Plan (IEP)",
                "Social isolation",
                "Stealing money for games",
                "Unable to work due to gaming",
                "Withdrawal symptoms",
                "Other affect",
            ].map((effect) => (
                <label key={effect} className="checkbox-item">
                <input type="checkbox" name="Life_Effects[]" value={effect}/>
                <span>{effect}</span>
                </label>
            ))}
            <input type="hidden" name="Life_Effects" id="Life_Effects_hidden" />
            </div>
        </fieldset>

        <fieldset>
            <legend>Have you received any of the following medical treatments due to playing video games?</legend>
            <div className="checkbox-grid">
            {[
                "Counseling",
                "Doctor visits",
                "Hospitalized",
                "In person gaming addiction program",
                "Online gaming addiction program",
                "Therapy",
                "Other treatment",
                "No treatment",
            ].map((treatment) => (
                <label key={treatment} className="checkbox-item">
                <input type="checkbox" name="Medical_Treatments[]" value={treatment}/>
                <span>{treatment}</span>
                </label>
            ))}
            <input type="hidden" name="Medical_Treatments" id="Medical_Treatments_hidden" />
            </div>
        </fieldset>

        <div className="disclaimer-section">
            <label className="disclaimer-label">
            <input 
                type="checkbox" 
                required
                checked={disclaimerAccepted}
                onChange={(e) => setDisclaimerAccepted(e.target.checked)}
            />
            <span>
                To enroll in this important case to recover damages for violating our trust and to make gaming 
                safer enroll below by completing the section at the end. This will include you or your child in 
                this important case. Please share anything else you want us to know about your case. By 
                providing your phone number you consent to receiving calls and text messages from us and/or 
                our representatives. *
            </span>
            </label>
        </div>

        <button type="submit" disabled={isSending || !disclaimerAccepted}>
            {isSending ? (
            <>
                <Loader2 className="animate-spin" size={18} /> Sending...
            </>
            ) : (
            "Submit"
            )}
        </button>

        <h3>CRC005</h3>
        <input type="hidden" name="CRC_Code" value="CRC005" />

        </form>
    </div>
    )
}

export default Crc_e
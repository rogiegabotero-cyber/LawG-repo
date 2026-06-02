import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./file_claim_page.css";
import { House, ChevronsRight } from "lucide-react";
import GameBoi from "../assets/gameboi.webp";
import Pfas from "../assets/pfas.webp";
import Social from "../assets/mam.webp";

const FileClaimPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "File Claim – David Grossman & Associates";
    return () => {
      document.title = "David Grossman & Associates";
    };
  }, []);

  return (
    <div className="file-claim-container">
      <div className="orange">
        <h2>File a Claim</h2>
        <div className="back_link">
          <Link to="/" className="back-home">
            <House strokeWidth={1} size={20} /> Home
          </Link>
          <ChevronsRight className="back-home" size={20} />
          File a Claim
        </div>
      </div>

      {/* File Claim Section */}
      <div className="general-container">
        <div className="R_div3">
          <div className="direction-box">
            <h3 className="direction-title">File a Claim</h3>
            <p className="direction-text">
              Click the button below to file your claim for{" "}
              <strong>Video Game Addiction</strong>.
            </p>
            <div className="direction-image">
              <img src={GameBoi} alt="File a Claim Illustration" />
            </div>
            <Link to="/claim-form" className="claim-btn">
              Proceed to Video Game Addiction Form
            </Link>
          </div>

          <div className="direction-box">
            <h3 className="direction-title">PFAS</h3>
            <p className="direction-text">
              Review key deadlines and settlement details—then file your <strong>PFAS Intake</strong>.
            </p>

            {/* --- Inline PFAS Mini Card (clickable) --- */}
            {(() => {
              const criticalDeadlines = [
                { label: "Phase Two Special Needs Claims Form", date: "2026-01-08" },
                { label: "Phase Two Testing Claims Form", date: "2026-03-31" },
                { label: "Phase Two Public Water System Claims Form", date: "2026-07-31" },
              ];

              const now = new Date();
              const parsed = criticalDeadlines
                .map((d) => ({ ...d, dt: new Date(d.date) }))
                .filter((d) => !Number.isNaN(d.dt.getTime()))
                .sort((a, b) => a.dt - b.dt);

              const nearest = parsed.find((d) => d.dt >= now) || parsed[0];

              const formatDate = (iso) => {
                if (!iso) return "N/A";
                const d = new Date(iso);
                if (Number.isNaN(d.getTime())) return iso;
                return d.toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                });
              };

              return (
                <Link to="/pfaspage" className="pfasMiniCard" aria-label="Open PFAS settlements page">
                  <div className="pfasMiniTop">
                    <div className="pfasMiniText">
                      <h3 className="pfasMiniTitle">PFAS — Public Water System Settlements</h3>
                      <p className="pfasMiniDesc">
                        Deadlines are approaching. Review key dates and start your intake form before time runs out.
                      </p>

                      {nearest ? (
                        <div className="pfasMiniUrgency">
                          <span className="pfasMiniBadge">Next deadline</span>
                          <span className="pfasMiniDeadline">
                            {formatDate(nearest.date)} — {nearest.label}
                          </span>
                        </div>
                      ) : null}
                    </div>

                    <div className="pfasMiniImgWrap">
                      <img src={Pfas} alt="PFAS" className="pfasMiniImg" />
                    </div>
                  </div>

                  <div className="pfasMiniActions">
                    <span className="pfasMiniPrimary">View PFAS Details</span>
                    <span className="pfasMiniSecondary">or file now →</span>
                  </div>
                </Link>
              );
            })()}

            {/* Optional: keep a direct form button too */}
            <Link to="/pfasform" className="claim-btn">
              Go straight to PFAS Form
            </Link>
          </div>

          <div className="direction-box">
            <h3 className="direction-title">Social Media Adolescent Addiction</h3>
            <p className="direction-text">
              Complete the short-form complaint style questionnaire based on the court filing questions for
              <strong> Social Media Adolescent Addiction / Personal Injury</strong>.
            </p>
            <div className="direction-image">
              <img src={Social} alt="Social media claim illustration" />
            </div>
            <Link to="/social-media-claim-form" className="claim-btn">
              Proceed to Social Media Claim Form
            </Link>
          </div>
          

        </div>

      </div>
        
    </div>
  );
};

export default FileClaimPage;

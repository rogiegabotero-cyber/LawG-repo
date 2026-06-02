import React, { useEffect } from "react";
import "./pfaspage.css";
import { Link } from "react-router-dom";
import Pfas from "../assets/pfas.webp";

const PFASPage = () => {
  // Table data from your uploaded spreadsheet (kept as-is)
  const tableRows = [
    { description: "Deadline to Submit Objections", dupont: "2023-11-11", m3: "2023-11-11", tyco: "2024-08-24", basf: "2024-09-15" },
    { description: "Deadline to Submit Requests for Exclusion", dupont: "2023-04-12", m3: "2023-11-12", tyco: "2024-09-23", basf: "2024-10-15" },
    { description: "Court’s Final Fairness Hearing", dupont: "2023-12-14", m3: "2024-02-02", tyco: "2024-01-11", basf: "2024-01-11" },
    { description: "Deadline to Withdraw Request for Exclusion", dupont: "2024-03-15", m3: "2024-03-15", tyco: "2024-12-13", basf: "2024-12-13" },
    { description: "Phase One Public Water System Settlement Claim Form", dupont: "2024-07-26", m3: "2024-07-26", tyco: "2025-08-04", basf: "2025-08-04" },
    { description: "Phase One Special Needs Claims Form", dupont: "2024-08-26", m3: "2024-08-26", tyco: "2025-08-21", basf: "2025-08-21" },
    { description: "Phase Two Testing Claims Form", dupont: "2026-03-31", m3: "2026-03-31", tyco: "", basf: "" },
    { description: "Phase Two Public Water System Claims Form", dupont: "2026-07-31", m3: "2026-07-31", tyco: "", basf: "" },
    { description: "Phase Two Special Needs Claims Form", dupont: "2026-01-08", m3: "", tyco: "", basf: "" },
    { description: "Phase One Supplemental Fund Claims Form", dupont: "2030-12-31", m3: "2030-12-31", tyco: "2030-12-31", basf: "2030-12-31" },
    { description: "Phase Two Supplemental Fund Claims Form", dupont: "2030-12-31", m3: "2030-12-31", tyco: "", basf: "" },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    document.title = "Contact Us – David Grossman & Associates";
    return () => {
      document.title = "David Grossman & Associates";
    };
  }, []);

  const criticalDescriptions = new Set([
    "Phase Two Testing Claims Form",
    "Phase Two Public Water System Claims Form",
    "Phase Two Special Needs Claims Form",
    ]);


  const formatDate = (iso) => {
    if (!iso) return "N/A";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString(undefined, { year: "numeric", month: "2-digit", day: "2-digit" });
  };

  const handleFileClaim = () => {
    // TODO: navigate("/file-a-claim") or window.open("https://...", "_blank")
    console.log("File a Claim clicked");
  };

  return (
    <div className="pfaspage">
      <header className="pfas-header">
        <div className="pfas-container">
          <h1>Public Water System Settlements</h1>
        </div>
      </header>

      <main className="pfas-container pfas-main">
        <section className="pfas-section">
            <h2>Settlement Overview</h2>
            <p>
                The current Settlement Agreements are class action settlements designed to resolve claims for PFAS
                contamination in Public Water Systems’ drinking water, as those terms are defined in the respective
                agreements.
            </p>

            <ul className="pfas-list">
                <li>
                <strong>The 3M Company ("3M"):</strong> Reached a settlement of up to $12.5 billion to support testing and remediation.
                </li>
                <li>
                <strong>The DuPont Defendants:</strong> A group consisting of E.I. Du Pont de Nemours and Company (now known as EIDP, Inc.),
                DuPont de Nemours, Inc., The Chemours Company, The Chemours Company FC, LLC, and Corteva, Inc. reached a combined settlement
                of $1.185 billion.
                </li>
                <li>
                <strong>The Tyco Defendants:</strong> Includes Tyco Fire Products LP and Chemguard, Inc., which reached a $750 million settlement.
                </li>
                <li>
                <strong>BASF Corporation ("BASF"):</strong> Reached a settlement of $316.5 million.
                </li>
            </ul>

            <p>
                These settlements have received final approval as part of the AFFF Multi-District Litigation (MDL).
            </p>
        </section>


        <section className="pfas-section">
          <h2>2026 Critical Filing Deadlines</h2>
          <ul className="pfas-list2">
            <li>
              <strong>January 1, 2026:</strong> Deadline for certain Phase 2 systems to file baseline testing cost claims
              under applicable settlement funds.
            </li>
            <li>
              <strong>June 30, 2026:</strong> Deadline for Phase 2 systems to file treatment/remediation cost claims
              against one settlement fund.
            </li>
            <li>
              <strong>July 31, 2026:</strong> Deadline for Phase 2 systems to file treatment/remediation cost claims
              against another settlement fund.
            </li>
          </ul>
        </section>

        <section className="pfas-section">
          <h2>Important Dates and Deadlines</h2>

          <div className="pfas-tableWrap">
            <table className="pfas-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>DuPont</th>
                  <th>3M</th>
                  <th>Tyco</th>
                  <th>BASF</th>
                </tr>
              </thead>
            <tbody>
                {tableRows.map((r, idx) => {
                    const isCritical = criticalDescriptions.has(r.description);
                    return (
                    <tr key={idx} className={isCritical ? "pfas-rowCritical" : ""}>
                        <td className="pfas-desc">{r.description}</td>
                        <td>{formatDate(r.dupont)}</td>
                        <td>{formatDate(r.m3)}</td>
                        <td>{formatDate(r.tyco)}</td>
                        <td>{formatDate(r.basf)}</td>
                    </tr>   
                    );
                })}
            </tbody>

            </table>
          </div>
        </section>

        <section className="pfas-section-pfas-cta">
          <p>
            Deadlines are coming up soon—if you believe your system may qualify, it’s best to file now to avoid missing a key date.
          </p>

          <div className="pfas-ctaNote">
            <strong>Don’t wait:</strong> Filing early helps ensure your claim is submitted before the next deadline.It only takes a few minutes to get started.
          </div>
          <Link to="/pfasform">
            <button className="pfas-btnPrimary" onClick={handleFileClaim}>
              File a Claim
            </button>
          </Link>

          
        </section>


      </main>
    </div>
  );
};

export default PFASPage;

import { useState } from "react";
import { Page, Job } from "../App";

interface JobDetailProps {
  job: Job;
  navigate: (p: Page) => void;
}

export default function JobDetail({ job, navigate }: JobDetailProps) {
  const [applied, setApplied] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="job-detail">
      <button className="back-btn" onClick={() => navigate("feed")}>
        ← Back to Feed
      </button>
      <div className="detail-grid">
        <div className="detail-main">
          <div className="detail-header">
            <div className="detail-logo">{job.logo}</div>
            <div className="detail-title-block">
              {job.urgent && <span className="urgent-badge">🔥 Urgent Hire</span>}
              <h1 className="detail-title">{job.title}</h1>
              <p className="detail-company">{job.company}</p>
            </div>
          </div>
          <div className="detail-chips">
            <span className="chip">📍 {job.location}</span>
            <span className="chip">💼 {job.type}</span>
            <span className="chip salary-chip">💰 {job.salary}</span>
            <span className="chip">⏰ Posted {job.posted}</span>
          </div>
          <div className="detail-tags">
            {job.tags.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
          <section className="detail-section">
            <h2>About the Role</h2>
            <p>
              We're looking for a talented {job.title} to join the {job.company} team in {job.location}.
            </p>
            <p>
              You'll be embedded in a cross-functional squad alongside PMs, designers, and engineers.
            </p>
          </section>
          <section className="detail-section">
            <h2>Key Responsibilities</h2>
            <ul className="resp-list">
              <li>Design, build, and maintain high-quality features end-to-end</li>
              <li>Collaborate with product and design on requirements and trade-offs</li>
              <li>Mentor junior team members and drive engineering best practices</li>
              <li>Own reliability: write tests, monitor systems, fix issues fast</li>
              <li>Contribute to architectural decisions and tech strategy</li>
            </ul>
          </section>
          <section className="detail-section">
            <h2>What You Bring</h2>
            <ul className="resp-list">
              {job.tags.map((t) => (
                <li key={t}>Strong experience with <strong>{t}</strong></li>
              ))}
              <li>5+ years in a similar role at a product-led company</li>
              <li>Excellent communication and stakeholder management</li>
              <li>A bias for action and a high bar for quality</li>
            </ul>
          </section>
          <section className="detail-section">
            <h2>What's in it for you</h2>
            <div className="perks-grid">
              {["Flexible WFH", "Learning budget $3k/yr", "Equity options", "Health insurance"].map((p) => (
                <div key={p} className="perk-card">✓ {p}</div>
              ))}
            </div>
          </section>
        </div>
        <aside className="detail-sidebar">
          <div className="sidebar-card">
            <p className="sidebar-salary">{job.salary}</p>
            <p className="sidebar-type">{job.type} · {job.location}</p>
            <button
              className={`apply-btn ${applied ? "applied" : ""}`}
              onClick={() => setApplied(true)}
              disabled={applied}
            >
              {applied ? "✓ Application Sent!" : "Apply Now"}
            </button>
            <button
              className={`save-btn ${saved ? "saved" : ""}`}
              onClick={() => setSaved(!saved)}
            >
              {saved ? "★ Saved" : "☆ Save Job"}
            </button>
            <button
              className="msg-btn"
              onClick={() => navigate("messages")}
            >
              ✉ Message Recruiter
            </button>
          </div>
          <div className="sidebar-card company-card">
            <h3>About {job.company}</h3>
            <p>One of Australia's leading tech companies, trusted by millions. Known for a strong engineering culture.</p>
            <div className="company-stats">
              <div><strong>500–2000</strong><span>Employees</span></div>
              <div><strong>Series C+</strong><span>Stage</span></div>
            </div>
          </div>
        </aside>
      </div>
      <style>{`
        .job-detail { padding: 32px 0 60px; }
        .back-btn {
          background: none;
          border: none;
          color: var(--muted);
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 28px;
          padding: 0;
          transition: color var(--transition);
        }
        .back-btn:hover { color: var(--accent); }
        .detail-grid {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 28px;
          align-items: start;
        }
        .detail-header {
          display: flex;
          gap: 20px;
          align-items: flex-start;
          margin-bottom: 20px;
        }
        .detail-logo {
          width: 64px;
          height: 64px;
          border-radius: 14px;
          background: var(--surface2);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-head);
          font-weight: 800;
          font-size: 20px;
          color: var(--accent);
          flex-shrink: 0;
        }
        .urgent-badge {
          font-size: 12px;
          font-weight: 600;
          background: rgba(249,115,22,0.15);
          color: #f97316;
          padding: 4px 10px;
          border-radius: 20px;
          display: inline-block;
          margin-bottom: 8px;
        }
        .detail-title {
          font-family: var(--font-head);
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 4px;
        }
        .detail-company { color: var(--muted); font-size: 16px; }
        .detail-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }
        .chip {
          font-size: 13px;
          padding: 6px 14px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          color: var(--muted);
        }
        .salary-chip { color: var(--success); border-color: rgba(34,197,94,0.3); background: rgba(34,197,94,0.05); }
        .detail-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 32px; }
        .tag {
          font-size: 12px;
          padding: 4px 12px;
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: 20px;
          color: var(--accent);
        }
        .detail-section { margin-bottom: 32px; }
        .detail-section h2 {
          font-family: var(--font-head);
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 14px;
          color: var(--text);
        }
        .detail-section p {
          color: var(--muted);
          line-height: 1.7;
          margin-bottom: 12px;
          font-size: 15px;
        }
        .resp-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .resp-list li {
          padding-left: 20px;
          position: relative;
          color: var(--muted);
          font-size: 15px;
          line-height: 1.6;
        }
        .resp-list li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: var(--accent);
        }
        .perks-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .perk-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 12px 16px;
          font-size: 14px;
          color: var(--muted);
        }
        .sidebar-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 24px;
          margin-bottom: 16px;
        }
        .sidebar-salary {
          font-family: var(--font-head);
          font-size: 22px;
          font-weight: 800;
          color: var(--success);
          margin-bottom: 4px;
        }
        .sidebar-type { color: var(--muted); font-size: 13px; margin-bottom: 20px; }
        .apply-btn, .save-btn, .msg-btn {
          width: 100%;
          padding: 13px;
          border-radius: 10px;
          border: none;
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 10px;
          transition: all var(--transition);
        }
        .apply-btn {
          background: var(--accent);
          color: white;
        }
        .apply-btn:hover:not(:disabled) { background: #e55a28; }
        .apply-btn.applied { background: var(--success); }
        .apply-btn:disabled { opacity: 0.8; cursor: not-allowed; }
        .save-btn {
          background: var(--surface2);
          border: 1px solid var(--border);
          color: var(--text);
        }
        .save-btn:hover { border-color: var(--accent); }
        .save-btn.saved { color: var(--accent); border-color: var(--accent); }
        .msg-btn {
          background: none;
          border: 1px solid var(--border);
          color: var(--muted);
        }
        .msg-btn:hover { border-color: var(--accent2); color: var(--text); }
        .company-card h3 {
          font-family: var(--font-head);
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .company-card p { color: var(--muted); font-size: 13px; line-height: 1.6; margin-bottom: 16px; }
        .company-stats {
          display: flex;
          gap: 20px;
        }
        .company-stats div {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .company-stats strong { font-family: var(--font-head); font-size: 16px; }
        .company-stats span { font-size: 12px; color: var(--muted); }
        @media (max-width: 768px) {
          .detail-grid { grid-template-columns: 1fr; }
          .detail-sidebar { order: -1; }
        }
      `}</style>
    </div>
  );
}

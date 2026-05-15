import { useState } from "react";
import { Page } from "../App";

interface PostJobProps {
  navigate: (p: Page) => void;
}

export default function PostJob({ navigate }: PostJobProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: "", company: "", location: "", type: "Full-time",
    salary: "", tags: "", description: "", urgent: false,
  });

  const set = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  if (submitted) {
    return (
      <div className="post-success">
        <div className="success-icon">🎉</div>
        <h2>Job Posted!</h2>
        <p>Your listing is live. Applicants will start rolling in soon.</p>
        <button onClick={() => navigate("feed")}>← Back to Feed</button>
        <style>{`
          .post-success {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 60vh;
            text-align: center;
            gap: 14px;
            animation: fadeIn 0.4s ease;
          }
          @keyframes fadeIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
          .success-icon { font-size: 64px; }
          .post-success h2 { font-family: var(--font-head); font-size: 32px; font-weight: 800; }
          .post-success p { color: var(--muted); font-size: 16px; }
          .post-success button {
            margin-top: 10px;
            padding: 12px 24px;
            background: var(--accent);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 15px;
            font-weight: 600;
            transition: background var(--transition);
          }
          .post-success button:hover { background: #e55a28; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="post-job">
      <div className="post-header">
        <h1>Post a Job</h1>
        <p>Reach thousands of talented Sydney professionals</p>
      </div>
      <div className="post-form">
        <div className="form-section">
          <h2>Role Details</h2>
          <div className="field">
            <label>Job Title *</label>
            <input type="text" placeholder="e.g. Senior React Developer" value={form.title} onChange={e => set("title", e.target.value)} />
          </div>
          <div className="form-row">
            <div className="field">
              <label>Company Name *</label>
              <input type="text" placeholder="e.g. Atlassian" value={form.company} onChange={e => set("company", e.target.value)} />
            </div>
            <div className="field">
              <label>Location *</label>
              <input type="text" placeholder="e.g. Sydney CBD / Remote" value={form.location} onChange={e => set("location", e.target.value)} />
            </div>
          </div>
          <div className="form-row">
            <div className="field">
              <label>Employment Type</label>
              <select value={form.type} onChange={e => set("type", e.target.value)}>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Hybrid</option>
                <option>Remote</option>
              </select>
            </div>
            <div className="field">
              <label>Salary Range</label>
              <input type="text" placeholder="e.g. $120k–$150k" value={form.salary} onChange={e => set("salary", e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label>Skills / Tags</label>
            <input type="text" placeholder="e.g. React, TypeScript, Node.js (comma separated)" value={form.tags} onChange={e => set("tags", e.target.value)} />
          </div>
        </div>

        <div className="form-section">
          <h2>Job Description</h2>
          <div className="field">
            <label>Description *</label>
            <textarea
              rows={8}
              placeholder="Tell candidates about the role, responsibilities, requirements, and why they should join..."
              value={form.description}
              onChange={e => set("description", e.target.value)}
            />
          </div>
          <div className="urgent-toggle">
            <div className="toggle-info">
              <strong>Mark as Urgent</strong>
              <span>Highlights your listing with a 🔥 badge</span>
            </div>
            <button
              className={`toggle-btn ${form.urgent ? "on" : ""}`}
              onClick={() => set("urgent", !form.urgent)}
            >
              <span className="toggle-knob" />
            </button>
          </div>
        </div>

        <div className="form-actions">
          <button className="cancel-btn" onClick={() => navigate("feed")}>Cancel</button>
          <button
            className="submit-btn"
            onClick={() => { if (form.title && form.company) setSubmitted(true); }}
          >
            Publish Listing →
          </button>
        </div>
      </div>

      <style>{`
        .post-job { padding: 36px 0 60px; max-width: 720px; }
        .post-header { margin-bottom: 32px; }
        .post-header h1 { font-family: var(--font-head); font-size: 32px; font-weight: 800; margin-bottom: 8px; }
        .post-header p { color: var(--muted); }
        .post-form { display: flex; flex-direction: column; gap: 28px; }
        .form-section {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 28px;
        }
        .form-section h2 {
          font-family: var(--font-head);
          font-size: 17px;
          font-weight: 700;
          margin-bottom: 20px;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--border);
        }
        .field { display: flex; flex-direction: column; gap: 8px; margin-bottom: 18px; }
        .field:last-child { margin-bottom: 0; }
        .field label { font-size: 13px; font-weight: 500; color: var(--muted); }
        .field input, .field select, .field textarea {
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 12px 16px;
          color: var(--text);
          font-size: 14px;
          outline: none;
          transition: border-color var(--transition);
          resize: vertical;
        }
        .field input:focus, .field select:focus, .field textarea:focus { border-color: var(--accent); }
        .field input::placeholder, .field textarea::placeholder { color: var(--muted); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .urgent-toggle {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: 8px;
        }
        .toggle-info { display: flex; flex-direction: column; gap: 3px; }
        .toggle-info strong { font-size: 14px; }
        .toggle-info span { font-size: 12px; color: var(--muted); }
        .toggle-btn {
          width: 48px;
          height: 26px;
          border-radius: 13px;
          border: none;
          background: var(--border);
          position: relative;
          transition: background var(--transition);
          flex-shrink: 0;
        }
        .toggle-btn.on { background: var(--accent); }
        .toggle-knob {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          transition: transform var(--transition);
          display: block;
        }
        .toggle-btn.on .toggle-knob { transform: translateX(22px); }
        .form-actions { display: flex; justify-content: flex-end; gap: 12px; }
        .cancel-btn {
          padding: 13px 24px;
          border-radius: 10px;
          border: 1px solid var(--border);
          background: none;
          color: var(--muted);
          font-size: 15px;
          font-weight: 500;
          transition: all var(--transition);
        }
        .cancel-btn:hover { border-color: var(--accent); color: var(--text); }
        .submit-btn {
          padding: 13px 28px;
          border-radius: 10px;
          border: none;
          background: var(--accent);
          color: white;
          font-size: 15px;
          font-weight: 600;
          transition: background var(--transition);
        }
        .submit-btn:hover { background: #e55a28; }
        @media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
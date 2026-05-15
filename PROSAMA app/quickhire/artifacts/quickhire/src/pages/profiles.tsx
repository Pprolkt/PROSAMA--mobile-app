import { useState } from "react";
import { Page, SAMPLE_JOBS } from "../App";

interface ProfileProps {
  navigate: (p: Page) => void;
}

export default function Profile({ navigate }: ProfileProps) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });

  const handleLogin = () => {
    if (form.name && form.email) {
      setLoggedIn(true);
    }
  };

  if (!loggedIn) {
    return (
      <div className="profile-page">
        <div className="login-container">
          <div className="login-box">
            <h1>Welcome Back</h1>
            <p>Sign in to manage your applications and job searches</p>
            <div className="login-form">
              <div className="field">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Saruul Battsengel"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="field">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <button
                className="login-btn"
                onClick={handleLogin}
                disabled={!form.name || !form.email}
              >
                Sign In
              </button>
            </div>
            <p className="login-footer">Don't have an account? <button onClick={handleLogin} className="signup-link">Create one now</button></p>
          </div>
        </div>
        <style>{`
          .profile-page { padding: 36px 0; min-height: 60vh; display: flex; align-items: center; justify-content: center; }
          .login-container { width: 100%; max-width: 400px; }
          .login-box {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            padding: 40px;
            text-align: center;
          }
          .login-box h1 { font-family: var(--font-head); font-size: 28px; font-weight: 800; margin-bottom: 8px; }
          .login-box p { color: var(--muted); margin-bottom: 28px; }
          .login-form { display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; }
          .field { display: flex; flex-direction: column; gap: 8px; text-align: left; }
          .field label { font-size: 13px; font-weight: 500; color: var(--muted); }
          .field input {
            background: var(--surface2);
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 12px 16px;
            color: var(--text);
            font-size: 14px;
            outline: none;
            transition: border-color var(--transition);
          }
          .field input:focus { border-color: var(--accent); }
          .field input::placeholder { color: var(--muted); }
          .login-btn {
            padding: 13px 24px;
            background: var(--accent);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 15px;
            font-weight: 600;
            transition: background var(--transition);
          }
          .login-btn:hover:not(:disabled) { background: #e55a28; }
          .login-btn:disabled { opacity: 0.4; cursor: not-allowed; }
          .login-footer { font-size: 13px; color: var(--muted); }
          .signup-link { background: none; border: none; color: var(--accent); font-weight: 600; cursor: pointer; padding: 0; }
          .signup-link:hover { text-decoration: underline; }
        `}</style>
      </div>
    );
  }

  const appliedJobs = SAMPLE_JOBS.slice(0, 3);

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">{form.name.split(" ").map((n) => n[0]).join("")}</div>
        <div className="profile-info">
          <h1>{form.name}</h1>
          <p className="profile-email">{form.email}</p>
        </div>
        <button className="logout-btn" onClick={() => { setLoggedIn(false); setForm({ name: "", email: "" }); }}>
          Sign Out
        </button>
      </div>

      <section className="profile-section">
        <h2>Applied Jobs</h2>
        <div className="applied-list">
          {appliedJobs.map((job) => (
            <div key={job.id} className="applied-card">
              <div className="applied-left">
                <div className="applied-logo">{job.logo}</div>
                <div className="applied-info">
                  <h3>{job.title}</h3>
                  <p className="applied-company">{job.company}</p>
                  <p className="applied-meta">Applied {job.posted}</p>
                </div>
              </div>
              <div className="applied-actions">
                <button onClick={() => navigate("job-detail", job)} className="view-btn">View</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .profile-page { padding: 36px 0 60px; }
        .profile-header {
          display: flex;
          align-items: center;
          gap: 24px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 32px;
          margin-bottom: 32px;
        }
        .profile-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--accent);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-head);
          font-weight: 800;
          font-size: 20px;
          flex-shrink: 0;
        }
        .profile-info { flex: 1; }
        .profile-info h1 { font-family: var(--font-head); font-size: 24px; font-weight: 800; margin-bottom: 4px; }
        .profile-email { color: var(--muted); font-size: 14px; }
        .logout-btn {
          padding: 11px 22px;
          background: none;
          border: 1px solid var(--border);
          border-radius: 10px;
          color: var(--muted);
          font-size: 14px;
          font-weight: 500;
          transition: all var(--transition);
        }
        .logout-btn:hover { border-color: var(--accent); color: var(--accent); }
        .profile-section { margin-bottom: 32px; }
        .profile-section h2 {
          font-family: var(--font-head);
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 16px;
        }
        .applied-list { display: flex; flex-direction: column; gap: 12px; }
        .applied-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 20px;
          transition: all var(--transition);
        }
        .applied-card:hover { border-color: var(--accent); background: var(--surface2); }
        .applied-left { display: flex; gap: 16px; flex: 1; align-items: center; }
        .applied-logo {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          background: var(--surface2);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-head);
          font-weight: 700;
          font-size: 13px;
          color: var(--accent);
          flex-shrink: 0;
        }
        .applied-info { flex: 1; }
        .applied-info h3 { font-family: var(--font-head); font-size: 15px; font-weight: 700; margin-bottom: 2px; }
        .applied-company { color: var(--muted); font-size: 13px; margin-bottom: 4px; }
        .applied-meta { color: var(--muted); font-size: 12px; }
        .applied-actions { display: flex; gap: 8px; }
        .view-btn {
          padding: 10px 18px;
          background: var(--accent);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          transition: background var(--transition);
        }
        .view-btn:hover { background: #e55a28; }
        @media (max-width: 600px) {
          .profile-header { flex-direction: column; text-align: center; }
          .applied-card { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </div>
  );
}

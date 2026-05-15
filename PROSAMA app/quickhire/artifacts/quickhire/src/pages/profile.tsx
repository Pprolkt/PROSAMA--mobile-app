import { useState } from "react";
import { Page, SAMPLE_JOBS, Job } from "../App";

interface ProfileProps {
  navigate: (p: Page) => void;
}

export default function Profile({ navigate }: ProfileProps) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [appliedJobs] = useState<Job[]>([SAMPLE_JOBS[0], SAMPLE_JOBS[2]]);

  const handleLogin = () => {
    if (name.trim() && email.trim()) {
      setLoggedIn(true);
    }
  };

  if (!loggedIn) {
    return (
      <div className="profile-page">
        <div className="login-card">
          <div className="login-icon">👤</div>
          <h1>Sign In</h1>
          <p className="login-sub">Access your PROSAMA profile and applications</p>
          <div className="field">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="e.g. Saruul Battsengel"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="e.g. you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>
          <button
            className="login-btn"
            onClick={handleLogin}
            disabled={!name.trim() || !email.trim()}
          >
            Sign In →
          </button>
        </div>

        <style>{`
          .profile-page { padding: 60px 0; display: flex; justify-content: center; }
          .login-card {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            padding: 40px;
            width: 100%;
            max-width: 440px;
            display: flex;
            flex-direction: column;
            gap: 20px;
            animation: fadeIn 0.4s ease;
          }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          .login-icon { font-size: 48px; text-align: center; }
          .login-card h1 { font-family: var(--font-head); font-size: 28px; font-weight: 800; text-align: center; }
          .login-sub { color: var(--muted); font-size: 14px; text-align: center; margin-top: -10px; }
          .field { display: flex; flex-direction: column; gap: 8px; }
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
            margin-top: 4px;
          }
          .login-btn:hover:not(:disabled) { background: #e55a28; }
          .login-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="profile-page logged-in">
      <div className="profile-header">
        <div className="profile-avatar">{name.charAt(0).toUpperCase()}</div>
        <div className="profile-info">
          <h1>{name}</h1>
          <p className="profile-email">{email}</p>
          <span className="profile-badge">Active Job Seeker</span>
        </div>
        <button
          className="logout-btn"
          onClick={() => {
            setLoggedIn(false);
            setName("");
            setEmail("");
          }}
        >
          Log Out
        </button>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <strong>{appliedJobs.length}</strong>
          <span>Applications</span>
        </div>
        <div className="stat-card">
          <strong>1</strong>
          <span>Interviews</span>
        </div>
        <div className="stat-card">
          <strong>3</strong>
          <span>Saved Jobs</span>
        </div>
      </div>

      <div className="applied-section">
        <h2>Your Applications</h2>
        <div className="applied-list">
          {appliedJobs.map((job) => (
            <div key={job.id} className="applied-card">
              <div className="applied-logo">{job.logo}</div>
              <div className="applied-info">
                <p className="applied-title">{job.title}</p>
                <p className="applied-company">{job.company} · {job.location}</p>
              </div>
              <div className="applied-meta">
                <span className="applied-salary">{job.salary}</span>
                <span className="applied-status">Applied</span>
              </div>
              <button
                className="view-btn"
                onClick={() => navigate("job-detail")}
              >
                View →
              </button>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .profile-page { padding: 36px 0 60px; }
        .logged-in { display: flex; flex-direction: column; gap: 28px; }
        .profile-header {
          display: flex;
          align-items: center;
          gap: 20px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 28px;
        }
        .profile-avatar {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: var(--accent);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-head);
          font-weight: 800;
          font-size: 28px;
          flex-shrink: 0;
        }
        .profile-info { flex: 1; }
        .profile-info h1 { font-family: var(--font-head); font-size: 24px; font-weight: 800; margin-bottom: 4px; }
        .profile-email { color: var(--muted); font-size: 14px; margin-bottom: 8px; }
        .profile-badge {
          font-size: 12px;
          font-weight: 600;
          background: rgba(255,107,53,0.15);
          color: var(--accent);
          padding: 3px 10px;
          border-radius: 20px;
          border: 1px solid rgba(255,107,53,0.3);
        }
        .logout-btn {
          padding: 10px 20px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: none;
          color: var(--muted);
          font-size: 14px;
          font-weight: 500;
          transition: all var(--transition);
        }
        .logout-btn:hover { border-color: var(--accent); color: var(--text); }
        .profile-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .stat-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          text-align: center;
        }
        .stat-card strong { font-family: var(--font-head); font-size: 32px; font-weight: 800; color: var(--accent); }
        .stat-card span { font-size: 13px; color: var(--muted); }
        .applied-section h2 { font-family: var(--font-head); font-size: 20px; font-weight: 700; margin-bottom: 16px; }
        .applied-list { display: flex; flex-direction: column; gap: 12px; }
        .applied-card {
          display: flex;
          align-items: center;
          gap: 16px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 18px 20px;
          transition: border-color var(--transition);
        }
        .applied-card:hover { border-color: var(--accent); }
        .applied-logo {
          width: 44px;
          height: 44px;
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
        .applied-title { font-weight: 600; font-size: 15px; margin-bottom: 4px; }
        .applied-company { font-size: 13px; color: var(--muted); }
        .applied-meta { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }
        .applied-salary { font-family: var(--font-head); font-weight: 700; font-size: 14px; color: var(--success); }
        .applied-status {
          font-size: 11px;
          font-weight: 600;
          background: rgba(34,197,94,0.15);
          color: var(--success);
          padding: 3px 8px;
          border-radius: 20px;
        }
        .view-btn {
          padding: 8px 16px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: none;
          color: var(--accent);
          font-size: 13px;
          font-weight: 600;
          transition: all var(--transition);
        }
        .view-btn:hover { background: var(--accent); color: white; border-color: var(--accent); }
        @media (max-width: 600px) {
          .profile-header { flex-wrap: wrap; }
          .profile-stats { grid-template-columns: 1fr 1fr; }
          .applied-meta { display: none; }
        }
      `}</style>
    </div>
  );
}
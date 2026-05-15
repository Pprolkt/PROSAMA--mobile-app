import { Page } from "../../App";

interface NavbarProps {
  current: Page;
  navigate: (p: Page) => void;
}

export default function Navbar({ current, navigate }: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <button className="logo" onClick={() => navigate("feed")}>
          PROSAMA
        </button>
        <div className="nav-links">
          <button
            className={`nav-link ${current === "feed" ? "active" : ""}`}
            onClick={() => navigate("feed")}
          >
            Jobs
          </button>
          <button
            className={`nav-link ${current === "messages" ? "active" : ""}`}
            onClick={() => navigate("messages")}
          >
            Messages
          </button>
          <button
            className={`nav-link ${current === "profile" ? "active" : ""}`}
            onClick={() => navigate("profile")}
          >
            Profile
          </button>
        </div>
        <button className="post-btn" onClick={() => navigate("post-job")}>
          + Post Job
        </button>
      </div>
      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          height: 68px;
          background: rgba(10, 10, 15, 0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
        }
        .navbar-inner {
          max-width: 1100px;
          margin: 0 auto;
          height: 100%;
          padding: 0 20px;
          display: flex;
          align-items: center;
          gap: 32px;
        }
        .logo {
          font-family: var(--font-head);
          font-weight: 800;
          font-size: 20px;
          color: var(--text);
          background: none;
          border: none;
          letter-spacing: -0.5px;
          padding: 0;
          flex-shrink: 0;
        }
        .logo:hover { color: var(--accent); }
        .nav-links { display: flex; gap: 4px; flex: 1; }
        .nav-link {
          background: none;
          border: none;
          color: var(--muted);
          font-size: 14px;
          font-weight: 500;
          padding: 8px 14px;
          border-radius: 8px;
          transition: all var(--transition);
        }
        .nav-link:hover { color: var(--text); background: var(--surface2); }
        .nav-link.active { color: var(--text); background: var(--surface2); }
        .post-btn {
          padding: 9px 20px;
          background: var(--accent);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          transition: background var(--transition);
          flex-shrink: 0;
        }
        .post-btn:hover { background: #e55a28; }
        @media (max-width: 600px) { .nav-links { display: none; } }
      `}</style>
    </nav>
  );
}
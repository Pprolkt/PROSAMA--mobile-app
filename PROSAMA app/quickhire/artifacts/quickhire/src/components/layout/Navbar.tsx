import { Page } from "../../App";

interface NavbarProps {
  current: Page;
  navigate: (p: Page) => void;
}

export default function Navbar({ current, navigate }: NavbarProps) {
  const links: { label: string; page: Page; icon: string }[] = [
    { label: "Feed", page: "feed", icon: "🏠" },
    { label: "Post Job", page: "post-job", icon: "+" },
    { label: "Messages", page: "messages", icon: "✉" },
    { label: "Profile", page: "profile", icon: "●" },
  ];

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <button className="logo" onClick={() => navigate("feed")}>
          <span className="logo-mark">P</span>
          <span className="logo-text">PROSAMA</span>
          <span className="logo-badge">SYD</span>
        </button>
        <div className="nav-links">
          {links.map((l) => (
            <button
              key={l.page}
              className={`nav-link ${current === l.page ? "active" : ""}`}
              onClick={() => navigate(l.page)}
            >
              <span className="nav-icon">{l.icon}</span>
              <span className="nav-label">{l.label}</span>
            </button>
          ))}
        </div>
      </div>
      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          background: rgba(10,10,15,0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
          height: 68px;
        }
        .nav-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 20px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          background: none;
          border: none;
          color: var(--text);
          cursor: pointer;
        }
        .logo-mark {
          width: 34px;
          height: 34px;
          background: var(--accent);
          color: white;
          font-family: var(--font-head);
          font-weight: 800;
          font-size: 18px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .logo-text {
          font-family: var(--font-head);
          font-weight: 800;
          font-size: 18px;
          letter-spacing: 0.05em;
        }
        .logo-badge {
          font-size: 10px;
          font-weight: 600;
          background: var(--surface2);
          border: 1px solid var(--border);
          color: var(--muted);
          padding: 2px 7px;
          border-radius: 20px;
          letter-spacing: 0.1em;
        }
        .nav-links {
          display: flex;
          gap: 4px;
        }
        .nav-link {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 8px 16px;
          border-radius: 8px;
          border: none;
          background: none;
          color: var(--muted);
          font-size: 14px;
          font-weight: 500;
          transition: all var(--transition);
        }
        .nav-link:hover {
          background: var(--surface2);
          color: var(--text);
        }
        .nav-link.active {
          background: var(--surface2);
          color: var(--accent);
          border: 1px solid var(--border);
        }
        .nav-icon { font-size: 16px; }
        @media (max-width: 600px) {
          .nav-label { display: none; }
          .nav-link { padding: 8px 12px; }
          .logo-text { display: none; }
        }
      `}</style>
    </nav>
  );
}
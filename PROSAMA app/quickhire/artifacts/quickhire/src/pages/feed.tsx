import { useState } from "react";
import { Page, Job, SAMPLE_JOBS } from "../App";
import MapView from "./MapView";

interface FeedProps {
  navigate: (p: Page, job?: Job) => void;
}

const FILTERS = ["All", "Full-time", "Hybrid", "Remote", "Contract"];

export default function Feed({ navigate }: FeedProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showMap, setShowMap] = useState(false);

  const filtered = SAMPLE_JOBS.filter((j) => {
    const matchSearch =
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase()) ||
      j.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchFilter =
      filter === "All" ||
      j.type === filter ||
      (filter === "Remote" && j.location.toLowerCase().includes("remote"));
    return matchSearch && matchFilter;
  });

  return (
    <div className="feed">
      <div className="feed-header">
        <div className="hero-text">
          <h1>
            Find your next <span className="accent-word">opportunity</span>
          </h1>
          <p className="subtitle">Sydney's top tech & creative jobs — curated daily</p>
        </div>

        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search roles, companies, skills…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filters">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-chip ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="stats-bar">
        <span className="stat">
          <strong>{filtered.length}</strong> roles found
        </span>
        <span className="stat">📍 Sydney & Remote</span>
        <span className="stat urgent-stat">
          🔥 {SAMPLE_JOBS.filter((j) => j.urgent).length} urgent hires
        </span>
      </div>

      <button 
        onClick={() => setShowMap(!showMap)}
        style={{
          marginBottom: "16px",
          padding: "10px 20px",
          background: "var(--accent)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "14px"
        }}
      >
        {showMap ? "📋 Show List" : "🗺️ Show Map"}
      </button>

      {showMap ? (
        <MapView jobs={filtered} />
      ) : (
        <div className="job-list">
          {filtered.map((job, i) => (
            <button
              key={job.id}
              className="job-card"
              style={{ animationDelay: `${i * 60}ms` }}
              onClick={() => navigate("job-detail", job)}
            >
              <div className="job-card-left">
                <div className="company-logo">{job.logo}</div>
                <div className="job-info">
                  <div className="job-top">
                    <h3 className="job-title">{job.title}</h3>
                    {job.urgent && <span className="urgent-badge">Urgent</span>}
                  </div>
                  <p className="job-company">{job.company}</p>
                  <div className="job-meta">
                    <span>📍 {job.location}</span>
                    <span>🕐 {job.type}</span>
                  </div>
                  <div className="job-tags">
                    {job.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="job-card-right">
                <p className="job-salary">{job.salary}</p>
                <p className="job-posted">{job.posted}</p>
                <span className="apply-hint">View →</span>
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="empty-state">
              <p>No roles match your search.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setFilter("All");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      )}

      <style>{`
        .feed {
          padding: 36px 0;
        }
        .feed-header {
          margin-bottom: 28px;
        }
        .hero-text {
          margin-bottom: 24px;
        }
        .hero-text h1 {
          font-family: var(--font-head);
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 8px;
        }
        .accent-word {
          color: var(--accent);
        }
        .subtitle {
          color: var(--muted);
          font-size: 16px;
        }
        .search-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 14px 18px;
          margin-bottom: 16px;
          transition: border-color var(--transition);
        }
        .search-bar:focus-within {
          border-color: var(--accent);
        }
        .search-icon {
          font-size: 18px;
        }
        .search-bar input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          color: var(--text);
          font-size: 15px;
        }
        .search-bar input::placeholder {
          color: var(--muted);
        }
        .filters {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .filter-chip {
          padding: 7px 16px;
          border-radius: 20px;
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--muted);
          font-size: 13px;
          font-weight: 500;
          transition: all var(--transition);
        }
        .filter-chip:hover {
          border-color: var(--accent);
          color: var(--text);
        }
        .filter-chip.active {
          background: var(--accent);
          border-color: var(--accent);
          color: white;
        }
        .stats-bar {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
          font-size: 13px;
          color: var(--muted);
        }
        .urgent-stat {
          color: #f97316;
        }
        .job-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .job-card {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 20px 24px;
          text-align: left;
          color: var(--text);
          transition: all var(--transition);
          animation: slideUp 0.4s both;
          width: 100%;
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .job-card:hover {
          border-color: var(--accent);
          background: var(--surface2);
          transform: translateY(-1px);
        }
        .job-card-left {
          display: flex;
          gap: 16px;
          flex: 1;
        }
        .company-logo {
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
          font-size: 14px;
          color: var(--accent);
          flex-shrink: 0;
        }
        .job-info {
          flex: 1;
        }
        .job-top {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 4px;
        }
        .job-title {
          font-family: var(--font-head);
          font-size: 16px;
          font-weight: 700;
        }
        .urgent-badge {
          font-size: 11px;
          font-weight: 600;
          background: rgba(249, 115, 22, 0.15);
          color: #f97316;
          border: 1px solid rgba(249, 115, 22, 0.3);
          padding: 2px 8px;
          border-radius: 20px;
        }
        .job-company {
          color: var(--muted);
          font-size: 14px;
          margin-bottom: 8px;
        }
        .job-meta {
          display: flex;
          gap: 14px;
          font-size: 13px;
          color: var(--muted);
          margin-bottom: 10px;
        }
        .job-tags {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .tag {
          font-size: 12px;
          padding: 3px 10px;
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: 20px;
          color: var(--muted);
        }
        .job-card-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
          min-width: 130px;
        }
        .job-salary {
          font-family: var(--font-head);
          font-weight: 700;
          font-size: 15px;
          color: var(--success);
        }
        .job-posted {
          font-size: 12px;
          color: var(--muted);
        }
        .apply-hint {
          font-size: 13px;
          color: var(--accent);
          font-weight: 600;
          opacity: 0;
          transition: opacity var(--transition);
        }
        .job-card:hover .apply-hint {
          opacity: 1;
        }
        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: var(--muted);
        }
        .empty-state button {
          margin-top: 16px;
          padding: 10px 20px;
          background: var(--accent);
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: 600;
        }
        @media (max-width: 600px) {
          .job-card {
            flex-direction: column;
            gap: 14px;
          }
          .job-card-right {
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}

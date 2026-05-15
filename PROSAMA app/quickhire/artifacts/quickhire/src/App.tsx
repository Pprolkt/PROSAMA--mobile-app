import "leaflet/dist/leaflet.css";
import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import Feed from "./pages/feed";
import JobDetail from "./pages/job-detail";
import PostJob from "./pages/post-job";
import Messages from "./pages/messages";
import Profile from "./pages/profile";

export type Page = "feed" | "job-detail" | "post-job" | "messages" | "profile";

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  tags: string[];
  posted: string;
  urgent?: boolean;
  logo: string;
}

export const SAMPLE_JOBS: Job[] = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "Atlassian",
    location: "Sydney CBD",
    type: "Full-time",
    salary: "$130k–$160k",
    tags: ["React", "TypeScript", "Node.js"],
    posted: "2d ago",
    urgent: true,
    logo: "AT",
  },
  {
    id: 2,
    title: "UX Designer",
    company: "Canva",
    location: "Surry Hills",
    type: "Full-time",
    salary: "$110k–$135k",
    tags: ["Figma", "User Research", "Prototyping"],
    posted: "1d ago",
    logo: "CA",
  },
  {
    id: 3,
    title: "Data Engineer",
    company: "Afterpay",
    location: "Melbourne / Remote",
    type: "Hybrid",
    salary: "$120k–$145k",
    tags: ["Python", "Spark", "dbt", "SQL"],
    posted: "3d ago",
    urgent: true,
    logo: "AP",
  },
  {
    id: 4,
    title: "Product Manager",
    company: "Xero",
    location: "Sydney",
    type: "Full-time",
    salary: "$140k–$170k",
    tags: ["Roadmapping", "Agile", "B2B SaaS"],
    posted: "5d ago",
    logo: "XE",
  },
  {
    id: 5,
    title: "Backend Engineer",
    company: "SafetyCulture",
    location: "Surry Hills",
    type: "Hybrid",
    salary: "$115k–$140k",
    tags: ["Go", "Kubernetes", "PostgreSQL"],
    posted: "1d ago",
    logo: "SC",
  },
];

export default function App() {
  const [page, setPage] = useState<Page>("feed");
  const [selectedJob, setSelectedJob] = useState<Job>(SAMPLE_JOBS[0]);

  const navigate = (p: Page, job?: Job) => {
    if (job) setSelectedJob(job);
    setPage(p);
  };

  return (
    <div className="app">
      <Navbar current={page} navigate={navigate} />
      <main className="main-content">
        {page === "feed" && <Feed navigate={navigate} />}
        {page === "job-detail" && <JobDetail job={selectedJob} navigate={navigate} />}
        {page === "post-job" && <PostJob navigate={navigate} />}
        {page === "messages" && <Messages navigate={navigate} />}
        {page === "profile" && <Profile navigate={navigate} />}
      </main>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg: #0a0a0f;
          --surface: #13131a;
          --surface2: #1c1c27;
          --border: #2a2a38;
          --accent: #ff6b35;
          --accent2: #7c3aed;
          --text: #f0f0f8;
          --muted: #888899;
          --success: #22c55e;
          --font-head: 'Syne', sans-serif;
          --font-body: 'DM Sans', sans-serif;
          --radius: 12px;
          --transition: 0.2s cubic-bezier(0.4,0,0.2,1);
        }
        body { background: var(--bg); color: var(--text); font-family: var(--font-body); }
        .app { min-height: 100vh; display: flex; flex-direction: column; }
        .main-content {
          flex: 1;
          padding-top: 68px;
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
          padding-left: 20px;
          padding-right: 20px;
        }
        button { cursor: pointer; font-family: var(--font-body); }
        input, textarea, select { font-family: var(--font-body); }
      `}</style>
    </div>
  );
}
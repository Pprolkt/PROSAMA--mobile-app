PROSAMA — Sydney Gig Board 🦘

Find quick jobs or post a task. Done today.
A mobile-first gig job marketplace connecting Sydney workers with same-day opportunities.


🚀 Live Demo

https://code-importer--pro14437.replit.app/

📱 What is PROSAMA?
PROSAMA is a hyper-local job marketplace built for Sydney. Workers can browse and apply for casual gigs, employers can post tasks and hire on the same day — all for zero commission.
The Problem We Solved

Finding casual gig work in Sydney is slow and fragmented
Most platforms charge high fees to workers
No hyper-local, same-day matching platform existed
No easy messaging between workers and job posters

Our Solution

Browse and post jobs by category instantly
Built-in real-time messaging between workers & employers
Interactive Sydney map showing jobs by suburb
Zero commission — completely free to use


✨ Features
Feature	Description
📋 Job Feed	Browse all live gigs, filter by category (Moving, Hospitality, Errands, Events, Garden, Trades, Pets)
🗺️ Interactive Map	See job pins on an OpenStreetMap, colour-coded by category
📍 Near Me	Use your browser location to sort jobs by distance in km
📝 Post a Job	Authenticated employers can post new gigs with budget, date, and location
✅ Apply	One-tap job applications tracked to your profile
💬 Messaging	Per-job chat between worker and employer
🔐 Email login — enter your email and username
👤 Profile	View applied jobs, email-verified badge, and log out


🛠️ Tech Stack
Backend
TechPurposeNode.js + ExpressREST API serverPostgreSQLPrimary databaseDrizzle ORMType-safe database queriesZodRequest body validationExpress-SessionStateful authenticationResend APIEmail OTP (in development)
Frontend
TechPurposeReact + TypeScriptUI frameworkReact RouterClient-side navigationFetch APIBackend API callsLeaflet.js + OpenStreetMapInteractive job location mapTailwind CSS + Custom CSSStyling
DevOps
TechPurposeGitHubVersion control & collaborationpnpm MonorepoPackage managementGitHub ActionsCI/CD pipeline — automated testing on every push

📁 Project Structure
PROSAMA--mobile-app/
│
├── artifacts/
│   ├── api-server/src/          # Backend (Pprolkt)
│   │   ├── routes/
│   │   │   ├── auth.ts          # Login, logout, session
│   │   │   ├── jobs.ts          # Job CRUD + filter + stats
│   │   │   ├── messages.ts      # Per-job messaging
│   │   │   └── applications.ts  # Job applications
│   │   ├── lib/
│   │   │   ├── db/src/schema/
│   │   │   │   └── jobs.ts      # Drizzle DB schema
│   │   │   └── suburbs.ts       # Sydney suburb coordinates
│   │   └── app.ts               # Express server entry point
│   │
│   └── quickhire/src/           # Frontend (SaruulBattsengel)
│       ├── pages/
│       │   ├── feed.tsx         # Job feed + category filter
│       │   ├── job-detail.tsx   # Single job + apply + messages
│       │   ├── post-job.tsx     # Post a new job form
│       │   ├── messages.tsx     # Inbox — applied jobs threads
│       │   └── profiles.tsx     # Login/logout + applied jobs
│       ├── components/
│       │   └── layout/
│       │       └── Navbar.tsx   # Dark sticky navbar
│       └── App.tsx              # Root router + page layout
│
├── PROSAMA/                     # Flask prototype (Python)
│   ├── templates/
│   ├── app.py
│   └── requirements.txt
│
└── requirement.txt

🔌 API Endpoints
MethodEndpointDescriptionAuth RequiredGET/api/auth/sessionCheck current login statusNoPOST/api/auth/loginLogin with name + emailNoPOST/api/auth/logoutDestroy sessionYesGET/api/jobsGet all jobs (filter by ?category=)NoGET/api/jobs/statsTotal jobs, avg budget, category countsNoGET/api/jobs/:idGet single job by IDNoPOST/api/jobsCreate a new job postYesPOST/api/applyApply for a jobYesGET/api/messages/:jobIdGet messages for a jobYesPOST/api/messages/:jobIdSend a message for a jobYes

🗄️ Database Schema
jobs Table
ColumnTypeDescriptionidserialPrimary key — auto incrementtitletextJob titleemployertextPoster name (from session)budgettexte.g. $120locationtextSydney suburbcategorytextMoving, Garden, Events…descriptiontextFull job detailsratingrealEmployer rating (default 5.0)postedtextTime ago stringcreatedAttimestampAuto timestamp
Session Storage
KeyTypeloggedInbooleanuserNamestringuserEmailstringapplied[]number[]

🗺️ Map Feature
Jobs are plotted on an interactive OpenStreetMap using Leaflet.js.

80+ Sydney suburbs pre-mapped with precise coordinates
Job location (suburb name) is converted to lat/lng using suburbs.ts
Haversine distance formula used to calculate distances between suburbs
Category filter applies to both list view and map pins simultaneously
Uses OpenStreetMap tiles — no API key required, completely free


⚙️ CI/CD Pipeline
Every push or pull request to main triggers GitHub Actions:
Push / PR → pnpm install → TypeScript build check → Run tests → Pass/Fail on PR

✅ All PRs require passing CI before merge
✅ Branch protection on main
✅ Automated test suite covers auth, jobs, apply, and messages routes


🚀 Getting Started
Prerequisites

Node.js 
pnpm
PostgreSQL database

Installation
bash# Clone the repo
git clone https://github.com/Pprolkt/PROSAMA--mobile-app.git
cd PROSAMA--mobile-app

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database URL and session secret

# Run database migrations
pnpm db:push

# Start the development server
pnpm dev
Environment Variables
envDATABASE_URL=postgresql://user:password@localhost:5432/prosama
SESSION_SECRET=your-secret-key-here
RESEND_API_KEY=your-resend-key-here   # Optional — for OTP email (coming soon)

👥 Team — Olivia Group
NameRoleResponsibilitiesPprolktBackend Dev + Scrum LeaderAPI routes, DB schema, session auth, GitHub repo & merges, street map dataSaruulBattsengelFrontend DeveloperReact pages, API integration, React Router, map componentMember 3UI/Theme DesignerDark theme CSS, SVG category icons, design system, component styling

🗺️ Branching Strategy
main                  ← Production — protected, CI required
├── backend/api-routes   ← Natcha Jarusuraisin 
├── frontend/pages       ← Saruul Battsengel  
└── design/theme         ← Manlai Narankhuu 


Workflow:

Each member works on their own branch
Push changes to own branch
Open Pull Request for review
Reviews and Merges into main


🗒️ Future Features
🔴 Email OTP Authentication 🔴 User registration with password & profile photo 🔴 Payment integration for secure deposits

📚 Assessment Context

ITNET205A Network Automation — Assessment 3: Group Project 

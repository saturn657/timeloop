# TIMELOOP — Give an hour. Start a loop.

> A human-centered time economy prototype for the Global Innovation Hackathon 2026.

## What is TIMELOOP?

TIMELOOP treats **time as a social currency**.

- **1 hour = 1 Time Credit**
- Help someone → earn time
- Receive help → use time
- Pass a credit onward → keep value circulating
- **TimeBridge** lets a person temporarily go to −1h and repay later
- Trust is built from completed exchanges, punctuality, feedback and contribution history
- Local-first discovery helps people find useful help nearby

This prototype follows the product concept from the team's hackathon deck: a traceable credit ledger, matching, trust and a local-first loop.

## Team

**MURPHY.EXE**
- Mohd Shuaib Mohammad Hamza Masood
- Mohd Rayyan
- Mohit Suri

## Tech

- React + Vite
- Lucide React for interface icons
- CSS (custom, no template UI framework)
- Browser localStorage for the demo wallet
- Designed so a real API/database can be added later

## Run locally

### 1. Install Node.js
Use Node.js 18+ (Node 20+ recommended).

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

Open the local URL shown by Vite, usually:

`http://localhost:5173`

### 4. Production build

```bash
npm run build
```

The production files will be generated in `dist/`.

## What is functional in this MVP?

- Responsive dashboard
- Nearby request search
- Add a new time request
- Start a loop from a request
- Time wallet calculations
- Local ledger-style activity
- TimeBridge demo interaction
- Trust profile
- Data persistence in browser localStorage
- No fake AI/chatbot layer and no generated "AI assistant" gimmick

## Important demo note

This is intentionally a **credible MVP**, not a fake fully-connected marketplace.

The demo keeps the wallet/request state in the browser so the experience can be shown quickly during judging. For production, the next engineering layer would be:

1. Node.js + Express API
2. PostgreSQL/MongoDB ledger
3. Authentication
4. Location services / OpenStreetMap
5. Real exchange matching
6. Server-side trust calculations
7. Notifications and verification

The core data model should preserve a traceable chain:

`source → exchange → destination`

## Deploy to Vercel

### Fastest method — Vercel dashboard

1. Push this folder to GitHub.
2. Open Vercel and choose **Add New → Project**.
3. Import the TIMELOOP GitHub repository.
4. Vercel should detect **Vite** automatically.
5. Use:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Click **Deploy**.
7. Wait for the build to finish.
8. Copy the generated `.vercel.app` URL and put it in your hackathon submission.

### Vercel CLI option

Install/login:

```bash
npm i -g vercel
vercel login
```

Inside this project:

```bash
npm install
vercel
```

For production:

```bash
vercel --prod
```

## Suggested GitHub structure

```text
timeloop/
├── src/
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Demo flow for judges

1. Start on **Overview** and explain the 1h = 1 credit rule.
2. Open **Nearby help** and show that requests are matched by skill + distance + trust.
3. Click **Start loop** to demonstrate a credit moving through the system.
4. Open **Time wallet** to show traceable hours.
5. Show **TimeBridge**: urgent help can happen before the user has earned a credit.
6. Open **Trust profile** and explain why reputation is based on action, not followers.
7. End with: **"Give an hour. Start a loop."**

## Why the interface is deliberately not "AI-looking"

TIMELOOP is a social/economic product, not an AI chatbot. The interface uses a restrained editorial style, custom CSS, real interaction states and explicit product mechanics. There is no fake AI assistant, glowing chatbot, or meaningless generated dashboard copy.

## Roadmap

### V1 — Hackathon MVP
Done: product interface + interaction prototype.

### V2 — Real network
Auth, database ledger, real requests, location matching and exchange state.

### V3 — Trust layer
Verified completion, punctuality, feedback and contribution history.

### V4 — Network
Campus → city → multi-community exchanges and APIs.

---

**TIMELOOP**  
**1H → ∞**

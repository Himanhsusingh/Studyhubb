# Himanshu Singh — Portfolio & StudyHub Student Platform

> A futuristic, high-performance personal portfolio and student learning platform engineered for **Himanshu Singh**, hosted on **GitHub Pages** ([himanhsusingh.github.io](https://himanhsusingh.github.io)).

---

## 🌟 Overview & Key Features

1. **Futuristic Technology Design**:
   - Dark navy & deep slate background (`#030712`) with neon cyan (`#22d3ee`), electric blue, and gold accents.
   - Glassmorphism panels, glowing borders, and smooth micro-interactions.
   - Strict adherence to the Universal Frontend Design Constitution (anti-AI slop, zero pill enclosures, clean typographic metadata).

2. **Homepage**:
   - Hero banner with animated typewriter role cycling (*Student, Web Developer, AI Enthusiast, Creative Learner*).
   - Centered circular portrait frame with glowing gold and cyan animated rings.
   - Real, editable quantitative metric cards (projects, core stack, study hours, verified credentials).
   - Featured projects showcase with live preview and GitHub links.
   - StudyHub preview card and technical skills breakdown.

3. **About Me**:
   - Full uncropped portrait photograph.
   - Professional bio, academic background (B.Tech in Computer Science & Engineering), timeline of milestones, and core engineering strengths.
   - Interactive Curriculum Vitae / Résumé modal with markdown download action.

4. **Skills & Certificates**:
   - Grouped skill categories (Core Web, Software Engineering, AI & Emerging Tech) with proficiency meters.
   - Verified credentials gallery with search, category filtering, lightbox inspection, and an **Add Certificate** modal.

5. **Projects Gallery**:
   - Project directory including Himanshu's live portfolio (`https://himanhsusingh.github.io`), StudyHub platform, and AI Study Assistant.
   - Search filter, category tabs, and modal detail inspection.

6. **StudyHub Student Learning Platform**:
   - Secure student login & registration flow with persistent student profile (Name, Student ID e.g. `HS-2026-042`).
   - Subject-wise study guides (Computer Science, Web Development, Databases, Algorithms).
   - PDF preview modal and downloadable study notes.
   - Student bookmarks locker and custom Markdown notepad with local persistence.
   - Official platform announcements bulletin.

7. **Protected Administrator Console**:
   - Accessible via the Shield icon in the top navigation or footer.
   - Authenticated access gate (default passphrase: `himanshu2026`).
   - Add, edit, and delete study materials.
   - Broadcast announcements to all students.
   - Manage student accounts (active / suspended status toggles).
   - Review incoming contact form messages.

8. **AI Lab & Code Copilot**:
   - Conversational assistant powered by **Google Gemini 3.8 Flash** via a server-side endpoint (`/api/gemini/chat`).
   - Code snippet syntax highlighting, markdown rendering, copy-to-clipboard button, and quick-prompt suggestions.
   - Fully protected against client-side API key leakage.

9. **Goals & Learning Roadmap**:
   - Short-term & long-term goals with completion tracking.
   - Interactive task checklist with instant percentage progress recalculation.
   - Add new custom learning milestones.

10. **Contact & Inquiries**:
    - Form with validation (Name, valid Email, Subject, Message).
    - Submissions saved to the Admin Inbox and server.
    - Instructions for connecting external email forwarders (Formspree / EmailJS).

---

## 🚀 Quick Start & Local Development

### Prerequisites
- Node.js 18+ installed on your computer.

### Installation
```bash
# Clone the repository
git clone https://github.com/himanhsusingh/himanhsusingh.github.io.git
cd himanhsusingh.github.io

# Install dependencies
npm install

# Start the full-stack dev server (runs Express + Vite on port 3000)
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 🌐 Deploying to GitHub Pages (`himanhsusingh.github.io`)

GitHub Pages hosts static HTML, CSS, and JavaScript. This project is configured to compile into a static production bundle.

### Step 1: Build the Static Bundle
```bash
npm run build
```
This produces the optimized production files inside the `dist/` directory.

### Step 2: Push to GitHub
If your repository is named `himanhsusingh.github.io`:
1. Push the contents of the `dist/` folder to the `main` branch.
2. In your repository on GitHub, go to **Settings** > **Pages**.
3. Under **Build and deployment**:
   - Set **Source** to **Deploy from a branch**.
   - Select branch **main** and folder **/ (root)**.
   - Click **Save**.

Your portfolio will be live at:
👉 **https://himanhsusingh.github.io**

---

## 🔑 Configuring Gemini API for AI Lab

To enable live responses from Google Gemini 3.8 Flash:
1. In Google AI Studio, get your `GEMINI_API_KEY`.
2. Add it to your `.env` file:
   ```env
   GEMINI_API_KEY="your_gemini_api_key_here"
   ```
3. For deployment with Gemini outside of AI Studio, host the lightweight `server.ts` Express backend on Render, Railway, or Google Cloud Run for free and set `GEMINI_API_KEY` in their environment variables.

---

## 🛠️ Customization Guide

- **Profile Picture**: Replace the image path in `src/data/initialData.ts` (`AVATAR_IMAGE`).
- **Personal Details & Education**: Edit `PERSONAL_INFO` in `src/data/initialData.ts`.
- **Projects**: Add or update entries in `INITIAL_PROJECTS` in `src/data/initialData.ts`.
- **Admin Password**: Configured in `src/components/AdminView.tsx` (default: `himanshu2026`).

---

## 📄 License
Created by Himanshu Singh. Available for personal portfolio and educational student use.

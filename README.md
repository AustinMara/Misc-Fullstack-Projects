# Misc Fullstack Projects

A live portfolio of full-stack web applications built with **React**, **TypeScript**, **NodeJS**, and **TailwindCSS** — deployed to GitHub Pages.

🔗 **Live Demo:** [austinmara.github.io/Misc-Fullstack-Projects](https://austinmara.github.io/Misc-Fullstack-Projects)

---

## Projects

### 🎮 Game Time Tracker
Track and manage your gaming sessions in one place. Add games, log play sessions, and view your history at a glance.

- Built with ReactJS + TailwindCSS
- Developed using **Claude Code** (Anthropic's AI coding tool) for accelerated iteration
- Full CRUD session management with persistent state
- **[→ View Live](https://austinmara.github.io/Misc-Fullstack-Projects/#/GameTime)**

---

### 🌤️ Weather App
Real-time weather lookup by city using the OpenWeather API.

- Fetches live weather data via async REST API calls with JSON parsing
- Responsive UI built with TailwindCSS
- **[→ View Live](https://austinmara.github.io/Misc-Fullstack-Projects/#/Weather)**

---

### ✅ Task Manager (To-Do List)
A clean task management app with full CRUD functionality.

- Create, read, update, and delete tasks with persistent state
- React components with `useState` hooks for reactive UI
- **[→ View Live](https://austinmara.github.io/Misc-Fullstack-Projects/#/Todo)**

---

### 🧮 Calculator
A functional calculator app — the starting point for this repo.

- Vanilla TypeScript DOM manipulation
- Introduced core concepts: event handling, input parsing, state
- **[→ View Live](https://austinmara.github.io/Misc-Fullstack-Projects/#/Calculator)**

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, TailwindCSS, Vite |
| Backend | NodeJS (`server.js`) |
| Routing | React Router (hash routing for GitHub Pages) |
| Deployment | GitHub Pages via GitHub Actions |
| AI Tooling | Claude Code (Anthropic) |

---

## Running Locally

```bash
# Clone the repo
git clone https://github.com/AustinMara/Misc-Fullstack-Projects.git
cd Misc-Fullstack-Projects

# Install dependencies
npm install

# Start the frontend (Vite dev server)
npm run dev

# (Optional) Start the NodeJS backend
node server.js
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

---

## Project Structure

```
src/
├── components/       # Shared React components
├── pages/            # One folder per app (Weather, Todo, GameTime, Calculator)
└── App.tsx           # React Router config
server.js             # NodeJS backend
```

---

## Author

**Austin Maranda** — [github.com/AustinMara](https://github.com/AustinMara)

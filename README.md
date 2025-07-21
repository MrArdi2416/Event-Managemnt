# 🎯 Event Management Dashboard

A full-featured Event Management Dashboard built using **React**, **TypeScript**, **Tailwind CSS**, and **React Context API** for state management.

## 🚀 Live Demo

🌐 [View Live on Render](https://event-managemnt.onrender.com)

📂 [GitHub Repository](https://github.com/MrArdi2416/Event-Managemnt)

---

## 🛠️ Tech Stack

- ⚛️ React (with TypeScript)
- 🌬 Tailwind CSS
- 🧠 React Context API (for authentication and event state)
- 📦 LocalStorage (data persistence)
- 🔐 React Router v6 – Public & Protected routes
- 🎯 React Hook Form – Validations
- 📅 Date/time management with native inputs

---

## ✅ Features

### 🧑 Authentication

- Signup/Login with form validation
- Context-based authentication state
- Persistent login using `localStorage`
- Auto-sync logout across browser tabs

### 📋 Event Management

- Add, Edit, Delete events
- Prevent overlapping event time slots
- View events as cards
- Search, filter (by type, category, date range)
- Sort by title or start date

### 🛡️ Routing

- Public Route: `/login`, `/signup`
- Protected Route: `/dashboard`
- Redirect unauthenticated users

---

## 📦 Folder Structure

src/
│
├── components/
│ └── auth/ (ProtectedRoute, PublicRoute)
│ └── events/ (EventForm, EventList, Filters, Modal, etc.)
│
├── contexts/
│ ├── AuthContext.tsx
│ └── EventContext.tsx
│
├── hooks/
│ └── useAuth.ts
│ └── useEvents.ts
│
├── pages/
│ ├── Dashboard.tsx
│ ├── Login.tsx
│ ├── SignUp.tsx
│ ├── LandingPage.tsx
│ └── ContactUs.tsx
│
└── types/
└── user.ts
└── event.ts

## 🧑‍💻 How to Run Locally

```bash
git clone https://github.com/MrArdi2416/Event-Managemnt.git
cd Event-Managemnt
npm install
npm start

📌 Notes
Project follows the assignment spec closely (React Context instead of Redux).

Includes storage sync across tabs for auth state.

Form validation using react-hook-form ensures solid UX

🙌 Acknowledgements
Thanks for the opportunity to showcase my frontend skills. I'm excited about the possibility of contributing to your team
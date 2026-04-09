# 03 — Frontend & UI: The Control Center

The frontend is the operator-facing side of Axion. Its purpose is not just to look good. It is supposed to make dense telemetry easy to understand, navigate, and trust.

The interface is built like a command center because the user is expected to monitor an active fleet, inspect vehicles quickly, and switch between dashboard, architecture, login, signup, and authenticated control views without friction.

---

## UI Design Philosophy
The visual design uses dark surfaces, cyan highlights, and glass-like panels to create a futuristic control-room style.

Why this design works:

- dark backgrounds make telemetry charts and KPIs stand out
- translucent panels create visual separation without heavy borders
- strong accent colors help signal active states, buttons, and important metrics
- the layout feels more like a real monitoring product than a basic academic CRUD app

In a viva, you can say that the UI style was chosen to emphasize readability and operational clarity rather than decorative styling.

---

## Frontend Technology Stack

### React 18 + TypeScript
React is used for component-based UI composition. TypeScript adds type safety and makes it easier to reason about the props, state, and service contracts used throughout the frontend.

Why that matters:

- reusable components keep the code organized
- typed props reduce bugs in dashboards with many sections
- route and state transitions become easier to reason about

### Router-Based Navigation
The current frontend uses browser routes rather than internal state switching. That matters because each major page has a real URL, which makes the application easier to use, test, and explain.

The key routes are:

- `/` for the landing page
- `/architecture` for the system architecture view
- `/login` and `/signup` for authentication screens
- `/dashboard` for the authenticated shell

### Vite
Vite is the build tool and development server. It gives the project fast rebuilds and quick iteration during UI development.

### Tailwind CSS
Tailwind is used to express layouts directly in the component layer. This is useful for the Axion UI because the design depends on precise spacing, borders, gradients, and responsive layout behavior.

### Motion and Icons
Motion adds subtle animation, while Lucide icons help the interface read like a polished product. These choices improve clarity when the UI is dense with information.

---

## Why Short Polling Is Used
The dashboard refreshes on a polling interval instead of using WebSockets.

This was a practical choice because:

- the project is easier to debug in an academic setting
- reconnect logic is simpler
- periodic refresh is enough for a 250-vehicle demo
- the UI still feels live because the underlying cache is fast

Polling is not the only possible solution, but it is a reasonable and stable one for this project stage.

---

## Main UI Areas

### Landing Page
The landing page introduces the platform, explains the architecture, and gives the user a high-level story before login.

It is important because it:

- frames the project as a product rather than just a codebase
- explains what problem the platform solves
- links to the architecture and onboarding flow

### Authentication Pages
Login and signup are intentionally branded and visually consistent with the rest of the app. They also include a way back to the landing page, so users are not trapped in the auth flow.

### Dashboard Shell
After login, the dashboard wraps the functional modules inside a persistent shell with navigation, status, and identity information.

### Vehicle and System Views
These pages are where the data becomes operational. A user can inspect a specific vehicle, see health and thermal details, and understand the system’s current state.

---

## Current Frontend Structure
The frontend is organized around the current route-based app shell.

Key structure points:

- `src/app/App.tsx` owns the top-level router provider
- `src/app/routes.tsx` defines the route map
- `src/components/RootLayout.tsx` wraps authenticated dashboard pages
- `src/components/TopBar.tsx` provides the dashboard header and quick actions
- `src/components/auth/LoginPage.tsx` and `SignupPage.tsx` handle auth flows
- `src/components/LandingPage.tsx` composes the landing sections

This structure is important because it cleanly separates landing, auth, and authenticated dashboard concerns.

---

## What To Say In A Viva
If the examiner asks about the frontend, say:

The frontend is a route-based React dashboard designed as a control center. It uses Tailwind for layout, Motion for animation, and a dark glassmorphism style to make the telemetry and fleet health data easy to read. The app uses polling for real-time updates because it is simpler and more reliable for the current project scale.

# ImpactSphere

Empowering NGOs. Connecting Communities. Driving Impact.

## Stack
- Frontend: React 18, Vite, Tailwind CSS, Zustand, React Hook Form, Zod, Framer Motion, Lucide, Radix Slot
- Backend: Spring Boot 3, Java 17, Maven, Spring Security, JWT, JPA
- Database: PostgreSQL
- Deployment: Docker + Docker Compose

## Highlights
- Global dark/light mode with persisted Zustand state and no-theme-flicker boot script.
- Role-based dashboards:
  - Admin: full analytics + quick actions
  - Corporate: proposal pipeline + funding summary
  - Volunteer: impact overview + activity feed
- Corporate funding module fixed:
  - Corporate identity resolved from JWT email
  - Admin full access, Corporate own submissions, Volunteer read-only list
- Enterprise frontend architecture:
  - Centralized API + interceptors
  - Error boundary + toast notifications
  - Lazy-loaded routes and modular dashboard components

## Run
1. Copy `.env.example` to `.env`
2. Run `docker compose up --build`
3. Frontend: `http://localhost:5173`
4. Backend: `http://localhost:8080`

## Local frontend
- `cd frontend`
- `npm install`
- `npm run dev`
- `npm run build`

## Notes
- Frontend production build is validated.
- Backend compile cannot be executed in this environment because Maven CLI (`mvn`) is unavailable.

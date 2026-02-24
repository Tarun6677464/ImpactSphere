# Volunteer Management System - System Design

## 1. High-Level Architecture Diagram (Text)

```text
[React 18 + Vite + Tailwind SPA]
          |
          | HTTPS/REST + JWT (Authorization: Bearer <token>)
          v
[Spring Boot 3 API Gateway Layer]
  |- Security Filter Chain (JWT + Rate Limiting + CORS)
  |- Controllers
  |- Services (Business Rules)
  |- Repositories (JPA)
          |
          v
[PostgreSQL]

Deployment:
[Docker Compose]
  |- frontend container (nginx serving Vite build)
  |- backend container (Spring Boot jar)
  |- postgres container (persistent volume)
```

## 2. Backend Folder Structure

```text
backend/
  src/main/java/com/vms/
    controller/
      auth/
      admin/
    service/
      impl/
    repository/
    dto/
      auth/
    entity/
    security/
    exception/
    config/
    VolunteerManagementSystemApplication.java
  src/main/resources/
    application.yml
    logback-spring.xml
  pom.xml
  Dockerfile
```

## 3. Frontend Folder Structure

```text
frontend/
  src/
    pages/
    components/
    layouts/
    services/
    hooks/
    context/
    utils/
    styles/
    App.jsx
    main.jsx
  index.html
  package.json
  Dockerfile
```

## 4. Database ER Design

```text
users (id PK, full_name, email UNIQUE, password, role, enabled, created_at)

corporates (id PK, name, contact_email UNIQUE, active)
funding_proposals (id PK, title, description, requested_amount,
                  corporate_id FK->corporates.id, status, review_comment, submitted_at)

animal_programs (id PK, name, description, funding_target, collected_amount,
                active, start_date, end_date, created_at)
donations (id PK, donor_name, amount, donation_type, program_category, date, status,
          animal_program_id FK->animal_programs.id nullable)

scholarships (id PK, name, description, budget, open)
applicants (id PK, full_name, email, phone, statement, status,
           scholarship_id FK->scholarships.id, submitted_at)
```

## 5. API Endpoint Structure

- Health: `GET /api/health`
- Auth:
  - `POST /api/auth/register`
  - `POST /api/auth/login`
- Donations:
  - `POST /api/donations`
  - `GET /api/donations?page=&size=&status=&category=`
- Corporate Funding:
  - `POST /api/corporate`
  - `POST /api/corporate/proposals`
  - `GET /api/corporate/proposals?status=`
  - `PATCH /api/corporate/proposals/{id}/review`
- Animal Welfare:
  - `POST /api/animal-programs`
  - `GET /api/animal-programs`
- Scholarships:
  - `POST /api/scholarships`
  - `GET /api/scholarships`
  - `POST /api/scholarships/applications`
  - `GET /api/scholarships/applications`
  - `PATCH /api/scholarships/applications/{id}/review`
- Admin Analytics:
  - `GET /api/admin/analytics/summary`

## 6. Security Architecture

- JWT-based stateless authentication.
- BCrypt password hashing.
- RBAC roles: `ADMIN`, `VOLUNTEER`, `CORPORATE`.
- `JwtAuthenticationFilter` validates token per request.
- `RateLimitFilter` enforces per-minute request limits.
- CORS configured by env variable `CORS_ALLOWED_ORIGINS`.
- Centralized exception handling for secure, consistent error responses.

## 7. Docker Deployment Architecture

```text
docker-compose
  |- postgres:16-alpine
      |- volume: postgres_data
  |- backend (Spring Boot)
      |- depends_on: postgres
      |- env vars for DB/JWT/CORS
  |- frontend (nginx + built Vite app)
      |- depends_on: backend
      |- serves SPA on :80 mapped to host :5173
```

# LÖSEV İnci Volunteer Tracking System - Developer Guide

This document provides a comprehensive overview of the system architecture, integration details, and development guidelines for the LÖSEV İnci project.

## Project Overview
The LÖSEV İnci Volunteer Tracking System is designed to record, verify, and report the social responsibility activities of middle and high school students. It supports three primary roles: Students, Teachers (Coordinators), and Admin (General Headquarters).

## Technical Architecture
- **Frontend:** Vue 3 (Composition API), Vite, Tailwind CSS, Pinia, Lucide Icons.
- **Backend:** NestJS, TypeORM, SQLite.
- **Deployment:** Single Docker container serving both frontend (static) and backend (API).
- **Design Philosophy:** Mobile-First, PWA (Progressive Web App), simple and intuitive UI.

## Database Schema & Roles

### User Roles
- `STUDENT`: Can log activities, track hours, and view earned badges. Requires approval from Admin and assignment to a Teacher.
- `TEACHER`: Manages a group of assigned students. Approves or requests revisions for student activities.
- `ADMIN`: Manages user registrations (approval/rejection), assigns teachers to students, and views global impact reports.

### Key Entities
- **User:** Stores profile information, role, status, and teacher-student relationships.
- **Activity:** Stores date, type, hours, description, and status (Pending, Approved, Rejected, Revision Requested). Supports image and document uploads.

## API Integration

### Authentication
The system uses JWT-based authentication. Obtain a token via `POST /api/auth/login` and include it in the `Authorization` header: `Bearer <TOKEN>`.

### Core Endpoints
- `POST /api/auth/register`: Register a new student or teacher.
- `GET /api/users/profile`: Get the current user's profile.
- `GET /api/users/pending` (Admin): List users awaiting approval.
- `PATCH /api/users/:id/status` (Admin): Approve/reject users and optionally assign a `teacherId`.
- `POST /api/activities`: Submit a new activity (Multipart/form-data for files).
- `GET /api/activities/pending` (Teacher/Admin): List activities pending approval. Teachers only see their assigned students' activities.
- `GET /api/activities/stats/global`: Global statistics for the Admin dashboard.

## Development Setup

### Local Development
1. **Backend:**
   ```bash
   cd backend
   npm install
   npm run start:dev
   ```
2. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Docker Build
```bash
docker build -t losev-inci .
docker run -p 8080:8080 -v $(pwd)/data:/app/backend/data losev-inci
```

## UI/UX Standards
- **Primary Color:** LÖSEV Red (#E30613)
- **Highlight Color:** LÖSEV Yellow (#FDC010)
- **Language:** UI must be in Turkish. Code and comments must be in English.

## Badge System (Hours Thresholds)
- **25 Hours:** Bronze İnci
- **50 Hours:** Silver İnci
- **100 Hours:** Gold İnci
- **200 Hours:** Platinum İnci Leader

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
- `STUDENT`: Can participate in activities by code, track hours, and view 30h progress. Requires approval from Admin/Teacher and optionally assignment to a Teacher.
- `TEACHER`: Manages a group of assigned students. Approves or rejects student activity participations and registrations.
- `ADMIN`: Manages all user registrations, assigns teachers to students, and has global authority over all approvals and announcements.

### Key Entities
- **User:** Stores profile information, role, status, and teacher-student relationships.
- **Activity:** Stores date, type, hours, description, and attendance code.
- **ActivityParticipant:** Tracks student participation in activities (status: Pending, Approved).
- **Announcement:** One-way notifications for students, created by Admin/Teachers.

## API Integration

### Authentication
The system uses JWT-based authentication. Obtain a token via `POST /api/auth/login` and include it in the `Authorization` header: `Bearer <TOKEN>`.

### Core Endpoints
- `POST /api/auth/register`: Register a new student or teacher.
- `GET /api/users/profile`: Get the current user's profile.
- `GET /api/users/pending` (Admin/Teacher): List users awaiting approval.
- `PATCH /api/users/:id/status` (Admin/Teacher): Approve/reject users and optionally assign a `teacherId`.
- `POST /api/activities/join`: Submit a participation request using an activity code.
- `GET /api/activities/pending-participants` (Teacher/Admin): List participations pending approval. Teachers only see their assigned students' participations.

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
docker run -p 8080:8080 -v $(pwd)/data:/app/data losev-inci
```

## UI/UX Standards
- **Primary Color:** LÖSEV Blue (#1E3A8A) - Light Theme
- **Highlight Color:** LÖSEV Yellow (#FDC010)
- **Language:** UI must be in Turkish. Code and comments must be in English.

## 30-Hour Goal
The system focuses strictly on the 30-hour volunteer milestone for the "İnci Certificate". All higher-tier rankings and badges have been removed to prioritize individual tracking.

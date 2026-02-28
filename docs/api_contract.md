# API Contract & Data Model

## Core Entities

### User
| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Unique identifier |
| first_name | String | |
| last_name | String | |
| email | String | Unique |
| role | Enum | STUDENT, TEACHER, ADMIN |
| school_id | UUID | |
| city | String | |
| district | String | |
| grade | String | e.g., "9-A" |
| phone | String | GSM |
| coordinator_id | UUID | Reference to Teacher |
| total_hours | Float | Calculated |
| created_at | DateTime | |

### Activity (Etkinlik)
| Field | Type | Description |
|-------|------|-------------|
| id | UUID | |
| student_id | UUID | |
| date | Date | |
| type | Enum | SEMINER, STANT, BAGIS, KERMES, etc. |
| hours | Float | |
| description | Text | |
| image_url | String | |
| doc_url | String | |
| status | Enum | PENDING, APPROVED, REJECTED |
| feedback | Text | Teacher's note for rejection |

## API Endpoints

### Authentication
- `POST /auth/login`: Returns JWT and User Info.
- `POST /auth/register`: Student registration.

### Students
- `GET /student/profile`: Get current student stats and info.
- `GET /student/activities`: List own activities.
- `POST /student/activities`: Submit a new activity.
- `GET /student/badges`: List earned badges.

### Teachers
- `GET /teacher/pending-activities`: List activities awaiting approval for their school.
- `PATCH /teacher/activities/{id}`: Approve/Reject activity.
- `GET /teacher/school-stats`: Summary for their school.

### Admin / General Center
- `GET /admin/stats`: Turkey-wide stats.
- `GET /admin/rankings`: Top schools and students.
- `GET /admin/map-data`: City-based impact data.

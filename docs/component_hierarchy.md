# Component Hierarchy & Navigation Flow

## Navigation Flow (Vue Router)

### Public Routes
- `/login`: Login page (Turkish: Giriş Yap)
- `/register`: Registration page (Turkish: Kayıt Ol)

### Student Routes (`/student`)
- `/dashboard`: Overview of hours and badges.
- `/activity-add`: Form to submit new activities.
- `/activities`: History of activities.
- `/profile`: User profile and settings.

### Teacher Routes (`/teacher`)
- `/dashboard`: Overview of school stats.
- `/approvals`: Pending activities list.
- `/school-stats`: Detailed school performance.

### Admin Routes (`/admin`)
- `/dashboard`: Turkey-wide stats map and charts.
- `/rankings`: Top schools/students tables.

## Component Hierarchy

### Layouts
- `AppLayout.vue`: Main wrapper with navigation.
- `AuthLayout.vue`: Wrapper for login/register.

### Common Components
- `BaseButton.vue`: Reusable button.
- `BaseInput.vue`: Reusable input field.
- `BaseCard.vue`: Generic card for stats or activity items.
- `TheNavbar.vue`: Top/Bottom navigation bar (Mobile-First).

### Student Components
- `StatsSummary.vue`: Total, monthly, yearly hour display.
- `ActivityForm.vue`: Multipart/form-data for activity submission.
- `BadgeList.vue`: Grid of earned badges.

### Teacher Components
- `ApprovalCard.vue`: Detail view with Approve/Reject buttons.
- `SchoolSummary.vue`: Chart/Table of school progress.

### Admin Components
- `ImpactMap.vue`: SVG/Interactive map of Turkey.
- `RankingTable.vue`: Sortable list of schools/students.

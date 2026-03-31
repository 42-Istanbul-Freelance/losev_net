# Project Decisions and Requirements - 2026-03-31

This document records the key architectural and functional decisions for the LÖSEV Volunteer Tracking System.

## 1. Attendance Mechanism: Code + Manual Approval
- Students must enter a "Participation Code" to join an activity.
- After entering the correct code, the participation status becomes `PENDING`.
- A Teacher (assigned to the student) or an Admin must manually approve the participation to count the hours towards the student's balance.

## 2. 30-Hour Goal and Progress Visualization
- The primary goal for students is to complete **30 hours** of volunteer work to earn their "Inci Certificate".
- The UI should prominently display total hours and a progress bar toward the 30-hour target.
- Higher-tier badges (50h, 100h, etc.) are removed to focus strictly on the 30-hour milestone.

## 3. Role Hierarchy and Registration Approvals
- **Admin Accounts:** Can only be authorized by another Admin.
- **Teacher Accounts:** Registration requires approval **ONLY** from an Admin.
- **Student Accounts:** Registration can be approved by an Admin or a Teacher.
- **Teacher Restriction:** Teachers should only be able to approve registrations and participations for students assigned to them.

## 4. Activity Creation
- Admins and authorized Teachers can create activities.
- Activities created by Admins/Teachers are immediately approved and visible to students.

## 5. Removal of Social and Ranking Features
- Photo sharing, comments, forums, and timeline/feed are disallowed.
- Rankings and Global Stats/Leaderboards should be removed to maintain focus on individual progress and one-way announcements.

## 6. Standalone Database and Docker
- The system uses a standalone SQLite database.
- The database should be stored in a Docker volume to be persistent and accessible.
- External dependencies (fonts, CDNs) are acceptable for now but should be minimized if possible in the future.

## 7. Seed Data
- The system automatically seeds the database if empty upon startup.
- Seed data includes: 1 Admin, 1 Teacher, 3 Students (one pending), 2 past activities (approved), and 1 upcoming activity with a code.

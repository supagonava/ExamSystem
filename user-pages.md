# User Pages Structure

## Authentication
1. Login Page (`/login`)
   - Form for user credentials
   - Authentication system integration

## Main Pages
2. Dashboard (`/dashboard`)
   - Overview of scheduled exams
   - Quick access to exam results
   - User profile information

## Exam Related Pages
3. Exam Schedule (`/schedule`)
   - List of upcoming exams
   - Exam date and time details

4. Pre-exam Pages
   - Document Reading Page (`/exam/:id/documents`)
     - PDF viewer for study materials
     - Timer for reading period
   - Exam Rules Page (`/exam/:id/rules`)
     - Examination rules and guidelines

5. Examination Pages
   - Active Exam Page (`/exam/:id`)
     - Question display
     - Answer submission
     - Timer display
     - Auto-save functionality
   - Exam Submission Page (`/exam/:id/submit`)
     - Confirmation dialog
     - Submission status

## Results Pages
6. Results Overview (`/results`)
   - List of all completed exams

7. Detailed Results (`/results/:id`)
   - Score breakdown
   - Mistake review
   - Certificate download option

## Profile
8. User Profile (`/profile`)
   - Personal information
   - Exam history
   - Settings

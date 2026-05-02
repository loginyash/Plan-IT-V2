# Plan-IT Workflow

## Login Flow
1. **User visits Login screen**.
2. Selects "Sign in with Microsoft" (Primary) or "Email".
3. App authenticates and auto-fetches Name, Email, Profile Photo, Department.
4. User is redirected to Dashboard and session token is established.

## Task Flow
1. **Creation**: Any user/manager creates a task with title, description, deadline, priority, difficulty, urgency, and tags.
2. **Assignment**: The task is mapped to a project and assigned members.
3. **Execution**: The user sets the task from "Pending" to "In Progress".
4. **Completion**: User completes the task and it moves to "Pending Verification".

## Approval Flow
1. **Queue**: Mentor/PM/Admin sees the task in their "Verification Queue".
2. **Action**: The reviewer can "Approve" or "Reject".
3. **Approve**: Task is marked complete, and calculated XP + Performance Score bonus is applied to the user.
4. **Reject**: The task is reopened, and the user receives a notification with the rejection reason.

## Project Flow
1. **Creation**: Project Manager creates a new project with members and a deadline.
2. **Milestones**: Tasks and deadlines are assigned directly inside the project.
3. **Execution**: The project's progress bar automatically updates as tasks are completed.
4. **Completion**: When all tasks are approved, the project is marked "Completed".

## Resource Upload Flow
1. **Navigate**: User opens a specific Project or the global Resources tab.
2. **Upload**: User selects "Upload Resource" and adds a title, description, milestone, and version number.
3. **Attach**: User attaches files (Figma link, PDF, Excel).
4. **Publish**: The resource is now available to all project members for easy access.

## Monthly HR Report Flow
1. **Navigate**: HR/Admin navigates to the "Reports" module.
2. **Filter**: Selects the desired report type ("Monthly Task Sheet", "By Employee", "By Project").
3. **Export**: Clicks "Export Excel" or "Export CSV".
4. **Result**: A neatly formatted spreadsheet is downloaded with all necessary analytics.

## Feedback Flow
1. **Navigate**: Employee opens "Anonymous Feedback".
2. **Write**: Types out concerns, suggestions, or appreciation.
3. **Submit**: Form is submitted anonymously.
4. **Review**: HR/Admin reads the feedback on their dashboard without any tracing (no name, email, or department).
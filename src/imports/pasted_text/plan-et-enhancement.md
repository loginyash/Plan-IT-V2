Enhance the existing system with advanced task and project management capabilities while preserving the current architecture, UI theme, environment variables, database structure compatibility, routing flow, navigation logic, naming conventions, and all existing workflows.
 
Rename the platform to:
 
PLAN-ET
 
Tagline:
Smart Work. Better Teams. Smarter Growth.
 
==================================================
CORE PROTECTION RULES (DO NOT BREAK ANYTHING)
==================================================
 
- Do NOT change current workflow
- Do NOT modify current environment variables
- Do NOT alter existing design system
- Do NOT rename routes, modules, keys, components unless required
- Do NOT break current logic
- Keep all existing pages and navigation intact
- All new features must be additive only
- Maintain responsiveness and performance
- Prevent regressions, duplicate logic, stale states, crashes
 
==================================================
0. AUTHENTICATION + LOGIN FLOW
==================================================
 
Add secure login system for PLAN-ET.
 
Login Methods:
 
- Microsoft Sign In (Primary)
- Email + Password (Optional fallback)
 
Microsoft Login Requirements:
 
- Microsoft OAuth / Microsoft 365 authentication
- Support company email accounts
- Auto-fetch:
  - Name
  - Email
  - Profile Photo
  - Department
  - Role (if mapped)
 
User Roles:
 
- Employee
- Mentor
- Team Lead
- Project Manager
- Admin
 
Login Screens:
 
1. Welcome Screen
- PLAN-ET logo
- Tagline
- Sign in with Microsoft
- Continue with Email
 
2. First Time Setup
- Select Department
- Select Role
- Upload avatar
- Team preferences
 
3. Secure Session Flow
- Remember me
- Logout
- Session timeout
- Refresh token handling
 
Access Rules:
 
- Only logged-in users can access app
- Role-based access control
- Redirect to login if expired
 
==================================================
1. TASK VERIFICATION WORKFLOW
==================================================
 
Task States:
 
- Pending
- In Progress
- Completed (Awaiting Verification)
- Approved
- Rejected
 
Rules:
 
- User marks complete → Pending Verification
- Only Mentor / Team Lead / PM / Admin approve
- Approved:
  - mark verified
  - award points
- Rejected:
  - reopen task
  - rejection reason required
 
UI:
 
- Status pills
- Verification queue
- Approve / Reject actions
 
==================================================
2. SMART PERFORMANCE + POINT TRACKING SYSTEM
==================================================
 
Upgrade point tracking using intelligent employee performance analysis.
 
Keep existing XP system intact.
 
--------------------------------------------------
A. BASE TASK XP INPUTS
--------------------------------------------------
 
Difficulty:
 
- Easy
- Medium
- Hard
 
Urgency:
 
- Low
- Medium
- High
- Critical
 
Examples:
 
- Easy + Low = 20 XP
- Medium + Medium = 50 XP
- Hard + High = 80 XP
- Hard + Critical = 120 XP
 
--------------------------------------------------
B. PERFORMANCE ENGINE
--------------------------------------------------
 
Analyze:
 
- Task completion speed
- Deadline consistency
- Approval rate
- Reopened tasks
- Overdue percentage
- Complexity handled
- Team collaboration
- Helpfulness/comments
- Streak consistency
- Daily productivity trend
- Multi-project efficiency
- Time estimation accuracy
 
--------------------------------------------------
C. PERFORMANCE SCORE
--------------------------------------------------
 
Generate score:
0–100
 
Bands:
 
- 90–100 = Elite Performer
- 75–89 = Strong Performer
- 60–74 = Consistent Performer
- 40–59 = Needs Attention
- Below 40 = At Risk
 
--------------------------------------------------
D. XP MODIFIER
--------------------------------------------------
 
- 90+ = +10% XP bonus
- 75+ = +5%
- 60+ = Normal
- Below 40 = no bonus
 
Rules:
 
- No negative XP
- Bonus only after approval
- Transparent logic
 
--------------------------------------------------
E. LEADERBOARD
--------------------------------------------------
 
Show:
 
- Total XP
- Performance Score
- Approval Rate
- Completion Rate
- Weekly Growth
- Current Rank
 
Modes:
 
- Overall
- Weekly
- Monthly
- Team Wise
- Performance Wise
 
--------------------------------------------------
F. INSIGHTS PANEL
--------------------------------------------------
 
Show:
 
- Strengths
- Delay risk
- Productivity trend
- Best task category
- Suggestions
 
==================================================
3. PROJECT COLLABORATION SYSTEM
==================================================
 
Project Features:
 
- Add / remove members
- Avatar stack
 
Roles:
 
- Owner
- Manager
- Contributor
- Viewer
 
Task Features:
 
- Description
- Notes
- Comments
- Mentions @user
- Project members only access
 
==================================================
4. PROJECT DOCUMENTATION + RESOURCES TAB
==================================================
 
Add a new tab inside every Project:
 
RESOURCES
 
Purpose:
Store milestone-based documentation and deliverables visible to all project members.
 
Examples:
 
- Backend completed → Upload backend documentation files
- UI Design completed → Upload Figma / design files
- API phase completed → Upload API docs
- Testing completed → Upload QA reports
- Deployment completed → Upload deployment guide
 
Who Can Upload:
 
- Team Lead
- Project Lead
- Project Manager
- Admin
 
Features:
 
- Upload files
- Add title
- Add description
- Select milestone/checkpoint
- Add version number
- Upload date auto-captured
- Uploaded by user name
- File preview where supported
- Download option
 
Supported Files:
 
- PDF
- DOCX
- XLSX
- PPTX
- ZIP
- PNG
- JPG
- SVG
- FIG links
- External links
 
Sections Inside Resources Tab:
 
- Design Assets
- Backend Docs
- Frontend Docs
- API Docs
- Reports
- Deployment Files
- Other Resources
 
Timeline View:
 
Show resources in milestone order.
 
Visibility:
 
- All project members can view
- Only authorized roles can upload/edit/delete
 
Search & Filter:
 
- By type
- By milestone
- By uploader
- By latest
 
==================================================
5. DASHBOARD ENHANCEMENTS
==================================================
 
Cards:
 
- Current Ongoing Task
- Tasks Completed Today
- Overdue Tasks
- Pending Verification
- Weekly XP Earned
- Performance Score
- Rank This Week
 
==================================================
6. EXPORT TO EXCEL
==================================================
 
Export Tasks button.
 
Options:
 
- All Tasks
- By Project
- By Date Range
- By Member
 
.xlsx support
 
==================================================
7. PROJECT STATUS SYSTEM
==================================================
 
Status Pills:
 
- Live
- Completed
- Delayed
- Overdue
- On Hold
 
==================================================
8. TASK CREATION MODAL
==================================================
 
Fields:
 
- Title
- Description
- Deadline
- Difficulty
- Urgency
- Priority
- Assign Members
- Project Selection
- Estimated Hours
- Tags
 
==================================================
9. MY TASKS
==================================================
 
Unified task center:
 
- Daily tasks
- Project tasks
- Assigned tasks
 
Filters:
 
- Today
- Upcoming
- Completed
- Overdue
- Pending Verification
- High Priority
- By Project
 
Sorting:
 
- Deadline
- XP
- Urgency
- Status
 
==================================================
10. BUG PREVENTION
==================================================
 
Ensure:
 
- No duplicate XP
- No leaderboard desync
- No permission leaks
- No broken filters
- No sync issues
- No task conflicts
- No refresh reset
- No null crashes
 
==================================================
11. PERFORMANCE OPTIMIZATION
==================================================
 
- Lazy loading
- Memoized lists
- Debounced search
- Minimal re-renders
- Fast filtering
 
==================================================
12. UI / UX RULES
==================================================
 
Keep same environment:
 
- Dark theme
- Sora font
- Existing palette
- Existing spacing
- Existing components
 
Style:
 
- Clean
- Minimal
- Premium
- Professional
- Gamified
- User friendly
 
==================================================
13. FINAL GOAL
==================================================
 
Transform PLAN-ET into a real company-ready intelligent productivity platform with:
 
- Microsoft Login
- Smart task management
- Verified scoring
- Performance leaderboard
- Team collaboration
- Milestone documentation system
- Resource management
- Export reporting
- Actionable analytics
 
All while preserving existing workflows, base structure, and system stability perfectly.
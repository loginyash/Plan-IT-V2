Enhance the existing system with advanced task and project management capabilities while preserving the current architecture, UI theme, environment variables, database structure compatibility, routing flow, navigation logic, naming conventions, and all existing workflows.
 
==================================================
CORE PROTECTION RULES (DO NOT BREAK ANYTHING)
==================================================
 
- Do NOT change current workflow
- Do NOT modify current environment variables
- Do NOT alter existing design system
- Do NOT rename routes, modules, keys, components
- Do NOT break current logic
- Keep all existing pages and navigation intact
- All new features must be additive only
- Maintain responsiveness and performance
- Prevent regressions, duplicate logic, stale states, crashes
 
==================================================
1. TASK VERIFICATION WORKFLOW
==================================================
 
Add approval workflow for completed tasks.
 
Task States:
- Pending
- In Progress
- Completed (Awaiting Verification)
- Approved
- Rejected
 
Rules:
- User marks task complete → goes to Pending Verification
- Only Mentor / Team Lead / Project Manager / Admin can approve
- If Approved:
  - mark verified
  - award points
- If Rejected:
  - reopen task
  - allow rejection reason
 
UI:
- Status pills on task cards
- Verification queue for managers
- Approve / Reject quick actions
 
==================================================
2. AI SMART PERFORMANCE + POINT TRACKING SYSTEM
==================================================
 
Upgrade point tracking using AI-based employee performance analysis.
 
Keep existing XP system intact, but enhance intelligently.
 
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
 
Base Example:
- Easy + Low = 20 XP
- Medium + Medium = 50 XP
- Hard + High = 80 XP
- Hard + Critical = 120 XP
 
--------------------------------------------------
B. AI PERFORMANCE ENGINE
--------------------------------------------------
 
Use AI logic to analyze employee performance using:
 
- Task completion speed
- Deadline consistency
- Task quality approval rate
- Reopened task frequency
- Overdue percentage
- Complexity handled
- Team collaboration score
- Comment/helpfulness activity
- Streak consistency
- Daily productivity trend
- Multi-project efficiency
- Time estimation accuracy
 
--------------------------------------------------
C. AI PERFORMANCE SCORE
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
D. AI XP MODIFIER
--------------------------------------------------
 
Use AI score to slightly adjust earned XP fairly.
 
Examples:
- Score 90+ = +10% bonus XP
- Score 75+ = +5%
- Score 60+ = Normal
- Score below 40 = no bonus
 
Rules:
- Never punish harshly
- No negative XP
- Transparent logic
- Bonus only after task approval
 
--------------------------------------------------
E. LEADERBOARD INTEGRATION
--------------------------------------------------
 
Leaderboard should reflect:
 
- Total XP
- AI Performance Score
- Approval Rate
- Completion Rate
- Weekly Growth
- Current Rank
 
Leaderboard Modes:
- Overall
- Weekly
- Monthly
- Team Wise
- Performance Wise
 
Top users show:
- Avatar
- Name
- XP
- AI Score Badge
- Rank movement ↑↓
 
--------------------------------------------------
F. AI INSIGHTS PANEL
--------------------------------------------------
 
For each employee show:
 
- Strengths
- Delay risk
- Productivity trend
- Best task category
- Improvement suggestions
 
Examples:
- Performs best under high priority tasks
- Strong consistency this week
- Improve deadline adherence
 
--------------------------------------------------
G. FULL PROTECTION RULES
--------------------------------------------------
 
- No fake XP inflation
- No duplicate point grants
- No unfair ranking manipulation
- No stale leaderboard cache
- No score reset bug
- Safe recalculation only
- Use fallback if AI unavailable
- Preserve manual admin override
 
==================================================
3. PROJECT COLLABORATION SYSTEM
==================================================
 
Project Features:
- Add / remove members
- Avatar stack
- Roles:
  - Owner
  - Manager
  - Contributor
  - Viewer
 
Task Features:
- Description
- Notes
- Comments thread
- Mentions @user
- Visible to project members only
 
==================================================
4. DASHBOARD ENHANCEMENTS
==================================================
 
Keep existing dashboard layout.
 
Add cards:
 
- Current Ongoing Task
- Tasks Completed Today
- Overdue Tasks
- Pending Verification
- Weekly XP Earned
- AI Performance Score
- Rank This Week
 
Cards must be real-time and clickable.
 
==================================================
5. EXPORT TO EXCEL
==================================================
 
Add Export Tasks button.
 
Options:
- All Tasks
- By Project
- By Date Range
- By Member
 
Include:
 
Project A
- Design Navbar | Approved | 22-12-2026
 
Project B
- Connect Backend | In Progress
 
Requirements:
- Proper formatting
- Grouped by project
- No duplicate rows
- .xlsx support
 
==================================================
6. PROJECT STATUS SYSTEM
==================================================
 
Status Pills:
 
- Live
- Completed
- Delayed
- Overdue
- On Hold
 
Auto detect overdue by deadline.
Managers can override.
 
==================================================
7. TASK CREATION MODAL
==================================================
 
Keep current modal flow.
 
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
 
Validation:
- Title required
- Deadline required
- Difficulty required
- Urgency required
 
No project selected:
- Treat as personal task
 
==================================================
8. MY TASKS (KEEP EXISTING UNIFIED FLOW)
==================================================
 
Main task center must still show:
 
- Daily tasks
- Project tasks
- Assigned tasks
 
Labels:
- Project Tag
- Personal Tag
 
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
9. BUG PREVENTION / FULL PROOFING
==================================================
 
Ensure:
 
- No duplicate XP
- No leaderboard desync
- No permission leaks
- No broken filters
- No comment sync issue
- No task status conflicts
- No export mismatch
- No refresh state reset
- No mobile overflow
- No loading flicker
- No null crashes
 
==================================================
10. PERFORMANCE OPTIMIZATION
==================================================
 
- Lazy load heavy sections
- Memoized lists
- Debounced search
- Fast filtering
- Minimal re-renders
- Cached leaderboard safely
 
==================================================
11. UI / UX RULES
==================================================
 
Keep current environment exactly same:
 
- Existing dark theme
- Existing Sora font
- Existing purple/green/yellow palette
- Existing spacing system
- Existing component style
 
UI must remain:
 
- Clean
- Minimal
- Premium
- Gamified
- Professional
- User friendly
 
==================================================
12. FINAL GOAL
==================================================
 
Transform the current system into a real company-ready AI-powered productivity platform with:
 
- Smart task management
- Fair scoring
- Verified performance
- Intelligent leaderboard
- Team collaboration
- Export reporting
- Actionable analytics
 
All while preserving current workflows, current environment, and current base system perfectly.
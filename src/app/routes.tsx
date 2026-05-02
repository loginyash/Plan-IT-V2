import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./Layout";
import { Dashboard } from "./pages/Dashboard";
import { Tasks } from "./pages/Tasks";
import { Leaderboard } from "./pages/Leaderboard";
import { Profile } from "./pages/Profile";
import { Rewards } from "./pages/Rewards";
import { Projects } from "./pages/Projects";
import { ProjectDetail } from "./pages/ProjectDetail";
import { Login } from "./pages/Login";
import { Community } from "./pages/Community";
import { Reports } from "./pages/Reports";
import { Feedback } from "./pages/Feedback";
import { Team } from "./pages/Team";
import { Settings } from "./pages/Settings";
import { Resources } from "./pages/Resources";
import { SystemSetup } from "./pages/SystemSetup";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/setup",
    Component: SystemSetup,
  },
  {
    path: "/",
    element: <ProtectedRoute><Layout /></ProtectedRoute>,
    children: [
      { index: true, Component: Dashboard },
      { path: "projects", Component: Projects },
      { path: "projects/:id", Component: ProjectDetail },
      { path: "tasks", Component: Tasks },
      { path: "leaderboard", Component: Leaderboard },
      { path: "profile", Component: Profile },
      { path: "rewards", Component: Rewards },
      { path: "community", Component: Community },
      { path: "reports", Component: Reports },
      { path: "feedback", Component: Feedback },
      { path: "team", Component: Team },
      { path: "settings", Component: Settings },
      { path: "resources", Component: Resources },
    ],
  },
]);

import { Outlet, NavLink, useLocation, useNavigate } from "react-router";
import { LayoutDashboard, CheckSquare, Trophy, User, Award, LogOut, FolderGit2, Zap, FileText, Users, Globe, BarChart3, Settings, Shield } from "lucide-react";
import { motion } from "motion/react";
import { clsx } from "clsx";
import { TasksProvider } from "./context/TasksContext";
import { Toaster } from "sonner";
import { useAuth } from "./context/AuthContext";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/tasks", label: "My Tasks", icon: CheckSquare },
  { path: "/projects", label: "Projects", icon: FolderGit2 },
  { path: "/resources", label: "Resources", icon: FileText },
  { path: "/team", label: "Team", icon: Users },
  { path: "/community", label: "Community", icon: Globe },
  { path: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { path: "/reports", label: "Reports", icon: BarChart3 },
  { path: "/settings", label: "Settings", icon: Settings },
  { path: "/feedback", label: "Feedback", icon: Shield },
];

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <TasksProvider>
      <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:flex flex-col w-64 border-r border-border bg-card">
          <div className="p-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(108,92,231,0.5)]">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#a29bfe] tracking-wider">
              Plan-IT
            </h1>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={clsx(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative group",
                    isActive
                      ? "text-white"
                      : "text-muted-foreground hover:text-white hover:bg-white/5"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav"
                      className="absolute inset-0 bg-primary/20 border border-primary/50 rounded-xl"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon className={clsx("w-5 h-5 relative z-10 transition-colors", isActive ? "text-primary" : "group-hover:text-white")} />
                  <span className="font-medium relative z-10">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="p-4 mt-auto">
            {user && (
              <div 
                onClick={() => navigate('/profile')}
                className="px-4 py-3 mb-2 flex items-center gap-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors"
              >
                 <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full border border-border" />
                 <div className="flex flex-col">
                   <span className="text-sm font-bold text-white truncate w-32">{user.name}</span>
                   <span className="text-[10px] text-muted-foreground uppercase">{user.role}</span>
                 </div>
              </div>
            )}
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 cursor-pointer text-muted-foreground transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 relative overflow-y-auto overflow-x-hidden p-6 md:p-10">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl mx-auto h-full"
          >
            <Outlet />
          </motion.div>
        </main>

        {/* Mobile Bottom Nav */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-2 z-50">
          <nav className="flex justify-around items-center">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={clsx(
                    "p-3 rounded-xl relative flex flex-col items-center gap-1",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-mobile"
                      className="absolute inset-0 bg-primary/20 rounded-xl"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon className="w-6 h-6 relative z-10" />
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>
      <Toaster theme="dark" position="bottom-right" className="font-sans" />
    </TasksProvider>
  );
}

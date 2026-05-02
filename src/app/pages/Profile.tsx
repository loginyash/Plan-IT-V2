import { Trophy, Star, Target, Flame, Calendar, Award, TrendingUp } from "lucide-react";
import { clsx } from "clsx";
import { useTasks } from "../context/TasksContext";

const badges = [
  { id: 1, name: "Early Bird", desc: "Completed 5 tasks before 9 AM", icon: "🌅", unlocked: true },
  { id: 2, name: "Task Master", desc: "Completed 100 total tasks", icon: "⚔️", unlocked: true },
  { id: 3, name: "Fire Starter", desc: "Maintained a 10-day streak", icon: "🔥", unlocked: true },
  { id: 4, name: "Perfectionist", desc: "0 missed deadlines this month", icon: "💎", unlocked: false },
  { id: 5, name: "Team Player", desc: "Collaborated on 10 projects", icon: "🤝", unlocked: false },
  { id: 6, name: "Night Owl", desc: "Completed 5 tasks after 8 PM", icon: "🦉", unlocked: false },
];

export function Profile() {
  const { totalPoints, aiProfile, tasks } = useTasks();
  const completedTasksCount = tasks.filter(t => t.status === "approved").length;

  return (
    <div className="space-y-8 pb-20 md:pb-0 max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="bg-card border border-border rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-primary via-accent to-secondary">
              <img 
                src="https://images.unsplash.com/photo-1740252117013-4fb21771e7ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwcm9mZXNzaW9uYWwlMjBhdmF0YXJ8ZW58MXx8fHwxNzc3NjMzMDY2fDA&ixlib=rb-4.1.0&q=80&w=1080" 
                alt="Profile" 
                className="w-full h-full object-cover rounded-full border-4 border-card"
              />
            </div>
            <div className="absolute bottom-0 right-2 w-8 h-8 bg-primary rounded-full border-2 border-card flex items-center justify-center shadow-lg">
              <Star className="w-4 h-4 text-white fill-white" />
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-white mb-1">Jatin</h1>
            <p className="text-primary font-medium mb-4">Product Manager • Silver III</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <div className="bg-background border border-border px-4 py-2 rounded-xl flex items-center gap-2">
                <Star className="w-4 h-4 text-accent fill-accent" />
                <span className="font-bold text-white">{totalPoints.toLocaleString()} Points</span>
              </div>
              <div className="bg-background border border-border px-4 py-2 rounded-xl flex items-center gap-2">
                <Trophy className="w-4 h-4 text-slate-300" />
                <span className="font-bold text-white">Rank #2</span>
              </div>
              <div className="bg-background border border-border px-4 py-2 rounded-xl flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-emerald-400">Performance Score: {aiProfile.score}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <Target className="w-5 h-5 text-primary" /> Performance Stats
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatBox title="Tasks Completed" value={(130 + completedTasksCount).toString()} icon={<CheckSquareIcon className="w-5 h-5 text-secondary" />} />
        <StatBox title="Best Streak" value="14 Days" icon={<Flame className="w-5 h-5 text-orange-500" />} />
        <StatBox title="Current Streak" value="12 Days" icon={<Flame className="w-5 h-5 text-orange-400" />} />
        <StatBox title="Joined" value="Mar 2026" icon={<Calendar className="w-5 h-5 text-primary" />} />
      </div>

      {/* Badges Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-accent" /> Earned Badges
        </h2>
        <span className="text-sm text-muted-foreground">{badges.filter(b => b.unlocked).length} / {badges.length} Unlocked</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {badges.map((badge) => (
          <div 
            key={badge.id} 
            className={clsx(
              "p-4 rounded-2xl border flex items-center gap-4 transition-all",
              badge.unlocked 
                ? "bg-card border-border hover:border-primary/50" 
                : "bg-background/50 border-border/50 opacity-60 grayscale hover:grayscale-0"
            )}
          >
            <div className={clsx(
              "w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-inner",
              badge.unlocked ? "bg-white/10" : "bg-background"
            )}>
              {badge.icon}
            </div>
            <div>
              <h3 className="font-bold text-white">{badge.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{badge.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatBox({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-4 flex flex-col items-center justify-center text-center">
      <div className="mb-2 p-2 bg-background rounded-lg">{icon}</div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-xs font-medium text-muted-foreground">{title}</div>
    </div>
  );
}

function CheckSquareIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}

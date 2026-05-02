import { useState } from "react";
import { Flame, Trophy, Star, ArrowRight, Plus, CheckCircle2, Circle, AlertCircle, Clock, TrendingUp } from "lucide-react";
import { Link } from "react-router";
import { clsx } from "clsx";
import { useTasks } from "../context/TasksContext";
import { CreateTaskModal } from "../components/CreateTaskModal";
import { DashboardCalendar } from "../components/DashboardCalendar";
import { toast } from "sonner";
import { motion } from "motion/react";

export function Dashboard() {
  const { tasks, progress, totalPoints, updateTaskStatus, aiProfile } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCompleteTask = (id: string, points: number) => {
    updateTaskStatus(id, "pending_verification");
    toast.success(
      <div className="flex flex-col gap-1">
        <span className="font-semibold">Sent for verification!</span>
        <span className="text-sm opacity-90">Points will be awarded upon approval.</span>
      </div>
    );
  };

  const pendingVerificationTasks = tasks.filter(t => t.status === "pending_verification");
  const overdueTasks = tasks.filter(t => t.status === "pending" && t.deadline.includes("Overdue")); // Simple mock logic for overdue

  return (
    <div className="space-y-8 pb-20 md:pb-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Good Morning, Jatin 👋</h1>
          <p className="text-muted-foreground">Ready to crush your goals today?</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(108,92,231,0.3)] hover:shadow-[0_0_25px_rgba(108,92,231,0.5)]"
          >
            <Plus className="w-5 h-5" /> Add Task
          </button>
          <Link
            to="/leaderboard"
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-5 py-2.5 rounded-xl font-medium transition-colors"
          >
            <Trophy className="w-4 h-4" /> View Rank
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          title="Completed Today"
          value="4"
          icon={<CheckCircle2 className="w-5 h-5 text-secondary" />}
          trend="+1 from yesterday"
          trendColor="text-secondary"
        />
        <StatCard
          title="Overdue Tasks"
          value={overdueTasks.length.toString()}
          icon={<AlertCircle className="w-5 h-5 text-rose-500" />}
          trend="Needs attention"
          trendColor="text-rose-500"
        />
        <StatCard
          title="Pending Verification"
          value={pendingVerificationTasks.length.toString()}
          icon={<Clock className="w-5 h-5 text-orange-400" />}
          trend="Awaiting review"
          trendColor="text-muted-foreground"
        />
        <StatCard
          title="Weekly XP"
          value="1,450"
          icon={<Star className="w-5 h-5 text-accent" />}
          trend="+150 today"
          trendColor="text-secondary"
        />
        <StatCard
          title="Performance Score"
          value={aiProfile.score.toString()}
          icon={<TrendingUp className="w-5 h-5 text-emerald-400" />}
          trend="Strong Performer"
          trendColor="text-emerald-500"
        />
        <StatCard
          title="Rank This Week"
          value="Silver III"
          icon={<Trophy className="w-5 h-5 text-slate-300" />}
          trend="Top 15%"
          trendColor="text-muted-foreground"
        />
      </div>

      {/* AI Insights & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Current Ongoing Task */}
          <div className="bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/30 rounded-2xl p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Current Ongoing Task
                </h2>
                <h3 className="text-xl font-bold text-white mb-2">Code Review: API Service</h3>
                <p className="text-muted-foreground text-sm">Review the new REST endpoints for the Mobile App MVP.</p>
              </div>
              <div className="text-right shrink-0">
                <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-primary/20 whitespace-nowrap">In Progress</span>
              </div>
            </div>
          </div>

          {/* Today's Progress */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-end mb-4">
              <div>
                <h2 className="text-xl font-semibold text-white mb-1">Today's Focus</h2>
                <p className="text-sm text-muted-foreground">Complete tasks to maintain your streak</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-secondary">{progress.toFixed(0)}%</span>
              </div>
            </div>
            
            <div className="h-3 bg-background rounded-full overflow-hidden mb-6 border border-border/50 relative">
              <motion.div 
                initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1 }}
                className="h-full bg-secondary rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"
              />
            </div>

            <div className="space-y-3">
              {tasks.filter(t => t.status === "pending" || t.status === "in_progress").slice(0, 3).map((task) => (
                <div 
                  key={task.id} 
                  className="flex items-center justify-between p-4 rounded-xl border bg-background border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-3 truncate">
                    <button 
                      onClick={() => handleCompleteTask(task.id, task.points)}
                      className="shrink-0 transition-transform active:scale-90"
                    >
                      <Circle className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
                    </button>
                    <span className="font-medium truncate text-white">
                      {task.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-4">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3"/> {task.deadline}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/tasks" className="mt-6 flex items-center justify-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium w-full py-2">
              View all tasks <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Performance Insights Panel */}
        <div className="space-y-6">
          <div className="bg-card border border-primary/20 rounded-2xl p-6 shadow-[0_0_20px_rgba(108,92,231,0.05)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <SparklesIcon className="w-5 h-5 text-primary" /> Performance Insights
            </h3>
            
            <div className="space-y-4 relative z-10">
              <div>
                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Top Strengths</p>
                <div className="flex flex-wrap gap-2">
                  {aiProfile.strengths.map(s => (
                    <span key={s} className="bg-primary/10 text-primary border border-primary/20 px-2 py-1 rounded-md text-xs">{s}</span>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Improvement Opportunity</p>
                <p className="text-sm text-white/90 bg-white/5 p-3 rounded-lg border border-white/5">{aiProfile.suggestions[0]}</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
             <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
             <div className="space-y-3">
               <div className="flex justify-between items-center text-sm">
                 <span className="text-muted-foreground">Overdue Risk</span>
                 <span className="text-emerald-400 font-medium">{aiProfile.delayRisk}</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                 <span className="text-muted-foreground">Trend</span>
                 <span className="text-secondary font-medium">{aiProfile.trend}</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                 <span className="text-muted-foreground">Best Category</span>
                 <span className="text-white font-medium">{aiProfile.bestCategory}</span>
               </div>
             </div>
          </div>
          

        </div>
      </div>

      {/* Dashboard Calendar */}
      <DashboardCalendar />

      <CreateTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

function StatCard({ title, value, icon, trend, trendColor }: { title: string, value: string, icon: React.ReactNode, trend: string, trendColor: string }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 flex flex-col relative overflow-hidden group hover:border-white/10 transition-colors">
      <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
      <div className="flex justify-between items-start mb-3 relative z-10">
        <div className="p-2.5 bg-background rounded-xl border border-border">
          {icon}
        </div>
      </div>
      <div className="relative z-10">
        <h3 className="text-muted-foreground text-xs font-medium mb-1 uppercase tracking-wider">{title}</h3>
        <div className="text-2xl font-bold text-white mb-1">{value}</div>
        <p className={clsx("text-xs font-medium", trendColor)}>{trend}</p>
      </div>
    </div>
  );
}

function SparklesIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  )
}

import { useState } from "react";
import { Plus, FolderGit2, Users, Calendar, Trophy, ArrowRight, CircleDot } from "lucide-react";
import { Link } from "react-router";
import { clsx } from "clsx";
import { motion } from "motion/react";
import { useTasks, ProjectStatus } from "../context/TasksContext";
import { CreateProjectModal } from "../components/CreateProjectModal";

export function Projects() {
  const { projects, tasks } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projectsWithStats = projects.map(project => {
    const projectTasks = tasks.filter(t => t.projectId === project.id);
    const totalTasks = projectTasks.length;
    const completedTasks = projectTasks.filter(t => t.status === "approved").length;
    const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
    const points = projectTasks.filter(t => t.status === "approved").reduce((acc, t) => acc + t.points, 0);

    return {
      ...project,
      totalTasks,
      completedTasks,
      progress,
      points,
    };
  });

  const sortedProjects = [...projectsWithStats].sort((a, b) => b.points - a.points);

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case "Live": return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      case "Completed": return "text-primary bg-primary/10 border-primary/20";
      case "Delayed": return "text-orange-400 bg-orange-400/10 border-orange-400/20";
      case "Overdue": return "text-rose-400 bg-rose-400/10 border-rose-400/20";
      case "On Hold": return "text-slate-400 bg-slate-400/10 border-slate-400/20";
    }
  };

  return (
    <div className="space-y-8 pb-20 md:pb-0 min-h-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
          <p className="text-muted-foreground">Manage your team projects and track progress.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(108,92,231,0.3)] hover:shadow-[0_0_25px_rgba(108,92,231,0.5)]"
        >
          <Plus className="w-5 h-5" /> New Project
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-primary" /> Active Projects
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projectsWithStats.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card border border-border rounded-2xl p-5 hover:border-primary/50 transition-colors group flex flex-col"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors line-clamp-2 pr-2">
                    {project.name}
                  </h3>
                  <span className={clsx("flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap border shrink-0", getStatusColor(project.status))}>
                    <CircleDot className="w-3 h-3" /> {project.status}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6 flex-wrap">
                  <div className="flex items-center">
                    <div className="flex -space-x-2 mr-2">
                      {project.members.slice(0, 3).map((member, i) => (
                        <div key={i} className="w-6 h-6 rounded-full bg-primary/20 border-2 border-card flex items-center justify-center text-[10px] font-bold text-primary">
                          {member.userId.charAt(0).toUpperCase()}
                        </div>
                      ))}
                      {project.members.length > 3 && (
                        <div className="w-6 h-6 rounded-full bg-background border-2 border-card flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                          +{project.members.length - 3}
                        </div>
                      )}
                    </div>
                    <span>{project.members.length} members</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{project.deadline}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-xs">{project.totalTasks} tasks</span>
                  </div>
                </div>

                <div className="mt-auto space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-medium">Progress</span>
                    <span className="text-white font-bold">{project.progress}%</span>
                  </div>
                  <div className="h-2 bg-background rounded-full overflow-hidden border border-border/50">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(108,92,231,0.5)]"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <Link 
                  to={`/projects/${project.id}`}
                  className="mt-6 flex items-center justify-center gap-2 w-full bg-white/5 hover:bg-white/10 border border-white/5 text-white py-2 rounded-xl transition-colors text-sm font-medium"
                >
                  View Details <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
            
            {projects.length === 0 && (
              <div className="col-span-full py-12 flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed border-border rounded-2xl">
                <FolderGit2 className="w-12 h-12 mb-3 opacity-20" />
                <p>No projects found. Create one to get started!</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-accent" /> Team Leaderboard
          </h2>
          
          <div className="bg-card border border-border rounded-2xl p-5 shadow-xl">
            <div className="space-y-4">
              {sortedProjects.map((project, idx) => (
                <div 
                  key={project.id}
                  className="flex items-center gap-4 p-3 rounded-xl bg-background border border-border relative overflow-hidden group"
                >
                  <div className={clsx(
                    "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0",
                    idx === 0 ? "bg-accent/20 text-accent border border-accent/30" :
                    idx === 1 ? "bg-slate-300/20 text-slate-300 border border-slate-300/30" :
                    idx === 2 ? "bg-amber-600/20 text-amber-500 border border-amber-600/30" :
                    "bg-muted text-muted-foreground"
                  )}>
                    #{idx + 1}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">{project.name}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                      <span>{project.progress}% done</span>
                    </div>
                  </div>
                  
                  <div className="text-right shrink-0">
                    <div className="text-accent font-bold text-sm">{project.points} XP</div>
                  </div>
                </div>
              ))}
              
              {sortedProjects.length === 0 && (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  No points earned yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <CreateProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

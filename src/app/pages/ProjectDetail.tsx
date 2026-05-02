import { useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, Plus, CheckCircle2, Circle, Clock, Star, Users, Calendar, Flag, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { clsx } from "clsx";
import { useTasks, Priority } from "../context/TasksContext";
import { CreateTaskModal } from "../components/CreateTaskModal";
import { ResourceList } from "../components/ResourceList";
import { UploadResourceModal } from "../components/UploadResourceModal";
import { toast } from "sonner";

export function ProjectDetail() {
  const { id } = useParams();
  const { projects, tasks, updateTaskStatus, users, resources } = useTasks();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"pending" | "pending_verification" | "completed" | "resources">("pending");

  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center py-20">
        <h2 className="text-2xl font-bold text-white mb-2">Project not found</h2>
        <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist or has been removed.</p>
        <Link to="/projects" className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-medium transition-colors">
          Back to Projects
        </Link>
      </div>
    );
  }

  const projectTasks = tasks.filter(t => t.projectId === project.id);
  const filteredTasks = projectTasks.filter(t => {
    if (activeTab === "pending" && !["pending", "in_progress", "rejected"].includes(t.status)) return false;
    if (activeTab === "pending_verification" && t.status !== "pending_verification") return false;
    if (activeTab === "completed" && t.status !== "approved") return false;
    return true;
  });
  
  const totalTasks = projectTasks.length;
  const completedTasks = projectTasks.filter(t => t.status === "approved").length;
  const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const handleCompleteTask = (taskId: string, points: number) => {
    updateTaskStatus(taskId, "pending_verification");
    toast.success("Task sent for verification!");
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "High": return "text-rose-500 bg-rose-500/10 border-rose-500/20";
      case "Medium": return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      case "Low": return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
      default: return "text-muted-foreground bg-background border-border";
    }
  };

  const getMemberName = (userId: string) => {
    return users.find(u => u.id === userId)?.name || userId;
  };

  return (
    <div className="space-y-6 pb-20 md:pb-0 h-full flex flex-col">
      <Link 
        to="/projects" 
        className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors w-fit font-medium text-sm"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Projects
      </Link>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{project.name}</h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Deadline: <strong className="text-white font-medium">{project.deadline}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <div className="flex -space-x-2">
                {project.members.map((member, i) => (
                  <div 
                    key={i} 
                    className="w-7 h-7 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-bold text-white"
                    title={`${getMemberName(member.userId)} - ${member.role}`}
                  >
                    {getMemberName(member.userId).charAt(0)}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-xs">{project.status}</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border p-5 rounded-2xl w-full lg:w-72 shrink-0 flex flex-col justify-center shadow-xl">
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-medium text-muted-foreground">Overall Progress</span>
            <span className="text-2xl font-bold text-secondary">{progress}%</span>
          </div>
          <div className="h-3 bg-background rounded-full overflow-hidden border border-border/50">
            <div 
              className="h-full bg-secondary rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(34,197,94,0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-3 text-xs font-medium text-muted-foreground">
            <span>{completedTasks} / {totalTasks} Tasks</span>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-border my-2" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex bg-card p-1 rounded-xl w-full overflow-x-auto border border-border">
          {(["pending", "pending_verification", "completed", "resources"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                "flex-1 py-2 px-4 text-sm font-medium rounded-lg capitalize transition-all relative whitespace-nowrap",
                activeTab === tab ? "text-white" : "text-muted-foreground hover:text-white"
              )}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="project-task-tab"
                  className="absolute inset-0 bg-primary/20 rounded-lg border border-primary/30"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab === "pending_verification" ? "Queue" : tab}</span>
            </button>
          ))}
        </div>
        
        {activeTab === "resources" ? (
          <button 
            onClick={() => setIsResourceModalOpen(true)}
            className="flex shrink-0 items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-[0_0_15px_rgba(34,197,94,0.2)]"
          >
            <Plus className="w-5 h-5" /> Upload Resource
          </button>
        ) : (
          <button 
            onClick={() => setIsTaskModalOpen(true)}
            className="flex shrink-0 items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-[0_0_15px_rgba(108,92,231,0.2)]"
          >
            <Plus className="w-5 h-5" /> Add Project Task
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto pr-2 -mr-2 pb-8">
        {activeTab === "resources" ? (
          <ResourceList resources={resources.filter(r => r.projectId === project.id)} />
        ) : (
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredTasks.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-16 text-muted-foreground border-2 border-dashed border-border rounded-2xl gap-4"
                >
                  <p>No {activeTab} tasks found in this project.</p>
                </motion.div>
              ) : (
                filteredTasks.map((task) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    key={task.id}
                    className="bg-card border border-border hover:border-primary/50 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors group"
                  >
                    <div className="flex items-start gap-4">
                      <button 
                        onClick={() => task.status === "pending" && handleCompleteTask(task.id, task.points)}
                        disabled={task.status !== "pending"}
                        className="mt-1 flex-shrink-0 transition-transform active:scale-90"
                      >
                        {task.status === "approved" ? (
                          <CheckCircle2 className="w-7 h-7 text-secondary" />
                        ) : task.status === "pending_verification" ? (
                          <ShieldCheck className="w-7 h-7 text-orange-400" />
                        ) : (
                          <Circle className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors" />
                        )}
                      </button>
                      <div>
                        <h3 className={clsx("text-lg font-semibold mb-1 flex items-center gap-2", task.status === "approved" ? "text-muted-foreground line-through" : "text-white")}>
                          {task.title}
                          {task.status === "rejected" && <span className="bg-red-500/10 text-red-500 text-xs px-2 py-0.5 rounded border border-red-500/20">Rejected</span>}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" /> {task.deadline}
                          </span>
                          {task.assignedTo && task.assignedTo.length > 0 && (
                            <>
                              <span className="w-1 h-1 rounded-full bg-border" />
                              <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" /> {task.assignedTo.map(id => getMemberName(id)).join(", ")}
                              </span>
                            </>
                          )}
                          <span className="w-1 h-1 rounded-full bg-border" />
                          <span className={clsx("flex items-center gap-1 px-2 py-0.5 rounded-md border text-xs font-semibold", getPriorityColor(task.priority))}>
                            <Flag className="w-3 h-3" /> {task.priority}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 pl-11 sm:pl-0">
                      <div className="flex items-center gap-1.5 bg-accent/10 text-accent font-bold px-3 py-1.5 rounded-lg border border-accent/20">
                        +{task.points} <Star className="w-4 h-4 fill-accent" />
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      <CreateTaskModal 
        isOpen={isTaskModalOpen} 
        onClose={() => setIsTaskModalOpen(false)} 
        defaultProjectId={project.id}
      />

      <UploadResourceModal 
        isOpen={isResourceModalOpen} 
        onClose={() => setIsResourceModalOpen(false)} 
        projectId={project.id}
      />
    </div>
  );
}

import { useState, useMemo } from "react";
import { CheckCircle2, Circle, Clock, Star, Filter, Plus, Flag, AlertTriangle, ShieldCheck, Download, MoreHorizontal } from "lucide-react";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "motion/react";
import { useTasks, Priority, TaskStatus } from "../context/TasksContext";
import { CreateTaskModal } from "../components/CreateTaskModal";
import { toast } from "sonner";
import * as XLSX from "xlsx";

export function Tasks() {
  const { tasks, updateTaskStatus, currentUser } = useTasks();
  const [activeTab, setActiveTab] = useState<"pending" | "pending_verification" | "completed">("pending");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterProject, setFilterProject] = useState<string>("all");
  const [quickFilter, setQuickFilter] = useState<"all" | "today" | "upcoming" | "overdue" | "high_priority">("all");
  const [sortBy, setSortBy] = useState<"deadline" | "xp" | "urgency" | "status">("deadline");

  const filteredTasks = useMemo(() => {
    let result = tasks.filter(t => {
      // Map tabs to statuses
      if (activeTab === "pending" && !["pending", "in_progress", "rejected"].includes(t.status)) return false;
      if (activeTab === "pending_verification" && t.status !== "pending_verification") return false;
      if (activeTab === "completed" && t.status !== "approved") return false;

      if (searchQuery && !t.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (filterProject !== "all" && t.projectId !== filterProject) return false;

      if (quickFilter === "today" && !t.deadline.toLowerCase().includes("today")) return false;
      if (quickFilter === "upcoming" && (!t.deadline.toLowerCase().includes("tomorrow") && !t.deadline.includes("202"))) return false;
      if (quickFilter === "overdue" && !t.deadline.toLowerCase().includes("overdue")) return false;
      if (quickFilter === "high_priority" && t.priority !== "High") return false;

      return true;
    });

    // Sorting logic
    result.sort((a, b) => {
      if (sortBy === "xp") return b.points - a.points;
      
      if (sortBy === "urgency") {
        const urgencyWeight = { "Critical": 4, "High": 3, "Medium": 2, "Low": 1 };
        return (urgencyWeight[b.urgency] || 0) - (urgencyWeight[a.urgency] || 0);
      }
      
      if (sortBy === "status") {
        const statusWeight = { "rejected": 3, "in_progress": 2, "pending": 1, "pending_verification": 0, "approved": 0 };
        return (statusWeight[b.status as keyof typeof statusWeight] || 0) - (statusWeight[a.status as keyof typeof statusWeight] || 0);
      }

      // Default: deadline (naive string comparison for mock, ideally parse dates)
      return a.deadline.localeCompare(b.deadline);
    });

    return result;
  }, [tasks, activeTab, searchQuery, filterProject, sortBy]);

  const projects = useMemo(() => {
    const p = new Set<string>();
    tasks.forEach(t => t.projectId && p.add(t.projectId));
    return Array.from(p);
  }, [tasks]);

  const handleCompleteTask = (id: string, points: number) => {
    updateTaskStatus(id, "pending_verification");
    toast.success("Task sent for verification! Points pending approval.");
  };

  const handleBulkComplete = () => {
    selectedTasks.forEach(id => {
      updateTaskStatus(id, "pending_verification");
    });
    toast.success(`${selectedTasks.size} tasks sent for verification!`);
    setSelectedTasks(new Set());
    setIsMultiSelectMode(false);
  };

  const toggleTaskSelection = (id: string) => {
    const newSet = new Set(selectedTasks);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedTasks(newSet);
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(tasks.map(t => ({
      Title: t.title,
      Status: t.status,
      Deadline: t.deadline,
      Priority: t.priority,
      Difficulty: t.difficulty,
      Project: t.projectId || "Personal",
      Points: t.points
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tasks");
    XLSX.writeFile(wb, "Tasks_Export.xlsx");
    toast.success("Tasks exported to Excel!");
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "High": return "text-rose-500 bg-rose-500/10 border-rose-500/20";
      case "Medium": return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      case "Low": return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
      default: return "text-muted-foreground bg-background border-border";
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-0 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Tasks</h1>
          <p className="text-muted-foreground">Complete tasks to earn points and level up.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-xl text-white hover:bg-white/5 transition-colors"
          >
            <Download className="w-4 h-4" /> Export
          </button>
          <button 
            onClick={() => setIsMultiSelectMode(!isMultiSelectMode)}
            className={clsx(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-white transition-colors border",
              isMultiSelectMode ? "bg-primary border-primary" : "bg-card border-border hover:bg-white/5"
            )}
          >
            <MoreHorizontal className="w-4 h-4" /> {isMultiSelectMode ? "Cancel Bulk" : "Bulk Actions"}
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-xl font-medium transition-all shadow-[0_0_15px_rgba(108,92,231,0.2)]"
          >
            <Plus className="w-5 h-5" /> Add Task
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        {/* Tabs */}
        <div className="flex bg-card p-1 rounded-xl w-full sm:w-auto border border-border">
          {(["pending", "pending_verification", "completed"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setSelectedTasks(new Set()); }}
              className={clsx(
                "flex-1 sm:px-4 py-2 text-sm font-medium rounded-lg capitalize transition-all relative",
                activeTab === tab ? "text-white" : "text-muted-foreground hover:text-white"
              )}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="task-tab"
                  className="absolute inset-0 bg-primary/20 rounded-lg border border-primary/30"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">
                {tab === "pending_verification" ? "Verification Queue" : tab}
              </span>
            </button>
          ))}
        </div>

        {/* Filters & Sorting */}
        <div className="flex flex-wrap gap-2">
          <input 
            type="text" 
            placeholder="Search tasks..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary w-full sm:w-48"
          />
          <select 
            value={filterProject}
            onChange={(e) => setFilterProject(e.target.value)}
            className="bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary appearance-none"
          >
            <option value="all">All Projects</option>
            {projects.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <select 
            value={quickFilter}
            onChange={(e) => setQuickFilter(e.target.value as any)}
            className="bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary appearance-none"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="upcoming">Upcoming</option>
            <option value="overdue">Overdue</option>
            <option value="high_priority">High Priority</option>
          </select>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary appearance-none"
          >
            <option value="deadline">Sort by Deadline</option>
            <option value="xp">Sort by XP</option>
            <option value="urgency">Sort by Urgency</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>
      </div>

      {isMultiSelectMode && activeTab === "pending" && selectedTasks.size > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-primary/10 border border-primary/20 rounded-xl p-3 flex justify-between items-center"
        >
          <span className="text-sm font-medium text-white">{selectedTasks.size} tasks selected</span>
          <button 
            onClick={handleBulkComplete}
            className="bg-primary hover:bg-primary/90 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
          >
            Complete Selected
          </button>
        </motion.div>
      )}

      {/* Task List */}
      <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredTasks.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 text-muted-foreground border-2 border-dashed border-border rounded-2xl gap-4"
            >
              <p>No {activeTab} tasks found.</p>
            </motion.div>
          ) : (
            filteredTasks.map((task) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                key={task.id}
                className={clsx(
                  "bg-card border rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all group",
                  isMultiSelectMode && selectedTasks.has(task.id) ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                )}
                onClick={() => isMultiSelectMode && activeTab === "pending" && toggleTaskSelection(task.id)}
              >
                <div className="flex items-start gap-4">
                  {isMultiSelectMode && activeTab === "pending" ? (
                    <div className="mt-1 flex-shrink-0">
                      <div className={clsx("w-6 h-6 rounded border flex items-center justify-center transition-colors", selectedTasks.has(task.id) ? "bg-primary border-primary" : "border-muted-foreground")}>
                        {selectedTasks.has(task.id) && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </div>
                    </div>
                  ) : (
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
                  )}
                  <div>
                    <h3 className={clsx("text-lg font-semibold mb-1 flex items-center gap-2", task.status === "approved" ? "text-muted-foreground line-through" : "text-white")}>
                      {task.title}
                      {task.status === "rejected" && <span className="bg-red-500/10 text-red-500 text-xs px-2 py-0.5 rounded border border-red-500/20">Rejected</span>}
                    </h3>
                    {task.rejectionReason && task.status === "rejected" && (
                      <p className="text-sm text-red-400 mb-2 flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4" /> Reason: {task.rejectionReason}
                      </p>
                    )}
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {task.deadline}
                      </span>
                      {task.projectId && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-border" />
                          <span className="bg-background px-2 py-0.5 rounded-md border border-border">
                            {task.projectId}
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

                <div className="flex flex-col sm:items-end gap-2 pl-11 sm:pl-0">
                  <div className="flex items-center gap-1.5 bg-accent/10 text-accent font-bold px-3 py-1.5 rounded-lg border border-accent/20 w-fit">
                    {task.points} XP <Star className="w-4 h-4 fill-accent" />
                  </div>
                  
                  {/* Manager Actions for Verification Queue */}
                  {task.status === "pending_verification" && activeTab === "pending_verification" && (
                    <div className="flex gap-2 mt-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); updateTaskStatus(task.id, "approved"); toast.success("Task Approved"); }}
                        className="bg-secondary/10 hover:bg-secondary/20 text-secondary border border-secondary/20 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); updateTaskStatus(task.id, "rejected", "Requires revision"); toast.error("Task Rejected"); }}
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
      
      <CreateTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

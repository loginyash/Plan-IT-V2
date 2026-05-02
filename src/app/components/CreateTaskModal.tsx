import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, Star, Flag, AlignLeft, Type, FolderGit2, Users, AlertCircle, Clock, Hash } from "lucide-react";
import { clsx } from "clsx";
import { useTasks, Priority, Difficulty, Urgency } from "../context/TasksContext";
import { toast } from "sonner";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProjectId?: string;
}

const priorityOptions: { value: Priority; color: string }[] = [
  { value: "Low", color: "bg-emerald-500/20 text-emerald-500 border-emerald-500/30" },
  { value: "Medium", color: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30" },
  { value: "High", color: "bg-rose-500/20 text-rose-500 border-rose-500/30" },
];

const difficultyOptions: Difficulty[] = ["Easy", "Medium", "Hard"];
const urgencyOptions: Urgency[] = ["Low", "Medium", "High", "Critical"];

export function CreateTaskModal({ isOpen, onClose, defaultProjectId }: CreateTaskModalProps) {
  const { addTask, projects, users, calculateTaskXP } = useTasks();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [difficulty, setDifficulty] = useState<Difficulty>("Medium");
  const [urgency, setUrgency] = useState<Urgency>("Medium");
  const [projectId, setProjectId] = useState<string>(defaultProjectId || "");
  const [assignedTo, setAssignedTo] = useState<string[]>([]);
  const [tags, setTags] = useState("");
  const [estimatedHours, setEstimatedHours] = useState("");

  useEffect(() => {
    if (isOpen && defaultProjectId) {
      setProjectId(defaultProjectId);
    }
  }, [isOpen, defaultProjectId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !deadline || !difficulty || !urgency) {
      toast.error("Please fill in all required fields: Title, Deadline, Difficulty, and Urgency");
      return;
    }
    
    const calculatedXP = calculateTaskXP(difficulty, urgency);

    addTask({
      title,
      description,
      deadline,
      difficulty,
      urgency,
      priority,
      category: "General",
      projectId: projectId || undefined,
      assignedTo: assignedTo.length > 0 ? assignedTo : undefined,
      tags: tags ? tags.split(",").map(t => t.trim()) : undefined,
      estimatedHours: estimatedHours ? parseFloat(estimatedHours) : undefined
    });

    toast.success(
      <div className="flex items-center gap-2">
        <span>Task created!</span>
        <span className="flex items-center gap-1 text-accent font-bold bg-accent/10 px-2 py-0.5 rounded-md text-xs">
          +{calculatedXP} XP potential
        </span>
      </div>
    );
    
    // Reset and close
    setTitle("");
    setDescription("");
    setDeadline("");
    setPriority("Medium");
    setDifficulty("Medium");
    setUrgency("Medium");
    setProjectId(defaultProjectId || "");
    setAssignedTo([]);
    setTags("");
    setEstimatedHours("");
    onClose();
  };

  const calculatedXP = calculateTaskXP(difficulty, urgency);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />
          
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-card border border-border w-full max-w-2xl rounded-2xl shadow-2xl pointer-events-auto flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between p-6 border-b border-border shrink-0">
                <h2 className="text-xl font-bold text-white">Create New Task</h2>
                <button onClick={onClose} className="text-muted-foreground hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                <form id="create-task-form" onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Title & Project Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white flex items-center gap-2">
                        <Type className="w-4 h-4 text-muted-foreground" /> Task Title *
                      </label>
                      <input
                        type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What needs to be done?"
                        className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all" autoFocus
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white flex items-center gap-2">
                        <FolderGit2 className="w-4 h-4 text-muted-foreground" /> Project
                      </label>
                      <select
                        value={projectId} onChange={(e) => setProjectId(e.target.value)}
                        className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-all appearance-none"
                      >
                        <option value="">Personal Task (No Project)</option>
                        {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Attributes Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" /> Deadline *
                      </label>
                      <input
                        type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)}
                        className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-all appearance-none [&::-webkit-calendar-picker-indicator]:invert"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-muted-foreground" /> Difficulty *
                      </label>
                      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty)} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary">
                        {difficultyOptions.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" /> Urgency *
                      </label>
                      <select value={urgency} onChange={(e) => setUrgency(e.target.value as Urgency)} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary">
                        {urgencyOptions.map(u => <option key={u} value={u}>{u}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Priority, Tags & Estimated Hours */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white flex items-center gap-2">
                        <Flag className="w-4 h-4 text-muted-foreground" /> Priority
                      </label>
                      <div className="flex bg-background border border-border rounded-xl p-1 h-[46px]">
                        {priorityOptions.map((opt) => (
                          <button
                            key={opt.value} type="button" onClick={() => setPriority(opt.value)}
                            className={clsx("flex-1 text-sm font-semibold rounded-lg transition-all border border-transparent", priority === opt.value ? opt.color : "text-muted-foreground hover:bg-white/5")}
                          >
                            {opt.value}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white flex items-center gap-2">
                        <Hash className="w-4 h-4 text-muted-foreground" /> Tags (comma separated)
                      </label>
                      <input
                        type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="frontend, bug, urgent"
                        className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" /> Est. Hours
                      </label>
                      <input
                        type="number" value={estimatedHours} onChange={(e) => setEstimatedHours(e.target.value)} placeholder="e.g. 2.5" min="0" step="0.5"
                        className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  {/* Assign Members */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" /> Assign Members
                    </label>
                    <div className="flex flex-wrap gap-2 bg-background border border-border p-3 rounded-xl min-h-[50px]">
                      {users.map(u => (
                        <button
                          key={u.id} type="button"
                          onClick={() => {
                            if (assignedTo.includes(u.id)) setAssignedTo(prev => prev.filter(id => id !== u.id));
                            else setAssignedTo(prev => [...prev, u.id]);
                          }}
                          className={clsx(
                            "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border",
                            assignedTo.includes(u.id) ? "bg-primary/20 text-primary border-primary/30" : "bg-white/5 text-muted-foreground border-transparent hover:bg-white/10"
                          )}
                        >
                          {u.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white flex items-center gap-2">
                      <AlignLeft className="w-4 h-4 text-muted-foreground" /> Description
                    </label>
                    <textarea
                      value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add some details..." rows={3}
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all resize-none"
                    />
                  </div>

                </form>
              </div>

              <div className="p-6 border-t border-border bg-card/50 shrink-0 flex items-center justify-between">
                <div className="flex items-center gap-2 text-accent bg-accent/10 border border-accent/20 px-4 py-2 rounded-xl">
                  <Star className="w-5 h-5 fill-accent" />
                  <span className="font-bold">Calculated Reward: +{calculatedXP} XP</span>
                </div>
                <button
                  type="submit" form="create-task-form"
                  className="bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(108,92,231,0.3)] hover:shadow-[0_0_25px_rgba(108,92,231,0.5)] active:scale-[0.98]"
                >
                  Create Task
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

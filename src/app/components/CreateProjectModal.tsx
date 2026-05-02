import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, Users, FolderGit2, CircleDot } from "lucide-react";
import { useTasks, ProjectStatus, UserRole } from "../context/TasksContext";
import { toast } from "sonner";
import { clsx } from "clsx";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const statusOptions: ProjectStatus[] = ["Live", "On Hold", "Delayed"];

export function CreateProjectModal({ isOpen, onClose }: CreateProjectModalProps) {
  const { addProject, users, currentUser } = useTasks();
  
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState<ProjectStatus>("Live");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([currentUser.id]); // self added by default

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error("Please enter a project name");
      return;
    }
    
    if (!deadline) {
      toast.error("Please select a deadline");
      return;
    }

    addProject({
      name,
      deadline,
      status,
      members: selectedMembers.map(id => ({ userId: id, role: id === currentUser.id ? "Owner" : "Contributor" })),
    });

    toast.success("Project created successfully!");
    
    setName("");
    setDeadline("");
    setStatus("Live");
    setSelectedMembers([currentUser.id]);
    onClose();
  };

  const toggleMember = (id: string) => {
    if (id === currentUser.id) return; // Can't remove self
    setSelectedMembers(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);
  };

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
              className="bg-card border border-border w-full max-w-md rounded-2xl shadow-2xl pointer-events-auto overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-border shrink-0">
                <h2 className="text-xl font-bold text-white">Create New Project</h2>
                <button 
                  onClick={onClose}
                  className="text-muted-foreground hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                <form id="create-project-form" onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white flex items-center gap-2">
                      <FolderGit2 className="w-4 h-4 text-muted-foreground" /> Project Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Q4 Marketing Campaign"
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      autoFocus
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" /> Add Team Members
                    </label>
                    <div className="flex flex-wrap gap-2 bg-background border border-border p-3 rounded-xl min-h-[50px]">
                      {users.map(u => (
                        <button
                          key={u.id} type="button"
                          onClick={() => toggleMember(u.id)}
                          className={clsx(
                            "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border",
                            selectedMembers.includes(u.id) ? "bg-primary/20 text-primary border-primary/30" : "bg-white/5 text-muted-foreground border-transparent hover:bg-white/10",
                            u.id === currentUser.id && "opacity-50 cursor-not-allowed"
                          )}
                        >
                          {u.name} {u.id === currentUser.id && "(You)"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" /> Deadline
                    </label>
                    <input
                      type="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none [&::-webkit-calendar-picker-indicator]:invert"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white flex items-center gap-2">
                      <CircleDot className="w-4 h-4 text-muted-foreground" /> Initial Status
                    </label>
                    <div className="flex bg-background border border-border rounded-xl p-1 h-[50px]">
                      {statusOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setStatus(opt)}
                          className={clsx(
                            "flex-1 text-sm font-semibold rounded-lg transition-all border border-transparent",
                            status === opt
                              ? "bg-primary/20 text-primary border-primary/30"
                              : "text-muted-foreground hover:bg-white/5"
                          )}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-border bg-card/50 shrink-0">
                <button
                  type="submit"
                  form="create-project-form"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(108,92,231,0.3)] hover:shadow-[0_0_25px_rgba(108,92,231,0.5)] active:scale-[0.98]"
                >
                  Create Project
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

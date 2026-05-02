import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, UploadCloud, FileText, Tag, Hash, Archive, Info } from "lucide-react";
import { useTasks, ResourceSection } from "../context/TasksContext";
import { toast } from "sonner";
import { clsx } from "clsx";

interface UploadResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

const sections: ResourceSection[] = [
  "Design Assets", "Backend Docs", "Frontend Docs", "API Docs", "Reports", "Deployment Files", "Other Resources"
];

const fileTypes = ["PDF", "DOCX", "XLSX", "PPTX", "ZIP", "PNG", "JPG", "SVG", "FIG", "JSON", "TS", "JS"];

export function UploadResourceModal({ isOpen, onClose, projectId }: UploadResourceModalProps) {
  const { addResource } = useTasks();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [milestone, setMilestone] = useState("");
  const [version, setVersion] = useState("1.0");
  const [section, setSection] = useState<ResourceSection>("Design Assets");
  const [fileType, setFileType] = useState("PDF");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !milestone.trim() || !version.trim()) {
      toast.error("Please fill in all required fields (Title, Milestone, Version)");
      return;
    }

    addResource({
      projectId,
      title,
      description,
      milestone,
      version,
      section,
      fileType,
      fileSize: (Math.random() * 10 + 1).toFixed(1) + "MB", // Mock file size
    });

    toast.success("Resource uploaded successfully!");
    
    setTitle("");
    setDescription("");
    setMilestone("");
    setVersion("1.0");
    setSection("Design Assets");
    setFileType("PDF");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
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
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <UploadCloud className="w-5 h-5 text-secondary" /> Upload Resource
                </h2>
                <button onClick={onClose} className="text-muted-foreground hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                <form id="upload-resource-form" onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Title & Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" /> Document Title *
                      </label>
                      <input
                        type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Final UI Mockups"
                        className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-white focus:border-primary transition-all" autoFocus
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white flex items-center gap-2">
                        <Archive className="w-4 h-4 text-muted-foreground" /> Section
                      </label>
                      <select
                        value={section} onChange={(e) => setSection(e.target.value as ResourceSection)}
                        className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-white focus:border-primary transition-all appearance-none"
                      >
                        {sections.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Milestone & Version */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white flex items-center gap-2">
                        <Tag className="w-4 h-4 text-muted-foreground" /> Milestone *
                      </label>
                      <input
                        type="text" value={milestone} onChange={(e) => setMilestone(e.target.value)} placeholder="e.g. Phase 1: Design"
                        className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-white focus:border-primary transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white flex items-center gap-2">
                        <Hash className="w-4 h-4 text-muted-foreground" /> Version *
                      </label>
                      <input
                        type="text" value={version} onChange={(e) => setVersion(e.target.value)} placeholder="1.0"
                        className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-white focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground" /> File Type (Mock)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {fileTypes.map(ft => (
                        <button
                          key={ft} type="button" onClick={() => setFileType(ft)}
                          className={clsx(
                            "px-3 py-1.5 text-xs font-bold rounded-md border transition-colors",
                            fileType === ft ? "bg-secondary/20 text-secondary border-secondary/50" : "bg-background text-muted-foreground border-border hover:border-white/20"
                          )}
                        >
                          {ft}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white flex items-center gap-2">
                      <Info className="w-4 h-4 text-muted-foreground" /> Description (Optional)
                    </label>
                    <textarea
                      value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add any details about this resource..." rows={3}
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white focus:border-primary transition-all resize-none"
                    />
                  </div>

                  {/* Mock Upload Area */}
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-background/50 hover:bg-background transition-colors cursor-pointer group">
                    <div className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center mx-auto mb-3 group-hover:border-secondary/50 group-hover:text-secondary transition-colors">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-medium text-white mb-1">Click to browse or drag and drop</p>
                    <p className="text-xs text-muted-foreground">Supported files: PDF, DOCX, FIG, Images, ZIP</p>
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-border bg-card/50 shrink-0 flex items-center justify-end">
                <button
                  type="submit" form="upload-resource-form"
                  className="bg-secondary hover:bg-secondary/90 text-white font-semibold py-2.5 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] active:scale-[0.98]"
                >
                  Upload File
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
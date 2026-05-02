import { useState } from "react";
import { FileText, Download, Clock, Image, FileCode, FileArchive, Search, Filter } from "lucide-react";
import { ProjectResource, useTasks } from "../context/TasksContext";
import { clsx } from "clsx";
import { motion } from "motion/react";
import { format } from "date-fns";

const getFileIcon = (fileType: string) => {
  switch (fileType.toUpperCase()) {
    case "PDF": return <FileText className="w-8 h-8 text-rose-400" />;
    case "FIG":
    case "PNG":
    case "JPG": return <Image className="w-8 h-8 text-purple-400" />;
    case "JSON":
    case "JS":
    case "TS": return <FileCode className="w-8 h-8 text-yellow-400" />;
    case "ZIP": return <FileArchive className="w-8 h-8 text-slate-400" />;
    default: return <FileText className="w-8 h-8 text-sky-400" />;
  }
};

export function ResourceList({ resources }: { resources: ProjectResource[] }) {
  const { users } = useTasks();
  const [search, setSearch] = useState("");
  const [filterSection, setFilterSection] = useState("All");

  const sections = ["All", ...Array.from(new Set(resources.map(r => r.section)))];

  const filtered = resources.filter(r => {
    if (filterSection !== "All" && r.section !== filterSection) return false;
    if (search && !r.title.toLowerCase().includes(search.toLowerCase()) && !r.milestone.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }).sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());

  const getMemberName = (id: string) => users.find(u => u.id === id)?.name || "Unknown";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 bg-card border border-border p-4 rounded-xl">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search resources or milestones..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-background border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div className="relative w-full sm:w-48">
          <Filter className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <select 
            value={filterSection}
            onChange={e => setFilterSection(e.target.value)}
            className="w-full bg-background border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors appearance-none"
          >
            {sections.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No resources found. Try adjusting your filters.
          </div>
        ) : (
          filtered.map((resource, i) => (
            <motion.div 
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-card text-muted-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                <Clock className="w-4 h-4" />
              </div>
              
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-border bg-card shadow hover:border-primary/50 transition-colors">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-background rounded-lg border border-border">
                      {getFileIcon(resource.fileType)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">{resource.title}</h4>
                      <span className="text-xs text-primary font-medium px-2 py-0.5 bg-primary/10 rounded-full border border-primary/20">
                        {resource.section}
                      </span>
                    </div>
                  </div>
                  <button className="p-2 text-muted-foreground hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Download">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {resource.description}
                </p>

                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-medium text-muted-foreground bg-background p-2.5 rounded-lg border border-border">
                  <div className="flex items-center gap-1">
                    <span className="text-white/60">Milestone:</span> <span className="text-white">{resource.milestone}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-white/60">Version:</span> <span className="text-white">v{resource.version}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-white/60">By:</span> <span className="text-white">{getMemberName(resource.uploadedBy)}</span>
                  </div>
                  <div className="flex items-center gap-1 ml-auto">
                    <span>{format(new Date(resource.uploadDate), "MMM d, yyyy")}</span>
                    <span className="w-1 h-1 bg-border rounded-full mx-1"/>
                    <span>{resource.fileSize}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
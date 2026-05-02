import { FileText, FolderGit2, Calendar, Download } from "lucide-react";
import { useTasks } from "../context/TasksContext";
import { ResourceList } from "../components/ResourceList";
import { Link } from "react-router";

export function Resources() {
  const { resources, projects } = useTasks();

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 md:pb-0 h-full flex flex-col">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <FileText className="w-8 h-8 text-primary" /> Global Resources
        </h1>
        <p className="text-muted-foreground">Access milestone documentation and deliverables across all projects.</p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
         <div className="flex items-center justify-between mb-6">
           <h2 className="text-xl font-semibold text-white">All Documentation</h2>
           <Link to="/projects" className="text-sm text-primary hover:text-primary/80 transition-colors font-medium">Upload new resource via Projects</Link>
         </div>
         <ResourceList resources={resources} />
      </div>
    </div>
  );
}
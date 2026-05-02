import { useState } from "react";
import { BarChart3, Download, FileSpreadsheet, FileText, Calendar, Users, FolderGit2 } from "lucide-react";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { useTasks } from "../context/TasksContext";

export function Reports() {
  const { tasks, projects, users } = useTasks();
  const [reportType, setReportType] = useState<string>("monthly");

  const handleExport = (format: "excel" | "csv" | "pdf") => {
    if (format === "pdf") {
      toast.info("PDF export is being configured for the new Plan-IT release. Try Excel for now.");
      return;
    }

    let data = [];

    if (reportType === "monthly") {
      data = tasks.map(t => ({
        ID: t.id,
        Task: t.title,
        Status: t.status,
        Deadline: t.deadline,
        XP: t.points,
      }));
    } else if (reportType === "employee") {
      data = users.map(u => ({
        Name: u.name,
        TasksAssigned: tasks.filter(t => t.assignedTo?.includes(u.id)).length,
        TasksCompleted: tasks.filter(t => t.assignedTo?.includes(u.id) && t.status === "approved").length,
        TotalXP: tasks.filter(t => t.assignedTo?.includes(u.id) && t.status === "approved").reduce((sum, t) => sum + t.points, 0)
      }));
    } else if (reportType === "project") {
      data = projects.map(p => ({
        ProjectName: p.name,
        Status: p.status,
        TotalTasks: tasks.filter(t => t.projectId === p.id).length,
        CompletedTasks: tasks.filter(t => t.projectId === p.id && t.status === "approved").length,
      }));
    } else {
      data = [{ Message: "No data available for this report type yet." }];
    }

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");

    if (format === "csv") {
      const csv = XLSX.utils.sheet_to_csv(ws);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `Plan-IT_Report_${reportType}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      XLSX.writeFile(wb, `Plan-IT_Report_${reportType}.xlsx`);
    }

    toast.success(`Exported ${reportType} report as ${format.toUpperCase()}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 md:pb-0 h-full flex flex-col">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-primary" /> Reports & Analytics
        </h1>
        <p className="text-muted-foreground">Export task sheets, HR reports, and team performance metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-xl relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
            <h2 className="text-xl font-semibold text-white mb-6 relative z-10 flex items-center gap-2">
               Generate Report
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
              <button 
                onClick={() => setReportType("monthly")}
                className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all ${reportType === "monthly" ? "bg-primary/10 border-primary" : "bg-background border-border hover:border-primary/50"}`}
              >
                <div className={`p-2 rounded-lg ${reportType === "monthly" ? "bg-primary text-white" : "bg-white/5 text-muted-foreground"}`}><Calendar className="w-5 h-5" /></div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Monthly Task Sheet</h3>
                  <p className="text-xs text-muted-foreground">All tasks with deadlines and XP</p>
                </div>
              </button>
              
              <button 
                onClick={() => setReportType("employee")}
                className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all ${reportType === "employee" ? "bg-primary/10 border-primary" : "bg-background border-border hover:border-primary/50"}`}
              >
                <div className={`p-2 rounded-lg ${reportType === "employee" ? "bg-primary text-white" : "bg-white/5 text-muted-foreground"}`}><Users className="w-5 h-5" /></div>
                <div>
                  <h3 className="font-semibold text-white mb-1">By Employee (HR)</h3>
                  <p className="text-xs text-muted-foreground">Performance and completion stats</p>
                </div>
              </button>
              
              <button 
                onClick={() => setReportType("project")}
                className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all ${reportType === "project" ? "bg-primary/10 border-primary" : "bg-background border-border hover:border-primary/50"}`}
              >
                <div className={`p-2 rounded-lg ${reportType === "project" ? "bg-primary text-white" : "bg-white/5 text-muted-foreground"}`}><FolderGit2 className="w-5 h-5" /></div>
                <div>
                  <h3 className="font-semibold text-white mb-1">By Project</h3>
                  <p className="text-xs text-muted-foreground">Milestones and progress overview</p>
                </div>
              </button>
            </div>
            
            <div className="mt-8 border-t border-border pt-6">
              <h3 className="text-sm font-medium text-white mb-4">Export Options</h3>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => handleExport("excel")}
                  className="flex items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 px-6 py-2.5 rounded-xl font-medium transition-all"
                >
                  <FileSpreadsheet className="w-5 h-5" /> Export Excel
                </button>
                <button 
                  onClick={() => handleExport("csv")}
                  className="flex items-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 border border-blue-500/20 px-6 py-2.5 rounded-xl font-medium transition-all"
                >
                  <FileText className="w-5 h-5" /> Export CSV
                </button>
                <button 
                  onClick={() => handleExport("pdf")}
                  className="flex items-center gap-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 px-6 py-2.5 rounded-xl font-medium transition-all"
                >
                  <Download className="w-5 h-5" /> Export PDF
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-card border border-border rounded-2xl p-6 shadow-xl">
             <h2 className="text-lg font-semibold text-white mb-4">Recent Reports</h2>
             <div className="space-y-3">
               {[1, 2, 3].map(i => (
                 <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-background border border-border hover:border-primary/50 transition-colors group cursor-pointer">
                   <div className="flex items-center gap-3">
                     <FileSpreadsheet className="w-5 h-5 text-emerald-500" />
                     <div>
                       <h4 className="text-sm font-medium text-white group-hover:text-primary transition-colors">Q2_HR_Report.xlsx</h4>
                       <p className="text-xs text-muted-foreground">{i * 2} days ago</p>
                     </div>
                   </div>
                   <Download className="w-4 h-4 text-muted-foreground" />
                 </div>
               ))}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
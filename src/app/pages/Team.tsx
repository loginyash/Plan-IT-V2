import { Users, Award, Shield, User } from "lucide-react";
import { useTasks } from "../context/TasksContext";
import { clsx } from "clsx";

export function Team() {
  const { users } = useTasks();

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 md:pb-0 h-full flex flex-col">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Users className="w-8 h-8 text-primary" /> Team Directory
        </h1>
        <p className="text-muted-foreground">Discover, connect, and collaborate with everyone across Plan-IT.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map(u => (
          <div key={u.id} className="bg-card border border-border rounded-2xl p-6 shadow-xl flex items-center gap-4 hover:border-primary/50 transition-colors">
             <div className="w-12 h-12 rounded-full border border-border bg-background flex items-center justify-center shadow-inner overflow-hidden relative">
               {u.avatar ? (
                 <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
               ) : (
                 <span className="font-bold text-white text-lg">{u.name.charAt(0)}</span>
               )}
             </div>
             <div>
               <h3 className="font-bold text-white text-lg">{u.name}</h3>
               <span className="text-xs text-muted-foreground bg-white/5 px-2 py-0.5 rounded border border-border">Member</span>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
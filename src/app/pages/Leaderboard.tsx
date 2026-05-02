import { Trophy, Star, ChevronUp, ChevronDown, Minus, TrendingUp } from "lucide-react";
import { clsx } from "clsx";
import { motion } from "motion/react";
import { useTasks } from "../context/TasksContext";

export function Leaderboard() {
  const { aiProfile } = useTasks();

  const leaderboardData = [
    { id: 1, name: "Sarah Jenkins", points: 4250, aiScore: 92, avatar: "https://images.unsplash.com/photo-1725270467420-2981da624bf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwZmFjZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NzYzMzA3M3ww&ixlib=rb-4.1.0&q=80&w=1080", trend: "up", role: "Design Lead" },
    { id: 2, name: "Jatin (You)", points: 3980, aiScore: aiProfile.score, avatar: "https://images.unsplash.com/photo-1740252117013-4fb21771e7ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwcm9mZXNzaW9uYWwlMjBhdmF0YXJ8ZW58MXx8fHwxNzc3NjMzMDY2fDA&ixlib=rb-4.1.0&q=80&w=1080", trend: "up", role: "Product Manager" },
    { id: 3, name: "Marcus Chen", points: 3850, aiScore: 84, avatar: "https://i.pravatar.cc/150?img=33", trend: "down", role: "Senior Engineer" },
    { id: 4, name: "Elena Rodriguez", points: 3200, aiScore: 78, avatar: "https://i.pravatar.cc/150?img=47", trend: "same", role: "Marketing" },
    { id: 5, name: "David Kim", points: 2950, aiScore: 72, avatar: "https://i.pravatar.cc/150?img=11", trend: "up", role: "Sales" },
    { id: 6, name: "Alex Thompson", points: 2800, aiScore: 65, avatar: "https://i.pravatar.cc/150?img=15", trend: "down", role: "Support" },
  ];

  const top3 = [leaderboardData[1], leaderboardData[0], leaderboardData[2]]; // Ordered for podium: 2nd, 1st, 3rd

  return (
    <div className="space-y-10 pb-20 md:pb-0">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Global Leaderboard</h1>
        <p className="text-muted-foreground">This week's top performers</p>
      </div>

      {/* Top 3 Podium */}
      <div className="flex justify-center items-end h-[300px] gap-2 sm:gap-6 mt-8">
        {top3.map((user, index) => {
          const isFirst = index === 1;
          const isSecond = index === 0;
          
          const rank = isFirst ? 1 : isSecond ? 2 : 3;
          const height = isFirst ? "h-48" : isSecond ? "h-36" : "h-28";
          const bgColor = isFirst ? "from-accent/40 to-accent/10 border-accent/50" : 
                          isSecond ? "from-slate-300/40 to-slate-300/10 border-slate-300/50" : 
                          "from-orange-400/40 to-orange-400/10 border-orange-400/50";
          const badgeColor = isFirst ? "bg-accent text-black" : 
                             isSecond ? "bg-slate-300 text-black" : 
                             "bg-orange-400 text-black";

          return (
            <motion.div 
              key={user.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, type: "spring" }}
              className="flex flex-col items-center w-28 sm:w-36 relative group"
            >
              <div className="relative mb-4">
                <div className={clsx("w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-gradient-to-b", bgColor)}>
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full border-2 border-background" />
                </div>
                <div className={clsx("absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 border-background shadow-lg", badgeColor)}>
                  {rank}
                </div>
                {isFirst && (
                  <Trophy className="absolute -top-6 left-1/2 -translate-x-1/2 w-8 h-8 text-accent drop-shadow-[0_0_10px_rgba(255,193,7,0.8)]" />
                )}
              </div>
              
              <div className={clsx("w-full rounded-t-2xl bg-gradient-to-b border-t border-x flex flex-col items-center pt-4 shadow-xl", bgColor, height)}>
                <span className="font-bold text-white text-sm sm:text-base truncate w-full text-center px-2">{user.name.split(' ')[0]}</span>
                <span className="text-xs sm:text-sm font-bold text-white/80 mt-1 flex items-center gap-1">
                  {user.points} <Star className="w-3 h-3 fill-current" />
                </span>
                <span className="mt-1 text-[10px] sm:text-xs font-medium text-white/70 flex items-center gap-1 bg-background/50 px-2 py-0.5 rounded-full">
                  Score: {user.aiScore}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* List */}
      <div className="bg-card border border-border rounded-2xl p-2 sm:p-4 shadow-xl space-y-2">
        {leaderboardData.map((user, index) => (
          <div 
            key={user.id}
            className={clsx(
              "flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl transition-colors",
              user.name.includes("(You)") ? "bg-primary/10 border border-primary/20" : "hover:bg-white/5 border border-transparent"
            )}
          >
            <div className="w-6 sm:w-8 font-bold text-muted-foreground text-center shrink-0">
              #{index + 1}
            </div>
            
            <div className="relative shrink-0">
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-border" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold truncate flex items-center gap-2">
                {user.name}
                {user.name.includes("(You)") && <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">You</span>}
              </h3>
              <p className="text-xs text-muted-foreground truncate">{user.role}</p>
            </div>

            <div className="flex flex-col items-end shrink-0 hidden sm:flex px-4 border-r border-border/50">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Performance Score
              </span>
              <span className="font-bold text-emerald-400">{user.aiScore}</span>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4 shrink-0 w-24 justify-end">
              <div className="text-right">
                <div className="font-bold text-white flex items-center justify-end gap-1">
                  {user.points} <Star className="w-4 h-4 text-accent fill-accent" />
                </div>
                {/* Mobile only score */}
                <div className="sm:hidden text-[10px] text-emerald-400 font-medium text-right">
                  Score: {user.aiScore}
                </div>
              </div>
              
              <div className="w-6 justify-center hidden sm:flex shrink-0">
                {user.trend === 'up' && <ChevronUp className="w-5 h-5 text-secondary" />}
                {user.trend === 'down' && <ChevronDown className="w-5 h-5 text-destructive" />}
                {user.trend === 'same' && <Minus className="w-5 h-5 text-muted-foreground" />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Gift, Lock, Unlock, Star, Sparkles } from "lucide-react";
import { clsx } from "clsx";
import { motion } from "motion/react";
import { useTasks } from "../context/TasksContext";

const rewards = [
  { id: 1, title: "$50 Amazon Card", pointsCost: 5000, type: "gift", unlocked: false },
  { id: 2, title: "Half-Day Friday", pointsCost: 10000, type: "time", unlocked: false },
  { id: 3, title: "Custom Slack Emoji", pointsCost: 2000, type: "fun", unlocked: true },
  { id: 4, title: "Free Lunch", pointsCost: 3500, type: "gift", unlocked: true },
  { id: 5, title: "WFH Week", pointsCost: 25000, type: "time", unlocked: false },
  { id: 6, title: "Coffee on CEO", pointsCost: 1500, type: "gift", unlocked: true },
];

export function Rewards() {
  const { totalPoints } = useTasks();

  return (
    <div className="space-y-8 pb-20 md:pb-0">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
            Reward Store <Sparkles className="w-6 h-6 text-accent" />
          </h1>
          <p className="text-muted-foreground">Exchange your hard-earned points for real rewards.</p>
        </div>
        <div className="bg-card border border-border px-6 py-3 rounded-2xl flex items-center gap-3 shadow-lg">
          <span className="text-sm font-medium text-muted-foreground">Your Balance</span>
          <span className="text-2xl font-bold text-white flex items-center gap-1.5">
            {totalPoints.toLocaleString()} <Star className="w-5 h-5 text-accent fill-accent" />
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward, index) => {
          const canAfford = totalPoints >= reward.pointsCost;
          const status = reward.unlocked ? "claimed" : canAfford ? "available" : "locked";

          return (
            <motion.div
              key={reward.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, type: "spring" }}
              className={clsx(
                "relative rounded-3xl p-6 border-2 flex flex-col items-center text-center overflow-hidden transition-all duration-300 group hover:-translate-y-1",
                status === "claimed" ? "bg-card border-secondary/50 shadow-[0_0_15px_rgba(34,197,94,0.1)]" :
                status === "available" ? "bg-card border-primary/50 shadow-[0_0_20px_rgba(108,92,231,0.2)]" :
                "bg-background border-border opacity-70"
              )}
            >
              {status === "claimed" && (
                <div className="absolute top-3 right-3 bg-secondary/20 text-secondary text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                  <Unlock className="w-3 h-3" /> Claimed
                </div>
              )}
              {status === "locked" && (
                <div className="absolute top-3 right-3 bg-background border border-border text-muted-foreground text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Locked
                </div>
              )}

              {/* Icon Background */}
              <div className={clsx(
                "w-20 h-20 rounded-full flex items-center justify-center mb-4 relative z-10",
                status === "claimed" ? "bg-secondary/20 text-secondary" :
                status === "available" ? "bg-primary/20 text-primary" :
                "bg-white/5 text-muted-foreground"
              )}>
                <Gift className="w-10 h-10" />
              </div>

              {/* Progress Bar for Locked */}
              {status === "locked" && (
                <div className="w-full absolute bottom-0 left-0 h-1.5 bg-background">
                  <div 
                    className="h-full bg-primary/50 rounded-r-full" 
                    style={{ width: `${(totalPoints / reward.pointsCost) * 100}%` }}
                  />
                </div>
              )}

              <h3 className="text-lg font-bold text-white mb-2 relative z-10">{reward.title}</h3>
              
              <div className="flex items-center gap-1.5 text-accent font-bold bg-accent/10 px-3 py-1.5 rounded-lg mb-4">
                {reward.pointsCost.toLocaleString()} <Star className="w-4 h-4 fill-accent" />
              </div>

              {status === "available" && (
                <button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 rounded-xl transition-colors mt-auto">
                  Redeem Reward
                </button>
              )}
              {status === "claimed" && (
                <button disabled className="w-full bg-secondary/20 text-secondary font-semibold py-2.5 rounded-xl mt-auto cursor-not-allowed">
                  Already Claimed
                </button>
              )}
              {status === "locked" && (
                <div className="w-full bg-background border border-border text-muted-foreground font-semibold py-2.5 rounded-xl mt-auto flex justify-center items-center gap-2">
                  Need {(reward.pointsCost - totalPoints).toLocaleString()} more
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

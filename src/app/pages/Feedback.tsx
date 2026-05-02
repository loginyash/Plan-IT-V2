import { useState } from "react";
import { Shield, Send, Lock, MessageSquareDashed } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { clsx } from "clsx";
import { useTasks } from "../context/TasksContext";

const tags = ["Culture", "Suggestions", "Management", "Process", "Appreciation", "Concerns"];

export function Feedback() {
  const [feedback, setFeedback] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addAnonymousPost } = useTasks();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return toast.error("Feedback cannot be empty");

    setIsSubmitting(true);
    setTimeout(() => {
      addAnonymousPost(feedback, selectedTag || undefined);
      setIsSubmitting(false);
      setFeedback("");
      setSelectedTag(null);
      toast.success("Feedback submitted anonymously. Thank you!");
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20 md:pb-0 h-full flex flex-col">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Shield className="w-8 h-8 text-primary" /> Anonymous Feedback
        </h1>
        <p className="text-muted-foreground">Share your thoughts safely. Your identity is 100% hidden from HR and Management.</p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="space-y-3">
            <label className="text-sm font-medium text-white flex items-center gap-2">
              <MessageSquareDashed className="w-4 h-4 text-muted-foreground" /> Your Message
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="What's on your mind? (100% Anonymous)"
              rows={6}
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all resize-none shadow-inner"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-white">Select a Category (Optional)</label>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  className={clsx(
                    "px-4 py-2 rounded-xl text-sm font-medium transition-all border",
                    selectedTag === tag 
                      ? "bg-primary/20 text-primary border-primary/30 shadow-[0_0_10px_rgba(108,92,231,0.2)]" 
                      : "bg-background text-muted-foreground border-border hover:border-primary/50"
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="w-4 h-4" />
              <span>No IP, Name, or Department tracking.</span>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting || !feedback.trim()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-[0_0_15px_rgba(108,92,231,0.3)] hover:shadow-[0_0_20px_rgba(108,92,231,0.5)]"
            >
              {isSubmitting ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-5 h-5" /> Submit Anonymously
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5 flex items-start gap-4">
        <Shield className="w-6 h-6 text-emerald-500 shrink-0" />
        <div>
          <h3 className="text-emerald-500 font-semibold mb-1">Our Privacy Guarantee</h3>
          <p className="text-sm text-emerald-500/80">Plan-IT uses a secure one-way encryption model for this module. HR can only read the content and tags. They cannot trace back the user session, ID, or IP address. Use this to improve our office culture safely!</p>
        </div>
      </div>
    </div>
  );
}
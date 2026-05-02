import { useState, useEffect } from "react";
import { Globe, Heart, MessageCircle, Flame, Send, Image, MoreHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTasks } from "../context/TasksContext";
import { clsx } from "clsx";
import { toast } from "sonner";

interface Post {
  id: string;
  author: string;
  avatar: string;
  role: string;
  time: string;
  content: string;
  likes: number;
  claps: number;
  fires: number;
  comments: number;
  hasLiked?: boolean;
  isAnonymous?: boolean;
  category?: string;
}

export function Community() {
  const { currentUser, posts: contextPosts, addPost } = useTasks();
  const [posts, setPosts] = useState<Post[]>(contextPosts);
  const [newPost, setNewPost] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setPosts(contextPosts);
  }, [contextPosts]);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      addPost({
        author: currentUser.name,
        avatar: currentUser.avatar || "https://i.pravatar.cc/150?img=9",
        role: "Project Manager",
        time: "Just now",
        content: newPost,
        likes: 0,
        claps: 0,
        fires: 0,
        comments: 0,
        isAnonymous: false
      });
      setNewPost("");
      setIsSubmitting(false);
      toast.success("Posted to Community!");
    }, 500);
  };

  const handleReaction = (postId: string, type: 'likes' | 'claps' | 'fires') => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, [type]: p[type] + 1 };
      }
      return p;
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 md:pb-0 min-h-full">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Globe className="w-8 h-8 text-primary" /> Community Feed
        </h1>
        <p className="text-muted-foreground">Share wins, updates, ask questions, and appreciate your team.</p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5 shadow-xl relative">
        <form onSubmit={handlePostSubmit} className="flex gap-4">
          <img src={currentUser.avatar || "https://i.pravatar.cc/150?img=9"} alt="You" className="w-12 h-12 rounded-full border-2 border-border hidden sm:block" />
          <div className="flex-1 flex flex-col gap-3">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's happening? Share a win or an update..."
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all resize-none shadow-inner"
              rows={3}
            />
            <div className="flex justify-between items-center">
              <button type="button" className="text-muted-foreground hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors">
                <Image className="w-5 h-5" />
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !newPost.trim()}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-xl font-semibold transition-all shadow-[0_0_15px_rgba(108,92,231,0.3)] flex items-center gap-2"
              >
                {isSubmitting ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send className="w-4 h-4" /> Post</>}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="space-y-6">
        <AnimatePresence>
          {posts.map(post => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-2xl p-6 shadow-lg"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full border border-border" />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-white">{post.author}</h3>
                      <span className="text-xs text-muted-foreground bg-background px-2 py-0.5 rounded border border-border">{post.role}</span>
                      {post.isAnonymous && post.category && (
                        <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded border border-primary/30">{post.category}</span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{post.time}</span>
                  </div>
                </div>
                <button className="text-muted-foreground hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              <p className="text-white mb-6 leading-relaxed text-sm md:text-base">
                {post.content}
              </p>

              <div className="flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-center gap-2 sm:gap-4">
                  <button onClick={() => handleReaction(post.id, 'likes')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors">
                    <Heart className="w-4 h-4" /> <span className="text-sm font-medium">{post.likes}</span>
                  </button>
                  <button onClick={() => handleReaction(post.id, 'claps')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-emerald-500 hover:bg-emerald-500/10 transition-colors">
                    <span className="text-sm">👏</span> <span className="text-sm font-medium">{post.claps}</span>
                  </button>
                  <button onClick={() => handleReaction(post.id, 'fires')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-orange-500 hover:bg-orange-500/10 transition-colors">
                    <Flame className="w-4 h-4" /> <span className="text-sm font-medium">{post.fires}</span>
                  </button>
                </div>
                
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-muted-foreground hover:text-white hover:bg-white/5 transition-colors">
                  <MessageCircle className="w-4 h-4" /> 
                  <span className="text-sm font-medium hidden sm:block">Comments ({post.comments})</span>
                  <span className="text-sm font-medium sm:hidden">{post.comments}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
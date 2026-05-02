import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, ArrowRight, ShieldCheck, Zap, Users, ServerCrash, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth, AuthUser } from "../context/AuthContext";
import { toast } from "sonner";

export function Login() {
  const [isEmailFlow, setIsEmailFlow] = useState(false);
  const [showConnectionError, setShowConnectionError] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleMicrosoftLogin = () => {
    // Mocking Microsoft OAuth Flow
    toast.success("Authenticated with Microsoft successfully!");
    const mockUser: AuthUser = {
      id: "u1",
      name: "Jatin",
      email: "jatin@plan-it.com",
      avatar: "https://images.unsplash.com/photo-1740252117013-4fb21771e7ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwcm9mZXNzaW9uYWwlMjBhdmF0YXJ8ZW58MXx8fHwxNzc3NjMzMDY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      department: "Product",
      role: "Project Manager",
    };
    login(mockUser);
    navigate("/");
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Signed in successfully!");
    const mockUser: AuthUser = {
      id: "u1",
      name: "Jatin",
      email: "jatin@plan-it.com",
      avatar: "https://images.unsplash.com/photo-1740252117013-4fb21771e7ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwcm9mZXNzaW9uYWwlMjBhdmF0YXJ8ZW58MXx8fHwxNzc3NjMzMDY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      department: "Product",
      role: "Project Manager",
    };
    login(mockUser);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Left Column - Branding */}
      <div className="hidden md:flex flex-1 flex-col justify-between p-12 bg-card relative overflow-hidden border-r border-border">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(108,92,231,0.5)]">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#a29bfe] tracking-wider">
            Plan-IT
          </h1>
        </div>

        <div className="relative z-10 max-w-md">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Smart Work.<br />
            Better Teams.<br />
            <span className="text-primary">Smarter Growth.</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Join thousands of teams using Plan-IT to verify performance, track project milestones, and collaborate intelligently.
          </p>
          
          <div className="space-y-4 text-sm text-white/80 font-medium">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              Verified Scoring & Performance AI
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                <Users className="w-4 h-4 text-secondary" />
              </div>
              Real-time Team Collaboration
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm text-muted-foreground">
          © 2026 Plan-IT Inc. All rights reserved.
        </div>
      </div>

      {/* Right Column - Login */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative">
        <div className="w-full max-w-md space-y-8">
          
          <AnimatePresence>
            {showConnectionError && (
              <motion.div 
                initial={{ opacity: 0, y: -20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, scale: 0.95, height: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-4"
              >
                <div className="flex items-start gap-3">
                  <ServerCrash className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-red-200">Database Connection Failed</h3>
                    <p className="text-xs text-red-300/80 mt-1 mb-3">
                      Plan-IT couldn't connect to the primary database cluster. Some features may be degraded.
                    </p>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => navigate('/setup')}
                        className="text-xs font-medium text-white bg-red-500/20 hover:bg-red-500/30 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                      >
                        Fix Connection <ChevronRight className="w-3 h-3" />
                      </button>
                      <button 
                        onClick={() => setShowConnectionError(false)}
                        className="text-xs text-red-300/60 hover:text-red-300"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-center md:hidden mb-8 flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(108,92,231,0.5)] mb-4">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#a29bfe] tracking-wider">
              Plan-IT
            </h1>
            <p className="text-muted-foreground mt-2">Smart Work. Better Teams. Smarter Growth.</p>
          </div>

          <div className="text-center md:text-left space-y-2">
            <h2 className="text-3xl font-bold text-white">Welcome back</h2>
            <p className="text-muted-foreground">Sign in to your account to continue</p>
          </div>

          {!isEmailFlow ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <button 
                onClick={handleMicrosoftLogin}
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-black font-semibold py-3.5 px-4 rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
              >
                <svg viewBox="0 0 21 21" className="w-5 h-5">
                  <path fill="#f25022" d="M1 1h9v9H1z" />
                  <path fill="#00a4ef" d="M11 1h9v9h-9z" />
                  <path fill="#7fba00" d="M1 11h9v9H1z" />
                  <path fill="#ffb900" d="M11 11h9v9h-9z" />
                </svg>
                Sign in with Microsoft
              </button>

              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-border"></div>
                <span className="flex-shrink-0 mx-4 text-muted-foreground text-sm font-medium">Or</span>
                <div className="flex-grow border-t border-border"></div>
              </div>

              <button 
                onClick={() => setIsEmailFlow(true)}
                className="w-full flex items-center justify-center gap-3 bg-card hover:bg-white/5 border border-border text-white font-semibold py-3.5 px-4 rounded-xl transition-all active:scale-[0.98]"
              >
                <Mail className="w-5 h-5" />
                Continue with Email
              </button>
            </motion.div>
          ) : (
            <motion.form 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} 
              onSubmit={handleEmailLogin}
              className="space-y-4"
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Work Email</label>
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  required
                  className="w-full bg-background border border-border rounded-xl px-4 py-3.5 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-white">Password</label>
                  <button type="button" className="text-xs text-primary hover:underline">Forgot?</button>
                </div>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  required
                  className="w-full bg-background border border-border rounded-xl px-4 py-3.5 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
                />
              </div>
              
              <button 
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(108,92,231,0.3)] hover:shadow-[0_0_25px_rgba(108,92,231,0.5)] active:scale-[0.98] mt-6"
              >
                Sign In <ArrowRight className="w-4 h-4" />
              </button>

              <button 
                type="button"
                onClick={() => setIsEmailFlow(false)}
                className="w-full text-sm text-muted-foreground hover:text-white transition-colors py-2 mt-4"
              >
                Back to all login options
              </button>
            </motion.form>
          )}

          <div className="pt-8 text-center text-xs text-muted-foreground">
            By signing in, you agree to our <a href="#" className="underline hover:text-white">Terms of Service</a> and <a href="#" className="underline hover:text-white">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}

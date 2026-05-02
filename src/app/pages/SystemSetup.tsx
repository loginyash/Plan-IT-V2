import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, ServerCrash, RefreshCcw, CheckCircle2, ChevronRight, Activity, ShieldAlert, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

export function SystemSetup() {
  const navigate = useNavigate();
  const [connectionState, setConnectionState] = useState<'failed' | 'connecting' | 'success'>('failed');
  
  const handleRetry = () => {
    setConnectionState('connecting');
    // Simulate connection attempt
    setTimeout(() => {
      setConnectionState('success');
      // Redirect after success
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-6 font-sans text-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#111827] border border-white/10 mb-4 shadow-lg">
            <Activity className="w-6 h-6 text-[#7C3AED]" />
          </div>
          <h1 className="text-2xl font-semibold mb-2 tracking-tight">System Initialization</h1>
          <p className="text-[#9CA3AF] text-sm">
            Setting up your Plan-IT workspace environment
          </p>
        </div>

        <div className="bg-[#111827] rounded-2xl border border-white/5 shadow-2xl overflow-hidden">
          <div className="p-6">
            <AnimatePresence mode="wait">
              {connectionState === 'failed' && (
                <motion.div
                  key="failed"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#EF4444]/10 flex items-center justify-center mb-4">
                    <ServerCrash className="w-8 h-8 text-[#EF4444]" />
                  </div>
                  <h2 className="text-lg font-medium mb-2">Connection Failed</h2>
                  <p className="text-[#9CA3AF] text-sm mb-6 max-w-[280px]">
                    Unable to establish a secure connection to the primary Supabase cluster. Connection timed out after 3000ms.
                  </p>

                  <div className="w-full bg-[#161F2F] rounded-xl p-4 mb-6 text-left border border-white/5">
                    <div className="flex items-center gap-3 mb-3 text-sm font-medium text-white/80">
                      <ShieldAlert className="w-4 h-4 text-[#F59E0B]" />
                      Diagnostic Details
                    </div>
                    <div className="space-y-2 text-xs font-mono text-[#6B7280]">
                      <div className="flex justify-between">
                        <span>ERR_CODE:</span>
                        <span className="text-[#EF4444]">PG_CONN_TIMEOUT</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ENDPOINT:</span>
                        <span>db.plan-it.supabase.co</span>
                      </div>
                      <div className="flex justify-between">
                        <span>LATENCY:</span>
                        <span>&gt; 3000ms</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full gap-3">
                    <button
                      onClick={() => navigate('/')}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-sm font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleRetry}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#7C3AED]/20"
                    >
                      <RefreshCcw className="w-4 h-4" />
                      Retry Connection
                    </button>
                  </div>
                </motion.div>
              )}

              {connectionState === 'connecting' && (
                <motion.div
                  key="connecting"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex flex-col items-center text-center py-8"
                >
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 rounded-full border-2 border-[#161F2F] border-t-[#7C3AED] mb-6"
                  />
                  <h2 className="text-lg font-medium mb-2">Establishing Connection</h2>
                  <p className="text-[#9CA3AF] text-sm">
                    Negotiating secure handshake with database cluster...
                  </p>
                </motion.div>
              )}

              {connectionState === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex flex-col items-center text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="w-16 h-16 rounded-full bg-[#22C55E]/10 flex items-center justify-center mb-6"
                  >
                    <CheckCircle2 className="w-8 h-8 text-[#22C55E]" />
                  </motion.div>
                  <h2 className="text-lg font-medium mb-2">Connection Established</h2>
                  <p className="text-[#9CA3AF] text-sm mb-6">
                    Database cluster connected successfully. Redirecting to workspace...
                  </p>
                  
                  <div className="w-full h-1 bg-[#161F2F] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5 }}
                      className="h-full bg-[#22C55E]"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Circle, CheckCircle2, Clock } from "lucide-react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from "date-fns";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "motion/react";
import { useTasks } from "../context/TasksContext";

export function DashboardCalendar() {
  const { tasks } = useTasks();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const days = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    // Calculate padding days to make it a multiple of 7
    const startPadding = start.getDay(); // 0 for Sunday
    const daysInMonth = eachDayOfInterval({ start, end });
    
    const paddedDays = [];
    for (let i = 0; i < startPadding; i++) {
      paddedDays.push({ date: subMonths(start, 1), isPadding: true }); // Just a placeholder for empty slots
    }
    
    daysInMonth.forEach(date => paddedDays.push({ date, isPadding: false }));
    
    return paddedDays;
  }, [currentMonth]);

  // Mocking meetings/milestones on random days for visual representation
  const getDayEvents = (date: Date) => {
    // If it's a padding day, return empty
    // To simplify matching, just return random events based on day of month for mock
    const tasksForDay = tasks.filter(t => {
      // Very naive mapping of deadline string to current month days for demo purposes
      if (t.deadline.includes("Today") && isToday(date)) return true;
      if (t.deadline.includes("Tomorrow") && isSameDay(new Date(Date.now() + 86400000), date)) return true;
      return false;
    });

    // Mock extra events
    const dayOfMonth = date.getDate();
    const hasMilestone = dayOfMonth === 15 || dayOfMonth === 22;
    const hasMeeting = dayOfMonth === 10 || dayOfMonth === 25;

    return { tasks: tasksForDay, hasMilestone, hasMeeting };
  };

  const selectedEvents = getDayEvents(selectedDate);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-card border border-border rounded-2xl p-6 shadow-xl">
      {/* Calendar Widget */}
      <div className="md:col-span-2 flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            Schedule
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-white w-32 text-center">
              {format(currentMonth, "MMMM yyyy")}
            </span>
            <div className="flex bg-background border border-border rounded-lg overflow-hidden">
              <button onClick={prevMonth} className="p-1.5 hover:bg-white/10 text-muted-foreground hover:text-white transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={nextMonth} className="p-1.5 hover:bg-white/10 text-muted-foreground hover:text-white transition-colors border-l border-border">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
            <div key={day} className="text-center text-xs font-semibold text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 flex-1">
          {days.map((item, i) => {
            if (item.isPadding) {
              return <div key={`pad-${i}`} className="p-2 min-h-[60px]" />;
            }
            
            const date = item.date;
            const isSelected = isSameDay(date, selectedDate);
            const events = getDayEvents(date);
            const hasActivity = events.tasks.length > 0 || events.hasMilestone || events.hasMeeting;

            return (
              <button
                key={i}
                onClick={() => setSelectedDate(date)}
                className={clsx(
                  "p-2 min-h-[60px] rounded-xl flex flex-col items-center justify-start gap-1 transition-all relative group",
                  isSelected ? "bg-primary/20 border border-primary/50" : "bg-background border border-transparent hover:border-white/10",
                )}
              >
                <span className={clsx(
                  "text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full",
                  isToday(date) ? "bg-primary text-white" : "text-white/80"
                )}>
                  {date.getDate()}
                </span>
                
                {hasActivity && (
                  <div className="flex gap-1">
                    {events.tasks.length > 0 && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                    {events.hasMeeting && <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                    {events.hasMilestone && <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />}
                  </div>
                )}
              </button>
            );
          })}
        </div>
        
        {/* Legend */}
        <div className="flex items-center gap-4 mt-6 pt-4 border-t border-border/50 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Tasks</div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" /> Meetings</div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500" /> Milestones</div>
        </div>
      </div>

      {/* Mini Upcoming Events List */}
      <div className="bg-background rounded-xl border border-border p-5 flex flex-col">
        <h3 className="text-lg font-semibold text-white mb-4">
          {isToday(selectedDate) ? "Today's Agenda" : format(selectedDate, "MMM d, yyyy")}
        </h3>
        
        <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar pr-2 -mr-2">
          <AnimatePresence mode="popLayout">
            {selectedEvents.tasks.length === 0 && !selectedEvents.hasMeeting && !selectedEvents.hasMilestone ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center py-10 text-muted-foreground text-sm"
              >
                No events scheduled for this day.
              </motion.div>
            ) : (
              <>
                {selectedEvents.hasMilestone && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3 relative">
                    <div className="flex flex-col items-center mt-1 shrink-0">
                      <div className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]" />
                      <div className="w-px h-full bg-border mt-1" />
                    </div>
                    <div className="pb-4">
                      <p className="text-xs font-semibold text-rose-400 mb-0.5">Project Milestone</p>
                      <p className="text-sm font-medium text-white">Phase 2 Delivery</p>
                    </div>
                  </motion.div>
                )}

                {selectedEvents.hasMeeting && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3 relative">
                    <div className="flex flex-col items-center mt-1 shrink-0">
                      <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                      <div className="w-px h-full bg-border mt-1" />
                    </div>
                    <div className="pb-4">
                      <p className="text-xs font-semibold text-blue-400 mb-0.5">10:00 AM - 11:00 AM</p>
                      <p className="text-sm font-medium text-white">Team Sync</p>
                    </div>
                  </motion.div>
                )}

                {selectedEvents.tasks.map((t, i) => (
                  <motion.div key={t.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="flex gap-3 relative">
                    <div className="flex flex-col items-center mt-1 shrink-0">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                      {i !== selectedEvents.tasks.length - 1 && <div className="w-px h-full bg-border mt-1" />}
                    </div>
                    <div className="pb-4 w-full">
                      <p className="text-xs font-semibold text-emerald-400 mb-0.5 flex justify-between">
                        Task Deadline
                        <span className={clsx(
                          "px-1.5 py-0.5 rounded text-[10px]",
                          t.status === "approved" ? "bg-secondary/20 text-secondary" : 
                          t.status === "pending_verification" ? "bg-orange-500/20 text-orange-400" : "bg-primary/20 text-primary"
                        )}>{t.status.replace("_", " ")}</span>
                      </p>
                      <p className={clsx("text-sm font-medium", t.status === "approved" ? "text-muted-foreground line-through" : "text-white")}>
                        {t.title}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
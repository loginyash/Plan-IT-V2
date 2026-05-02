import { createContext, useContext, useState, ReactNode } from "react";

export type Priority = "Low" | "Medium" | "High";
export type TaskStatus = "pending" | "in_progress" | "pending_verification" | "approved" | "rejected";
export type Difficulty = "Easy" | "Medium" | "Hard";
export type Urgency = "Low" | "Medium" | "High" | "Critical";
export type ProjectStatus = "Live" | "Completed" | "Delayed" | "Overdue" | "On Hold";
export type UserRole = "Owner" | "Manager" | "Contributor" | "Viewer";

export type ResourceSection = "Design Assets" | "Backend Docs" | "Frontend Docs" | "API Docs" | "Reports" | "Deployment Files" | "Other Resources";

export interface Post {
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

export interface ProjectResource {
  id: string;
  projectId: string;
  title: string;
  description: string;
  milestone: string;
  version: string;
  uploadDate: string;
  uploadedBy: string; // user id
  fileType: string;
  fileSize: string;
  section: ResourceSection;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
}

export interface ProjectMember {
  userId: string;
  role: UserRole;
}

export interface Project {
  id: string;
  name: string;
  members: ProjectMember[];
  deadline: string;
  status: ProjectStatus;
  description?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  deadline: string;
  difficulty: Difficulty;
  urgency: Urgency;
  points: number; // Base points
  status: TaskStatus;
  category?: string;
  priority: Priority;
  projectId?: string;
  assignedTo?: string[];
  estimatedHours?: number;
  tags?: string[];
  rejectionReason?: string;
  completedAt?: string;
}

export interface AIProfile {
  score: number;
  strengths: string[];
  delayRisk: string;
  trend: string;
  bestCategory: string;
  suggestions: string[];
}

interface TasksContextType {
  tasks: Task[];
  projects: Project[];
  resources: ProjectResource[];
  posts: Post[];
  aiProfile: AIProfile;
  currentUser: User;
  users: User[];
  addTask: (task: Omit<Task, "id" | "status" | "points">) => void;
  updateTaskStatus: (id: string, status: TaskStatus, reason?: string) => void;
  addProject: (project: Omit<Project, "id">) => void;
  addResource: (resource: Omit<ProjectResource, "id" | "uploadDate" | "uploadedBy">) => void;
  addAnonymousPost: (content: string, category?: string) => void;
  addPost: (post: Omit<Post, "id">) => void;
  progress: number;
  totalPoints: number;
  calculateTaskXP: (difficulty: Difficulty, urgency: Urgency) => number;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

const initialUsers: User[] = [
  { id: "u1", name: "Jatin" },
  { id: "u2", name: "Alice" },
  { id: "u3", name: "Bob" },
  { id: "u4", name: "Sarah" },
  { id: "u5", name: "Mike" },
];

const initialProjects: Project[] = [
  { 
    id: "p1", 
    name: "Website Redesign", 
    members: [{ userId: "u1", role: "Owner" }, { userId: "u2", role: "Contributor" }], 
    deadline: "2026-06-15",
    status: "Live"
  },
  { 
    id: "p2", 
    name: "Mobile App MVP", 
    members: [{ userId: "u1", role: "Manager" }, { userId: "u4", role: "Contributor" }], 
    deadline: "2026-05-20",
    status: "Delayed"
  },
];

const initialTasks: Task[] = [
  { 
    id: "1", title: "Review Q3 Marketing Deck", deadline: "Today, 5:00 PM", 
    difficulty: "Medium", urgency: "High", points: 50, 
    status: "approved", category: "Marketing", priority: "High", 
    projectId: "p1", assignedTo: ["u1"]
  },
  { 
    id: "2", title: "Submit Weekly Report", deadline: "Today, 11:59 PM", 
    difficulty: "Easy", urgency: "High", points: 30, 
    status: "pending", category: "Admin", priority: "Medium", assignedTo: ["u1"]
  },
  { 
    id: "3", title: "Client Sync Meeting", deadline: "Tomorrow, 10:00 AM", 
    difficulty: "Medium", urgency: "Medium", points: 50, 
    status: "pending", category: "Client", priority: "High", assignedTo: ["u1"]
  },
  { 
    id: "4", title: "Code Review: API Service", deadline: "Tomorrow, 2:00 PM", 
    difficulty: "Hard", urgency: "High", points: 100, 
    status: "pending_verification", category: "Engineering", priority: "Medium", projectId: "p2", assignedTo: ["u1"]
  },
];

const mockAIProfile: AIProfile = {
  score: 88, // Strong Performer
  strengths: ["High complexity tasks", "Code review speed"],
  delayRisk: "Low (Consistently meets deadlines)",
  trend: "Upward (+5% this week)",
  bestCategory: "Engineering",
  suggestions: ["Take more leadership roles in Mobile App MVP", "Reduce time spent on Admin tasks"]
};

const anonymousNames = ["Anonymous", "Mystery User", "Secret Contributor", "Incognito", "Unknown Voice"];

const initialPosts: Post[] = [
  {
    id: "post1",
    author: "Alice",
    avatar: "https://i.pravatar.cc/150?img=1",
    role: "Lead Designer",
    time: "2 hours ago",
    content: "Just finalized the new UI mockups for the Q3 product release! Check out the Resources tab for the Figma file. Really proud of the team's effort on this one 🚀🎨",
    likes: 12,
    claps: 5,
    fires: 8,
    comments: 3,
    isAnonymous: false
  },
  {
    id: "post2",
    author: "Bob",
    avatar: "https://i.pravatar.cc/150?img=3",
    role: "Senior Engineer",
    time: "5 hours ago",
    content: "Finally deployed the new backend API restructuring! The response times dropped by 40%. Huge shoutout to the DevOps squad for making the transition smooth. 🎉",
    likes: 24,
    claps: 10,
    fires: 15,
    comments: 7,
    isAnonymous: false
  }
];

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [resources, setResources] = useState<ProjectResource[]>([
    {
      id: "r1",
      projectId: "p1",
      title: "Homepage UI Mockups",
      description: "Final Figma exports for the homepage redesign.",
      milestone: "UI Design",
      version: "1.0",
      uploadDate: new Date().toISOString(),
      uploadedBy: "u1",
      fileType: "FIG",
      fileSize: "12MB",
      section: "Design Assets"
    },
    {
      id: "r2",
      projectId: "p2",
      title: "API Architecture Plan",
      description: "REST endpoints for the MVP mobile app.",
      milestone: "Backend Planning",
      version: "0.9",
      uploadDate: new Date(Date.now() - 86400000).toISOString(),
      uploadedBy: "u4",
      fileType: "PDF",
      fileSize: "2.4MB",
      section: "API Docs"
    }
  ]);

  const calculateTaskXP = (difficulty: Difficulty, urgency: Urgency) => {
    let base = 20;
    if (difficulty === "Medium") base = 40;
    if (difficulty === "Hard") base = 70;

    let multiplier = 1;
    if (urgency === "Medium") multiplier = 1.25;
    if (urgency === "High") multiplier = 1.5;
    if (urgency === "Critical") multiplier = 2;

    return Math.round(base * multiplier);
  };

  const addTask = (newTask: Omit<Task, "id" | "status" | "points">) => {
    const points = calculateTaskXP(newTask.difficulty, newTask.urgency);
    const task: Task = {
      ...newTask,
      id: Math.random().toString(36).substring(2, 9),
      status: "pending",
      points
    };
    setTasks((prev) => [task, ...prev]);
  };

  const addProject = (newProject: Omit<Project, "id">) => {
    const project: Project = {
      ...newProject,
      id: "p" + Math.random().toString(36).substring(2, 9),
    };
    setProjects((prev) => [project, ...prev]);
  }

  const addResource = (newResource: Omit<ProjectResource, "id" | "uploadDate" | "uploadedBy">) => {
    const resource: ProjectResource = {
      ...newResource,
      id: "r" + Math.random().toString(36).substring(2, 9),
      uploadDate: new Date().toISOString(),
      uploadedBy: initialUsers[0].id, // Mocking current user ID
    };
    setResources((prev) => [resource, ...prev]);
  }

  const addAnonymousPost = (content: string, category?: string) => {
    const randomName = anonymousNames[Math.floor(Math.random() * anonymousNames.length)];
    const randomAvatarNum = Math.floor(Math.random() * 70);
    const post: Post = {
      id: Math.random().toString(),
      author: randomName,
      avatar: `https://i.pravatar.cc/150?img=${randomAvatarNum}`,
      role: "Anonymous",
      time: "Just now",
      content,
      likes: 0,
      claps: 0,
      fires: 0,
      comments: 0,
      isAnonymous: true,
      category
    };
    setPosts((prev) => [post, ...prev]);
  }

  const addPost = (post: Omit<Post, "id">) => {
    const newPost: Post = {
      ...post,
      id: Math.random().toString()
    };
    setPosts((prev) => [newPost, ...prev]);
  }

  const updateTaskStatus = (id: string, status: TaskStatus, reason?: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const updated = { ...t, status };
          if (status === "rejected" && reason) updated.rejectionReason = reason;
          if (status === "approved" || status === "pending_verification") updated.completedAt = new Date().toISOString();
          return updated;
        }
        return t;
      })
    );
  };

  const completedCount = tasks.filter((t) => t.status === "approved" || t.status === "pending_verification").length;
  const progress = tasks.length === 0 ? 0 : (completedCount / tasks.length) * 100;
  
  // XP Calculation includes AI Modifier
  const aiModifier = mockAIProfile.score >= 90 ? 1.1 : mockAIProfile.score >= 75 ? 1.05 : 1;
  const totalPoints = tasks
    .filter(t => t.status === "approved")
    .reduce((acc, t) => acc + Math.round(t.points * aiModifier), 3830); 

  return (
    <TasksContext.Provider value={{ 
      tasks, projects, resources, posts, aiProfile: mockAIProfile, currentUser: initialUsers[0], users: initialUsers,
      addTask, addProject, addResource, addAnonymousPost, addPost, updateTaskStatus, progress, totalPoints, calculateTaskXP 
    }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
}

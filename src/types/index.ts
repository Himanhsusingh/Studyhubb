export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: 'Web Apps' | 'AI & Tools' | 'Portfolio & Student' | 'Open Source';
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  status: 'Live' | 'In Progress' | 'Featured' | 'Planned';
  featured?: boolean;
}

export interface SkillCategory {
  category: string;
  skills: {
    name: string;
    level: number; // percentage
    experience: string;
    category: string;
    icon?: string;
  }[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: string;
  credentialId?: string;
  verifyUrl?: string;
  image: string;
  isExample?: boolean;
}

export interface StudyMaterial {
  id: string;
  title: string;
  subject: string;
  category: string;
  description: string;
  fileUrl: string;
  fileName: string;
  fileSize: string;
  dateAdded: string;
  downloads: number;
  isFeatured?: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  priority: 'low' | 'normal' | 'high';
}

export interface StudentProfile {
  id: string;
  name: string;
  studentId: string;
  email: string;
  course: string;
  year: string;
  bookmarkedMaterials: string[]; // material IDs
  completedGoals: string[];
  savedNotes: { id: string; title: string; content: string; date: string }[];
}

export interface LearningGoal {
  id: string;
  title: string;
  type: 'short-term' | 'long-term';
  category: string;
  targetDate: string;
  completed: boolean;
  description: string;
}

export interface Milestone {
  id: string;
  period: string;
  title: string;
  institutionOrContext: string;
  description: string;
  achievements: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

import { StudyMaterial, Announcement, StudentProfile, Certificate } from '../types';
import { INITIAL_ANNOUNCEMENTS } from '../data/initialData';

const STORAGE_KEYS = {
  STUDY_MATERIALS: 'hs_studyhub_materials_v1',
  ANNOUNCEMENTS: 'hs_studyhub_announcements_v1',
  STUDENT_PROFILE: 'hs_studyhub_student_profile_v1',
  CERTIFICATES: 'hs_portfolio_certificates_v1',
  ADMIN_TOKEN: 'hs_admin_session_token_v1',
  CONTACT_MESSAGES: 'hs_contact_submissions_v1',
  USER_GOALS: 'hs_learning_goals_v1'
};

export const apiService = {
  // AI Lab Chat via server endpoint
  async sendAiMessage(message: string, history: Array<{ role: 'user' | 'model'; text: string }>) {
    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history })
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      return {
        reply: data.reply as string,
        configured: data.configured !== false
      };
    } catch (err: any) {
      console.warn('Backend API unavailable or running static mode:', err);
      // Helpful fallback response for static GitHub Pages deployment with clear explanation
      return {
        reply: `Hello! I am Himanshu's AI Study Assistant.\n\n*(Running in Static GitHub Pages Mode)*\nTo connect real-time Gemini 3.8 Flash answers on GitHub Pages, deploy the accompanying Node.js backend (or a serverless function on Vercel/Render) and set \`GEMINI_API_KEY\`. Refer to the **Deployment Guide** in the footer for step-by-step instructions.\n\nIn the meantime, feel free to ask questions about Data Structures, Web Development, or Himanshu's StudyHub projects!`,
        configured: false
      };
    }
  },

  // Contact Form Submission
  async submitContact(formData: { name: string; email: string; subject: string; message: string }) {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        return { success: true, message: data.message };
      }
    } catch (err) {
      // Offline / GitHub Pages fallback: save locally so Himanshu can inspect in Admin Panel
      console.warn('Falling back to local storage for contact form:', err);
    }

    // Persist locally
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.CONTACT_MESSAGES) || '[]');
    existing.push({
      id: 'msg-' + Date.now(),
      ...formData,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem(STORAGE_KEYS.CONTACT_MESSAGES, JSON.stringify(existing));

    return {
      success: true,
      message: 'Thank you! Your message has been saved and Himanshu will review it shortly.'
    };
  },

  // Materials API
  async getMaterials(): Promise<StudyMaterial[]> {
    try {
      const response = await fetch('/api/studyhub/materials');
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          localStorage.setItem(STORAGE_KEYS.STUDY_MATERIALS, JSON.stringify(data));
          return data;
        }
      }
    } catch (e) {
      // fallback
    }

    const cached = localStorage.getItem(STORAGE_KEYS.STUDY_MATERIALS);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (err) {}
    }

    // Default seed
    const defaultMaterials: StudyMaterial[] = [
      {
        id: 'mat-1',
        title: 'Data Structures & Algorithms Comprehensive Guide',
        subject: 'Computer Science',
        category: 'Algorithms',
        description: 'Detailed analysis of Arrays, Trees, Graphs, Sorting, and Big-O asymptotic notations with working code snippets.',
        fileUrl: '#download-dsa-guide',
        fileName: 'DSA_Comprehensive_Guide_v2.pdf',
        fileSize: '4.2 MB',
        dateAdded: '2026-03-15',
        downloads: 148,
        isFeatured: true
      },
      {
        id: 'mat-2',
        title: 'Modern Web Architecture & React 19 Best Practices',
        subject: 'Web Development',
        category: 'Frontend Engineering',
        description: 'Deep dive into Component Life Cycles, Server Components, State Management, and Tailwind CSS Design Systems.',
        fileUrl: '#download-react19-guide',
        fileName: 'React19_Architecture_Cheatsheet.pdf',
        fileSize: '2.8 MB',
        dateAdded: '2026-03-28',
        downloads: 95,
        isFeatured: true
      },
      {
        id: 'mat-3',
        title: 'Git & GitHub Collaboration Playbook',
        subject: 'Software Engineering',
        category: 'DevOps & Tooling',
        description: 'Master branch strategies, rebasing, pull request reviews, and GitHub Actions continuous integration pipelines.',
        fileUrl: '#download-git-playbook',
        fileName: 'Git_GitHub_Collaboration_Playbook.pdf',
        fileSize: '1.9 MB',
        dateAdded: '2026-04-02',
        downloads: 112,
        isFeatured: false
      },
      {
        id: 'mat-4',
        title: 'Database Systems & SQL Optimization Manual',
        subject: 'Computer Science',
        category: 'Databases',
        description: 'Relational query optimization, indexing internals, normalization 1NF-BCNF, and transaction isolation levels.',
        fileUrl: '#download-dbms-manual',
        fileName: 'Database_Systems_SQL_Manual.pdf',
        fileSize: '3.6 MB',
        dateAdded: '2026-04-08',
        downloads: 73,
        isFeatured: false
      }
    ];

    localStorage.setItem(STORAGE_KEYS.STUDY_MATERIALS, JSON.stringify(defaultMaterials));
    return defaultMaterials;
  },

  async addMaterial(material: Partial<StudyMaterial>): Promise<StudyMaterial> {
    try {
      const response = await fetch('/api/studyhub/materials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(material)
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (e) {}

    const materials = await this.getMaterials();
    const newMat: StudyMaterial = {
      id: 'mat-' + Date.now(),
      title: material.title || 'Untitled Material',
      subject: material.subject || 'General',
      category: material.category || 'Reference',
      description: material.description || '',
      fileUrl: '#download-' + (material.fileName || 'file'),
      fileName: material.fileName || 'Document.pdf',
      fileSize: material.fileSize || '2.4 MB',
      dateAdded: new Date().toISOString().split('T')[0],
      downloads: 0,
      isFeatured: Boolean(material.isFeatured)
    };
    materials.unshift(newMat);
    localStorage.setItem(STORAGE_KEYS.STUDY_MATERIALS, JSON.stringify(materials));
    return newMat;
  },

  async deleteMaterial(id: string): Promise<boolean> {
    try {
      await fetch(`/api/studyhub/materials/${id}`, { method: 'DELETE' });
    } catch (e) {}
    const materials = (await this.getMaterials()).filter(m => m.id !== id);
    localStorage.setItem(STORAGE_KEYS.STUDY_MATERIALS, JSON.stringify(materials));
    return true;
  },

  // Announcements API
  async getAnnouncements(): Promise<Announcement[]> {
    try {
      const response = await fetch('/api/studyhub/announcements');
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(data));
          return data;
        }
      }
    } catch (e) {}

    const cached = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {}
    }

    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(INITIAL_ANNOUNCEMENTS));
    return INITIAL_ANNOUNCEMENTS;
  },

  async addAnnouncement(ann: Partial<Announcement>): Promise<Announcement> {
    try {
      const response = await fetch('/api/studyhub/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ann)
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (e) {}

    const list = await this.getAnnouncements();
    const newAnn: Announcement = {
      id: 'ann-' + Date.now(),
      title: ann.title || 'Announcement',
      content: ann.content || '',
      date: new Date().toISOString().split('T')[0],
      author: 'Himanshu Singh',
      priority: (ann.priority as any) || 'normal'
    };
    list.unshift(newAnn);
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(list));
    return newAnn;
  },

  // Student Profile Persistence
  getStudentProfile(): StudentProfile {
    const saved = localStorage.getItem(STORAGE_KEYS.STUDENT_PROFILE);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    // Default logged in guest/student
    const defaultProfile: StudentProfile = {
      id: 'std-himanshu-demo',
      name: 'Aarav Patel',
      studentId: 'HS-2026-042',
      email: 'aarav.student@studyhub.edu',
      course: 'B.Tech Computer Science',
      year: 'Year 2 (Semester 4)',
      bookmarkedMaterials: ['mat-1', 'mat-2'],
      completedGoals: ['g-1'],
      savedNotes: [
        {
          id: 'note-1',
          title: 'Binary Tree In-Order Traversal Formula',
          content: 'In-order traversal of a Binary Search Tree (BST) visits nodes in strictly ascending sorted order. Left -> Root -> Right.',
          date: '2026-04-10'
        }
      ]
    };
    localStorage.setItem(STORAGE_KEYS.STUDENT_PROFILE, JSON.stringify(defaultProfile));
    return defaultProfile;
  },

  saveStudentProfile(profile: StudentProfile) {
    localStorage.setItem(STORAGE_KEYS.STUDENT_PROFILE, JSON.stringify(profile));
  },

  // Admin Auth Helpers
  isAdminAuthenticated(): boolean {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN) === 'admin-authenticated-session-2026';
  },

  setAdminAuthenticated(auth: boolean) {
    if (auth) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_TOKEN, 'admin-authenticated-session-2026');
    } else {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
    }
  }
};

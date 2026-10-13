import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory data store for server-backed operations (with mock persistence)
let studyMaterials = [
  {
    id: 'mat-1',
    title: 'Data Structures & Algorithms Comprehensive Guide',
    subject: 'Computer Science',
    category: 'Algorithms',
    description: 'Detailed analysis of Arrays, Trees, Graphs, Sorting, and Big-O asymptotic notations with working code snippets.',
    fileUrl: 'https://raw.githubusercontent.com/himanhsusingh/himanhsusingh.github.io/main/assets/docs/dsa_guide.pdf',
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
    fileUrl: 'https://raw.githubusercontent.com/himanhsusingh/himanhsusingh.github.io/main/assets/docs/react19_best_practices.pdf',
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
    fileUrl: 'https://raw.githubusercontent.com/himanhsusingh/himanhsusingh.github.io/main/assets/docs/git_github_playbook.pdf',
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
    fileUrl: 'https://raw.githubusercontent.com/himanhsusingh/himanhsusingh.github.io/main/assets/docs/dbms_sql_optimization.pdf',
    fileName: 'Database_Systems_SQL_Manual.pdf',
    fileSize: '3.6 MB',
    dateAdded: '2026-04-08',
    downloads: 73,
    isFeatured: false
  }
];

let announcements = [
  {
    id: 'ann-1',
    title: 'StudyHub Sprint: Data Structures Lab Session',
    content: 'Join the weekend peer programming cohort covering Dynamic Programming and Graph traversals. Review chapter 4 materials before joining.',
    date: '2026-04-12',
    author: 'Himanshu Singh',
    priority: 'high'
  },
  {
    id: 'ann-2',
    title: 'New Study Materials Published for Web Architecture',
    content: 'Updated reference guides on React 19 Hooks and responsive CSS grid frameworks have been added to the StudyHub library.',
    date: '2026-04-05',
    author: 'Himanshu Singh',
    priority: 'normal'
  }
];

let studentAccounts = [
  { id: 'std-001', name: 'Aarav Patel', studentId: 'HS-2026-01', email: 'aarav.patel@student.edu', status: 'active', joinedDate: '2026-01-15' },
  { id: 'std-002', name: 'Priya Sharma', studentId: 'HS-2026-02', email: 'priya.sharma@student.edu', status: 'active', joinedDate: '2026-02-01' },
  { id: 'std-003', name: 'Rohan Verma', studentId: 'HS-2026-03', email: 'rohan.verma@student.edu', status: 'active', joinedDate: '2026-02-18' }
];

let contactSubmissions: Array<{
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}> = [];

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

// API Routes
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message text is required.' });
    }

    if (!aiClient) {
      // Provide an authentic, transparent explanation when API key is not yet set
      return res.status(200).json({
        reply: `Hello! I am Himanshu's AI Study Assistant.\n\n*Note: GEMINI_API_KEY is not currently active in this environment.* To enable live responses powered by Gemini 3.8 Flash, set your \`GEMINI_API_KEY\` in your environment variables or in Google AI Studio Secrets.\n\nIn the meantime, feel free to explore Himanshu's portfolio projects, study materials on StudyHub, or the Goals roadmap!`,
        configured: false
      });
    }

    // Call Gemini 3.8 Flash
    const systemPrompt = `You are the AI Assistant for Himanshu Singh's portfolio and StudyHub student learning platform.
Himanshu Singh is a passionate student, web developer, and AI enthusiast (existing portfolio: https://himanhsusingh.github.io).
You help students with computer science concepts (DSA, Web Development, JavaScript, React, Git, AI), explain code cleanly, provide helpful study roadmaps, and share information about Himanshu's projects and StudyHub platform.
Be concise, clear, polite, and format technical code blocks in Markdown.`;

    const contents: any[] = [];
    if (Array.isArray(history)) {
      for (const item of history) {
        if (item && item.role && item.text) {
          contents.push({
            role: item.role === 'user' ? 'user' : 'model',
            parts: [{ text: item.text }]
          });
        }
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction: systemPrompt
      }
    });

    const reply = response.text || 'I received your request, but no text was generated. Please try again.';
    return res.json({ reply, configured: true });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({
      error: 'Failed to generate response from Gemini API: ' + (error?.message || 'Unknown error'),
      configured: Boolean(aiClient)
    });
  }
});

// StudyHub Materials API
app.get('/api/studyhub/materials', (req, res) => {
  res.json(studyMaterials);
});

app.post('/api/studyhub/materials', (req, res) => {
  const { title, subject, category, description, fileName, fileSize, isFeatured } = req.body;
  if (!title || !subject) {
    return res.status(400).json({ error: 'Title and subject are required.' });
  }
  const newMaterial = {
    id: 'mat-' + Date.now(),
    title,
    subject,
    category: category || 'General',
    description: description || '',
    fileUrl: 'https://raw.githubusercontent.com/himanhsusingh/himanhsusingh.github.io/main/assets/docs/' + (fileName || 'document.pdf'),
    fileName: fileName || 'Document.pdf',
    fileSize: fileSize || '2.0 MB',
    dateAdded: new Date().toISOString().split('T')[0],
    downloads: 0,
    isFeatured: Boolean(isFeatured)
  };
  studyMaterials.unshift(newMaterial);
  res.status(201).json(newMaterial);
});

app.delete('/api/studyhub/materials/:id', (req, res) => {
  const { id } = req.params;
  studyMaterials = studyMaterials.filter(m => m.id !== id);
  res.json({ success: true, id });
});

// Announcements API
app.get('/api/studyhub/announcements', (req, res) => {
  res.json(announcements);
});

app.post('/api/studyhub/announcements', (req, res) => {
  const { title, content, priority } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required.' });
  }
  const newAnnouncement = {
    id: 'ann-' + Date.now(),
    title,
    content,
    date: new Date().toISOString().split('T')[0],
    author: 'Himanshu Singh',
    priority: priority || 'normal'
  };
  announcements.unshift(newAnnouncement);
  res.status(201).json(newAnnouncement);
});

app.delete('/api/studyhub/announcements/:id', (req, res) => {
  const { id } = req.params;
  announcements = announcements.filter(a => a.id !== id);
  res.json({ success: true, id });
});

// Admin Stats & Students API
app.get('/api/admin/stats', (req, res) => {
  const totalDownloads = studyMaterials.reduce((sum, item) => sum + (item.downloads || 0), 0);
  res.json({
    totalMaterials: studyMaterials.length,
    totalAnnouncements: announcements.length,
    totalStudents: studentAccounts.length,
    totalDownloads,
    activeStudents: studentAccounts.filter(s => s.status === 'active').length,
    contactMessagesCount: contactSubmissions.length
  });
});

app.get('/api/admin/students', (req, res) => {
  res.json(studentAccounts);
});

app.patch('/api/admin/students/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const student = studentAccounts.find(s => s.id === id);
  if (!student) {
    return res.status(404).json({ error: 'Student not found.' });
  }
  student.status = status;
  res.json(student);
});

// Contact Form API
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required fields.' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  const submission = {
    id: 'msg-' + Date.now(),
    name: name.trim(),
    email: email.trim(),
    subject: (subject || 'General Inquiry').trim(),
    message: message.trim(),
    timestamp: new Date().toISOString()
  };

  contactSubmissions.push(submission);
  res.status(201).json({
    success: true,
    message: 'Thank you! Your message has been received by Himanshu Singh.'
  });
});

app.get('/api/admin/messages', (req, res) => {
  res.json(contactSubmissions);
});

// Main Vite / Static setup
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

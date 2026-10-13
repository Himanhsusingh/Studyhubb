import { Project, SkillCategory, Certificate, StudyMaterial, Announcement, LearningGoal, Milestone } from '../types';

export const AVATAR_IMAGE = '/src/assets/images/himanshu_avatar_1791876313959.jpg';
export const STUDYHUB_PREVIEW = '/src/assets/images/studyhub_preview_1791876314734.jpg';
export const PROJECT_PREVIEW = '/src/assets/images/project_portfolio_showcase_1791876315950.jpg';
export const CERTIFICATE_PREVIEW = '/src/assets/images/certificate_cert_preview_1791876318639.jpg';

export const PERSONAL_INFO = {
  name: 'Himanshu Singh',
  tagline: 'Student, Web Developer & AI Enthusiast',
  heroBio: 'Building the next generation of interactive web experiences and student learning tools. Focused on modern web technologies, accessible design, and applied artificial intelligence.',
  bioExtended: `I am a dedicated Computer Science student and frontend engineer with a deep fascination for building high-performance web applications, intuitive user experiences, and educational tools. 

My journey began with HTML, CSS, and JavaScript fundamentals, quickly expanding into modern TypeScript, React ecosystems, and AI-assisted software workflows. I created StudyHub to provide peers and learners with an accessible, distraction-free environment for sharing curriculum notes, reference guides, and collaborative study materials.`,
  existingWebsiteUrl: 'https://himanhsusingh.github.io',
  githubUrl: 'https://github.com/himanhsusingh',
  linkedinUrl: 'https://linkedin.com/in/himanshu-singh',
  twitterUrl: 'https://twitter.com/himanshu_dev',
  email: 'himanshusingh.dev@gmail.com',
  location: 'India',
  education: {
    degree: 'Bachelor of Technology in Computer Science & Engineering',
    institution: 'University Department of Computer Science',
    duration: '2023 — 2027 (Expected)',
    gpa: '8.8 / 10.0 (Current GPA)',
    focus: 'Data Structures, Database Management, Modern Web Engineering, Algorithms'
  },
  roles: ['Student', 'Web Developer', 'AI Enthusiast', 'Creative Learner', 'StudyHub Creator']
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Himanshu Singh Personal Portfolio',
    description: 'Personal web presence and showcase hosted on GitHub Pages, highlighting interactive projects, learning milestones, and technical achievements.',
    longDescription: 'Engineered as a high-performance static web application designed for fast load times on GitHub Pages. Features glassmorphism UI, theme consistency, and responsive layouts across all device form factors.',
    category: 'Portfolio & Student',
    image: PROJECT_PREVIEW,
    tags: ['HTML5', 'CSS3', 'JavaScript', 'GitHub Pages', 'Responsive Design'],
    liveUrl: 'https://himanhsusingh.github.io',
    githubUrl: 'https://github.com/himanhsusingh/himanhsusingh.github.io',
    status: 'Live',
    featured: true
  },
  {
    id: 'proj-2',
    title: 'StudyHub Student Learning Platform',
    description: 'A centralized portal for university students to access verified subject notes, curriculum roadmaps, and peer study materials.',
    longDescription: 'StudyHub addresses the challenge of fragmented study resources by consolidating semester-wise lecture notes, algorithm study guides, and past papers into an organized digital workspace with search and bookmarks.',
    category: 'Web Apps',
    image: STUDYHUB_PREVIEW,
    tags: ['React 19', 'TypeScript', 'Tailwind CSS', 'LocalStorage', 'PDF Viewer'],
    liveUrl: '#studyhub',
    githubUrl: 'https://github.com/himanhsusingh/studyhub-platform',
    status: 'Featured',
    featured: true
  },
  {
    id: 'proj-3',
    title: 'AI Study Assistant & Code Explainer',
    description: 'Conversational assistant powered by Gemini 3.8 Flash to clarify complex data structure problems, debug code, and provide concept summaries.',
    longDescription: 'Integrates server-side LLM calls via Google GenAI SDK to give students step-by-step breakdowns of complex computer science questions without exposing client credentials.',
    category: 'AI & Tools',
    image: PROJECT_PREVIEW,
    tags: ['Gemini 3.8 Flash', 'Express.js', 'TypeScript', 'Markdown Renderer'],
    liveUrl: '#ai-lab',
    githubUrl: 'https://github.com/himanhsusingh/ai-study-lab',
    status: 'Live',
    featured: true
  },
  {
    id: 'proj-4',
    title: 'Interactive Algorithm Visualizer',
    description: 'Visual demonstration of pathfinding (Dijkstra, A*) and sorting algorithms (QuickSort, MergeSort) with step-by-step playback controls.',
    longDescription: 'Educational canvas simulation helping students develop intuitive mental models of algorithmic time and space complexities through visual animation and parameter tweaking.',
    category: 'Web Apps',
    image: STUDYHUB_PREVIEW,
    tags: ['TypeScript', 'Canvas API', 'Algorithms', 'Interactive UI'],
    liveUrl: 'https://himanhsusingh.github.io/algo-visualizer',
    githubUrl: 'https://github.com/himanhsusingh/algorithm-visualizer',
    status: 'In Progress',
    featured: false
  }
];

export const INITIAL_SKILLS: SkillCategory[] = [
  {
    category: 'Core Web Development',
    skills: [
      { name: 'HTML5 & Semantic Structure', level: 90, experience: '2+ years', category: 'Frontend' },
      { name: 'Modern CSS3 & Flexbox / Grid', level: 88, experience: '2+ years', category: 'Frontend' },
      { name: 'JavaScript (ES6+ / Async)', level: 85, experience: '2+ years', category: 'Frontend' },
      { name: 'TypeScript', level: 78, experience: '1+ year', category: 'Frontend' },
      { name: 'React & Component Architecture', level: 82, experience: '1.5 years', category: 'Frontend' },
      { name: 'Tailwind CSS', level: 90, experience: '2 years', category: 'Styling' }
    ]
  },
  {
    category: 'Software Engineering & Version Control',
    skills: [
      { name: 'Git & GitHub Workflows', level: 85, experience: '2 years', category: 'DevOps' },
      { name: 'GitHub Pages Deployment', level: 92, experience: '2 years', category: 'Deployment' },
      { name: 'Responsive UI / Mobile First', level: 88, experience: '2 years', category: 'Design' },
      { name: 'RESTful APIs & Fetch Integration', level: 80, experience: '1.5 years', category: 'Backend' },
      { name: 'Node.js & Express Basics', level: 74, experience: '1 year', category: 'Backend' }
    ]
  },
  {
    category: 'AI Tools & Emerging Tech',
    skills: [
      { name: 'Prompt Engineering & System Directives', level: 85, experience: '1.5 years', category: 'AI' },
      { name: 'Google Gemini API Integration', level: 82, experience: '1 year', category: 'AI' },
      { name: 'AI-Assisted Prototyping & Code Auditing', level: 86, experience: '1.5 years', category: 'AI' },
      { name: 'Web Performance Optimization', level: 76, experience: '1 year', category: 'Performance' }
    ]
  }
];

export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-1',
    title: 'Responsive Web Design Certification',
    issuer: 'freeCodeCamp Developer Curriculum',
    date: '2025-08-20',
    category: 'Web Development',
    credentialId: 'FCC-RWD-78921-HS',
    verifyUrl: 'https://www.freecodecamp.org/certification/himanhsusingh/responsive-web-design',
    image: CERTIFICATE_PREVIEW,
    isExample: false
  },
  {
    id: 'cert-2',
    title: 'JavaScript Algorithms and Data Structures',
    issuer: 'Developer Training Institute',
    date: '2025-11-14',
    category: 'Computer Science',
    credentialId: 'CS-JS-DSA-2025-992',
    verifyUrl: 'https://himanhsusingh.github.io/certificates/dsa',
    image: CERTIFICATE_PREVIEW,
    isExample: true
  },
  {
    id: 'cert-3',
    title: 'Git & Modern Open-Source Contribution',
    issuer: 'GitHub Community Education',
    date: '2026-01-10',
    category: 'Software Engineering',
    credentialId: 'GH-OS-CONTRIB-4418',
    verifyUrl: 'https://himanhsusingh.github.io/certificates/git',
    image: CERTIFICATE_PREVIEW,
    isExample: true
  },
  {
    id: 'cert-4',
    title: 'Prompt Engineering & Generative AI Systems',
    issuer: 'Applied AI Learning Academy',
    date: '2026-03-02',
    category: 'Artificial Intelligence',
    credentialId: 'AI-ACAD-GENAI-1029',
    verifyUrl: 'https://himanhsusingh.github.io/certificates/genai',
    image: CERTIFICATE_PREVIEW,
    isExample: true
  }
];

export const INITIAL_MILESTONES: Milestone[] = [
  {
    id: 'm-1',
    period: '2026 — Present',
    title: 'Creator & Lead Developer of StudyHub',
    institutionOrContext: 'Personal Project & Student Community',
    description: 'Designed and deployed a full-fledged student platform integrating subject libraries, curated study notes, and an AI-powered assistant.',
    achievements: ['Consolidated 4+ core computer science subjects', 'Integrated Gemini API for on-demand tutoring', 'Maintained 100% responsive cross-platform layout']
  },
  {
    id: 'm-2',
    period: '2025 — 2026',
    title: 'Frontend Web Engineering & Open-Source Exploration',
    institutionOrContext: 'Self-Directed & College Tech Society',
    description: 'Transitioned from vanilla web technologies to modern React, TypeScript, and Tailwind CSS. Launched personal portfolio on GitHub Pages.',
    achievements: ['Published first portfolio at himanhsusingh.github.io', 'Completed freeCodeCamp responsive certification', 'Built 6+ client-side interactive apps']
  },
  {
    id: 'm-3',
    period: '2024 — 2025',
    title: 'Algorithms & Data Structures Foundation',
    institutionOrContext: 'Undergraduate Coursework',
    description: 'Mastered standard data structures (trees, graphs, hashing, sorting) and basic complexity analysis.',
    achievements: ['Solved 150+ coding problems', 'Maintained strong academic GPA in core CS modules']
  }
];

export const INITIAL_GOALS: LearningGoal[] = [
  {
    id: 'g-1',
    title: 'Master Graph Algorithms & Dynamic Programming Patterns',
    type: 'short-term',
    category: 'Computer Science',
    targetDate: 'May 2026',
    completed: true,
    description: 'Complete 50 curated LeetCode / HackerRank problems focusing on BFS/DFS and memoization.'
  },
  {
    id: 'g-2',
    title: 'Contribute to an Open-Source Developer Tool on GitHub',
    type: 'short-term',
    category: 'Open Source',
    targetDate: 'June 2026',
    completed: false,
    description: 'Submit accepted pull requests to popular frontend utility or documentation repositories.'
  },
  {
    id: 'g-3',
    title: 'Deploy Full-Stack StudyHub with Database Persistence',
    type: 'short-term',
    category: 'Web Engineering',
    targetDate: 'July 2026',
    completed: false,
    description: 'Implement cloud database sync (Firebase / Supabase) to give students cross-device real-time sync.'
  },
  {
    id: 'g-4',
    title: 'Build Production AI Applications using Multimodal Models',
    type: 'long-term',
    category: 'Artificial Intelligence',
    targetDate: 'December 2026',
    completed: false,
    description: 'Develop intelligent document extraction and audio summarization pipelines using modern Gemini SDK.'
  },
  {
    id: 'g-5',
    title: 'Secure a High-Impact Software Engineering Internship',
    type: 'long-term',
    category: 'Career Milestone',
    targetDate: '2027',
    completed: false,
    description: 'Collaborate with a world-class engineering team to build scalable consumer software.'
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
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

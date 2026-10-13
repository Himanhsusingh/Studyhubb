import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Code2, 
  Sparkles, 
  BookOpen, 
  Layers, 
  ExternalLink, 
  CheckCircle2, 
  Terminal,
  FolderGit2,
  GraduationCap
} from 'lucide-react';
import { 
  PERSONAL_INFO, 
  AVATAR_IMAGE, 
  INITIAL_PROJECTS, 
  INITIAL_SKILLS, 
  INITIAL_CERTIFICATES, 
  STUDYHUB_PREVIEW 
} from '../data/initialData';

interface HomeViewProps {
  setActiveTab: (tab: string) => void;
  openProjectDetail?: (projectId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setActiveTab }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect for roles
  useEffect(() => {
    const currentRole = PERSONAL_INFO.roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedRole.length < currentRole.length) {
          setDisplayedRole(currentRole.substring(0, displayedRole.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 1600);
        }
      } else {
        if (displayedRole.length > 0) {
          setDisplayedRole(currentRole.substring(0, displayedRole.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % PERSONAL_INFO.roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedRole, isDeleting, roleIndex]);

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative pt-12 pb-8 overflow-hidden">
        {/* Subtle background ambient gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-cyan-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* Avatar with Decorative Animated Gold & Cyan Rings */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
              {/* Outer pulsing ring */}
              <div className="absolute -inset-2.5 rounded-full bg-gradient-to-r from-amber-400/40 via-cyan-400/30 to-indigo-500/40 blur-md opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse" />
              
              {/* Spinning decorative geometric border */}
              <div className="absolute -inset-1 rounded-full border border-amber-400/60 shadow-[0_0_20px_rgba(251,191,36,0.25)]" />
              
              {/* Inner container */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-amber-200 to-cyan-400 shadow-2xl">
                <img
                  src={AVATAR_IMAGE}
                  alt="Himanshu Singh"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    // Graceful fallback if image path changes
                    (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Himanshu+Singh&background=0b1329&color=38bdf8&size=256';
                  }}
                />
              </div>

              {/* Status indicator badge (Functional: Open to collaboration) */}
              <div className="absolute bottom-2 right-2 bg-slate-900 border border-slate-700/80 rounded-full px-2.5 py-0.5 flex items-center gap-1.5 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-[11px] font-medium text-slate-300">Open to build</span>
              </div>
            </div>
          </div>

          {/* Heading with Himanshu's Name */}
          <div className="space-y-3 max-w-3xl mx-auto">
            <div className="text-xs uppercase tracking-widest text-cyan-400 font-semibold">
              Portfolio &amp; Student Ecosystem
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Hi, I'm <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">Himanshu Singh</span>
            </h1>

            {/* Typewriter role */}
            <div className="h-8 flex items-center justify-center gap-2 text-lg sm:text-xl font-medium text-slate-300">
              <span className="text-slate-400">Passionate</span>
              <span className="text-cyan-400 font-semibold font-mono underline decoration-cyan-500/50 underline-offset-4">
                {displayedRole}
              </span>
              <span className="w-0.5 h-5 bg-cyan-400 animate-pulse" />
            </div>

            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed pt-2">
              {PERSONAL_INFO.heroBio}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => setActiveTab('projects')}
              className="px-6 py-3 rounded-lg text-sm font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all shadow-md hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center gap-2 cursor-pointer"
            >
              <span>Explore My Work</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('studyhub')}
              className="px-6 py-3 rounded-lg text-sm font-semibold border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white transition-all flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>StudyHub Portal</span>
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className="px-5 py-3 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all cursor-pointer"
            >
              About Me
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className="px-5 py-3 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all cursor-pointer"
            >
              Contact
            </button>
          </div>
        </div>
      </section>

      {/* Editable Quantitative Metrics / Statistics Strip */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-2xl bg-slate-900/50 border border-slate-800/90 shadow-xl">
          <div className="space-y-1 p-2">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
              06+
            </div>
            <div className="text-xs text-slate-400 font-medium">Projects &amp; Prototypes</div>
            <div className="text-[11px] text-slate-500">Curated &amp; Open Source</div>
          </div>

          <div className="space-y-1 p-2 border-l border-slate-800/80">
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono tabular-nums">
              10+
            </div>
            <div className="text-xs text-slate-400 font-medium">Technologies Mastered</div>
            <div className="text-[11px] text-slate-500">React, TypeScript, CSS3, Git</div>
          </div>

          <div className="space-y-1 p-2 border-l border-slate-800/80">
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-mono tabular-nums">
              150+
            </div>
            <div className="text-xs text-slate-400 font-medium">Learning Hours Logged</div>
            <div className="text-[11px] text-slate-500">DSA &amp; Full-Stack Tracks</div>
          </div>

          <div className="space-y-1 p-2 border-l border-slate-800/80">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono tabular-nums">
              04
            </div>
            <div className="text-xs text-slate-400 font-medium">Verified Credentials</div>
            <div className="text-[11px] text-slate-500">Web &amp; CS Certifications</div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">Featured Work</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Highlighted Engineering Projects
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('projects')}
            className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>View all projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INITIAL_PROJECTS.slice(0, 2).map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl bg-[#091024] border border-slate-800/80 hover:border-cyan-500/40 transition-all overflow-hidden flex flex-col shadow-lg"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-slate-900/90 border border-slate-700/80 rounded px-2 py-0.5 text-[11px] font-medium text-cyan-300">
                  {project.status}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{project.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>Himanshu Singh</span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap gap-2 text-xs text-slate-300 font-mono">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-slate-400">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-2 border-t border-slate-800/60">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target={project.liveUrl.startsWith('http') ? '_blank' : '_self'}
                        rel="noreferrer"
                        onClick={(e) => {
                          if (project.liveUrl === '#studyhub') {
                            e.preventDefault();
                            setActiveTab('studyhub');
                          }
                        }}
                        className="flex items-center gap-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Preview</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-1.5 transition-colors"
                      >
                        <FolderGit2 className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Spotlight: StudyHub Student Learning Platform */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-gradient-to-br from-[#0c1633] to-[#070d1e] border border-cyan-500/20 p-8 sm:p-12 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-wider text-cyan-400 font-bold">
                  Flagship Student Platform
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  StudyHub by Himanshu Singh
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  A dedicated portal for computer science students. Access organized course notes, downloadable PDF study guides, track semester milestones, and receive instant peer updates.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Subject-wise Curated Notes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Integrated AI Study Assistant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Bookmark &amp; Goal Tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Downloadable PDF Reference Guides</span>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <button
                  onClick={() => setActiveTab('studyhub')}
                  className="px-6 py-3 rounded-lg text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-lg cursor-pointer flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Launch StudyHub Platform</span>
                </button>
                <button
                  onClick={() => setActiveTab('ai-lab')}
                  className="px-5 py-3 rounded-lg text-xs font-semibold text-slate-300 hover:text-white border border-slate-700 bg-slate-900/60 hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>Try AI Study Lab</span>
                </button>
              </div>
            </div>

            <div className="relative group">
              <div className="rounded-xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-950">
                <img
                  src={STUDYHUB_PREVIEW}
                  alt="StudyHub Interface Preview"
                  className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Verified Credentials Preview */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">Technical Foundation</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Core Skills &amp; Certifications
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('skills')}
            className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>Explore all credentials</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Skills Breakdown */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-5">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
              Primary Web &amp; Engineering Stack
            </h3>
            
            <div className="space-y-4">
              {INITIAL_SKILLS[0].skills.slice(0, 4).map((skill, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium text-slate-200">{skill.name}</span>
                    <span className="text-slate-400 font-mono tabular-nums">{skill.level}% proficiency</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80">
              <span>All progress meters reflect hands-on coursework and project deployment experience.</span>
              <button
                onClick={() => setActiveTab('skills')}
                className="text-cyan-400 hover:underline shrink-0"
              >
                View full breakdown
              </button>
            </div>
          </div>

          {/* Featured Certificate Card */}
          <div className="p-6 rounded-2xl bg-[#091024] border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
                <GraduationCap className="w-4 h-4" />
                <span>Featured Credential</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                {INITIAL_CERTIFICATES[0].title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Issued by {INITIAL_CERTIFICATES[0].issuer} verifying hands-on web standard compliance, flexbox layouts, accessibility, and modern responsive CSS.
              </p>
              <div className="text-xs text-slate-500 font-mono">
                Credential ID: {INITIAL_CERTIFICATES[0].credentialId}
              </div>
            </div>

            <button
              onClick={() => setActiveTab('skills')}
              className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 transition-colors text-center"
            >
              Verify Certificate &amp; View All
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-slate-800 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Let's Collaborate or Build Together
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Whether you want to discuss study resources on StudyHub, explore open-source web projects, or collaborate on innovative ideas, my inbox is always open.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setActiveTab('contact')}
              className="px-6 py-3 rounded-lg text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-md"
            >
              Get In Touch
            </button>
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-lg text-xs font-semibold text-slate-200 hover:text-white border border-slate-700 hover:bg-slate-800 transition-colors"
            >
              View GitHub Profile
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

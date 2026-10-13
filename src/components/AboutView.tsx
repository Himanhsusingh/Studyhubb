import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Mail, 
  Github, 
  Linkedin, 
  Globe, 
  GraduationCap, 
  Calendar, 
  CheckCircle, 
  Compass, 
  Cpu, 
  Code, 
  Eye, 
  X 
} from 'lucide-react';
import { 
  PERSONAL_INFO, 
  AVATAR_IMAGE, 
  INITIAL_MILESTONES 
} from '../data/initialData';

interface AboutViewProps {
  setActiveTab: (tab: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ setActiveTab }) => {
  const [showResumeModal, setShowResumeModal] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Bio & Profile Header */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Portrait Frame without unwanted cropping */}
        <div className="lg:col-span-5 flex flex-col items-center sm:items-start space-y-4">
          <div className="relative w-full max-w-sm rounded-2xl p-1 bg-gradient-to-tr from-amber-400 via-cyan-400 to-indigo-600 shadow-2xl">
            <div className="rounded-xl overflow-hidden bg-[#091024] aspect-[4/5] w-full">
              <img
                src={AVATAR_IMAGE}
                alt="Himanshu Singh - Software Developer and Student"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Himanshu+Singh&background=0b1329&color=38bdf8&size=512';
                }}
              />
            </div>
            {/* Status bar */}
            <div className="p-3 bg-[#091024]/95 rounded-b-xl flex items-center justify-between text-xs text-slate-300">
              <span className="font-semibold text-white">Himanshu Singh</span>
              <span className="text-cyan-400 font-mono">B.Tech Student</span>
            </div>
          </div>

          {/* Social Profiles & Quick Actions */}
          <div className="flex flex-wrap items-center gap-3 w-full max-w-sm">
            <button
              onClick={() => setShowResumeModal(true)}
              className="flex-1 py-2.5 px-4 text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>View Résumé</span>
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className="py-2.5 px-4 text-xs font-semibold border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Me</span>
            </button>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href={PERSONAL_INFO.existingWebsiteUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Live Site</span>
            </a>
            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Right: Detailed Biography */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">About Himanshu</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Engineering Clean Web Experiences &amp; Empowering Peers
            </h1>
          </div>

          <div className="prose prose-invert text-slate-300 text-sm leading-relaxed space-y-4">
            <p>
              {PERSONAL_INFO.bioExtended}
            </p>
            <p>
              I believe great software emerges from combining disciplined computer science fundamentals with an obsession for crisp, accessible visual ergonomics. Whether architecting interactive state machines in React or writing straightforward algorithms, I prioritize clarity, zero bloat, and maintainability.
            </p>
          </div>

          {/* Core Strengths Grid */}
          <div className="pt-4 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Core Strengths &amp; Technical Passions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold">
                  <Code className="w-4 h-4" />
                  <span>Frontend Architecture</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Semantic HTML5, CSS Grid/Flexbox, Tailwind CSS, TypeScript, and React component design systems.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold">
                  <Cpu className="w-4 h-4" />
                  <span>Computer Science Core</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Data structures, asymptotic complexity analysis, database query design, and operating systems concepts.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
                  <Compass className="w-4 h-4" />
                  <span>Product &amp; Educational Design</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Building StudyHub to eliminate friction for university students studying computer science curriculum.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                  <FileText className="w-4 h-4" />
                  <span>Open Source &amp; Git Hygiene</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Clean commit messages, branch-based workflow, code documentation, and automated GitHub Pages workflows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editable Education Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-cyan-400" />
          <h2 className="text-2xl font-bold text-white tracking-tight">Academic Education</h2>
        </div>

        <div className="p-6 rounded-2xl bg-[#091024] border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white">
                {PERSONAL_INFO.education.degree}
              </h3>
              <p className="text-xs text-cyan-400 font-medium">
                {PERSONAL_INFO.education.institution}
              </p>
            </div>
            <div className="text-xs font-mono text-slate-400 text-left sm:text-right">
              <div>{PERSONAL_INFO.education.duration}</div>
              <div className="text-amber-400 font-semibold">{PERSONAL_INFO.education.gpa}</div>
            </div>
          </div>

          <div className="text-xs text-slate-300 space-y-2">
            <span className="font-semibold text-slate-400 uppercase tracking-wider text-[11px]">Key Focus Modules:</span>
            <p className="text-slate-300 leading-relaxed">
              {PERSONAL_INFO.education.focus}
            </p>
          </div>
        </div>
      </section>

      {/* Timeline of Milestones */}
      <section className="space-y-8">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-cyan-400" />
          <h2 className="text-2xl font-bold text-white tracking-tight">Milestones &amp; Learning Journey</h2>
        </div>

        <div className="relative pl-6 border-l border-slate-800 space-y-10">
          {INITIAL_MILESTONES.map((item) => (
            <div key={item.id} className="relative group">
              {/* Dot */}
              <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-slate-900 border-2 border-cyan-400 group-hover:scale-125 transition-transform" />

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-mono text-cyan-400 font-semibold">{item.period}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-slate-400 font-medium">{item.institutionOrContext}</span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-2 flex flex-wrap gap-2 text-xs">
                  {item.achievements.map((ach, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                      <CheckCircle className="w-3 h-3 text-cyan-500 shrink-0" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Résumé Modal */}
      {showResumeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-[#091024] border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white">Curriculum Vitae / Résumé</h3>
                <p className="text-xs text-slate-400">Himanshu Singh · Computer Science &amp; Engineering</p>
              </div>
              <button
                onClick={() => setShowResumeModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300 leading-relaxed border border-slate-800/80 rounded-xl p-4 bg-slate-950/50">
              <div className="border-b border-slate-800 pb-3">
                <h4 className="font-bold text-white text-sm">Summary</h4>
                <p className="text-slate-400 pt-1">
                  Computer Science undergraduate with expertise in React, TypeScript, responsive CSS, and algorithmic problem solving. Developer of StudyHub platform and open-source portfolio apps.
                </p>
              </div>

              <div className="border-b border-slate-800 pb-3">
                <h4 className="font-bold text-white text-sm">Technical Stack</h4>
                <div className="grid grid-cols-2 gap-2 pt-1 text-slate-400">
                  <div>• Languages: JavaScript (ES6+), TypeScript, C++, Python, HTML5, CSS3</div>
                  <div>• Frameworks: React 19, Tailwind CSS, Express.js, Node.js</div>
                  <div>• Tools: Git, GitHub Pages, Vite, Linux Shell, VS Code</div>
                  <div>• AI &amp; APIs: Google Gemini API, Prompt Engineering, RESTful APIs</div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm">Key Projects</h4>
                <div className="space-y-2 pt-1 text-slate-400">
                  <div>• <strong className="text-slate-200">StudyHub:</strong> Student learning management portal with subject notes &amp; AI tutoring.</div>
                  <div>• <strong className="text-slate-200">Personal Portfolio:</strong> High-performance responsive showcase at himanhsusingh.github.io.</div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowResumeModal(false)}
                className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white"
              >
                Close Preview
              </button>
              <a
                href="#download-resume"
                onClick={(e) => {
                  e.preventDefault();
                  // Simulate clean download of markdown resume text file
                  const element = document.createElement('a');
                  const file = new Blob([
                    `# Himanshu Singh - Software Developer & Student\nEmail: himanshusingh.dev@gmail.com\nWebsite: https://himanhsusingh.github.io\nGitHub: https://github.com/himanhsusingh\n\n## Education\n${PERSONAL_INFO.education.degree} (${PERSONAL_INFO.education.duration})\nGPA: ${PERSONAL_INFO.education.gpa}\n\n## Technical Skills\n- Languages: JavaScript, TypeScript, HTML5, CSS3\n- Frameworks: React, Tailwind CSS\n- Platforms: Git, GitHub Pages, Google Gemini API\n`
                  ], { type: 'text/markdown' });
                  element.href = URL.createObjectURL(file);
                  element.download = 'Himanshu_Singh_Resume.md';
                  document.body.appendChild(element);
                  element.click();
                  document.body.removeChild(element);
                }}
                className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg flex items-center gap-2 shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download Résumé File</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

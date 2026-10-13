import React from 'react';
import { Github, Globe, Linkedin, Mail, ExternalLink, HelpCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../data/initialData';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  openDeploymentGuide: () => void;
  openAdminModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  openDeploymentGuide,
  openAdminModal
}) => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#02050e] text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1: Identity & Bio */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-white text-[10px]">
              HS
            </div>
            <span className="font-bold text-slate-100 text-sm tracking-tight">Himanshu Singh</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Computer science student, modern web developer, and creator of the StudyHub learning platform.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition-colors p-1"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.existingWebsiteUrl}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition-colors p-1"
              aria-label="Live GitHub Pages Portfolio"
            >
              <Globe className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition-colors p-1"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-slate-400 hover:text-cyan-400 transition-colors p-1"
              aria-label="Send Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 2: Navigation */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-slate-200 tracking-wider uppercase">Navigation</h4>
          <ul className="space-y-1.5 text-xs">
            <li>
              <button
                onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-cyan-400 transition-colors"
              >
                Home Overview
              </button>
            </li>
            <li>
              <button
                onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-cyan-400 transition-colors"
              >
                About & Milestones
              </button>
            </li>
            <li>
              <button
                onClick={() => { setActiveTab('projects'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-cyan-400 transition-colors"
              >
                Project Showcase
              </button>
            </li>
            <li>
              <button
                onClick={() => { setActiveTab('skills'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-cyan-400 transition-colors"
              >
                Skills & Certificates
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Platform & Student Portal */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-slate-200 tracking-wider uppercase">Student Ecosystem</h4>
          <ul className="space-y-1.5 text-xs">
            <li>
              <button
                onClick={() => { setActiveTab('studyhub'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-cyan-400 transition-colors text-left"
              >
                StudyHub Notes & Resources
              </button>
            </li>
            <li>
              <button
                onClick={() => { setActiveTab('ai-lab'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-cyan-400 transition-colors text-left"
              >
                AI Study Lab & Code Explainer
              </button>
            </li>
            <li>
              <button
                onClick={() => { setActiveTab('goals'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-cyan-400 transition-colors text-left"
              >
                Learning Goals & Roadmap
              </button>
            </li>
            <li>
              <button
                onClick={() => { setActiveTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-cyan-400 transition-colors text-left"
              >
                Contact & Collaboration
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Deployment & Management */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-slate-200 tracking-wider uppercase">GitHub Pages & Hosting</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Designed for seamless export and hosting on GitHub Pages at <span className="text-slate-300 font-mono">himanhsusingh.github.io</span>.
          </p>
          <div className="flex flex-col gap-2 pt-1">
            <button
              onClick={openDeploymentGuide}
              className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-medium cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>GitHub Pages Deployment Guide</span>
            </button>
            <button
              onClick={openAdminModal}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 cursor-pointer"
            >
              <span>Platform Administration</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          © {new Date().getFullYear()} Himanshu Singh · All Rights Reserved.
        </div>
        <div className="flex items-center gap-4">
          <a
            href={PERSONAL_INFO.existingWebsiteUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 hover:text-slate-300"
          >
            <span>Production Site</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span>·</span>
          <span>Designed with Precision & Purpose</span>
        </div>
      </div>
    </footer>
  );
};

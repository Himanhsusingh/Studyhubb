import React, { useState } from 'react';
import { 
  ExternalLink, 
  Github, 
  Search, 
  Layers, 
  CheckCircle, 
  X, 
  FolderGit2, 
  ArrowUpRight 
} from 'lucide-react';
import { Project } from '../types';
import { INITIAL_PROJECTS, PERSONAL_INFO } from '../data/initialData';

interface ProjectsViewProps {
  setActiveTab: (tab: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ setActiveTab }) => {
  const [projects] = useState<Project[]>(INITIAL_PROJECTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['All', 'Web Apps', 'AI & Tools', 'Portfolio & Student'];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">Engineering Portfolio</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Featured Projects &amp; Software Systems
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          Curated showcase of web applications, student platforms, and developer tooling built with clean architecture, responsive styling, and modern APIs.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects, stack, keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto p-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group rounded-2xl bg-[#091024] border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between overflow-hidden shadow-xl"
          >
            <div>
              {/* Media Container */}
              <div
                onClick={() => setActiveModalProject(project)}
                className="relative aspect-video w-full bg-slate-950 overflow-hidden cursor-pointer"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Status Indicator */}
                <div className="absolute top-3 right-3 bg-slate-900/90 border border-slate-700/80 rounded px-2.5 py-0.5 text-[11px] font-medium text-cyan-300">
                  {project.status}
                </div>

                <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3.5 py-1.5 rounded-lg bg-cyan-400 text-slate-950 text-xs font-semibold shadow-md flex items-center gap-1.5">
                    <span>Inspect Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Information */}
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>{project.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>Himanshu Singh</span>
                </div>

                <h3
                  onClick={() => setActiveModalProject(project)}
                  className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono text-cyan-300/80 bg-cyan-950/40 border border-cyan-900/50 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="p-6 pt-0 border-t border-slate-800/80 mt-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target={project.liveUrl.startsWith('http') ? '_blank' : '_self'}
                    rel="noreferrer"
                    onClick={(e) => {
                      if (project.liveUrl === '#studyhub') {
                        e.preventDefault();
                        setActiveTab('studyhub');
                      } else if (project.liveUrl === '#ai-lab') {
                        e.preventDefault();
                        setActiveTab('ai-lab');
                      }
                    }}
                    className="flex items-center gap-1.5 text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 px-3.5 py-2 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white border border-slate-700 bg-slate-800/60 px-3 py-2 rounded-lg transition-colors"
                  >
                    <FolderGit2 className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>
                )}
              </div>

              <button
                onClick={() => setActiveModalProject(project)}
                className="text-xs text-slate-400 hover:text-cyan-400 underline decoration-slate-700"
              >
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 p-6 rounded-2xl bg-slate-900/30 border border-slate-800 text-slate-400">
          No projects found matching your criteria. Try adjusting your search query.
        </div>
      )}

      {/* Project Detail Lightbox Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-[#091024] border border-slate-700 rounded-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-xl font-bold text-white">{activeModalProject.title}</h3>
                <p className="text-xs text-cyan-400">{activeModalProject.category} · Status: {activeModalProject.status}</p>
              </div>
              <button
                onClick={() => setActiveModalProject(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-800 aspect-video w-full">
              <img
                src={activeModalProject.image}
                alt={activeModalProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <h4 className="font-semibold text-white">Project Overview &amp; Architecture</h4>
              <p>
                {activeModalProject.longDescription || activeModalProject.description}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {activeModalProject.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-800/80 px-2.5 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-3">
                {activeModalProject.liveUrl && (
                  <a
                    href={activeModalProject.liveUrl}
                    target={activeModalProject.liveUrl.startsWith('http') ? '_blank' : '_self'}
                    rel="noreferrer"
                    onClick={(e) => {
                      if (activeModalProject.liveUrl === '#studyhub') {
                        e.preventDefault();
                        setActiveModalProject(null);
                        setActiveTab('studyhub');
                      } else if (activeModalProject.liveUrl === '#ai-lab') {
                        e.preventDefault();
                        setActiveModalProject(null);
                        setActiveTab('ai-lab');
                      }
                    }}
                    className="px-4 py-2 text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-lg flex items-center gap-1.5 shadow"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Live Project</span>
                  </a>
                )}
                {activeModalProject.githubUrl && (
                  <a
                    href={activeModalProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 text-xs font-medium border border-slate-700 hover:bg-slate-800 text-slate-200 rounded-lg flex items-center gap-1.5"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                )}
              </div>

              <button
                onClick={() => setActiveModalProject(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

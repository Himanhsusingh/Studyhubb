import React, { useState } from 'react';
import { Menu, X, Sparkles, BookOpen, Shield } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openAdminModal: () => void;
  isAdmin: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openAdminModal,
  isAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills & Certs' },
    { id: 'studyhub', label: 'StudyHub' },
    { id: 'ai-lab', label: 'AI Lab' },
    { id: 'goals', label: 'Goals' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#030712]/85 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left group whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-white text-xs tracking-wider shadow-sm group-hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all">
            HS
          </div>
          <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
            Himanshu Singh
          </span>
        </button>

        {/* Zone 2: Single-line Text Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 cursor-pointer ${
                  isActive
                    ? 'text-cyan-400 border-cyan-400 font-semibold'
                    : 'text-slate-300 hover:text-white border-transparent'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('studyhub')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 rounded-lg shadow-sm hover:shadow-[0_0_20px_rgba(34,211,238,0.35)] transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>StudyHub</span>
          </button>

          <button
            onClick={openAdminModal}
            title={isAdmin ? 'Admin Console Active' : 'Admin Control Panel'}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              isAdmin
                ? 'border-amber-500/50 text-amber-400 bg-amber-500/10'
                : 'border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Shield className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#070d1e] px-4 pt-3 pb-6 space-y-1 shadow-2xl animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === link.id
                  ? 'bg-cyan-500/10 text-cyan-400 font-semibold border-l-2 border-cyan-400'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-800/80 flex items-center gap-3">
            <button
              onClick={() => handleNavClick('studyhub')}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 text-xs font-semibold text-slate-900 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Open StudyHub
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAdminModal();
              }}
              className="px-3 py-2 text-xs font-medium border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-800"
            >
              Admin
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

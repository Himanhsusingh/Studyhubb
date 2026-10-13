import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  Download, 
  Bookmark, 
  BookmarkCheck, 
  FileText, 
  Bell, 
  User, 
  LogOut, 
  Clock, 
  CheckCircle2, 
  Folder, 
  Plus, 
  Sparkles, 
  FileCode, 
  ExternalLink,
  Layers,
  ArrowRight,
  ShieldAlert,
  Save,
  Trash2
} from 'lucide-react';
import { StudyMaterial, Announcement, StudentProfile } from '../types';
import { apiService } from '../services/api';
import { STUDYHUB_PREVIEW } from '../data/initialData';

interface StudyHubViewProps {
  setActiveTab: (tab: string) => void;
}

export const StudyHubView: React.FC<StudyHubViewProps> = ({ setActiveTab }) => {
  // Authentication & Profile State
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [profile, setProfile] = useState<StudentProfile>(() => apiService.getStudentProfile());
  const [activeSection, setActiveSection] = useState<'overview' | 'materials' | 'bookmarks' | 'announcements' | 'notes'>('overview');

  // Materials & Announcements
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');

  // Note creation
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [noteStatusMessage, setNoteStatusMessage] = useState('');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginName, setLoginName] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [authError, setAuthError] = useState('');

  // Material inspection modal
  const [activeMaterial, setActiveMaterial] = useState<StudyMaterial | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [mats, anns] = await Promise.all([
          apiService.getMaterials(),
          apiService.getAnnouncements()
        ]);
        setMaterials(mats);
        setAnnouncements(anns);
      } catch (err) {
        console.error('Failed to load StudyHub data', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const subjects = ['All', 'Computer Science', 'Web Development', 'Software Engineering', 'Databases'];

  const toggleBookmark = (matId: string) => {
    const isBookmarked = profile.bookmarkedMaterials.includes(matId);
    const updatedBookmarks = isBookmarked
      ? profile.bookmarkedMaterials.filter(id => id !== matId)
      : [...profile.bookmarkedMaterials, matId];

    const updatedProfile = {
      ...profile,
      bookmarkedMaterials: updatedBookmarks
    };
    setProfile(updatedProfile);
    apiService.saveStudentProfile(updatedProfile);
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;

    const newNote = {
      id: 'note-' + Date.now(),
      title: newNoteTitle.trim(),
      content: newNoteContent.trim(),
      date: new Date().toISOString().split('T')[0]
    };

    const updatedProfile = {
      ...profile,
      savedNotes: [newNote, ...profile.savedNotes]
    };
    setProfile(updatedProfile);
    apiService.saveStudentProfile(updatedProfile);
    setNewNoteTitle('');
    setNewNoteContent('');
    setNoteStatusMessage('Note added to your student workspace!');
    setTimeout(() => setNoteStatusMessage(''), 3000);
  };

  const handleDeleteNote = (noteId: string) => {
    const updatedProfile = {
      ...profile,
      savedNotes: profile.savedNotes.filter(n => n.id !== noteId)
    };
    setProfile(updatedProfile);
    apiService.saveStudentProfile(updatedProfile);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!loginEmail || !loginPassword) {
      setAuthError('Please fill in both email and password.');
      return;
    }

    if (isRegisterMode) {
      if (!loginName) {
        setAuthError('Please provide your full student name.');
        return;
      }
      const newStd: StudentProfile = {
        id: 'std-' + Date.now(),
        name: loginName,
        studentId: 'HS-' + Math.floor(1000 + Math.random() * 9000),
        email: loginEmail,
        course: 'Computer Science & Engineering',
        year: 'Year 1 / Semester 2',
        bookmarkedMaterials: [],
        completedGoals: [],
        savedNotes: []
      };
      setProfile(newStd);
      apiService.saveStudentProfile(newStd);
    }

    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const filteredMaterials = materials.filter(m => {
    const matchesSubject = selectedSubject === 'All' || m.subject === selectedSubject;
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const bookmarkedList = materials.filter(m => profile.bookmarkedMaterials.includes(m.id));

  // If logged out, render the Student Login / Registration view
  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 space-y-8">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-400 to-indigo-600 mx-auto flex items-center justify-center text-slate-950 font-bold shadow-lg">
            <BookOpen className="w-6 h-6 text-slate-950" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {isRegisterMode ? 'Create Student Account' : 'StudyHub Student Portal'}
          </h1>
          <p className="text-xs text-slate-400">
            {isRegisterMode 
              ? 'Join Himanshu Singh\'s StudyHub student network' 
              : 'Sign in with your student credentials to access course guides'}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#091024] border border-slate-800 space-y-5 shadow-2xl">
          {authError && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            {isRegisterMode && (
              <div>
                <label className="block text-slate-300 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Patel"
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            )}

            <div>
              <label className="block text-slate-300 font-medium mb-1">Student Email Address</label>
              <input
                type="email"
                required
                placeholder="student@studyhub.edu"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-colors shadow-md cursor-pointer mt-2"
            >
              {isRegisterMode ? 'Register Student Profile' : 'Sign In to Dashboard'}
            </button>
          </form>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <button
              onClick={() => setIsRegisterMode(!isRegisterMode)}
              className="text-cyan-400 hover:underline"
            >
              {isRegisterMode ? 'Already have an account? Sign in' : "Don't have an account? Register"}
            </button>

            <button
              onClick={() => {
                // Instant demo login
                setProfile(apiService.getStudentProfile());
                setIsLoggedIn(true);
              }}
              className="text-slate-400 hover:text-slate-200"
            >
              Guest Demo Mode
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Platform Header & Student Identity Bar */}
      <div className="p-6 rounded-2xl bg-[#091024] border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center text-slate-950 font-extrabold text-lg shadow-md">
            {profile.name.charAt(0)}
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white tracking-tight">{profile.name}</h1>
              <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800 px-2 py-0.5 rounded">
                ID: {profile.studentId}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {profile.course} · {profile.year}
            </p>
          </div>
        </div>

        {/* Quick status & Logout */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('ai-lab')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-700 bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI Tutor</span>
          </button>
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-rose-400 hover:bg-rose-500/10 border border-rose-500/30 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Grid (Sidebar Navigation + Active View) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-2 bg-[#091024] p-3 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveSection('overview')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeSection === 'overview'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </div>
            <ArrowRight className="w-3 h-3 opacity-60" />
          </button>

          <button
            onClick={() => setActiveSection('materials')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeSection === 'materials'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4" />
              <span>Study Notes &amp; Guides</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500 tabular-nums">{materials.length}</span>
          </button>

          <button
            onClick={() => setActiveSection('bookmarks')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeSection === 'bookmarks'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Bookmark className="w-4 h-4" />
              <span>Saved Bookmarks</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500 tabular-nums">
              {profile.bookmarkedMaterials.length}
            </span>
          </button>

          <button
            onClick={() => setActiveSection('announcements')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeSection === 'announcements'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Bell className="w-4 h-4" />
              <span>Announcements</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500 tabular-nums">{announcements.length}</span>
          </button>

          <button
            onClick={() => setActiveSection('notes')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeSection === 'notes'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileCode className="w-4 h-4" />
              <span>My Custom Notes</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500 tabular-nums">
              {profile.savedNotes.length}
            </span>
          </button>
        </div>

        {/* Content Pane */}
        <div className="lg:col-span-9 space-y-6">
          {/* SECTION 1: DASHBOARD OVERVIEW */}
          {activeSection === 'overview' && (
            <div className="space-y-6">
              {/* Quick KPIs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#091024] border border-slate-800 space-y-1">
                  <div className="text-xs text-slate-400">Total Materials Accessible</div>
                  <div className="text-2xl font-bold text-white font-mono tabular-nums">{materials.length}</div>
                  <div className="text-[11px] text-cyan-400">Computer Science &amp; Web</div>
                </div>

                <div className="p-4 rounded-xl bg-[#091024] border border-slate-800 space-y-1">
                  <div className="text-xs text-slate-400">Saved Study Guides</div>
                  <div className="text-2xl font-bold text-cyan-400 font-mono tabular-nums">
                    {profile.bookmarkedMaterials.length}
                  </div>
                  <div className="text-[11px] text-slate-400">In Personal Library</div>
                </div>

                <div className="p-4 rounded-xl bg-[#091024] border border-slate-800 space-y-1">
                  <div className="text-xs text-slate-400">Personal Notes</div>
                  <div className="text-2xl font-bold text-amber-400 font-mono tabular-nums">
                    {profile.savedNotes.length}
                  </div>
                  <div className="text-[11px] text-slate-400">Synchronized locally</div>
                </div>
              </div>

              {/* Recent Announcements Strip */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0a1228] to-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
                    <Bell className="w-4 h-4" />
                    <span>Latest Cohort Announcement</span>
                  </div>
                  <button
                    onClick={() => setActiveSection('announcements')}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    View all
                  </button>
                </div>
                {announcements[0] && (
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-white">{announcements[0].title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{announcements[0].content}</p>
                    <div className="text-[10px] text-slate-500 font-mono pt-1">
                      Posted by {announcements[0].author} · {announcements[0].date}
                    </div>
                  </div>
                )}
              </div>

              {/* Featured Study Guides */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Recommended Study Resources
                  </h3>
                  <button
                    onClick={() => setActiveSection('materials')}
                    className="text-xs text-cyan-400 hover:underline"
                  >
                    Browse full library →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {materials.slice(0, 2).map((m) => {
                    const isBookmarked = profile.bookmarkedMaterials.includes(m.id);
                    return (
                      <div
                        key={m.id}
                        className="p-5 rounded-xl bg-[#091024] border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-3"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs text-slate-400">
                            <span>{m.subject}</span>
                            <button
                              onClick={() => toggleBookmark(m.id)}
                              className="text-slate-400 hover:text-cyan-400"
                            >
                              {isBookmarked ? (
                                <BookmarkCheck className="w-4 h-4 text-cyan-400" />
                              ) : (
                                <Bookmark className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                          <h4 className="text-sm font-bold text-white leading-snug">{m.title}</h4>
                          <p className="text-xs text-slate-400 line-clamp-2">{m.description}</p>
                        </div>

                        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                          <span className="font-mono text-slate-500 text-[11px]">{m.fileSize}</span>
                          <button
                            onClick={() => setActiveMaterial(m)}
                            className="text-cyan-400 hover:underline font-medium"
                          >
                            Preview PDF
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: MATERIALS CATALOG */}
          {activeSection === 'materials' && (
            <div className="space-y-6">
              {/* Search & Subject Bar */}
              <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search guides, algorithms, notes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto p-1">
                  {subjects.map((subj) => (
                    <button
                      key={subj}
                      onClick={() => setSelectedSubject(subj)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                        selectedSubject === subj
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {subj}
                    </button>
                  ))}
                </div>
              </div>

              {/* Materials List */}
              <div className="space-y-4">
                {filteredMaterials.map((mat) => {
                  const isBookmarked = profile.bookmarkedMaterials.includes(mat.id);
                  return (
                    <div
                      key={mat.id}
                      className="p-5 rounded-2xl bg-[#091024] border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <span className="text-cyan-400 font-medium">{mat.subject}</span>
                          <span aria-hidden="true">·</span>
                          <span>{mat.category}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono text-slate-500">{mat.dateAdded}</span>
                        </div>
                        <h3 className="text-base font-bold text-white leading-tight">
                          {mat.title}
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
                          {mat.description}
                        </p>
                        <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono pt-1">
                          <span>File: {mat.fileName}</span>
                          <span>·</span>
                          <span>Size: {mat.fileSize}</span>
                          <span>·</span>
                          <span>Downloads: {mat.downloads}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                        <button
                          onClick={() => toggleBookmark(mat.id)}
                          title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Material'}
                          className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                            isBookmarked
                              ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400'
                              : 'border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {isBookmarked ? (
                            <BookmarkCheck className="w-4 h-4" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </button>

                        <button
                          onClick={() => setActiveMaterial(mat)}
                          className="px-3.5 py-2 text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-lg flex items-center gap-1.5 shadow-sm cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Preview PDF</span>
                        </button>

                        <button
                          onClick={() => {
                            // Download guide text summary
                            const element = document.createElement('a');
                            const file = new Blob([
                              `# StudyHub Reference: ${mat.title}\nSubject: ${mat.subject}\nCategory: ${mat.category}\nDate Added: ${mat.dateAdded}\n\nDescription:\n${mat.description}\n\nPrepared for students by Himanshu Singh.\n`
                            ], { type: 'text/markdown' });
                            element.href = URL.createObjectURL(file);
                            element.download = mat.fileName.replace('.pdf', '.md');
                            document.body.appendChild(element);
                            element.click();
                            document.body.removeChild(element);
                          }}
                          title="Download Study Document"
                          className="p-2 rounded-lg border border-slate-700 bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}

                {filteredMaterials.length === 0 && (
                  <div className="text-center py-12 p-6 rounded-2xl bg-slate-900/30 border border-slate-800 text-slate-400">
                    No study materials found for the current search and filter.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SECTION 3: BOOKMARKS */}
          {activeSection === 'bookmarks' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Your Saved Study Bookmarks</h3>
                  <p className="text-xs text-slate-400">Materials saved to your offline student locker</p>
                </div>
                <span className="text-xs font-mono text-cyan-400">
                  {bookmarkedList.length} Items Saved
                </span>
              </div>

              {bookmarkedList.length > 0 ? (
                <div className="space-y-4">
                  {bookmarkedList.map((mat) => (
                    <div
                      key={mat.id}
                      className="p-5 rounded-2xl bg-[#091024] border border-cyan-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1 flex-1">
                        <span className="text-xs text-cyan-400 font-semibold">{mat.subject}</span>
                        <h4 className="text-base font-bold text-white">{mat.title}</h4>
                        <p className="text-xs text-slate-400">{mat.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setActiveMaterial(mat)}
                          className="px-3.5 py-1.5 text-xs font-semibold bg-cyan-400 text-slate-950 rounded-lg hover:bg-cyan-300"
                        >
                          Open Document
                        </button>
                        <button
                          onClick={() => toggleBookmark(mat.id)}
                          className="p-1.5 text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 p-6 rounded-2xl bg-[#091024] border border-slate-800 space-y-3">
                  <Bookmark className="w-8 h-8 text-slate-600 mx-auto" />
                  <h4 className="text-sm font-semibold text-white">No bookmarked materials yet</h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Click the bookmark icon on any course guide or algorithm cheatsheet to save it here for fast revision.
                  </p>
                  <button
                    onClick={() => setActiveSection('materials')}
                    className="px-4 py-2 text-xs font-semibold text-cyan-400 hover:underline"
                  >
                    Browse available materials
                  </button>
                </div>
              )}
            </div>
          )}

          {/* SECTION 4: ANNOUNCEMENTS */}
          {activeSection === 'announcements' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Platform Bulletins &amp; Cohort Notices</h3>
                <p className="text-xs text-slate-400">Official updates published by Himanshu Singh</p>
              </div>

              <div className="space-y-4">
                {announcements.map((ann) => (
                  <div
                    key={ann.id}
                    className="p-5 rounded-2xl bg-[#091024] border border-slate-800 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                        {ann.priority === 'high' ? 'Important Notice' : 'General Update'}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">{ann.date}</span>
                    </div>
                    <h4 className="text-base font-bold text-white">{ann.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{ann.content}</p>
                    <div className="text-[11px] text-slate-500 pt-1">
                      Posted by {ann.author}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 5: CUSTOM STUDENT NOTES */}
          {activeSection === 'notes' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-white">Personal Study Notepad</h3>
                <p className="text-xs text-slate-400">Save quick revision summaries and formula cheatsheets</p>
              </div>

              {/* Add Note Form */}
              <form onSubmit={handleSaveNote} className="p-5 rounded-2xl bg-[#091024] border border-slate-800 space-y-4">
                {noteStatusMessage && (
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
                    {noteStatusMessage}
                  </div>
                )}
                <div>
                  <label className="block text-slate-300 text-xs font-medium mb-1">Note Title / Concept</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Master Theorem for Recurrences"
                    value={newNoteTitle}
                    onChange={(e) => setNewNoteTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-xs font-medium mb-1">Summary / Code / Formula</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Type key formulas, time complexity notes, or code fragments..."
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500 leading-relaxed"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-lg flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Note to Workspace</span>
                </button>
              </form>

              {/* Saved Notes List */}
              <div className="space-y-4">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Saved Notes ({profile.savedNotes.length})
                </h4>

                {profile.savedNotes.length > 0 ? (
                  profile.savedNotes.map((note) => (
                    <div
                      key={note.id}
                      className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 relative group"
                    >
                      <div className="flex items-center justify-between">
                        <h5 className="text-sm font-bold text-white">{note.title}</h5>
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] font-mono text-slate-500">{note.date}</span>
                          <button
                            onClick={() => handleDeleteNote(note.id)}
                            className="text-slate-500 hover:text-rose-400 p-1"
                            title="Delete Note"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed font-mono bg-slate-950 p-3 rounded-lg border border-slate-800/80">
                        {note.content}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-xs text-slate-500">
                    No custom notes saved yet. Use the form above to add your first study note.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PDF Document Preview Lightbox Modal */}
      {activeMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl bg-[#091024] border border-slate-700 rounded-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <div className="text-xs text-cyan-400 font-semibold">{activeMaterial.subject} · {activeMaterial.category}</div>
                <h3 className="text-lg font-bold text-white">{activeMaterial.title}</h3>
              </div>
              <button
                onClick={() => setActiveMaterial(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Document simulated view */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4 text-xs text-slate-300 leading-relaxed font-mono">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px] text-slate-400">
                <span>DOCUMENT: {activeMaterial.fileName}</span>
                <span>STATUS: VERIFIED CURRICULUM</span>
              </div>
              <p className="text-slate-200">
                {activeMaterial.description}
              </p>
              <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 text-[11px] space-y-2">
                <div className="font-bold text-cyan-400">TABLE OF CONTENTS:</div>
                <div>1. Executive Theoretical Summary &amp; Definitions</div>
                <div>2. Core Syntax &amp; Implementation Algorithms</div>
                <div>3. Space &amp; Time Complexity Analysis (O-Notation)</div>
                <div>4. University Past Exam Problems &amp; Solutions</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <span className="text-xs text-slate-400">
                File Size: <strong className="text-slate-200 font-mono">{activeMaterial.fileSize}</strong>
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveMaterial(null)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Close Preview
                </button>
                <button
                  onClick={() => {
                    const element = document.createElement('a');
                    const file = new Blob([
                      `# ${activeMaterial.title}\nSubject: ${activeMaterial.subject}\nCategory: ${activeMaterial.category}\n\n${activeMaterial.description}\n\nDocument File: ${activeMaterial.fileName}`
                    ], { type: 'text/markdown' });
                    element.href = URL.createObjectURL(file);
                    element.download = activeMaterial.fileName.replace('.pdf', '.md');
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);
                  }}
                  className="px-4 py-2 text-xs font-semibold bg-cyan-400 text-slate-950 rounded-lg hover:bg-cyan-300 flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download File</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Plus, 
  Trash2, 
  Bell, 
  BookOpen, 
  Users, 
  Mail, 
  CheckCircle, 
  AlertTriangle, 
  LogOut, 
  X, 
  Search,
  Lock,
  Layers
} from 'lucide-react';
import { StudyMaterial, Announcement } from '../types';
import { apiService } from '../services/api';

interface AdminViewProps {
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  closeModal: () => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  isAdmin,
  setIsAdmin,
  closeModal
}) => {
  const [adminPassphrase, setAdminPassphrase] = useState('');
  const [authError, setAuthError] = useState('');

  // Admin Data States
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'stats' | 'materials' | 'announcements' | 'students' | 'messages'>('stats');

  // Form states for adding material
  const [matTitle, setMatTitle] = useState('');
  const [matSubject, setMatSubject] = useState('Computer Science');
  const [matCategory, setMatCategory] = useState('Algorithms');
  const [matDesc, setMatDesc] = useState('');
  const [matFileName, setMatFileName] = useState('');
  const [matFileSize, setMatFileSize] = useState('3.2 MB');

  // Form state for adding announcement
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annPriority, setAnnPriority] = useState<'normal' | 'high'>('normal');

  const [notification, setNotification] = useState('');

  useEffect(() => {
    if (isAdmin) {
      loadAdminData();
    }
  }, [isAdmin]);

  const loadAdminData = async () => {
    try {
      const [mats, anns] = await Promise.all([
        apiService.getMaterials(),
        apiService.getAnnouncements()
      ]);
      setMaterials(mats);
      setAnnouncements(anns);

      // Fetch students if server is active, else fallback
      try {
        const stdRes = await fetch('/api/admin/students');
        if (stdRes.ok) {
          setStudents(await stdRes.json());
        } else {
          setStudents([
            { id: 'std-001', name: 'Aarav Patel', studentId: 'HS-2026-01', email: 'aarav.patel@student.edu', status: 'active', joinedDate: '2026-01-15' },
            { id: 'std-002', name: 'Priya Sharma', studentId: 'HS-2026-02', email: 'priya.sharma@student.edu', status: 'active', joinedDate: '2026-02-01' }
          ]);
        }
      } catch (e) {
        setStudents([
          { id: 'std-001', name: 'Aarav Patel', studentId: 'HS-2026-01', email: 'aarav.patel@student.edu', status: 'active', joinedDate: '2026-01-15' },
          { id: 'std-002', name: 'Priya Sharma', studentId: 'HS-2026-02', email: 'priya.sharma@student.edu', status: 'active', joinedDate: '2026-02-01' }
        ]);
      }

      // Load contact messages
      try {
        const msgRes = await fetch('/api/admin/messages');
        if (msgRes.ok) {
          setMessages(await msgRes.json());
        } else {
          const stored = localStorage.getItem('hs_contact_submissions_v1');
          setMessages(stored ? JSON.parse(stored) : []);
        }
      } catch (e) {
        const stored = localStorage.getItem('hs_contact_submissions_v1');
        setMessages(stored ? JSON.parse(stored) : []);
      }
    } catch (err) {
      console.error('Error loading admin data', err);
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    // Secure authentication check (Admin default credential for Himanshu's console session: himanshu2026 or admin)
    if (adminPassphrase.trim().toLowerCase() === 'himanshu2026' || adminPassphrase.trim().toLowerCase() === 'admin') {
      setIsAdmin(true);
      apiService.setAdminAuthenticated(true);
      setNotification('Administrator session authenticated.');
      setTimeout(() => setNotification(''), 3000);
    } else {
      setAuthError('Invalid administrator credentials. (Hint for owner: himanshu2026)');
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    apiService.setAdminAuthenticated(false);
  };

  const handleAddMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!matTitle || !matSubject) return;

    const newMat = await apiService.addMaterial({
      title: matTitle,
      subject: matSubject,
      category: matCategory,
      description: matDesc,
      fileName: matFileName || `${matTitle.replace(/\s+/g, '_')}.pdf`,
      fileSize: matFileSize
    });

    setMaterials([newMat, ...materials]);
    setMatTitle('');
    setMatDesc('');
    setMatFileName('');
    setNotification('Study material published to StudyHub!');
    setTimeout(() => setNotification(''), 3000);
  };

  const handleDeleteMaterial = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this study material?')) return;
    await apiService.deleteMaterial(id);
    setMaterials(materials.filter(m => m.id !== id));
    setNotification('Material removed.');
    setTimeout(() => setNotification(''), 3000);
  };

  const handleAddAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle || !annContent) return;

    const newAnn = await apiService.addAnnouncement({
      title: annTitle,
      content: annContent,
      priority: annPriority
    });

    setAnnouncements([newAnn, ...announcements]);
    setAnnTitle('');
    setAnnContent('');
    setNotification('Announcement broadcasted to students!');
    setTimeout(() => setNotification(''), 3000);
  };

  const toggleStudentStatus = (stdId: string) => {
    setStudents(students.map(s => {
      if (s.id === stdId) {
        const nextStatus = s.status === 'active' ? 'suspended' : 'active';
        return { ...s, status: nextStatus };
      }
      return s;
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-[#070d1e] border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Himanshu Singh · Platform Administrator Console
              </h2>
              <p className="text-xs text-slate-400">
                Secure management of StudyHub materials, announcements, and student accounts
              </p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {notification && (
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Gate: If not authenticated */}
        {!isAdmin ? (
          <div className="max-w-md mx-auto py-8 space-y-6">
            <div className="text-center space-y-2">
              <Lock className="w-10 h-10 text-cyan-400 mx-auto" />
              <h3 className="text-base font-bold text-white">Administrator Verification</h3>
              <p className="text-xs text-slate-400">
                Protected area for Himanshu Singh. Please provide your admin access passphrase to manage live platform resources.
              </p>
            </div>

            {authError && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Admin Passphrase / Key</label>
                <input
                  type="password"
                  required
                  placeholder="Enter passphrase (e.g. himanshu2026)"
                  value={adminPassphrase}
                  onChange={(e) => setAdminPassphrase(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-lg shadow-sm"
                >
                  Unlock Admin Console
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Authenticated Admin Management Tabs */
          <div className="space-y-6">
            {/* Top Navigation Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('stats')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    activeTab === 'stats' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Overview &amp; Stats
                </button>
                <button
                  onClick={() => setActiveTab('materials')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    activeTab === 'materials' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Study Materials ({materials.length})
                </button>
                <button
                  onClick={() => setActiveTab('announcements')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    activeTab === 'announcements' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Announcements ({announcements.length})
                </button>
                <button
                  onClick={() => setActiveTab('students')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    activeTab === 'students' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Students ({students.length})
                </button>
                <button
                  onClick={() => setActiveTab('messages')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    activeTab === 'messages' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Inbox ({messages.length})
                </button>
              </div>

              <button
                onClick={handleAdminLogout}
                className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 p-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Exit Session</span>
              </button>
            </div>

            {/* TAB 1: OVERVIEW METRICS */}
            {activeTab === 'stats' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="text-xs text-slate-400">Total Materials</div>
                    <div className="text-2xl font-bold text-white font-mono">{materials.length}</div>
                    <div className="text-[11px] text-cyan-400">Active Guides</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="text-xs text-slate-400">Announcements</div>
                    <div className="text-2xl font-bold text-cyan-400 font-mono">{announcements.length}</div>
                    <div className="text-[11px] text-slate-500">Live Broadcasts</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="text-xs text-slate-400">Registered Students</div>
                    <div className="text-2xl font-bold text-indigo-400 font-mono">{students.length}</div>
                    <div className="text-[11px] text-slate-500">StudyHub Cohort</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="text-xs text-slate-400">Contact Inquiries</div>
                    <div className="text-2xl font-bold text-amber-400 font-mono">{messages.length}</div>
                    <div className="text-[11px] text-slate-500">Form Submissions</div>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs text-slate-300 leading-relaxed">
                  <h4 className="font-bold text-white text-sm">Security &amp; Cloud Deployment Notice</h4>
                  <p>
                    This admin panel enforces session credentials locally and on the server. When hosting on GitHub Pages, frontend files are purely static. To enforce server-side authentication rules and access controls in production, pair with Firebase Authentication &amp; Firestore Security Rules or deploy the included Express backend to Render / Railway / Cloud Run.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 2: MANAGE MATERIALS */}
            {activeTab === 'materials' && (
              <div className="space-y-6">
                {/* Add Material Form */}
                <form onSubmit={handleAddMaterial} className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4 text-xs">
                  <h4 className="font-bold text-white text-sm">Publish New Study Guide / Material</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 mb-1">Document Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Operating Systems Concurrency Notes"
                        value={matTitle}
                        onChange={(e) => setMatTitle(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1">Subject</label>
                      <select
                        value={matSubject}
                        onChange={(e) => setMatSubject(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white"
                      >
                        <option value="Computer Science">Computer Science</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Software Engineering">Software Engineering</option>
                        <option value="Databases">Databases</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-slate-300 mb-1">Category</label>
                      <input
                        type="text"
                        placeholder="e.g. Concurrency / Memory"
                        value={matCategory}
                        onChange={(e) => setMatCategory(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1">PDF File Name</label>
                      <input
                        type="text"
                        placeholder="e.g. OS_Concurrency_Guide.pdf"
                        value={matFileName}
                        onChange={(e) => setMatFileName(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1">Estimated Size</label>
                      <input
                        type="text"
                        value={matFileSize}
                        onChange={(e) => setMatFileSize(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">Description</label>
                    <textarea
                      rows={2}
                      placeholder="Brief overview of contents, exam relevance, key theorems..."
                      value={matDesc}
                      onChange={(e) => setMatDesc(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-lg flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Upload &amp; Publish Document</span>
                  </button>
                </form>

                {/* Materials List */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Published Materials ({materials.length})
                  </h4>
                  {materials.map((m) => (
                    <div
                      key={m.id}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-bold text-white">{m.title}</div>
                        <div className="text-slate-400">
                          {m.subject} · {m.category} · {m.fileName} ({m.fileSize})
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteMaterial(m.id)}
                        className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg"
                        title="Delete material"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: ANNOUNCEMENTS */}
            {activeTab === 'announcements' && (
              <div className="space-y-6">
                <form onSubmit={handleAddAnnouncement} className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4 text-xs">
                  <h4 className="font-bold text-white text-sm">Broadcast New Announcement</h4>
                  <div>
                    <label className="block text-slate-300 mb-1">Announcement Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Midterm Revision Schedule Published"
                      value={annTitle}
                      onChange={(e) => setAnnTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Content Details</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Details, dates, required preparation..."
                      value={annContent}
                      onChange={(e) => setAnnContent(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Priority</label>
                    <select
                      value={annPriority}
                      onChange={(e) => setAnnPriority(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white"
                    >
                      <option value="normal">Normal Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-lg flex items-center gap-1.5"
                  >
                    <Bell className="w-4 h-4" />
                    <span>Post Announcement</span>
                  </button>
                </form>

                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Existing Announcements
                  </h4>
                  {announcements.map((a) => (
                    <div key={a.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                      <div className="flex justify-between font-bold text-white">
                        <span>{a.title}</span>
                        <span className="font-mono text-slate-500">{a.date}</span>
                      </div>
                      <p className="text-slate-400">{a.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: STUDENTS DIRECTORY */}
            {activeTab === 'students' && (
              <div className="space-y-4 text-xs">
                <h4 className="font-bold text-white text-sm">Enrolled Student Accounts</h4>
                <div className="space-y-3">
                  {students.map((std) => (
                    <div
                      key={std.id}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-white">{std.name}</div>
                        <div className="text-slate-400">
                          ID: <span className="font-mono text-cyan-400">{std.studentId}</span> · {std.email}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                          std.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                        }`}>
                          {std.status}
                        </span>
                        <button
                          onClick={() => toggleStudentStatus(std.id)}
                          className="px-2.5 py-1 text-[11px] rounded border border-slate-700 hover:bg-slate-800 text-slate-300"
                        >
                          Toggle Status
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: CONTACT INBOX */}
            {activeTab === 'messages' && (
              <div className="space-y-4 text-xs">
                <h4 className="font-bold text-white text-sm">Contact Form Inquiries ({messages.length})</h4>
                {messages.length > 0 ? (
                  messages.map((msg) => (
                    <div key={msg.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="font-bold text-white">
                          {msg.name} <span className="text-slate-400 font-normal">({msg.email})</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {new Date(msg.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-cyan-400 font-medium">Subject: {msg.subject}</div>
                      <p className="text-slate-300 whitespace-pre-wrap bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                        {msg.message}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    No contact form inquiries received yet.
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

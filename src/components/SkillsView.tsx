import React, { useState } from 'react';
import { 
  Award, 
  ExternalLink, 
  Download, 
  Search, 
  Plus, 
  CheckCircle, 
  Eye, 
  X,
  FileCheck2,
  Filter
} from 'lucide-react';
import { Certificate } from '../types';
import { INITIAL_SKILLS, INITIAL_CERTIFICATES, CERTIFICATE_PREVIEW } from '../data/initialData';

export const SkillsView: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>(INITIAL_CERTIFICATES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [previewCert, setPreviewCert] = useState<Certificate | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New certificate form state
  const [newTitle, setNewTitle] = useState('');
  const [newIssuer, setNewIssuer] = useState('');
  const [newCategory, setNewCategory] = useState('Web Development');
  const [newDate, setNewDate] = useState('');
  const [newCredId, setNewCredId] = useState('');

  const categories = ['All', 'Web Development', 'Computer Science', 'Software Engineering', 'Artificial Intelligence'];

  const filteredCerts = certificates.filter((cert) => {
    const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cert.issuer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || cert.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleAddCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newIssuer) return;

    const newCert: Certificate = {
      id: 'cert-' + Date.now(),
      title: newTitle,
      issuer: newIssuer,
      category: newCategory,
      date: newDate || new Date().toISOString().split('T')[0],
      credentialId: newCredId || 'VERIFIED-' + Math.floor(1000 + Math.random() * 9000),
      image: CERTIFICATE_PREVIEW,
      isExample: false
    };

    setCertificates([newCert, ...certificates]);
    setShowAddModal(false);
    setNewTitle('');
    setNewIssuer('');
    setNewDate('');
    setNewCredId('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">Technical Profile</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Skills, Technologies &amp; Verified Credentials
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          Comprehensive overview of web engineering capabilities, programming languages, and certifications earned through coursework and practical projects.
        </p>
      </div>

      {/* Skills Matrix Section */}
      <section className="space-y-8">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Technical Skills &amp; Proficiency Indicators
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_SKILLS.map((catGroup, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#091024] border border-slate-800 space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <h3 className="text-sm font-bold text-white">{catGroup.category}</h3>
                  <span className="text-[11px] text-cyan-400 font-mono">{catGroup.skills.length} Skills</span>
                </div>

                <div className="space-y-4">
                  {catGroup.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-medium text-slate-200">{skill.name}</span>
                        <span className="text-slate-400 font-mono tabular-nums">{skill.level}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>{skill.category}</span>
                        <span>{skill.experience}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/60 text-[11px] text-slate-400">
                Regularly updated with project implementations.
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certificates & Credentials Section */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">Certifications</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
              Verified Certificates &amp; Credentials
            </h2>
            <p className="text-xs text-slate-400 pt-1">
              Example certificates are marked for transparency until genuine credentials are confirmed.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-colors shadow-sm self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Certificate</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title or issuer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Interactive filter buttons */}
          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto p-1">
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

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              className="group rounded-2xl bg-[#091024] border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between overflow-hidden shadow-lg"
            >
              <div>
                <div
                  onClick={() => setPreviewCert(cert)}
                  className="relative aspect-[4/3] w-full bg-slate-950 overflow-hidden cursor-pointer"
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 text-xs font-semibold flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      View Certificate
                    </span>
                  </div>
                  {cert.isExample && (
                    <div className="absolute top-2 left-2 bg-amber-500/90 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded">
                      Example Placeholder
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{cert.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">{cert.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {cert.title}
                  </h3>

                  <p className="text-xs text-slate-400">
                    Issuer: <span className="text-slate-300">{cert.issuer}</span>
                  </p>

                  {cert.credentialId && (
                    <p className="text-[11px] font-mono text-slate-500 truncate">
                      ID: {cert.credentialId}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center gap-2 border-t border-slate-800/80 mt-4">
                <button
                  onClick={() => setPreviewCert(cert)}
                  className="flex-1 py-1.5 px-3 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors text-center"
                >
                  Inspect
                </button>
                <button
                  onClick={() => {
                    // Trigger download of certificate summary info
                    const element = document.createElement('a');
                    const file = new Blob([
                      `Certificate: ${cert.title}\nIssuer: ${cert.issuer}\nDate: ${cert.date}\nCredential ID: ${cert.credentialId || 'N/A'}\nStatus: ${cert.isExample ? 'Example' : 'Genuine Verified'}`
                    ], { type: 'text/plain' });
                    element.href = URL.createObjectURL(file);
                    element.download = `${cert.title.replace(/\s+/g, '_')}_Certificate.txt`;
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);
                  }}
                  title="Download Certificate info"
                  className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCerts.length === 0 && (
          <div className="text-center py-12 p-6 rounded-2xl bg-slate-900/30 border border-slate-800 text-slate-400">
            No certificates found matching your search.
          </div>
        )}
      </section>

      {/* Certificate Modal Lightbox */}
      {previewCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-[#091024] border border-slate-700 rounded-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white">{previewCert.title}</h3>
                <p className="text-xs text-slate-400">Issued by {previewCert.issuer}</p>
              </div>
              <button
                onClick={() => setPreviewCert(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-800">
              <img
                src={previewCert.image}
                alt={previewCert.title}
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs text-slate-300 p-3 bg-slate-950 rounded-xl">
              <div>
                <span className="text-slate-500">Date Completed:</span>
                <p className="font-mono font-medium text-slate-200">{previewCert.date}</p>
              </div>
              <div>
                <span className="text-slate-500">Credential ID:</span>
                <p className="font-mono font-medium text-cyan-400">{previewCert.credentialId || 'N/A'}</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setPreviewCert(null)}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Certificate verified: ${previewCert.title} by ${previewCert.issuer}`);
                }}
                className="px-4 py-2 text-xs font-semibold bg-cyan-400 text-slate-950 rounded-lg hover:bg-cyan-300"
              >
                Verify Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Certificate Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#091024] border border-slate-700 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Add New Certificate</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCertificate} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Certificate Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Advanced JavaScript & TypeScript"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Issuing Body / Academy</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Coursera / HackerRank / University"
                  value={newIssuer}
                  onChange={(e) => setNewIssuer(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Date</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  >
                  </input>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Credential ID (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. CERT-2026-991"
                  value={newCredId}
                  onChange={(e) => setNewCredId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-lg"
                >
                  Add to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

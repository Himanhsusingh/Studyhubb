import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Github, 
  Linkedin, 
  Globe, 
  MessageSquare, 
  HelpCircle,
  Clock,
  MapPin
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/initialData';
import { apiService } from '../services/api';

export const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    // Frontend validations
    if (!name.trim() || !email.trim() || !message.trim()) {
      setFeedback({ type: 'error', message: 'Please fill in all required fields (Name, Email, Message).' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setFeedback({ type: 'error', message: 'Please provide a valid email address (e.g. name@example.com).' });
      return;
    }

    setLoading(true);

    try {
      const res = await apiService.submitContact({
        name,
        email,
        subject,
        message
      });

      if (res.success) {
        setFeedback({
          type: 'success',
          message: res.message || 'Your message has been received by Himanshu Singh! You can also review it inside the Admin Inbox.'
        });
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        setFeedback({
          type: 'error',
          message: 'Unable to submit message. Please try again or reach out directly via email.'
        });
      }
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: err?.message || 'Network error encountered while sending message.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">Get In Touch</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Contact &amp; Collaboration Inquiries
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          Have questions about the StudyHub platform, an open-source project collaboration, or technical opportunities? Send a message directly below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Contact Info & Direct Channels */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-[#091024] border border-slate-800 space-y-5 shadow-xl">
            <h3 className="text-base font-bold text-white">Direct Communication Channels</h3>

            <div className="space-y-4 text-xs text-slate-300">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 transition-colors group"
              >
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 font-medium">Primary Email</div>
                  <div className="text-slate-200 group-hover:text-cyan-300 font-mono">{PERSONAL_INFO.email}</div>
                </div>
              </a>

              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 transition-colors group"
              >
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 font-medium">GitHub Repository</div>
                  <div className="text-slate-200 group-hover:text-cyan-300 font-mono">github.com/himanhsusingh</div>
                </div>
              </a>

              <a
                href={PERSONAL_INFO.existingWebsiteUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 transition-colors group"
              >
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 font-medium">Existing Live Portfolio</div>
                  <div className="text-slate-200 group-hover:text-cyan-300 font-mono">himanhsusingh.github.io</div>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 font-medium">Location</div>
                  <div className="text-slate-200">{PERSONAL_INFO.location} · Available for Remote Collaborations</div>
                </div>
              </div>
            </div>
          </div>

          {/* Email Delivery Guide Note */}
          <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 space-y-2 leading-relaxed">
            <div className="flex items-center gap-1.5 text-cyan-400 font-semibold text-[11px] uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Production Email Integration Note</span>
            </div>
            <p>
              When hosting on static GitHub Pages, connect the form handler to a free service like <strong>Formspree</strong> (e.g. <code className="text-slate-300 font-mono">formspree.io/f/YOUR_ID</code>) or <strong>EmailJS</strong> for direct SMTP forwarding to your inbox. All submissions on this site are also recorded in your protected Admin Inbox.
            </p>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#091024] border border-slate-800 space-y-6 shadow-xl">
            <h3 className="text-lg font-bold text-white tracking-tight">Send a Direct Message</h3>

            {feedback && (
              <div
                className={`p-4 rounded-xl text-xs flex items-center gap-2.5 ${
                  feedback.type === 'success'
                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                    : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
                }`}
              >
                {feedback.type === 'success' ? (
                  <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                )}
                <span>{feedback.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Your Full Name <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aarav Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Your Email Address <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. StudyHub Collaboration / Web Development Project"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Message <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Share details regarding your question, proposal, or feedback..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-6 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  loading
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-md hover:shadow-[0_0_20px_rgba(34,211,238,0.35)]'
                }`}
              >
                {loading ? (
                  <span>Sending message...</span>
                ) : (
                  <>
                    <span>Submit Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

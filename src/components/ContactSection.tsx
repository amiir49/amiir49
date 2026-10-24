import React, { useState } from 'react';
import { Mail, Send, Copy, Check, MessageSquare, Sparkles } from 'lucide-react';
import { ProfileInfo } from '../data/profileData';

interface ContactSectionProps {
  profile: ProfileInfo;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const [copied, setCopied] = useState(false);
  const [subjectTopic, setSubjectTopic] = useState('Open Source Collaboration');
  const [senderName, setSenderName] = useState('');
  const [messageText, setMessageText] = useState('');

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${subjectTopic} - ${senderName || 'Developer'}`);
    const body = encodeURIComponent(
      `Hello ${profile.fullName},\n\n${messageText || 'I came across your GitHub profile and would love to connect regarding opportunities or collaboration.'}\n\nBest regards,\n${senderName || 'A fellow developer'}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const topicOptions = [
    'Open Source Collaboration',
    'Full-Stack Project Inquiry',
    'Architecture & Code Discussion',
    'Casual Coffee Chat',
  ];

  return (
    <section id="contact" className="py-12 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-2">
              <Mail className="w-3.5 h-3.5" />
              <span>Get In Touch</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Let&apos;s Build Something Together
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Interested in collaborating, hiring, or discussing open source? Reach out directly.
            </p>
          </div>

          {/* Quick Contact Box */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Direct Email</div>
                  <div className="text-sm font-bold text-white font-mono">{profile.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={copyEmail}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>

                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Mail</span>
                </a>
              </div>
            </div>

            {/* Quick Email Composer form */}
            <form onSubmit={handleSendEmail} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1.5">Collaboration Topic</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {topicOptions.map((topic) => (
                    <button
                      type="button"
                      key={topic}
                      onClick={() => setSubjectTopic(topic)}
                      className={`p-2 rounded-lg text-left transition-colors cursor-pointer ${
                        subjectTopic === topic
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Rivera"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">GitHub / Website (optional)</label>
                  <input
                    type="text"
                    placeholder="https://github.com/yourhandle"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Hey Ayanle, I saw your work on GitHub and would like to talk about..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Compose Mail Client Email</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

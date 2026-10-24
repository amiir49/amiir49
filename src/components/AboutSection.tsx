import React, { useState } from 'react';
import { 
  Eye, 
  Sprout, 
  Users, 
  Mail, 
  Smile, 
  Zap, 
  Edit3, 
  Check, 
  Plus, 
  X, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { ProfileInfo, INITIAL_PROFILE } from '../data/profileData';

interface AboutSectionProps {
  profile: ProfileInfo;
  setProfile: React.Dispatch<React.SetStateAction<ProfileInfo>>;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile, setProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newInterest, setNewInterest] = useState('');
  const [newLearning, setNewLearning] = useState('');
  const [newCollab, setNewCollab] = useState('');

  const addInterest = () => {
    if (newInterest.trim()) {
      setProfile((prev) => ({
        ...prev,
        interestedIn: [...prev.interestedIn, newInterest.trim()],
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (index: number) => {
    setProfile((prev) => ({
      ...prev,
      interestedIn: prev.interestedIn.filter((_, i) => i !== index),
    }));
  };

  const addLearning = () => {
    if (newLearning.trim()) {
      setProfile((prev) => ({
        ...prev,
        currentlyLearning: [...prev.currentlyLearning, newLearning.trim()],
      }));
      setNewLearning('');
    }
  };

  const removeLearning = (index: number) => {
    setProfile((prev) => ({
      ...prev,
      currentlyLearning: prev.currentlyLearning.filter((_, i) => i !== index),
    }));
  };

  const addCollab = () => {
    if (newCollab.trim()) {
      setProfile((prev) => ({
        ...prev,
        collaborateOn: [...prev.collaborateOn, newCollab.trim()],
      }));
      setNewCollab('');
    }
  };

  const removeCollab = (index: number) => {
    setProfile((prev) => ({
      ...prev,
      collaborateOn: prev.collaborateOn.filter((_, i) => i !== index),
    }));
  };

  const resetDefaults = () => {
    setProfile(INITIAL_PROFILE);
    setIsEditing(false);
  };

  return (
    <section id="about" className="py-12 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Original GitHub Profile Prompts</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              About & Developer DNA
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Derived directly from the 7 standard GitHub profile README markers in <code className="text-cyan-400 font-mono">amiir49/amiir49</code>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                isEditing
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm shadow-emerald-500/10'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              {isEditing ? <Check className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
              <span>{isEditing ? 'Done Editing' : 'Customize Answers'}</span>
            </button>

            {isEditing && (
              <button
                onClick={resetDefaults}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 cursor-pointer"
                title="Reset to default template"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* 7 GitHub Profile Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* 1. Hi, I'm @amiir49 */}
          <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-5 hover:border-cyan-500/40 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-lg">
                👋
              </div>
              <div>
                <span className="text-xs font-mono text-cyan-400">01. Identity</span>
                <h3 className="text-sm font-semibold text-white">Hi, I&apos;m @{profile.username}</h3>
              </div>
            </div>
            {isEditing ? (
              <div className="space-y-2 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Role Title</label>
                  <input
                    type="text"
                    value={profile.role}
                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-300 space-y-1.5">
                <p><span className="text-slate-500">Name:</span> <strong className="text-white font-medium">{profile.fullName}</strong></p>
                <p><span className="text-slate-500">Role:</span> {profile.role}</p>
                <p><span className="text-slate-500">Location:</span> {profile.location}</p>
              </div>
            )}
          </div>

          {/* 2. 👀 Interested in */}
          <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-5 hover:border-indigo-500/40 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-lg">
                👀
              </div>
              <div>
                <span className="text-xs font-mono text-indigo-400">02. Passions</span>
                <h3 className="text-sm font-semibold text-white">I&apos;m interested in...</h3>
              </div>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {profile.interestedIn.map((item, i) => (
                <li key={i} className="flex items-start justify-between group">
                  <span className="flex items-start gap-1.5">
                    <span className="text-indigo-400 mt-0.5">•</span>
                    <span>{item}</span>
                  </span>
                  {isEditing && (
                    <button
                      onClick={() => removeInterest(i)}
                      className="text-slate-500 hover:text-red-400 p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
            {isEditing && (
              <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-slate-800">
                <input
                  type="text"
                  placeholder="Add interest..."
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addInterest()}
                  className="flex-1 px-2 py-1 text-xs rounded bg-slate-950 border border-slate-800 text-slate-200"
                />
                <button
                  onClick={addInterest}
                  className="p-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* 3. 🌱 Currently learning */}
          <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-5 hover:border-emerald-500/40 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-lg">
                🌱
              </div>
              <div>
                <span className="text-xs font-mono text-emerald-400">03. Growth</span>
                <h3 className="text-sm font-semibold text-white">I&apos;m currently learning...</h3>
              </div>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {profile.currentlyLearning.map((item, i) => (
                <li key={i} className="flex items-start justify-between group">
                  <span className="flex items-start gap-1.5">
                    <span className="text-emerald-400 mt-0.5">•</span>
                    <span>{item}</span>
                  </span>
                  {isEditing && (
                    <button
                      onClick={() => removeLearning(i)}
                      className="text-slate-500 hover:text-red-400 p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
            {isEditing && (
              <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-slate-800">
                <input
                  type="text"
                  placeholder="Add learning topic..."
                  value={newLearning}
                  onChange={(e) => setNewLearning(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addLearning()}
                  className="flex-1 px-2 py-1 text-xs rounded bg-slate-950 border border-slate-800 text-slate-200"
                />
                <button
                  onClick={addLearning}
                  className="p-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* 4. 💞️ Looking to collaborate on */}
          <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-5 hover:border-rose-500/40 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-lg">
                💞️
              </div>
              <div>
                <span className="text-xs font-mono text-rose-400">04. Collaboration</span>
                <h3 className="text-sm font-semibold text-white">Looking to collaborate on...</h3>
              </div>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {profile.collaborateOn.map((item, i) => (
                <li key={i} className="flex items-start justify-between group">
                  <span className="flex items-start gap-1.5">
                    <span className="text-rose-400 mt-0.5">•</span>
                    <span>{item}</span>
                  </span>
                  {isEditing && (
                    <button
                      onClick={() => removeCollab(i)}
                      className="text-slate-500 hover:text-red-400 p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
            {isEditing && (
              <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-slate-800">
                <input
                  type="text"
                  placeholder="Add collaboration goal..."
                  value={newCollab}
                  onChange={(e) => setNewCollab(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addCollab()}
                  className="flex-1 px-2 py-1 text-xs rounded bg-slate-950 border border-slate-800 text-slate-200"
                />
                <button
                  onClick={addCollab}
                  className="p-1 rounded bg-rose-600 hover:bg-rose-500 text-white"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* 5. 📫 How to reach me */}
          <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-5 hover:border-amber-500/40 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-lg">
                📫
              </div>
              <div>
                <span className="text-xs font-mono text-amber-400">05. Contact</span>
                <h3 className="text-sm font-semibold text-white">How to reach me...</h3>
              </div>
            </div>
            {isEditing ? (
              <div className="space-y-2 text-xs">
                <input
                  type="text"
                  value={profile.reachMe}
                  onChange={(e) => setProfile({ ...profile, reachMe: e.target.value, email: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-800 text-slate-200"
                />
              </div>
            ) : (
              <div className="text-xs text-slate-300 space-y-2">
                <p className="text-slate-400">Feel free to reach out via email for inquiries or coffee chats:</p>
                <a
                  href={`mailto:${profile.reachMe}`}
                  className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-mono text-xs font-medium"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{profile.reachMe}</span>
                </a>
              </div>
            )}
          </div>

          {/* 6 & 7. Pronouns & Fun fact */}
          <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-5 hover:border-purple-500/40 transition-colors space-y-4">
            {/* Pronouns */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-lg">😄</span>
                <h4 className="text-xs font-mono text-purple-400 uppercase">Pronouns</h4>
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.pronouns}
                  onChange={(e) => setProfile({ ...profile, pronouns: e.target.value })}
                  className="w-full px-2.5 py-1 text-xs rounded bg-slate-950 border border-slate-800 text-slate-200"
                />
              ) : (
                <span className="inline-block px-2.5 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-purple-300 font-mono text-xs">
                  {profile.pronouns}
                </span>
              )}
            </div>

            {/* Fun Fact */}
            <div className="pt-3 border-t border-slate-800/80">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-lg">⚡</span>
                <h4 className="text-xs font-mono text-yellow-400 uppercase">Fun fact</h4>
              </div>
              {isEditing ? (
                <textarea
                  rows={2}
                  value={profile.funFact}
                  onChange={(e) => setProfile({ ...profile, funFact: e.target.value })}
                  className="w-full px-2.5 py-1 text-xs rounded bg-slate-950 border border-slate-800 text-slate-200"
                />
              ) : (
                <p className="text-xs text-slate-300 italic">
                  &quot;{profile.funFact}&quot;
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { 
  Mail, 
  Copy, 
  Check, 
  Terminal, 
  Sparkles, 
  Code2, 
  ExternalLink,
  Layers,
  Flame,
  ArrowRight
} from 'lucide-react';
import { ProfileInfo } from '../data/profileData';

interface HeroSectionProps {
  profile: ProfileInfo;
  onExploreStudio: () => void;
  onNavigate: (tab: string) => void;
  githubStats: {
    publicRepos: number;
    followers: number;
    following: number;
  } | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onExploreStudio,
  onNavigate,
  githubStats,
}) => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 border-b border-slate-800/80">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-cyan-600/15 via-indigo-600/10 to-purple-600/10 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Info Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-300 shadow-inner">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for collaborations & full-stack development</span>
            </div>

            {/* Title & Greeting */}
            <div>
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm tracking-wide mb-1">
                <Terminal className="w-4 h-4" />
                <span>echo &quot;Hello world!&quot;</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none">
                Hi, I’m{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">
                  @{profile.username}
                </span>
              </h1>
              <p className="mt-2 text-xl sm:text-2xl font-semibold text-slate-300">
                {profile.fullName}
              </p>
            </div>

            {/* Role & Bio */}
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
              {profile.bio}
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 max-w-lg p-3 rounded-xl bg-slate-900/50 border border-slate-800/80">
              <div className="text-center px-2 py-1">
                <div className="text-xl sm:text-2xl font-bold text-white font-mono">
                  {githubStats ? githubStats.publicRepos : '12+'}
                </div>
                <div className="text-xs text-slate-400">Public Repos</div>
              </div>
              <div className="text-center px-2 py-1 border-x border-slate-800">
                <div className="text-xl sm:text-2xl font-bold text-cyan-400 font-mono">
                  {githubStats ? githubStats.followers : '5+'}
                </div>
                <div className="text-xs text-slate-400">Followers</div>
              </div>
              <div className="text-center px-2 py-1">
                <div className="text-xl sm:text-2xl font-bold text-indigo-400 font-mono">
                  100%
                </div>
                <div className="text-xs text-slate-400">Open Source</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreStudio}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                Customize Profile README
              </button>

              <button
                onClick={() => onNavigate('projects')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm border border-slate-800 hover:border-slate-700 transition-all cursor-pointer"
              >
                <Code2 className="w-4 h-4" />
                View Projects
              </button>

              <button
                onClick={copyEmail}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-sm border border-slate-800 transition-all cursor-pointer"
                title="Copy email address"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span className="font-mono text-xs">{copied ? 'Copied!' : 'Copy Email'}</span>
              </button>
            </div>
          </div>

          {/* Code Terminal Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl">
              {/* Terminal Window Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                  <span className="ml-2 text-slate-400">amiir49.sh</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>zsh</span>
                </div>
              </div>

              {/* Terminal Content */}
              <div className="p-5 font-mono text-xs leading-relaxed space-y-3.5 text-slate-300">
                <div>
                  <span className="text-emerald-400">user@dev</span>
                  <span className="text-slate-500">:</span>
                  <span className="text-cyan-400">~</span>
                  <span className="text-slate-400">$ whoami</span>
                  <p className="mt-1 text-slate-200 font-semibold">{profile.fullName} (@{profile.username})</p>
                </div>

                <div>
                  <span className="text-emerald-400">user@dev</span>
                  <span className="text-slate-500">:</span>
                  <span className="text-cyan-400">~</span>
                  <span className="text-slate-400">$ cat /etc/role</span>
                  <p className="mt-1 text-cyan-300">{profile.role}</p>
                </div>

                <div>
                  <span className="text-emerald-400">user@dev</span>
                  <span className="text-slate-500">:</span>
                  <span className="text-cyan-400">~</span>
                  <span className="text-slate-400">$ echo $INTERESTS</span>
                  <p className="mt-1 text-purple-300">
                    &quot;React 19, TypeScript, Cloud APIs, Systems&quot;
                  </p>
                </div>

                <div>
                  <span className="text-emerald-400">user@dev</span>
                  <span className="text-slate-500">:</span>
                  <span className="text-cyan-400">~</span>
                  <span className="text-slate-400">$ curl -s api.github.com/users/{profile.username} | jq .status</span>
                  <div className="mt-1 p-2 rounded bg-slate-950 border border-slate-800/80 text-emerald-400 flex items-center justify-between">
                    <span>&quot;Ready for new challenges 🚀&quot;</span>
                    <a 
                      href={`https://github.com/${profile.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { FileText, Mail, Sparkles, Terminal } from 'lucide-react';
import { GithubIcon } from './GithubIcon';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  username: string;
  onOpenStudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  username,
  onOpenStudio,
}) => {
  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'about', label: 'About & Bio' },
    { id: 'stack', label: 'Tech Stack' },
    { id: 'projects', label: 'Projects' },
    { id: 'studio', label: 'README Studio' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Profile Identity */}
        <div 
          onClick={() => setActiveTab('overview')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-500 p-[2px] shadow-lg shadow-cyan-500/10 group-hover:shadow-cyan-500/25 transition-all">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-mono text-sm">
              49
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-100 tracking-tight group-hover:text-cyan-400 transition-colors">
                @{username}
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                active
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">GitHub Profile Hub</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800/60">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeTab === item.id
                  ? 'bg-slate-800 text-cyan-400 shadow-sm border border-slate-700/60'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenStudio}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-cyan-500/15 transition-all cursor-pointer"
            title="Open Interactive README Studio"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">README</span> Studio
          </button>

          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition-colors"
            title="View on GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Mobile nav pills */}
      <div className="flex md:hidden overflow-x-auto px-4 py-2 gap-2 border-t border-slate-800/40 bg-slate-950/90 no-scrollbar">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              activeTab === item.id
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};

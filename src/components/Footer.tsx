import React from 'react';
import { Mail, Heart, Code2 } from 'lucide-react';
import { GithubIcon } from './GithubIcon';

interface FooterProps {
  username: string;
}

export const Footer: React.FC<FooterProps> = ({ username }) => {
  return (
    <footer className="py-8 bg-slate-950 text-slate-400 text-xs border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-slate-950 font-bold text-[10px] font-mono">
            49
          </div>
          <span>
            @{username} • <span className="text-slate-300">GitHub Profile Hub</span>
          </span>
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <a
            href={`https://github.com/${username}/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors flex items-center gap-1"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>Repository: {username}/{username}</span>
          </a>

          <span>•</span>

          <span className="flex items-center gap-1 text-slate-500">
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>React 19 & Tailwind</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

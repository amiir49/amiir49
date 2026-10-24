import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  Eye, 
  Code2, 
  Sliders, 
  Layers,
  FileCheck,
  Share2
} from 'lucide-react';
import { ProfileInfo, TECH_CATALOG } from '../data/profileData';

interface ReadmeStudioProps {
  profile: ProfileInfo;
  selectedTech: string[];
}

export const ReadmeStudio: React.FC<ReadmeStudioProps> = ({
  profile,
  selectedTech,
}) => {
  const [viewMode, setViewMode] = useState<'preview' | 'code' | 'split'>('split');
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  // Customization options
  const [includeBanner, setIncludeBanner] = useState(true);
  const [includeStats, setIncludeStats] = useState(true);
  const [includeStreak, setIncludeStreak] = useState(true);
  const [includeLanguages, setIncludeLanguages] = useState(true);
  const [includeVisitorBadge, setIncludeVisitorBadge] = useState(true);
  const [badgeStyle, setBadgeStyle] = useState<'for-the-badge' | 'flat' | 'flat-square'>('for-the-badge');
  const [statsTheme, setStatsTheme] = useState<'tokyonight' | 'radical' | 'dracula' | 'dark'>('tokyonight');

  // Generate real Markdown
  const markdownContent = useMemo(() => {
    let md = '';

    // Visitor badge & header banner
    if (includeBanner) {
      md += `<h1 align="center">Hi 👋, I'm ${profile.fullName} (@${profile.username})</h1>\n`;
      md += `<h3 align="center">${profile.role}</h3>\n\n`;
    } else {
      md += `# Hi 👋, I'm @${profile.username}\n\n`;
    }

    if (includeVisitorBadge) {
      md += `<p align="center">\n`;
      md += `  <img src="https://komarev.com/ghpvc/?username=${profile.username}&label=Profile%20views&color=0e75b6&style=${badgeStyle}" alt="${profile.username}" />\n`;
      md += `</p>\n\n`;
    }

    md += `> ${profile.bio}\n\n`;

    // 7 Core Questions from original GitHub template
    md += `### 💫 About Me\n\n`;
    md += `- 👋 **Identity**: @${profile.username} (${profile.fullName})\n`;
    
    if (profile.interestedIn.length > 0) {
      md += `- 👀 **I’m interested in**: ${profile.interestedIn.join(', ')}\n`;
    } else {
      md += `- 👀 **I’m interested in**: Full-stack engineering and cloud systems\n`;
    }

    if (profile.currentlyLearning.length > 0) {
      md += `- 🌱 **I’m currently learning**: ${profile.currentlyLearning.join(', ')}\n`;
    } else {
      md += `- 🌱 **I’m currently learning**: Advanced architectures and cloud tooling\n`;
    }

    if (profile.collaborateOn.length > 0) {
      md += `- 💞️ **I’m looking to collaborate on**: ${profile.collaborateOn.join(', ')}\n`;
    }

    md += `- 📫 **How to reach me**: [${profile.reachMe}](mailto:${profile.reachMe})\n`;
    md += `- 😄 **Pronouns**: ${profile.pronouns}\n`;
    md += `- ⚡ **Fun fact**: ${profile.funFact}\n\n`;

    // Tech Stack Badges
    if (selectedTech.length > 0) {
      md += `### 🛠️ Languages and Tools\n\n`;
      md += `<p align="left">\n`;
      selectedTech.forEach((techName) => {
        const item = TECH_CATALOG.find((t) => t.name === techName);
        const color = item?.color.replace('#', '') || '000000';
        const logo = item?.badgeSlug || 'github';
        md += `  <img src="https://img.shields.io/badge/${encodeURIComponent(techName)}-${color}?style=${badgeStyle}&logo=${logo}&logoColor=white" alt="${techName}" />\n`;
      });
      md += `</p>\n\n`;
    }

    // GitHub Stats Cards
    if (includeStats || includeStreak || includeLanguages) {
      md += `### 📊 GitHub Telemetry\n\n`;
      md += `<p align="center">\n`;
      if (includeStats) {
        md += `  <img src="https://github-readme-stats.vercel.app/api?username=${profile.username}&show_icons=true&theme=${statsTheme}&hide_border=true" alt="${profile.username}'s GitHub stats" />\n`;
      }
      if (includeStreak) {
        md += `  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${profile.username}&theme=${statsTheme}&hide_border=true" alt="${profile.username}'s streak" />\n`;
      }
      if (includeLanguages) {
        md += `  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${profile.username}&layout=compact&theme=${statsTheme}&hide_border=true" alt="Top Languages" />\n`;
      }
      md += `</p>\n\n`;
    }

    // Connect & Socials
    md += `### 🤝 Connect With Me\n\n`;
    md += `<p align="left">\n`;
    md += `  <a href="mailto:${profile.reachMe}"><img src="https://img.shields.io/badge/Email-${encodeURIComponent(profile.reachMe)}-D14836?style=${badgeStyle}&logo=gmail&logoColor=white" alt="Email" /></a>\n`;
    md += `  <a href="https://github.com/${profile.username}"><img src="https://img.shields.io/badge/GitHub-${profile.username}-181717?style=${badgeStyle}&logo=github&logoColor=white" alt="GitHub" /></a>\n`;
    md += `</p>\n`;

    return md;
  }, [
    profile,
    selectedTech,
    includeBanner,
    includeStats,
    includeStreak,
    includeLanguages,
    includeVisitorBadge,
    badgeStyle,
    statsTheme,
  ]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'README.md';
    link.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <section id="studio" className="py-12 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive README Studio</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              GitHub Profile README Builder
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Generate, customize, and export the official <code className="text-cyan-400 font-mono">README.md</code> for your <code className="text-cyan-400 font-mono">amiir49/amiir49</code> GitHub profile.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/15 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Markdown!' : 'Copy Markdown'}</span>
            </button>

            <button
              onClick={downloadFile}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-xs border border-slate-800 transition-all cursor-pointer"
            >
              {downloaded ? <FileCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5" />}
              <span>{downloaded ? 'Saved!' : 'Download README.md'}</span>
            </button>
          </div>
        </div>

        {/* Configuration Controls Bar */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <span className="font-mono text-slate-400 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                Components:
              </span>

              <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={includeBanner}
                  onChange={(e) => setIncludeBanner(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span>Hero Banner</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={includeVisitorBadge}
                  onChange={(e) => setIncludeVisitorBadge(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span>Visitor Counter</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={includeStats}
                  onChange={(e) => setIncludeStats(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span>Stats Card</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={includeStreak}
                  onChange={(e) => setIncludeStreak(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span>Streak</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={includeLanguages}
                  onChange={(e) => setIncludeLanguages(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span>Top Languages</span>
              </label>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setViewMode('split')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'split' ? 'bg-slate-800 text-cyan-400 font-medium' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Split
              </button>
              <button
                onClick={() => setViewMode('preview')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'preview' ? 'bg-slate-800 text-cyan-400 font-medium' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Preview
              </button>
              <button
                onClick={() => setViewMode('code')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'code' ? 'bg-slate-800 text-cyan-400 font-medium' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Markdown
              </button>
            </div>
          </div>
        </div>

        {/* Studio Workspace */}
        <div className={`grid gap-6 ${
          viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
        }`}>
          {/* Raw Code Editor / Viewer */}
          {(viewMode === 'split' || viewMode === 'code') && (
            <div className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden flex flex-col h-[560px]">
              <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  <span>README.md (Generated Raw Source)</span>
                </div>
                <span>{markdownContent.length} chars</span>
              </div>
              <div className="flex-1 p-4 overflow-auto font-mono text-xs text-slate-300 leading-relaxed bg-slate-950/40 selection:bg-cyan-500/30">
                <pre className="whitespace-pre-wrap">{markdownContent}</pre>
              </div>
            </div>
          )}

          {/* GitHub-rendered Visual Preview */}
          {(viewMode === 'split' || viewMode === 'preview') && (
            <div className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden flex flex-col h-[560px]">
              <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-emerald-400" />
                  <span>GitHub Profile Live Render</span>
                </div>
                <span className="text-emerald-400 text-[11px] font-sans">Synced</span>
              </div>
              <div className="flex-1 p-6 overflow-auto bg-slate-950/20 text-slate-200 space-y-5 text-sm">
                {/* Banner */}
                {includeBanner && (
                  <div className="text-center pb-4 border-b border-slate-800">
                    <h1 className="text-2xl font-bold text-white">
                      Hi 👋, I&apos;m {profile.fullName} (@{profile.username})
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">{profile.role}</p>
                  </div>
                )}

                {includeVisitorBadge && (
                  <div className="flex justify-center">
                    <img
                      src={`https://komarev.com/ghpvc/?username=${profile.username}&label=Profile%20views&color=0e75b6&style=${badgeStyle}`}
                      alt="Views"
                      className="h-5"
                    />
                  </div>
                )}

                <blockquote className="border-l-4 border-cyan-500 pl-3 italic text-slate-400 text-xs">
                  {profile.bio}
                </blockquote>

                {/* About list */}
                <div className="space-y-2">
                  <h3 className="font-bold text-white text-base">💫 About Me</h3>
                  <ul className="space-y-1 text-xs text-slate-300">
                    <li>👋 <strong>Identity</strong>: @{profile.username} ({profile.fullName})</li>
                    <li>👀 <strong>I’m interested in</strong>: {profile.interestedIn.join(', ')}</li>
                    <li>🌱 <strong>I’m currently learning</strong>: {profile.currentlyLearning.join(', ')}</li>
                    <li>💞️ <strong>I’m looking to collaborate on</strong>: {profile.collaborateOn.join(', ')}</li>
                    <li>📫 <strong>How to reach me</strong>: <a href={`mailto:${profile.reachMe}`} className="text-cyan-400 underline">{profile.reachMe}</a></li>
                    <li>😄 <strong>Pronouns</strong>: {profile.pronouns}</li>
                    <li>⚡ <strong>Fun fact</strong>: {profile.funFact}</li>
                  </ul>
                </div>

                {/* Tech Badges */}
                {selectedTech.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-bold text-white text-base">🛠️ Languages and Tools</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedTech.map((techName) => {
                        const item = TECH_CATALOG.find((t) => t.name === techName);
                        const color = item?.color.replace('#', '') || '000000';
                        return (
                          <img
                            key={techName}
                            src={`https://img.shields.io/badge/${encodeURIComponent(techName)}-${color}?style=${badgeStyle}&logo=${item?.badgeSlug || 'github'}&logoColor=white`}
                            alt={techName}
                            className="h-6"
                          />
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* GitHub stats cards */}
                {(includeStats || includeStreak || includeLanguages) && (
                  <div className="space-y-3 pt-2">
                    <h3 className="font-bold text-white text-base">📊 GitHub Telemetry</h3>
                    <div className="flex flex-wrap gap-3 justify-center">
                      {includeStats && (
                        <img
                          src={`https://github-readme-stats.vercel.app/api?username=${profile.username}&show_icons=true&theme=${statsTheme}&hide_border=true&bg_color=0f172a&title_color=38bdf8&text_color=94a3b8`}
                          alt="Stats"
                          className="max-h-36"
                          onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                        />
                      )}
                      {includeLanguages && (
                        <img
                          src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${profile.username}&layout=compact&theme=${statsTheme}&hide_border=true&bg_color=0f172a&title_color=38bdf8&text_color=94a3b8`}
                          alt="Top Languages"
                          className="max-h-36"
                          onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* Connect */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <h3 className="font-bold text-white text-base">🤝 Connect With Me</h3>
                  <div className="flex flex-wrap gap-2">
                    <a href={`mailto:${profile.reachMe}`}>
                      <img
                        src={`https://img.shields.io/badge/Email-${encodeURIComponent(profile.reachMe)}-D14836?style=${badgeStyle}&logo=gmail&logoColor=white`}
                        alt="Email"
                        className="h-6"
                      />
                    </a>
                    <a href={`https://github.com/${profile.username}`}>
                      <img
                        src={`https://img.shields.io/badge/GitHub-${profile.username}-181717?style=${badgeStyle}&logo=github&logoColor=white`}
                        alt="GitHub"
                        className="h-6"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

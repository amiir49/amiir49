import React, { useState } from 'react';
import { Layers, CheckCircle2, Circle, Sparkles, Filter } from 'lucide-react';
import { TechItem, TECH_CATALOG } from '../data/profileData';

interface TechStackSectionProps {
  selectedTech: string[];
  setSelectedTech: React.Dispatch<React.SetStateAction<string[]>>;
}

export const TechStackSection: React.FC<TechStackSectionProps> = ({
  selectedTech,
  setSelectedTech,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Technologies' },
    { id: 'frontend', label: 'Frontend & UI' },
    { id: 'backend', label: 'Backend & APIs' },
    { id: 'database', label: 'Databases & Cache' },
    { id: 'devops', label: 'DevOps & Tooling' },
  ];

  const filteredTech = TECH_CATALOG.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const toggleTech = (name: string) => {
    if (selectedTech.includes(name)) {
      setSelectedTech(selectedTech.filter((t) => t !== name));
    } else {
      setSelectedTech([...selectedTech, name]);
    }
  };

  const selectAll = () => {
    setSelectedTech(TECH_CATALOG.map((t) => t.name));
  };

  const clearAll = () => {
    setSelectedTech([]);
  };

  return (
    <section id="stack" className="py-12 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Skills & Technologies</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Tech Stack & Tooling
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Select technologies to include in your interactive GitHub profile badges and portfolio summary.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={selectAll}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 cursor-pointer"
            >
              Select All
            </button>
            <button
              onClick={clearAll}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filteredTech.map((tech) => {
            const isSelected = selectedTech.includes(tech.name);
            return (
              <div
                key={tech.name}
                onClick={() => toggleTech(tech.name)}
                className={`group flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900/90 border-cyan-500/50 shadow-md shadow-cyan-500/5'
                    : 'bg-slate-950/60 border-slate-800/80 opacity-60 hover:opacity-100 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: tech.color }}
                  />
                  <span className="text-xs font-semibold text-slate-200 truncate group-hover:text-white">
                    {tech.name}
                  </span>
                </div>

                <div className="shrink-0 ml-2">
                  {isSelected ? (
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-600 group-hover:text-slate-400" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Shields.io Badge Live Preview Bar */}
        <div className="mt-8 p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Generated GitHub Profile Badges Preview ({selectedTech.length} active)
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {selectedTech.length === 0 ? (
              <span className="text-xs text-slate-500 italic">No technologies selected. Click cards above to select!</span>
            ) : (
              selectedTech.map((techName) => {
                const item = TECH_CATALOG.find((t) => t.name === techName);
                const colorCode = item?.color.replace('#', '') || '000000';
                const badgeUrl = `https://img.shields.io/badge/${encodeURIComponent(techName)}-${colorCode}?style=for-the-badge&logo=${item?.badgeSlug || 'github'}&logoColor=white`;
                return (
                  <img
                    key={techName}
                    src={badgeUrl}
                    alt={techName}
                    className="h-6 rounded shadow-sm"
                    loading="lazy"
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

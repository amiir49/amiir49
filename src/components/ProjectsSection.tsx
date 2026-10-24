import React, { useState } from 'react';
import { 
  FolderGit2, 
  Star, 
  GitFork, 
  ExternalLink, 
  Plus, 
  X,
  Search,
  Sparkles
} from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { ProjectItem } from '../data/profileData';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  setProjects: React.Dispatch<React.SetStateAction<ProjectItem[]>>;
  username: string;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  setProjects,
  username,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New project form state
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newTags, setNewTags] = useState('React, TypeScript');
  const [newGithub, setNewGithub] = useState(`https://github.com/${username}`);
  const [newDemo, setNewDemo] = useState('');

  // Extract all unique tags
  const allTags = Array.from(
    new Set(projects.flatMap((p) => p.tags))
  );

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag =
      selectedTag === 'all' || project.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const tagsArray = newTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newProject: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: newTitle.trim(),
      description: newDescription.trim() || 'A modern software project built with precision and modern tools.',
      tags: tagsArray.length > 0 ? tagsArray : ['Full-Stack', 'TypeScript'],
      stars: 1,
      forks: 0,
      githubUrl: newGithub.trim() || `https://github.com/${username}`,
      demoUrl: newDemo.trim() || undefined,
      featured: true,
    };

    setProjects([newProject, ...projects]);
    setShowAddModal(false);
    setNewTitle('');
    setNewDescription('');
    setNewDemo('');
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <section id="projects" className="py-12 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Portfolio & Works</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Featured Projects
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Open source tools, production applications, and experimental prototypes.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </button>
        </div>

        {/* Search & Tag Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6 items-stretch sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search projects by keyword or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 items-center">
            <button
              onClick={() => setSelectedTag('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                selectedTag === 'all'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              All
            </button>
            {allTags.slice(0, 6).map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                  selectedTag === tag
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative flex flex-col justify-between p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/90 transition-all shadow-lg shadow-black/20"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <FolderGit2 className="w-4 h-4 text-cyan-400" />
                    <h3 className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                      title="View repository on GitHub"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                    </a>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-cyan-400 hover:bg-slate-700 transition-colors"
                        title="View live deployment"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-slate-950 text-slate-300 border border-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Card footer with stats */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs text-slate-500 font-mono">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400" />
                      <span>{project.stars}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3 h-3 text-slate-400" />
                      <span>{project.forks}</span>
                    </span>
                  </div>

                  <button
                    onClick={() => removeProject(project.id)}
                    className="text-slate-600 hover:text-red-400 text-[11px] transition-colors cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 rounded-2xl bg-slate-900/30 border border-slate-800">
            <p className="text-sm text-slate-400">No projects found matching your filter.</p>
          </div>
        )}

        {/* Add Project Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  Add New Project
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddProject} className="mt-4 space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Distributed Task Engine"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Description</label>
                  <textarea
                    rows={3}
                    placeholder="Brief description of architecture, purpose, and key highlights..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Tags (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="React, TypeScript, Next.js, Node.js"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">GitHub URL</label>
                    <input
                      type="url"
                      placeholder={`https://github.com/${username}/repo`}
                      value={newGithub}
                      onChange={(e) => setNewGithub(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Live Demo URL (optional)</label>
                    <input
                      type="url"
                      placeholder="https://myproject.app"
                      value={newDemo}
                      onChange={(e) => setNewDemo(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-3.5 py-1.5 rounded-lg text-slate-400 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold cursor-pointer"
                  >
                    Save Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

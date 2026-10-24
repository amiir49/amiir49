import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { TechStackSection } from './components/TechStackSection';
import { ProjectsSection } from './components/ProjectsSection';
import { GitHubStatsSection } from './components/GitHubStatsSection';
import { ReadmeStudio } from './components/ReadmeStudio';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { 
  INITIAL_PROFILE, 
  INITIAL_PROJECTS, 
  TECH_CATALOG, 
  ProfileInfo, 
  ProjectItem 
} from './data/profileData';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [profile, setProfile] = useState<ProfileInfo>(INITIAL_PROFILE);
  const [selectedTech, setSelectedTech] = useState<string[]>([
    'TypeScript',
    'React',
    'Next.js',
    'Tailwind CSS',
    'Node.js',
    'PostgreSQL',
    'Redis',
    'Docker',
    'Git & GitHub'
  ]);
  const [projects, setProjects] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [githubStats, setGithubStats] = useState<{
    publicRepos: number;
    followers: number;
    following: number;
  } | null>(null);

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    // If not overview, scroll smoothly to section
    if (tab !== 'overview') {
      const element = document.getElementById(tab);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        username={profile.username}
        onOpenStudio={() => handleNavigate('studio')}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          profile={profile}
          onExploreStudio={() => handleNavigate('studio')}
          onNavigate={handleNavigate}
          githubStats={githubStats}
        />

        {/* About & Bio Prompts (from README) */}
        <AboutSection
          profile={profile}
          setProfile={setProfile}
        />

        {/* Tech Stack & Tooling Grid */}
        <TechStackSection
          selectedTech={selectedTech}
          setSelectedTech={setSelectedTech}
        />

        {/* Projects Showcase */}
        <ProjectsSection
          projects={projects}
          setProjects={setProjects}
          username={profile.username}
        />

        {/* GitHub Live Telemetry & Badges */}
        <GitHubStatsSection
          username={profile.username}
          onStatsLoaded={(stats) => setGithubStats(stats)}
        />

        {/* Interactive README Studio */}
        <ReadmeStudio
          profile={profile}
          selectedTech={selectedTech}
        />

        {/* Contact Section */}
        <ContactSection
          profile={profile}
        />
      </main>

      {/* Footer */}
      <Footer username={profile.username} />
    </div>
  );
}

export default App;

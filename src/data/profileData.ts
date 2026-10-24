export interface TechItem {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'tools';
  icon: string;
  color: string;
  badgeSlug: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  stars: number;
  forks: number;
  demoUrl?: string;
  githubUrl: string;
  featured: boolean;
}

export interface ProfileInfo {
  username: string;
  fullName: string;
  email: string;
  role: string;
  bio: string;
  location: string;
  pronouns: string;
  interestedIn: string[];
  currentlyLearning: string[];
  collaborateOn: string[];
  reachMe: string;
  funFact: string;
}

export const INITIAL_PROFILE: ProfileInfo = {
  username: 'amiir49',
  fullName: 'Ayanle Abubaker',
  email: 'ayanleabubaker4@gmail.com',
  role: 'Full-Stack Developer & Software Engineer',
  bio: 'Passionate software craftsman building scalable web systems, clean interfaces, and developer tooling.',
  location: 'Global / Remote',
  pronouns: 'he/him',
  interestedIn: [
    'Modern Web Technologies (React 19, TypeScript, Next.js)',
    'Distributed Systems & Cloud Computing',
    'Open Source Software & Developer Experience',
    'AI-Assisted Engineering & Clean Architecture'
  ],
  currentlyLearning: [
    'Advanced Cloud Native Infrastructure & Kubernetes',
    'High-Performance Backend Engineering with Go & Rust',
    'Full-Stack System Design at Scale'
  ],
  collaborateOn: [
    'Innovative Open Source Web Applications',
    'Microservices & REST/GraphQL API Tooling',
    'Community Developer Utilities & Libraries'
  ],
  reachMe: 'ayanleabubaker4@gmail.com',
  funFact: 'I enjoy optimizing build times and automating repetitive developer tasks down to zero!'
};

export const TECH_CATALOG: TechItem[] = [
  // Frontend
  { name: 'TypeScript', category: 'frontend', icon: 'SiTypescript', color: '#3178C6', badgeSlug: 'typescript' },
  { name: 'JavaScript', category: 'frontend', icon: 'SiJavascript', color: '#F7DF1E', badgeSlug: 'javascript' },
  { name: 'React', category: 'frontend', icon: 'SiReact', color: '#61DAFB', badgeSlug: 'react' },
  { name: 'Next.js', category: 'frontend', icon: 'SiNextdotjs', color: '#FFFFFF', badgeSlug: 'next.js' },
  { name: 'Tailwind CSS', category: 'frontend', icon: 'SiTailwindcss', color: '#06B6D4', badgeSlug: 'tailwindcss' },
  { name: 'HTML5 / CSS3', category: 'frontend', icon: 'SiHtml5', color: '#E34F26', badgeSlug: 'html5' },
  { name: 'Vite', category: 'frontend', icon: 'SiVite', color: '#646CFF', badgeSlug: 'vite' },

  // Backend
  { name: 'Node.js', category: 'backend', icon: 'SiNodedotjs', color: '#5FA04E', badgeSlug: 'node.js' },
  { name: 'Express', category: 'backend', icon: 'SiExpress', color: '#FFFFFF', badgeSlug: 'express' },
  { name: 'Python', category: 'backend', icon: 'SiPython', color: '#3776AB', badgeSlug: 'python' },
  { name: 'REST APIs', category: 'backend', icon: 'SiFastapi', color: '#009688', badgeSlug: 'fastapi' },
  { name: 'GraphQL', category: 'backend', icon: 'SiGraphql', color: '#E10098', badgeSlug: 'graphql' },

  // Database
  { name: 'PostgreSQL', category: 'database', icon: 'SiPostgresql', color: '#4169E1', badgeSlug: 'postgresql' },
  { name: 'MongoDB', category: 'database', icon: 'SiMongodb', color: '#47A248', badgeSlug: 'mongodb' },
  { name: 'Redis', category: 'database', icon: 'SiRedis', color: '#DC382D', badgeSlug: 'redis' },
  { name: 'Prisma ORM', category: 'database', icon: 'SiPrisma', color: '#2D3748', badgeSlug: 'prisma' },

  // DevOps & Cloud
  { name: 'Docker', category: 'devops', icon: 'SiDocker', color: '#2496ED', badgeSlug: 'docker' },
  { name: 'Git & GitHub', category: 'devops', icon: 'SiGithub', color: '#F05032', badgeSlug: 'git' },
  { name: 'Linux / Bash', category: 'devops', icon: 'SiLinux', color: '#FCC624', badgeSlug: 'linux' },
  { name: 'CI / CD Workflows', category: 'devops', icon: 'SiGithubactions', color: '#2088FF', badgeSlug: 'github-actions' },
  { name: 'Vercel / Cloud', category: 'devops', icon: 'SiVercel', color: '#FFFFFF', badgeSlug: 'vercel' },
];

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'CloudFlow Studio',
    description: 'High-throughput modern dashboard and monitoring tool for cloud container deployments with real-time status telemetry.',
    tags: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
    stars: 14,
    forks: 3,
    demoUrl: 'https://github.com/amiir49',
    githubUrl: 'https://github.com/amiir49',
    featured: true
  },
  {
    id: 'proj-2',
    title: 'DevSync Microservice Suite',
    description: 'Scalable RESTful API service orchestrating distributed job workers with Redis queues and resilient failover.',
    tags: ['Node.js', 'Express', 'Redis', 'PostgreSQL'],
    stars: 9,
    forks: 2,
    demoUrl: 'https://github.com/amiir49',
    githubUrl: 'https://github.com/amiir49',
    featured: true
  },
  {
    id: 'proj-3',
    title: 'QuickMark Profile Generator',
    description: 'Automated GitHub README generator producing beautiful animated SVG badges, stats cards, and dynamic contribution trackers.',
    tags: ['TypeScript', 'Vite', 'Markdown', 'SVG'],
    stars: 27,
    forks: 7,
    demoUrl: 'https://github.com/amiir49',
    githubUrl: 'https://github.com/amiir49',
    featured: true
  },
  {
    id: 'proj-4',
    title: 'Modern Web Boilerplate',
    description: 'Opinionated developer starter kit featuring TypeScript, Tailwind CSS, pre-configured ESLint rules, and instant CI/CD setup.',
    tags: ['React', 'Vite', 'Docker', 'Open Source'],
    stars: 18,
    forks: 5,
    demoUrl: 'https://github.com/amiir49',
    githubUrl: 'https://github.com/amiir49',
    featured: false
  }
];

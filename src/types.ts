export interface JournalEntry {
  id: string;
  code: string;
  date: string;
  category: string;
  title: string;
  summary: string;
  imageUrl: string;
  readTime: string;
  isRedacted?: boolean;
  decryptedContent?: string;
  tags: string[];
  externalUrl?: string;
}

export interface ProjectRelease {
  id: string;
  sector: string;
  title: string;
  description: string;
  imageUrl: string;
  latLong?: string;
  tags: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  glitchLabel: string;
  blueprintDetails: {
    architecture: string;
    throughput: string;
    nodes: string;
    cloudProvider: string;
    costReduction: string;
  };
}

export interface SubRole {
  title: string;
  period: string;
  location?: string;
  description?: string;
  highlights?: string[];
  skills?: string[];
}

export interface ExperienceLog {
  id: string;
  company: string;
  companySubtitle?: string;
  period: string;
  role: string;
  codeName: string;
  description: string;
  subRoles?: SubRole[];
  bullets?: string[];
  skills?: string[];
  metrics: {
    projectsCompleted: string;
    impact: string;
    coreImprovements: string;
  };
}

export interface TelemetryData {
  latency: number;
  nodesActive: number;
  cpuLoad: string;
  savingsRatePct: number;
  monthlySavingsUSD: number;
  region: string;
  status: string;
}

export interface TerminalMessage {
  id: string;
  sender: 'user' | 'system' | 'ai';
  text: string;
  timestamp: string;
  codeBlock?: string;
}

export interface ScrollyChapter {
  id: number;
  progressRange: [number, number]; // e.g. [0, 0.25]
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  techSpecs: string[];
}

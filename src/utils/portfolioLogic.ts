export interface ProjectLinks {
  live?: string;
  github?: string;
  company?: string;
}

export interface ProjectItem {
  title: string;
  category: string;
  description: string;
  details: string;
  image?: string;
  gallery?: string[];
  tags?: string[];
  links?: ProjectLinks;
  problemStatement?: string;
  motivation?: string;
}

export interface HackathonItem {
  title: string;
  achievement: string;
  date: string;
  institution: string;
  role?: string;
  team?: string;
  timeframe?: string;
  project?: string;
  description: string;
  contributions?: string[];
  technologies?: string[];
}

export interface ExperienceRecommendation {
  quote: string;
  author: string;
  title: string;
  letterUrl?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  location?: string;
  type?: string;
  website?: string;
  officialEmail?: string;
  description: string;
  responsibilities?: string[];
  skills?: string[];
  recommendation?: ExperienceRecommendation;
}

export interface OpenSourceCommit {
  id: string;
  message: string;
}

export interface OpenSourceContribution {
  title: string;
  issue: string;
  whatIDid: string;
  whyIDidIt: string;
  whyIChooseThis: string;
  commits?: OpenSourceCommit[];
}

export interface OpenSourceProject {
  project: string;
  role: string;
  duration: string;
  description: string;
  details: string;
  skills?: string[];
  tags?: string[];
  links?: {
    github?: string;
  };
  contributions?: OpenSourceContribution[];
}

export interface ToolItem {
  name: string;
  icon?: string;
  color: string;
  why: string;
  helpful: string;
  scale: string;
  isLucide?: boolean;
  slug?: string;
  inlineSvg?: string;
  category?: string;
  description?: string;
}

export interface ToolCategory {
  id: string;
  label: string;
  number: string;
  accent: string;
  tools: ToolItem[];
}

export interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function parseProjectDetails(details = ''): { award?: string; highlights: string[] } {
  const lines = details
    .split('\n')
    .map((line) => line.trim().replace(/\.$/, ''))
    .filter(Boolean);

  const awardLine = lines.find((line) => line.startsWith('Award:'));
  const award = awardLine ? awardLine.replace(/^Award:\s*/, '') : undefined;
  const highlights = lines
    .filter((line) => !line.startsWith('Award:'))
    .map((line) => line.replace(/^Additional:\s*/, ''));

  return { award, highlights };
}

export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function isValidExternalHref(href?: string): boolean {
  return Boolean(href && href !== '#');
}

export function computeProjectStats(projects: ProjectItem[]) {
  const featured = projects.filter((p) => p.category === 'Featured');
  const awardWinning = projects.filter((p) => Boolean(parseProjectDetails(p.details).award));
  const uniqueTech = new Set(projects.flatMap((p) => p.tags ?? []));

  return [
    { value: projects.length, label: 'Projects' },
    { value: featured.length, label: 'Featured' },
    { value: awardWinning.length, label: 'Award-winning' },
    { value: uniqueTech.size, label: 'Technologies' },
  ];
}

export function parseHackathonPlace(achievement: string): number {
  const match = achievement.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

export function cleanAchievementLabel(achievement: string): string {
  return achievement.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '').trim();
}

export function computeHackathonStats(hackathons: HackathonItem[]) {
  const places = hackathons.map((h) => parseHackathonPlace(h.achievement));
  const podiumFinishes = places.filter((p) => p >= 1 && p <= 3).length;
  const firstPlace = places.filter((p) => p === 1).length;
  const hostInstitutions = new Set(hackathons.map((h) => h.institution)).size;

  return [
    { value: hackathons.length, label: 'Competitions' },
    { value: podiumFinishes, label: 'Podium finishes' },
    { value: firstPlace, label: 'First place' },
    { value: hostInstitutions, label: 'Host institutions' },
  ];
}

export function computeExperienceStats(experience: ExperienceItem[]) {
  const leadershipCount = experience.filter((e) => /founder|ceo|lead/i.test(e.role)).length;
  const recommendationLetters = experience.filter((e) => Boolean(e.recommendation?.letterUrl)).length;
  const focusAreas = new Set(experience.flatMap((e) => e.skills ?? [])).size;

  return [
    { value: experience.length, label: 'Roles' },
    { value: leadershipCount, label: 'Leadership' },
    { value: recommendationLetters, label: 'Letters' },
    { value: focusAreas, label: 'Focus areas' },
  ];
}

export function computeOpenSourceStats(openSource: OpenSourceProject[]) {
  const mergedContributions = openSource.reduce(
    (sum, item) => sum + (item.contributions?.length ?? 0),
    0
  );
  const commitsAndPRs = openSource.reduce(
    (sum, item) =>
      sum +
      (item.contributions ?? []).reduce((cSum, contrib) => cSum + (contrib.commits?.length ?? 0), 0),
    0
  );
  const focusAreas = new Set(openSource.flatMap((item) => item.tags ?? [])).size;

  return [
    { value: openSource.length, label: 'Upstream projects' },
    { value: mergedContributions, label: 'Contributions' },
    { value: commitsAndPRs, label: 'Commits & PRs' },
    { value: focusAreas, label: 'Focus areas' },
  ];
}

export const DEFAULT_FEATURED_STACK_NAMES = [
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Framer Motion',
  'GSAP',
  'Lucide React',
  'Radix UI',
];

export function filterFeaturedStackTools(
  tools: ToolItem[],
  featuredNames: string[] = DEFAULT_FEATURED_STACK_NAMES
): ToolItem[] {
  return tools.filter((tool) => featuredNames.includes(tool.name));
}

export function validateContactForm(input: ContactFormInput): {
  valid: boolean;
  errors: Partial<Record<keyof ContactFormInput, string>>;
} {
  const errors: Partial<Record<keyof ContactFormInput, string>> = {};
  if (!input.name || input.name.trim().length < 2) {
    errors.name = 'Please enter your name.';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email || !emailRegex.test(input.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!input.subject || input.subject.trim().length < 2) {
    errors.subject = 'Please enter a subject.';
  }
  if (!input.message || input.message.trim().length < 5) {
    errors.message = 'Please enter your project details or message.';
  }
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export interface GitHubRefSegment {
  type: 'text' | 'link';
  text: string;
  href?: string;
}

export function resolveGitHubReferenceLinks(text: string, repoUrl?: string): GitHubRefSegment[] {
  const cleanRepo = repoUrl?.replace(/\/$/, '');
  if (!cleanRepo) {
    return [{ type: 'text', text }];
  }

  if (/^[0-9a-f]{7,40}$/i.test(text.trim())) {
    return [
      {
        type: 'link',
        text: text.trim(),
        href: `${cleanRepo}/commit/${text.trim()}`,
      },
    ];
  }

  const isIssue = /issue/i.test(text);
  const parts = text.split(/(#\d+)/g);
  return parts
    .filter((part) => part.length > 0)
    .map((part) => {
      if (/^#\d+$/.test(part)) {
        const num = part.slice(1);
        return {
          type: 'link',
          text: part,
          href: `${cleanRepo}/${isIssue ? 'issues' : 'pull'}/${num}`,
        };
      }
      return { type: 'text', text: part };
    });
}

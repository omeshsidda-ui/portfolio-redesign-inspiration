import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parseProjectDetails,
  slugifyTitle,
  computeProjectStats,
  parseHackathonPlace,
  cleanAchievementLabel,
  computeHackathonStats,
  computeExperienceStats,
  computeOpenSourceStats,
  filterFeaturedStackTools,
  validateContactForm,
  resolveGitHubReferenceLinks,
} from './portfolioLogic';

test('parseProjectDetails extracts award and highlights accurately', () => {
  const raw = `Led a 5-member team as team lead.
Built in a 24-hour hackathon sprint.
Award: 1st Place — Syntax2Code Hackathon 2026
Additional: Earned a 6-month internship offer.`;

  const res = parseProjectDetails(raw);
  assert.equal(res.award, '1st Place — Syntax2Code Hackathon 2026');
  assert.deepEqual(res.highlights, [
    'Led a 5-member team as team lead',
    'Built in a 24-hour hackathon sprint',
    'Earned a 6-month internship offer',
  ]);
});

test('slugifyTitle normalizes project names for anchor IDs', () => {
  assert.equal(slugifyTitle('KAIRO Cloud OS!'), 'kairo-cloud-os');
  assert.equal(slugifyTitle('ClassSync — Smart Attendance'), 'classsync-smart-attendance');
});

test('computeProjectStats aggregates counts and unique tags', () => {
  const stats = computeProjectStats([
    {
      title: 'StakeUp',
      category: 'Featured',
      description: 'Accountability',
      details: 'Built fast.\nAward: 1st Place',
      tags: ['Next.js', 'TypeScript'],
    },
    {
      title: 'FixIt',
      category: 'Other',
      description: 'Service app',
      details: 'Full stack app.',
      tags: ['TypeScript', 'PostgreSQL'],
    },
  ]);

  assert.deepEqual(stats, [
    { value: 2, label: 'Projects' },
    { value: 1, label: 'Featured' },
    { value: 1, label: 'Award-winning' },
    { value: 3, label: 'Technologies' },
  ]);
});

test('parseHackathonPlace and computeHackathonStats compute podium metrics', () => {
  assert.equal(parseHackathonPlace('🥇 1st Place Winner'), 1);
  assert.equal(parseHackathonPlace('3rd Place'), 3);
  assert.equal(cleanAchievementLabel('🥇 1st Place'), '1st Place');

  const stats = computeHackathonStats([
    {
      title: 'Syntax2Code',
      achievement: '🥇 1st Place',
      date: 'Feb 2026',
      institution: 'GPCET',
      description: 'Won 1st place',
    },
    {
      title: 'Smart India',
      achievement: '2nd Place',
      date: 'Mar 2026',
      institution: 'IIT',
      description: 'Runner up',
    },
  ]);

  assert.deepEqual(stats, [
    { value: 2, label: 'Competitions' },
    { value: 2, label: 'Podium finishes' },
    { value: 1, label: 'First place' },
    { value: 2, label: 'Host institutions' },
  ]);
});

test('computeExperienceStats and computeOpenSourceStats calculate summary counters', () => {
  const expStats = computeExperienceStats([
    {
      role: 'Founder & CEO',
      company: 'Kairo Technologies',
      duration: 'Oct 2026 - Present',
      description: 'Leading Kairo',
      skills: ['Cloud OS', 'AI'],
    },
    {
      role: 'Consultancy Project Lead',
      company: 'Vensora AI',
      duration: 'Jul 2026 - Sep 2026',
      description: 'Voice AI',
      skills: ['AI', 'SIP'],
      recommendation: {
        quote: 'Great work',
        author: 'CEO',
        title: 'Founder',
        letterUrl: '/certifications/vensora_letter.pdf',
      },
    },
  ]);

  assert.deepEqual(expStats, [
    { value: 2, label: 'Roles' },
    { value: 2, label: 'Leadership' },
    { value: 1, label: 'Letters' },
    { value: 3, label: 'Focus areas' },
  ]);

  const osStats = computeOpenSourceStats([
    {
      project: 'vLLM',
      role: 'Contributor',
      duration: 'Sep 2026',
      description: 'LLM engine',
      details: 'Details',
      tags: ['PyTorch', 'Compilers'],
      contributions: [
        {
          title: 'TP MoE',
          issue: 'PR #54611',
          whatIDid: 'Optimized',
          whyIDidIt: 'Latency',
          whyIChooseThis: 'torch.compile',
          commits: [{ id: 'PR #54611', message: 'opt' }],
        },
      ],
    },
  ]);

  assert.deepEqual(osStats, [
    { value: 1, label: 'Upstream projects' },
    { value: 1, label: 'Contributions' },
    { value: 1, label: 'Commits & PRs' },
    { value: 2, label: 'Focus areas' },
  ]);
});

test('filterFeaturedStackTools matches the exact 4 featured stack items', () => {
  const tools = [
    { name: 'Python', color: '000', why: '', helpful: '', scale: '' },
    { name: 'TypeScript', color: '000', why: '', helpful: '', scale: '' },
    { name: 'React.js', color: '000', why: '', helpful: '', scale: '' },
    { name: 'Next.js', color: '000', why: '', helpful: '', scale: '' },
    { name: 'Tailwind CSS', color: '000', why: '', helpful: '', scale: '' },
    { name: 'Framer Motion', color: '000', why: '', helpful: '', scale: '' },
  ];
  const filtered = filterFeaturedStackTools(tools);
  assert.deepEqual(
    filtered.map((t) => t.name),
    ['TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion']
  );
});

test('validateContactForm validates required fields and email format', () => {
  const invalid = validateContactForm({ name: '', email: 'bad', subject: '', message: 'hi' });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.subject);
  assert.ok(invalid.errors.message);

  const valid = validateContactForm({
    name: 'Omesh Sidda',
    email: 'omesh@example.com',
    subject: 'Architecture Inquiry',
    message: 'Looking to collaborate on a distributed cloud system.',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('resolveGitHubReferenceLinks parses commit hashes and PR/issue numbers', () => {
  const commitSegs = resolveGitHubReferenceLinks('28159ef', 'https://github.com/org/repo');
  assert.deepEqual(commitSegs, [
    { type: 'link', text: '28159ef', href: 'https://github.com/org/repo/commit/28159ef' },
  ]);

  const prSegs = resolveGitHubReferenceLinks('PR #127, #258', 'https://github.com/org/repo');
  assert.equal(prSegs.filter((s) => s.type === 'link').length, 2);
  assert.equal(prSegs[1].href, 'https://github.com/org/repo/pull/127');
});

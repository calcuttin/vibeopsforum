const GITHUB_OWNER = "calcuttin";
const GITHUB_REPO = "vibeopsforum";

export const SITE = {
  name: "VibeOps Forum",
  domain: "vibeopsforum.com",
  url: "https://vibeopsforum.com",
  description:
    "A builder community for AI-native development, agent operations, A2A protocol work, and MCP tooling.",
  slackUrl:
    "https://join.slack.com/t/vibeopsforum/shared_invite/zt-40mvrfmy8-gqycEL7G~Q2tB5KuNW8tBQ",
  githubUrl: `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`,
  projectShelfSubmitUrl: `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/issues/new?template=project-shelf`,
  communityContentSubmitUrl: `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/issues/new?template=community-content`,
  ogImage: "/og-image.svg",
};

export const navItems = [
  { href: "/about/", label: "About" },
  { href: "/events/", label: "Events" },
  { href: "/resources/", label: "Resources" },
  { href: "/projects/", label: "Projects" },
  { href: "/community/", label: "Community" },
  { href: "/join/", label: "Join" },
];

export const topicLabels: Record<string, string> = {
  vibecoding: "Vibecoding",
  ao: "Agent Operations",
  a2a: "A2A Protocol",
  mcp: "MCP Tooling",
};

export const communityContentTypes = {
  all: { label: "All", kicker: "Everything" },
  youtube: { label: "YouTube", kicker: "Video" },
  podcast: { label: "Podcasts", kicker: "Audio" },
  blog: { label: "Blogs", kicker: "Writing" },
} as const;

export const topics = [
  {
    label: "Vibecoding",
    href: "/resources/vibecoding/",
    kicker: "AI-assisted product work",
    description:
      "Patterns for planning, prompting, reviewing, and shipping software with coding agents.",
  },
  {
    label: "Agent Operations",
    href: "/resources/agent-operations/",
    kicker: "Autonomous workflows",
    description:
      "How teams run agents in production workflows with handoffs, guardrails, and review loops.",
  },
  {
    label: "A2A Protocol",
    href: "/resources/a2a-protocol/",
    kicker: "Agent interoperability",
    description:
      "Practical notes on agent discovery, messaging, delegation, and multi-agent systems.",
  },
  {
    label: "MCP Tooling",
    href: "/resources/mcp-tooling/",
    kicker: "Tools for model context",
    description:
      "Servers, clients, schemas, and security practices for connecting models to real systems.",
  },
];

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatEventDateTime(date: Date, timezone: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: timezone,
    timeZoneName: "short",
  }).format(date);
}

export function isUpcoming(date: Date, endDate?: Date) {
  const cutoff = endDate ?? date;
  return cutoff.getTime() >= Date.now();
}

export function isActiveNav(pathname: string, href: string) {
  if (href === "/") return pathname === "/" || pathname === "";
  return pathname.startsWith(href);
}

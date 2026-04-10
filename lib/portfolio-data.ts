import type { IconType } from "react-icons";
import {
  FiCloud,
  FiCode,
  FiDatabase,
  FiLayers,
  FiSmartphone,
  FiTool,
} from "react-icons/fi";
import {
  SiDocker,
  SiExpress,
  SiFirebase,
  SiFramer,
  SiGithub,
  SiGraphql,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
} from "react-icons/si";
import { TbBrandAws, TbBrandReactNative } from "react-icons/tb";

export type SkillItem = {
  name: string;
  level: number;
};

export type SkillCategory = {
  title: "Frontend" | "Backend" | "Mobile" | "DevOps";
  items: SkillItem[];
};

/** Visual skill grid (reference-style cards: icon + title + category pill). */
export type SkillCardCategory = "Frontend" | "Backend" | "Mobile" | "Database" | "Tools";

export type SkillAccent =
  | "blue"
  | "cyan"
  | "fuchsia"
  | "emerald"
  | "violet"
  | "amber"
  | "rose"
  | "orange"
  | "slate";

export type SkillCard = {
  name: string;
  category: SkillCardCategory;
  icon: IconType;
  accent: SkillAccent;
};

export type Project = {
  id: string;
  title: string;
  image: string;
  description: string;
  details: string;
  tags: string[];
  github: string;
  live: string;
};

export type Experience = {
  period: string;
  role: string;
  company: string;
  summary: string;
};

export type Service = {
  title: string;
  description: string;
  icon: IconType;
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

/**
 * Same filename = same URL → browser + Next.js `Image` cache purani file dikhate hain.
 * Nayi image ke baad `HERO_PORTRAIT_ASSET_REV` badhao, ya `.env.local` mein
 * `NEXT_PUBLIC_HERO_PORTRAIT_REV=...` set karo.
 */
export const HERO_PORTRAIT_ASSET_REV = 4;

const heroPortraitRev =
  (typeof process.env.NEXT_PUBLIC_HERO_PORTRAIT_REV === "string" &&
    process.env.NEXT_PUBLIC_HERO_PORTRAIT_REV.trim()) ||
  String(HERO_PORTRAIT_ASSET_REV);

export const heroPortraitSrc = `/hero-portrait.png?v=${encodeURIComponent(heroPortraitRev)}`;

export const typingSkills = [
  "React & Next.js",
  "Node.js & Express APIs",
  "MongoDB + SQL Systems",
  "AWS, Docker, CI/CD",
];

export const counters = [
  { label: "Projects Delivered", value: 38 },
  { label: "Years Experience", value: 4 },
  { label: "Happy Clients", value: 22 },
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    items: [
      { name: "React.js", level: 95 },
      { name: "Next.js", level: 92 },
      { name: "Tailwind CSS", level: 94 },
      { name: "TypeScript", level: 90 },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", level: 93 },
      { name: "Express.js", level: 91 },
      { name: "MongoDB", level: 90 },
      { name: "SQL", level: 86 },
    ],
  },
  {
    title: "Mobile",
    items: [
      { name: "React Native", level: 84 },
      { name: "Cross Platform UX", level: 82 },
    ],
  },
  {
    title: "DevOps",
    items: [
      { name: "AWS", level: 87 },
      { name: "Docker", level: 84 },
      { name: "GitHub Actions", level: 88 },
      { name: "VPS Deployment", level: 85 },
    ],
  },
];

/** Grid order matches premium portfolio reference: 6 columns on large screens. */
export const skillCards: SkillCard[] = [
  { name: "React.js", category: "Frontend", icon: SiReact, accent: "blue" },
  { name: "Next.js", category: "Frontend", icon: SiNextdotjs, accent: "fuchsia" },
  { name: "React Native", category: "Mobile", icon: TbBrandReactNative, accent: "cyan" },
  { name: "TypeScript", category: "Frontend", icon: SiTypescript, accent: "blue" },
  { name: "Tailwind CSS", category: "Frontend", icon: SiTailwindcss, accent: "cyan" },
  { name: "Framer Motion", category: "Frontend", icon: SiFramer, accent: "fuchsia" },
  { name: "Three.js", category: "Frontend", icon: SiThreedotjs, accent: "amber" },
  { name: "Node.js", category: "Backend", icon: SiNodedotjs, accent: "emerald" },
  { name: "Express.js", category: "Backend", icon: SiExpress, accent: "slate" },
  { name: "GraphQL", category: "Backend", icon: SiGraphql, accent: "violet" },
  { name: "Firebase", category: "Backend", icon: SiFirebase, accent: "amber" },
  { name: "PostgreSQL", category: "Database", icon: SiPostgresql, accent: "blue" },
  { name: "MongoDB", category: "Database", icon: SiMongodb, accent: "emerald" },
  { name: "Supabase", category: "Database", icon: SiSupabase, accent: "emerald" },
  { name: "SQL", category: "Database", icon: SiMysql, accent: "rose" },
  { name: "Git / GitHub", category: "Tools", icon: SiGithub, accent: "orange" },
  { name: "Docker", category: "Tools", icon: SiDocker, accent: "blue" },
  { name: "AWS", category: "Tools", icon: TbBrandAws, accent: "orange" },
];

export const projects: Project[] = [
  {
    id: "ai-ops-dashboard",
    title: "AI Ops Command Dashboard",
    image:
      "https://images.unsplash.com/photo-1551281044-8b5bd6f1d9b2?auto=format&fit=crop&w=1200&q=80",
    description:
      "Enterprise dashboard for observability, deployment tracing, and incident workflows.",
    details:
      "Built with Next.js and Node APIs, this platform unified service health, deployment events, and alert routing. It reduced incident triage time by 43% and improved deployment confidence across teams.",
    tags: ["Next.js", "TypeScript", "Node.js", "AWS", "CI/CD"],
    github: "https://github.com/ghulam-mustafa/ai-ops-dashboard",
    live: "https://ai-ops-dashboard.vercel.app",
  },
  {
    id: "commerce-core",
    title: "Commerce Core Platform",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    description:
      "Multi-vendor commerce stack with analytics, orders, payouts, and role-based access.",
    details:
      "Developed a modular MERN architecture with SQL reporting pipelines and background jobs. Includes secure auth, caching, and measurable performance gains in checkout flow and admin operations.",
    tags: ["React", "Express", "MongoDB", "SQL", "Docker"],
    github: "https://github.com/ghulam-mustafa/commerce-core",
    live: "https://commerce-core.vercel.app",
  },
  {
    id: "careflow",
    title: "CareFlow Health System",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=1200&q=80",
    description:
      "A healthcare management product for appointments, patient records, and billing automation.",
    details:
      "Implemented secure APIs, audit logs, and scalable appointment scheduling with queue handling. Optimized data retrieval using aggregation and indexing for fast role-based dashboards.",
    tags: ["Next.js", "Node.js", "MongoDB", "AWS"],
    github: "https://github.com/ghulam-mustafa/careflow-system",
    live: "https://careflow-system.vercel.app",
  },
];

export const experiences: Experience[] = [
  {
    period: "2024 - Present",
    role: "Full Stack MERN Developer",
    company: "Freelance & Product Teams",
    summary:
      "Delivering production-grade web applications, backend services, and CI/CD systems for startups and SMEs.",
  },
  {
    period: "2022 - 2024",
    role: "Backend Developer",
    company: "Digital Solutions Studio",
    summary:
      "Designed scalable API systems, optimized database performance, and improved release reliability through automation.",
  },
  {
    period: "2021 - 2022",
    role: "Frontend Engineer",
    company: "Remote Startup",
    summary:
      "Built modern responsive interfaces, focused on UX quality, component architecture, and measurable speed improvements.",
  },
];

export const services: Service[] = [
  {
    title: "Web Development",
    description: "High-performance web apps with modern UI architecture and scalability.",
    icon: FiCode,
  },
  {
    title: "Mobile Apps",
    description: "Cross-platform mobile experiences using React Native with maintainable code.",
    icon: FiSmartphone,
  },
  {
    title: "API Development",
    description: "Secure backend APIs, microservices-ready architecture, and data workflows.",
    icon: FiDatabase,
  },
  {
    title: "DevOps / Deployment",
    description: "AWS, VPS, Docker, and CI/CD automation with observability and reliability.",
    icon: FiCloud,
  },
];

export const testimonials = [
  {
    quote:
      "Ghulam brings a rare mix of product thinking, engineering discipline, and delivery speed.",
    author: "CTO, SaaS Venture",
  },
  {
    quote:
      "The architecture quality and execution were outstanding. We shipped faster with fewer regressions.",
    author: "Founder, Digital Product Agency",
  },
];

export const blogPosts = [
  {
    title: "How I Design Reliable MERN APIs for Scale",
    excerpt:
      "A practical look into API layering, schema strategy, and deployment patterns for real production environments.",
    href: "#",
  },
  {
    title: "Improving Core Web Vitals in Next.js Projects",
    excerpt:
      "Hands-on techniques for reducing bundle cost, optimizing media, and improving runtime responsiveness.",
    href: "#",
  },
];

export const commandItems = [
  { label: "Go to Projects", href: "#projects", icon: FiLayers },
  { label: "Go to Services", href: "#services", icon: FiTool },
  { label: "Go to Contact", href: "#contact", icon: FiCode },
];

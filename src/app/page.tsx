"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

type ProjectStatus = "live" | "soon";

interface Project {
  name: string;
  desc: string;
  platforms: string[];
  year: string;
  status: ProjectStatus;
}

interface Palette {
  bg: string;
  s1: string;
  s2: string;
  fg: string;
  mid: string;
  ph: string;
}

const PROJECTS: Project[] = [
  {
    name: "Budgetly",
    desc: "A gentle expense tracker that shows where your money actually goes.",
    platforms: ["iOS", "Android"],
    year: "2025",
    status: "live",
  },
  {
    name: "Habitual",
    desc: "Tiny daily habit streaks with reminders that don't nag.",
    platforms: ["iOS", "Android"],
    year: "2025",
    status: "live",
  },
  {
    name: "QuickInvoice",
    desc: "Freelancer invoices in under a minute — create, send, get paid.",
    platforms: ["Web"],
    year: "2024",
    status: "live",
  },
  {
    name: "StudyStack",
    desc: "Flashcards with spaced repetition for students who cram less.",
    platforms: ["iOS", "Android"],
    year: "2024",
    status: "live",
  },
  {
    name: "Mealplanr",
    desc: "Plan a week of meals and get the grocery list for free.",
    platforms: ["Web"],
    year: "2025",
    status: "live",
  },
  {
    name: "SnapList",
    desc: "Shared shopping lists that sync instantly with your household.",
    platforms: ["Android"],
    year: "2024",
    status: "live",
  },
  {
    name: "FocusTimer",
    desc: "A pomodoro timer that blocks distractions while you work.",
    platforms: ["Web", "iOS"],
    year: "2026",
    status: "live",
  },
  {
    name: "FormForge",
    desc: "Build and share simple forms without the enterprise bloat.",
    platforms: ["Web"],
    year: "2026",
    status: "live",
  },
  {
    name: "Wanderlog Mini",
    desc: "A pocket travel journal for trips big and small.",
    platforms: ["iOS", "Android"],
    year: "2026",
    status: "soon",
  },
];

const PALETTES_LIGHT: Palette[] = [
  {
    bg: "#fff3e4",
    s1: "#ffe8cd",
    s2: "#ffe1bd",
    fg: "#8a5a1f",
    mid: "#a37e4d",
    ph: "#c99b62",
  },
  {
    bg: "#e4f4ec",
    s1: "#d2ecdf",
    s2: "#c7e6d6",
    fg: "#1f6b45",
    mid: "#4d8a6b",
    ph: "#5f9a7c",
  },
  {
    bg: "#e9e6ff",
    s1: "#dcd7fb",
    s2: "#d2ccf8",
    fg: "#463aa0",
    mid: "#6c62b8",
    ph: "#7a6fd0",
  },
  {
    bg: "#ffe9f0",
    s1: "#fcdbe7",
    s2: "#f9d0df",
    fg: "#96345c",
    mid: "#b25e80",
    ph: "#c4738f",
  },
  {
    bg: "#e3f1fd",
    s1: "#d2e7f9",
    s2: "#c6dff5",
    fg: "#1e5f96",
    mid: "#4a82ac",
    ph: "#5f93ba",
  },
  {
    bg: "#fdf4d7",
    s1: "#f8ecc2",
    s2: "#f4e5b0",
    fg: "#8a6d1f",
    mid: "#a68f4d",
    ph: "#bda45f",
  },
];

const PALETTES_DARK: Palette[] = [
  {
    bg: "#33261a",
    s1: "#3c2d1f",
    s2: "#453424",
    fg: "#f4c690",
    mid: "#c9a06a",
    ph: "#9a7c50",
  },
  {
    bg: "#1a2e24",
    s1: "#21382c",
    s2: "#274134",
    fg: "#9fdcbb",
    mid: "#6faf8d",
    ph: "#578a6f",
  },
  {
    bg: "#242038",
    s1: "#2b2645",
    s2: "#322c50",
    fg: "#c3b8fa",
    mid: "#948ad0",
    ph: "#7a70b5",
  },
  {
    bg: "#331e27",
    s1: "#3d2530",
    s2: "#472b38",
    fg: "#f2a8c5",
    mid: "#c47d9c",
    ph: "#9c6280",
  },
  {
    bg: "#1a2735",
    s1: "#202f40",
    s2: "#26374a",
    fg: "#a3cdf0",
    mid: "#74a3c9",
    ph: "#5c88ab",
  },
  {
    bg: "#2f2917",
    s1: "#38311d",
    s2: "#423922",
    fg: "#e8d089",
    mid: "#b8a25e",
    ph: "#927f48",
  },
];

const INITIAL_COUNT = 6;
const BATCH = 3;
const SHOW_COMING_SOON = true;
const FILTERS = ["All", "iOS", "Android", "Web"] as const;
type PlatformFilter = (typeof FILTERS)[number];

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [extra, setExtra] = useState(0);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [filter, setFilter] = useState<PlatformFilter>("All");

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("avora-theme");
    } catch {
      // localStorage unavailable (private browsing, etc.) — fall back to light
    }
    if (stored === "dark") setTheme("dark");

    const onScroll = () => {
      setShowTopBtn(
        (window.scrollY || document.documentElement.scrollTop) > 400,
      );
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("avora-theme", next);
    } catch {
      // localStorage unavailable — theme still applies for this session
    }
    setTheme(next);
  };

  const goTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleFilterClick = (label: PlatformFilter) => {
    setFilter(label);
    setExtra(0);
  };

  const isDark = theme === "dark";
  const palettes = isDark ? PALETTES_DARK : PALETTES_LIGHT;
  const allProjects = (
    SHOW_COMING_SOON ? PROJECTS : PROJECTS.filter((p) => p.status !== "soon")
  ).filter((p) => filter === "All" || p.platforms.includes(filter));
  const visibleCount = Math.min(INITIAL_COUNT + extra, allProjects.length);
  const shown = allProjects.slice(0, visibleCount);
  const remaining = allProjects.length - visibleCount;
  const hasMore = remaining > 0;
  const nextBatch = Math.min(BATCH, remaining);

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.logo} role="img" aria-label="avora labs">
          <span className={styles.logoStrong}>av</span>
          <span className={styles.logoDot} />
          <span className={styles.logoStrong}>ra</span>
          <span className={styles.logoMuted}>&nbsp;labs</span>
        </div>
        <div className={styles.navLinks}>
          <a href="#apps" className={styles.navLink}>
            Apps
          </a>
          <a href="#about" className={styles.navLink}>
            About
          </a>
          <a href="https://reno-is.dev" className={styles.navLink}>
            Portfolio
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className={styles.themeToggle}
          >
            {isDark ? "☀️" : "🌙"}
          </button>
          <a
            href="mailto:personal.renoangelo@gmail.com"
            className={styles.hiBtn}
          >
            Say hi 👋
          </a>
        </div>
      </nav>

      <header className={styles.hero}>
        <span className={styles.badge}>Made by one friendly engineer</span>
        <h1 className={styles.heroTitle}>
          Little apps and tools that make big differences
        </h1>
        <p className={styles.heroDesc}>
          Hey! I&apos;m Reno. Avora Labs is where I build software for people —
          on the web, the App Store, and Google Play.
        </p>
      </header>

      <section id="apps" className={styles.appsSection}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>From the lab</h2>
          <span className={styles.countLabel}>
            {visibleCount} of {allProjects.length} projects
          </span>
        </div>
        <div className={styles.filterRow}>
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => handleFilterClick(f)}
              className={`${styles.filterBtn} ${
                f === filter ? styles.filterBtnActive : ""
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className={styles.grid}>
          {shown.map((project, i) => (
            <AppCard
              key={project.name}
              project={project}
              palette={palettes[i % palettes.length]}
              slug={slugify(project.name)}
              isDark={isDark}
            />
          ))}
        </div>
        {hasMore && (
          <div className={styles.loadMoreWrap}>
            <button
              type="button"
              className={styles.loadMoreBtn}
              onClick={() => setExtra((e) => e + BATCH)}
            >
              Load {nextBatch} more ({remaining} left)
            </button>
          </div>
        )}
      </section>

      <section id="about" className={styles.about}>
        <div className={styles.aboutInner}>
          <div>
            <h2 className={styles.aboutHeading}>Nice to meet you 👋</h2>
            <p className={styles.aboutText}>
              I&apos;m a software engineer who genuinely enjoys making things
              people use every day. Some projects start as fixes for my own
              problems — the good ones grow into apps for everyone. See my full
              story at{" "}
              <a href="https://reno-is.dev" className={styles.aboutTextLink}>
                reno-is.dev
              </a>
              .
            </p>
            <div className={styles.tags}>
              {[
                "TypeScript",
                "React",
                "React Native",
                "Node.js",
                "Firebase",
                "PostgreSQL",
              ].map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.valueCards}>
            <ValueCard
              title="Helpful first"
              desc="Every app starts with a real person's real problem."
            />
            <ValueCard
              title="Simple on purpose"
              desc="Fewer buttons, clearer screens, faster wins."
            />
            <ValueCard
              title="Always improving"
              desc="Ship small, listen closely, update often."
            />
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <Image
          src="/images/avora-icon.png"
          alt=""
          width={52}
          height={52}
          className={styles.footerIcon}
        />
        <h2 className={styles.footerHeading}>
          Let&apos;s build something together
        </h2>
        <p className={styles.footerDesc}>
          Feedback, ideas, or work — my inbox is open.
        </p>
        <a
          href="mailto:personal.renoangelo@gmail.com"
          className={styles.footerBtn}
        >
          personal.renoangelo@gmail.com
        </a>
        <div className={styles.footerBottom}>
          <span>© 2026 Avora Labs</span>
          <span>·</span>
          <a href="https://reno-is.dev" className={styles.footerBottomLink}>
            reno-is.dev
          </a>
        </div>
      </footer>

      <button
        type="button"
        onClick={goTop}
        aria-label="Back to top"
        tabIndex={showTopBtn ? 0 : -1}
        className={`${styles.topBtn} ${showTopBtn ? styles.topBtnVisible : ""}`}
      >
        ↑
      </button>
    </>
  );
}

function AppCard({
  project,
  palette,
  slug,
  isDark,
}: {
  project: Project;
  palette: Palette;
  slug: string;
  isDark: boolean;
}) {
  const chipBg = isDark ? palette.s2 : "#fff";
  return (
    <div className={styles.card} style={{ background: palette.bg }}>
      <div className={styles.cardImage}>
        <Image
          src={`/images/${slug}.png`}
          alt={`${project.name} screenshot`}
          fill
          sizes="(max-width: 768px) 100vw, 340px"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className={styles.cardHeadRow}>
        <h3 className={styles.cardTitle} style={{ color: palette.fg }}>
          {project.name}
        </h3>
        <span className={styles.cardYear} style={{ color: palette.ph }}>
          {project.year}
        </span>
      </div>
      <p className={styles.cardDesc} style={{ color: palette.mid }}>
        {project.desc}
      </p>
      <div className={styles.chipRow}>
        {project.platforms.map((platform) => (
          <span
            key={platform}
            className={styles.chip}
            style={{ background: chipBg, color: palette.fg }}
          >
            {platform}
          </span>
        ))}
        {project.status === "soon" && (
          <span
            className={styles.chip}
            style={{
              background: palette.fg,
              color: isDark ? "#14121c" : "#fff",
            }}
          >
            Coming soon
          </span>
        )}
      </div>
    </div>
  );
}

function ValueCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className={styles.valueCard}>
      <strong className={styles.valueCardTitle}>{title}</strong>
      <p className={styles.valueCardDesc}>{desc}</p>
    </div>
  );
}

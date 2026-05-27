import React from "react";
import "./project.css";
import Footer from "@/components/Footer/Footer";
import Copy from "@/components/Copy/Copy";
import ProjectNav from "./ProjectNav";

const projectsData = {
  orange: {
    name: "orange",
    index: "01",
    tagline: "AI powered trading analysis platform",
    status: "Released",
    website: "https://orange.superxepic.dev",
    form: "SaaS Web Application / Financial Analytics Dashboard",
    cycle: "Q1 2026 (4 Weeks)",
    studio: "SXE Lab (Internal Experiment)",
    concept: "A sleek, distraction-free interface that uses local transformer models to highlight anomalies and sentiment shifts in candlestick charts.",
    challenge: "Visualizing massive streams of real-time trading data without rendering lag, while running local AI inference models in-browser.",
    nextId: "bvmwincity",
  },
  bvmwincity: {
    name: "BVMwincity",
    index: "02",
    tagline: "Plot rental and network income platform",
    status: "Completed",
    website: "https://bvmwincity.vercel.app",
    form: "Commercial Web Portal & Network Management Dashboard",
    cycle: "Q4 2025 (8 Weeks)",
    studio: "Client Collaboration",
    concept: "Combining mapping APIs with automated payroll/ledger protocols to make real-estate rentals and passive network income tracking fully visual and frictionless.",
    challenge: "Building a transparent, tamper-proof system for tracking plot rentals and calculating complex multi-level network commissions in real-time.",
    nextId: "livemarket",
  },
  livemarket: {
    name: "Livemarket",
    index: "03",
    tagline: "Live shopping platform for India",
    status: "Released",
    website: "https://livemarket.live",
    form: "High-concurrency Mobile-Web Marketplace & Live Video Streamer",
    cycle: "Q3 2025 (12 Weeks)",
    studio: "Client Collaboration",
    concept: "A social shopping platform bringing the hustle and interactivity of physical Indian bazaars to the screen through real-time video auctions and instant messaging.",
    challenge: "Optimizing low-latency live video streaming alongside chat and one-click purchasing on low-bandwidth mobile connections across tier-2 and tier-3 Indian cities.",
    nextId: "customkeys",
  },
  customkeys: {
    name: "Customkeys",
    index: "04",
    tagline: "Developer first secrets manager and certificates manager",
    status: "Released",
    website: "https://customkeys.superxepic.dev",
    form: "Developer Console / API Service & CLI tool",
    cycle: "Q2 2025 (6 Weeks)",
    studio: "SXE Lab (Internal Product)",
    concept: "Zero-knowledge secrets sharing and automated TLS rotation built to fit naturally inside a developer's CLI flow rather than fighting against it.",
    challenge: "Securing keys and certificates with end-to-end client-side encryption while maintaining an instant, seamless UX for DevOps pipelines.",
    nextId: "steelcontainers",
  },
  steelcontainers: {
    name: "steelcontainers",
    index: "05",
    tagline: "Managed code sandbox for AI agents",
    status: "Ongoing / Beta",
    website: "https://steelcontainers.dev",
    form: "Secure Sandboxed Runtime & API Infrastructure",
    cycle: "Active (Ongoing)",
    studio: "SXE Lab (Core R&D)",
    concept: "An ephemeral, steel-plated playground where LLM-driven agents can write, test, and run code without risking host system security.",
    challenge: "Isolating execution environments to run untrusted agentic code at sub-millisecond boot times while providing secure network and file access.",
    nextId: "supermind",
  },
  supermind: {
    name: "Supermind",
    index: "06",
    tagline: "Agentic coding CLI",
    status: "Ongoing / Alpha",
    website: "https://supermind.ai",
    form: "Terminal User Interface (TUI) & Command Line tool",
    cycle: "Active (Ongoing)",
    studio: "SXE Lab (Developer Tooling)",
    concept: "An autonomous shell partner that understands your project structure, suggests modifications, and applies changes directly through a simple natural language interface.",
    challenge: "Designing a terminal UI that displays complex AST modifications and code diffs in a clean, non-obtrusive, high-density format.",
    nextId: "orange",
  },
};

export default async function ProjectPage({ params }) {
  const { id } = await params;
  const project = projectsData[id];

  if (!project) {
    return (
      <div className="sample-project-page">
        <section className="project-header">
          <Copy delay={0.75}>
            <p className="lg">Error</p>
            <h1>Project Not Found</h1>
          </Copy>
        </section>
        <Footer />
      </div>
    );
  }

  const nextProject = projectsData[project.nextId];

  return (
    <div className="sample-project-page">
      {/* Header Block matching sample project style */}
      <section className="project-header">
        <Copy delay={0.75}>
          <p className="lg">{project.tagline}</p>
          <h1>{project.name}</h1>
        </Copy>
      </section>

      {/* Details list matching sample project style */}
      <section className="project-details">
        <Copy animateOnScroll={true}>
          <div className="details">
            <p>Concept</p>
            <h3>{project.concept}</h3>
          </div>

          <div className="details">
            <p>Challenge</p>
            <h3>{project.challenge}</h3>
          </div>

          <div className="details">
            <p>Status</p>
            <h3>{project.status}</h3>
          </div>

          <div className="details">
            <p>Cycle</p>
            <h3>{project.cycle}</h3>
          </div>

          <div className="details">
            <p>Form / Medium</p>
            <h3>{project.form}</h3>
          </div>

          <div className="details">
            <p>Studio</p>
            <h3>{project.studio}</h3>
          </div>

          <div className="details">
            <p>Website</p>
            <h3>
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                Visit Project
              </a>
            </h3>
          </div>
        </Copy>
      </section>

      {/* Looping Navigation (Client Component) */}
      <ProjectNav
        nextId={project.nextId}
        nextName={nextProject.name}
        nextIndex={nextProject.index}
      />

      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return [
    { id: "orange" },
    { id: "bvmwincity" },
    { id: "livemarket" },
    { id: "customkeys" },
    { id: "steelcontainers" },
    { id: "supermind" },
  ];
}

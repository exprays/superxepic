"use client";

import "./careers.css";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Copy from "@/components/Copy/Copy";
import Footer from "@/components/Footer/Footer";

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  const careersRef = useRef(null);
  const teaserRef = useRef(null);
  const modalRef = useRef(null);
  const modalPanelRef = useRef(null);

  const roles = useMemo(
    () => [
      {
        id: "creative-developer",
        title: "Creative Developer",
        mode: "Full-time / Remote",
        summary:
          "Build immersive interfaces, micro-interactions, and bold web experiences with motion-first thinking.",
      },
      {
        id: "motion-designer",
        title: "Motion Designer",
        mode: "Full-time / Remote",
        summary:
          "Craft kinetic identities, transitions, and visual systems that move with precision and attitude.",
      },
      {
        id: "brand-strategist",
        title: "Brand Strategist",
        mode: "Full-time / Remote",
        summary:
          "Shape narrative direction, positioning, and campaign concepts for brands that want edge and clarity.",
      },
      {
        id: "ui-ux-designer",
        title: "UI/UX Designer",
        mode: "Full-time / Remote",
        summary:
          "Design seamless, chaos-infused interfaces that balance high-end aesthetics with deep usability.",
      },
      {
        id: "backend-engineer",
        title: "Backend Engineer",
        mode: "Full-time / Remote",
        summary:
          "Architect the systems that power our digital worlds, focusing on high-performance APIs and distributed mischief.",
      },
      {
        id: "cto",
        title: "CTO",
        mode: "Full-time / Remote",
        summary:
          "Lead our technical vision, scaling our chaos-driven engineering culture and defining the future of digital expression.",
      },
    ],
    []
  );

  const [selectedRole, setSelectedRole] = useState(roles[0].title);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isTeaserVisible, setIsTeaserVisible] = useState(true);

  useGSAP(
    () => {
      const q = gsap.utils.selector(careersRef);

      gsap.fromTo(
        q(".career-card"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".career-list",
            start: "top 82%",
            once: true,
          },
        }
      );
    },
    { scope: careersRef }
  );

  useEffect(() => {
    const modal = modalRef.current;
    const panel = modalPanelRef.current;
    if (!modal || !panel) return;

    if (isModalOpen) {
      modal.classList.add("open");
      document.body.style.overflow = "hidden";

      gsap.fromTo(
        panel,
        { x: "100%" },
        { x: "0%", duration: 0.55, ease: "power4.out" }
      );
    } else {
      document.body.style.overflow = "";
      modal.classList.remove("open");
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const handleApplyFocus = (roleTitle) => {
    setSelectedRole(roleTitle);
    setStatus({ type: "", message: "" });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    const panel = modalPanelRef.current;

    if (!panel) {
      setIsModalOpen(false);
      return;
    }

    gsap.to(panel, {
      x: "100%",
      duration: 0.35,
      ease: "power3.inOut",
      onComplete: () => setIsModalOpen(false),
    });
  };

  const handleCloseTeaser = () => {
    if (!teaserRef.current) {
      setIsTeaserVisible(false);
      return;
    }

    gsap.to(teaserRef.current, {
      y: -16,
      opacity: 0,
      height: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,
      duration: 0.45,
      ease: "power4.inOut",
      onComplete: () => setIsTeaserVisible(false),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    formData.set("role", selectedRole);

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/careers/apply", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Could not submit application.");
      }

      setStatus({
        type: "success",
        message: "Application sent. We will reach out if there is a match.",
      });
      formElement.reset();
      setSelectedRole(roles[0].title);

      setTimeout(() => {
        setIsModalOpen(false);
      }, 800);
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error?.message || "Something went wrong while sending your application.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="careers" ref={careersRef}>
      <div className="careers-noise" aria-hidden="true" />

      <div className="container">
        {isTeaserVisible ? (
          <aside className="careers-teaser" ref={teaserRef}>
            <p className="sm">Funding Update</p>
            <p className="lg">We are raising our Series A.</p>
            <button type="button" onClick={handleCloseTeaser}>
              Dismiss
            </button>
          </aside>
        ) : null}

        <div className="careers-header-content">
          <div className="careers-header">
            <Copy delay={0.35} animateOnScroll={false}>
              <p className="sm">Careers</p>
              <h1>Join the Chaos</h1>
            </Copy>
          </div>

          <div className="arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              viewBox="0 0 32 32"
              fill="none"
              className="icon"
            >
              <path
                d="M16 26.6665L16 5.33317"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M22.6667 19.9999L16 26.6665L9.33337 19.9998"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>

          <div className="careers-header-copy">
            <Copy delay={0.55} animateOnScroll={false}>
              <p className="lg">
                We are always looking for people who move fast, think weird, and
                care about craft. Pick a role and send your resume.
              </p>
            </Copy>
          </div>
        </div>

        <div className="career-list" aria-label="Open positions">
          {roles.map((role, index) => (
            <article className="career-card" key={role.id}>
              <p className="sm">0{index + 1}</p>
              <h3>{role.title}</h3>
              <p>{role.summary}</p>
              <div className="career-card-footer">
                <p className="cap">{role.mode}</p>
                <button
                  type="button"
                  className="career-apply-btn"
                  onClick={() => handleApplyFocus(role.title)}
                >
                  Apply
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div
        className="career-modal"
        ref={modalRef}
        aria-hidden={!isModalOpen}
        role="dialog"
        aria-label="Career application form"
      >
        <button
          type="button"
          className="career-modal-backdrop"
          onClick={handleCloseModal}
          aria-label="Close application form"
        />

        <aside className="career-modal-panel" ref={modalPanelRef}>
          <div className="career-modal-header">
            <h2>Apply</h2>
            <button type="button" onClick={handleCloseModal}>
              Close
            </button>
          </div>

          <div className="career-modal-body">
            <p className="lg">
              You are applying for the <span>{selectedRole}</span> position. We
              want to know what makes your perspective unique.
            </p>
          </div>

          <form className="career-form" onSubmit={handleSubmit}>
            <label>
              <span className="sm">Role</span>
              <input type="text" name="roleDisplay" value={selectedRole} readOnly />
            </label>

            <label>
              <span className="sm">Full Name</span>
              <input type="text" name="fullName" required placeholder="Your full name" />
            </label>

            <label>
              <span className="sm">Email</span>
              <input type="email" name="email" required placeholder="you@example.com" />
            </label>

            <label>
              <span className="sm">Portfolio URL</span>
              <input
                type="url"
                name="portfolio"
                placeholder="https://your-portfolio.com"
              />
            </label>

            <label>
              <span className="sm">Phone (Optional)</span>
              <input type="tel" name="phone" placeholder="+47 ..." />
            </label>

            <label>
              <span className="sm">Resume</span>
              <input
                type="file"
                name="resume"
                required
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              />
            </label>

            <label className="full">
              <span className="sm">Why You</span>
              <textarea
                name="message"
                rows={5}
                required
                placeholder="Tell us what you would bring to Polite Chaos."
              />
            </label>

            {status.message ? (
              <p className={`career-status ${status.type}`}>{status.message}</p>
            ) : null}

            <button type="submit" className="career-submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Application"}
            </button>
          </form>
        </aside>
      </div>

      <Footer />
    </section>
  );
};

export default Page;

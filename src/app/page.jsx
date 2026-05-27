"use client";
import "./home.css";
import Button from "@/components/Button/Button";
import Showreel from "@/components/Showreel/Showreel";
import FeaturedWork from "@/components/FeaturedWork/FeaturedWork";
import ClientReviews from "@/components/ClientReviews/ClientReviews";
import Spotlight from "@/components/Spotlight/Spotlight";
import CTACard from "@/components/CTACard/CTACard";
import Footer from "@/components/Footer/Footer";
import Copy from "@/components/Copy/Copy";
import Preloader, { isInitialLoad } from "@/components/Preloader/Preloader";
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useViewTransition } from "@/hooks/useViewTransition";
import { HiArrowRight, HiX } from "react-icons/hi";

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  const [showBanner, setShowBanner] = useState(true);
  const { navigateWithTransition } = useViewTransition();
  const servicesContainerRef = useRef(null);

  useGSAP(
    () => {
      if (!servicesContainerRef.current) return;

      const rows = gsap.utils.toArray(".service-row", servicesContainerRef.current);
      const lines = gsap.utils.toArray(".service-row-line", servicesContainerRef.current);

      lines.forEach((line) => {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: "left center",
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: line,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      rows.forEach((row) => {
        const elements = row.querySelectorAll(".service-row-schematic, .service-row-title, .service-row-tag");
        gsap.fromTo(
          elements,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    },
    { scope: servicesContainerRef }
  );

  useEffect(() => {
    ScrollTrigger.refresh(true);

    const refreshTimes = [100, 500, 1000, 2000, 4000, 6000, 7000, 8000];
    const timeouts = refreshTimes.map(delay =>
      setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, delay)
    );

    const onLoad = () => ScrollTrigger.refresh(true);
    window.addEventListener("load", onLoad, { passive: true });

    return () => {
      timeouts.forEach(clearTimeout);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <>
      <Preloader />

      {showBanner && (
        <aside className="top-banner">
          <div
            className="top-banner-content"
            onClick={() => navigateWithTransition("/careers")}
          >
            <p className="cap">
              Super update &bull; We're hiring strange
              thinkers
            </p>
            <HiArrowRight className="banner-icon" />
          </div>
          <button
            className="close-banner"
            onClick={(e) => {
              e.stopPropagation();
              setShowBanner(false);
              setTimeout(() => ScrollTrigger.refresh(), 100);
            }}
            aria-label="Close banner"
          >
            <HiX />
          </button>
        </aside>
      )}

      <section className={`hero ${showBanner ? "banner-offset" : ""}`}>
        <div className="container">
          <div className="hero-content-main">
            <div className="hero-header">
              <Copy animateOnScroll={false} delay={isInitialLoad ? 5.75 : 0.75}>
                <h1>Crafting Digital Worlds with a Bit of Mischief</h1>
              </Copy>
            </div>

            <div className="hero-footer-outer">
              <Copy animateOnScroll={false} delay={isInitialLoad ? 6.35 : 1.65}>
                <p className="sm">&copy; SUPERXEPIC</p>
                <p className="sm">( Cave 101 )</p>
              </Copy>
            </div>

            <div className="hero-footer">
              <Copy animateOnScroll={false} delay={isInitialLoad ? 6.05 : 1.15}>
                <p className="lg">
                  Bridging high-performance developer systems with cinematic consumer experiences. We build for the unpredictable.
                </p>
              </Copy>

              <Button delay={isInitialLoad ? 6.35 : 1.55} href="/studio">
                Explore the Studio
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Showreel />

      <section className="featured-work">
        <div className="container">
          <div className="featured-work-header-content">
            <div className="featured-work-header">
              <Copy animateOnScroll={true} delay={0.25}>
                <h1>Studio Output</h1>
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

            <div className="featured-work-header-copy">
              <Copy animateOnScroll={true} delay={0.25}>
                <p className="lg">
                  A collection of technical craft and visual storytelling. From internal tools to global consumer campaigns.
                </p>
              </Copy>
            </div>
          </div>

          <FeaturedWork />
        </div>
      </section>

      <section className="services-section" ref={servicesContainerRef}>
        <div className="container">
          <div className="services-header-top">
            <span className="sm">02 / CAPABILITIES</span>
            <span className="sm">CREATIVE TECH STUDIO</span>
          </div>
          <div className="services-header-main">
            <Copy animateOnScroll={true} delay={0.25}>
              <h1>Selected services,<br />design-to-code.</h1>
            </Copy>
            <span className="sm services-header-side">TAILORED SOLUTIONS</span>
          </div>

          <div className="services-list">
            {[
              {
                name: "Branding",
                tag: "Identity & Creative Direction",
                svg: (
                  <svg viewBox="0 0 80 50" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <rect x="5" y="5" width="70" height="40" rx="4" strokeDasharray="3,3" opacity="0.3" />
                    <circle cx="40" cy="25" r="14" />
                    <line x1="20" y1="25" x2="60" y2="25" />
                    <line x1="40" y1="5" x2="40" y2="45" />
                    <rect x="37" y="22" width="6" height="6" fill="currentColor" />
                  </svg>
                )
              },
              {
                name: "Web Experience design",
                tag: "Cinematic & GL Interfaces",
                svg: (
                  <svg viewBox="0 0 80 50" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <rect x="25" y="5" width="30" height="40" rx="3" />
                    <line x1="25" y1="36" x2="55" y2="36" />
                    <circle cx="40" cy="41" r="1.5" fill="currentColor" />
                    <rect x="30" y="10" width="20" height="22" rx="1.5" opacity="0.5" />
                    <circle cx="40" cy="21" r="5" strokeDasharray="2,2" />
                  </svg>
                )
              },
              {
                name: "Website design",
                tag: "Grid & Typography Systems",
                svg: (
                  <svg viewBox="0 0 80 50" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <rect x="10" y="5" width="60" height="40" rx="3" />
                    <line x1="10" y1="13" x2="70" y2="13" />
                    <circle cx="15" cy="9" r="1" fill="currentColor" />
                    <circle cx="19" cy="9" r="1" fill="currentColor" />
                    <circle cx="23" cy="9" r="1" fill="currentColor" />
                    <rect x="16" y="18" width="48" height="21" rx="1.5" strokeDasharray="2,2" opacity="0.5" />
                    <line x1="30" y1="18" x2="30" y2="39" opacity="0.3" />
                  </svg>
                )
              },
              {
                name: "Ideation",
                tag: "Strategy & Rapid Prototyping",
                svg: (
                  <svg viewBox="0 0 80 50" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <circle cx="22" cy="16" r="5" fill="currentColor" />
                    <circle cx="58" cy="16" r="5" />
                    <circle cx="40" cy="36" r="5" />
                    <line x1="27" y1="16" x2="53" y2="16" />
                    <line x1="25" y1="20" x2="36" y2="32" strokeDasharray="3,3" />
                    <line x1="55" y1="20" x2="44" y2="32" strokeDasharray="3,3" />
                  </svg>
                )
              },
              {
                name: "Motion",
                tag: "Timeline & Keyframe Graphics",
                svg: (
                  <svg viewBox="0 0 80 50" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M10 25 C 22 10, 34 40, 46 25 C 58 10, 70 40, 80 25" strokeWidth="1.5" />
                    <circle cx="25" cy="17" r="3" fill="currentColor" />
                    <circle cx="55" cy="33" r="3" fill="currentColor" />
                    <line x1="10" y1="42" x2="70" y2="42" strokeDasharray="3,3" opacity="0.5" />
                  </svg>
                )
              },
              {
                name: "SEO",
                tag: "Audit & Performance Systems",
                svg: (
                  <svg viewBox="0 0 80 50" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <rect x="15" y="8" width="50" height="11" rx="2" />
                    <circle cx="22" cy="13" r="1.5" fill="currentColor" />
                    <line x1="28" y1="13" x2="58" y2="13" opacity="0.5" />
                    <path d="M15 40 L 30 31 L 45 35 L 65 21" strokeWidth="1.5" />
                    <circle cx="65" cy="21" r="2.5" fill="currentColor" />
                  </svg>
                )
              },
              {
                name: "Web content",
                tag: "Copywriting & Code Samples",
                svg: (
                  <svg viewBox="0 0 80 50" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <line x1="10" y1="10" x2="55" y2="10" strokeLinecap="round" />
                    <line x1="10" y1="18" x2="70" y2="18" opacity="0.6" strokeLinecap="round" />
                    <line x1="10" y1="26" x2="60" y2="26" opacity="0.6" strokeLinecap="round" />
                    <rect x="10" y="32" width="26" height="12" rx="1.5" opacity="0.5" />
                    <rect x="44" y="32" width="26" height="12" rx="1.5" opacity="0.5" />
                  </svg>
                )
              },
            ].map((service) => (
              <React.Fragment key={service.name}>
                <div className="service-row-line"></div>
                <div className="service-row">
                  <div className="service-row-left">
                    <div className="service-row-schematic">
                      {service.svg}
                    </div>
                    <h2 className="service-row-title">{service.name}</h2>
                  </div>
                  <div className="service-row-right">
                    <span className="service-row-tag sm">{service.tag}</span>
                  </div>
                </div>
              </React.Fragment>
            ))}
            <div className="service-row-line"></div>
          </div>
        </div>
      </section>

      <section className="client-reviews-header-container">
        <div className="container">
          <div className="client-reviews-header-content">
            <div className="client-reviews-header">
              <Copy animateOnScroll={true} delay={0.25}>
                <h1>Field Reports</h1>
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

            <div className="client-reviews-header-copy">
              <Copy animateOnScroll={true} delay={0.25}>
                <p className="lg">
                  What happened when our systems met the real world. Unfiltered feedback from our developer and consumer partners.
                </p>
              </Copy>
            </div>
          </div>
        </div>
      </section>

      <ClientReviews />

      <Spotlight />

      <CTACard />

      <Footer />
    </>
  );
};

export default Page;

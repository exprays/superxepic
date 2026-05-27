"use client";
import { useEffect, useState, useRef } from "react";
import { ReactLenis } from "lenis/react";
import Menu from "./components/Menu/Menu";
import { usePathname } from "next/navigation";
import { waitForFonts } from "@/utils/fonts";
import { gsap } from "gsap";

export default function ClientLayout({ children }) {
  const pageRef = useRef();

  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let active = true;

    const handleTransitionEnd = async () => {
      const overlay = document.querySelector(".page-transition-overlay");
      if (!overlay || !overlay.classList.contains("is-active")) return;

      const overlayPath = overlay.querySelector(".overlay__path");
      if (!overlayPath) return;

      const paths = {
        filled: "M 100 0 H 0 c 0 50 0 50 0 100 h 100 V 50 Z",
        inBetween: "M 100 0 H 50 c 28 43 4 81 0 100 h 50 V 0 Z",
        unfilled: "M 100 0 H 100 c 0 50 0 50 0 100 h 0 V 0 Z",
      };

      // 1. Wait for custom fonts to load on the new page
      await waitForFonts();
      if (!active) return;

      // 2. Play slide-out transition
      gsap.timeline({
        onComplete: () => {
          if (!active) return;
          overlay.classList.remove("is-active");
          if (overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
          }
        },
      })
      .set(overlayPath, {
        attr: { d: paths.filled },
      })
      .to(overlayPath, {
        duration: 0.15,
        ease: "sine.in",
        attr: { d: paths.inBetween },
      })
      .to(overlayPath, {
        duration: 1,
        ease: "power4",
        attr: { d: paths.unfilled },
      });
    };

    handleTransitionEnd();

    return () => {
      active = false;
    };
  }, [pathname]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scrollSettings = isMobile
    ? {
        duration: 0.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        smoothTouch: true,
        touchMultiplier: 1.5,
        infinite: false,
        lerp: 0.09,
        wheelMultiplier: 1,
        orientation: "vertical",
        smoothWheel: true,
        syncTouch: true,
      }
    : {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
        lerp: 0.1,
        wheelMultiplier: 1,
        orientation: "vertical",
        smoothWheel: true,
        syncTouch: true,
      };

  return (
    <ReactLenis root options={scrollSettings}>
      <Menu pageRef={pageRef} />

      <div className="page" ref={pageRef}>
        {children}
      </div>
    </ReactLenis>
  );
}

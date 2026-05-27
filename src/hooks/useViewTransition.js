"use client";
import { useTransitionRouter } from "next-view-transitions";
import { gsap } from "gsap";

export const useViewTransition = () => {
  const router = useTransitionRouter();

  function createSVGOverlay() {
    let overlay = document.querySelector(".page-transition-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "page-transition-overlay";
      overlay.innerHTML = `
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path class="overlay__path" vector-effect="non-scaling-stroke" d="M 0 0 h 0 c 0 50 0 50 0 100 H 0 V 0 Z" />
        </svg>
      `;
      document.body.appendChild(overlay);
    }
    return overlay;
  }

  function slideIn(href, onRouteChange) {
    const overlay = createSVGOverlay();
    const overlayPath = overlay.querySelector(".overlay__path");

    if (!overlayPath) return;

    overlay.classList.add("is-active");

    const paths = {
      unfilled: "M 0 0 h 0 c 0 50 0 50 0 100 H 0 V 0 Z",
      inBetween: "M 0 0 h 43 c -60 55 140 65 0 100 H 0 V 0 Z",
      filled: "M 0 0 h 100 c 0 50 0 50 0 100 H 0 V 0 Z",
    };

    gsap.timeline()
      .set(overlayPath, {
        attr: { d: paths.unfilled },
      })
      .to(
        overlayPath,
        {
          duration: 0.6,
          ease: "power4.in",
          attr: { d: paths.inBetween },
        },
        0
      )
      .to(overlayPath, {
        duration: 0.2,
        ease: "power1",
        attr: { d: paths.filled },
        onComplete: () => {
          router.push(href);

          if (onRouteChange) {
            onRouteChange();
          }
        },
      });
  }

  const navigateWithTransition = (href, onRouteChange, options = {}) => {
    const currentPath = window.location.pathname;
    if (currentPath === href) {
      return;
    }

    slideIn(href, onRouteChange);
  };

  return { navigateWithTransition, router };
};

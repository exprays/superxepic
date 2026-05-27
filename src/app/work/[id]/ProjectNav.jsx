"use client";
import React from "react";
import { useViewTransition } from "@/hooks/useViewTransition";
import Copy from "@/components/Copy/Copy";

export default function ProjectNav({ nextId, nextName, nextIndex }) {
  const { navigateWithTransition } = useViewTransition();

  return (
    <section className="next-project">
      <Copy animateOnScroll={true}>
        <p style={{ marginBottom: "1rem" }}>{nextIndex} - 06</p>
        <a
          href={`/work/${nextId}`}
          onClick={(e) => {
            e.preventDefault();
            navigateWithTransition(`/work/${nextId}`);
          }}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <h2>Next</h2>
          <h3>{nextName}</h3>
        </a>
      </Copy>
    </section>
  );
}

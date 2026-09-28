"use client";

import { useEffect } from "react";

/**
 * Fades `[data-reveal]` elements in as they scroll into view.
 *
 * Content is server-rendered visible. On mount, only elements that are still below the fold are
 * hidden (`data-reveal="pending"`) and then revealed as they enter the viewport, so nothing on
 * screen flickers and nothing stays hidden if this script never runs. Elements that play a
 * one-time animation can key it off `[data-reveal="shown"]`.
 */
export function RevealObserver() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => (element.dataset.reveal = "shown"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.reveal = "shown";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    for (const element of elements) {
      if (element.getBoundingClientRect().top < window.innerHeight * 0.9) {
        element.dataset.reveal = "shown";
      } else {
        element.dataset.reveal = "pending";
        observer.observe(element);
      }
    }

    return () => observer.disconnect();
  }, []);

  return null;
}

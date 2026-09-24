import { useEffect, useState } from 'react';

/**
 * Highlights the nav link whose section is currently in the viewport,
 * mirroring the original IntersectionObserver-based scroll-spy.
 */
export default function useScrollSpy(ids) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-42% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

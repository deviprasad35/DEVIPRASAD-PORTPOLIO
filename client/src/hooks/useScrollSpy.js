import { useEffect, useState } from 'react';

/**
 * useScrollSpy
 *
 * Tracks which section is currently in the viewport and returns its id.
 *
 * @param {string[]} sectionIds - Array of section element ids to observe.
 * @param {{ rootMargin?: string, threshold?: number }} options
 * @returns {string | null} - The id of the currently active section.
 */
const useScrollSpy = (sectionIds = [], options = {}) => {
  const { rootMargin = '-20% 0px -70% 0px', threshold = 0 } = options;
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (!sectionIds.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, { rootMargin, threshold });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds.join(','), rootMargin, threshold]);

  return activeId;
};

export default useScrollSpy;

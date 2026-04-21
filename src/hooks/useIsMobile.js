import { useState, useEffect } from 'react';

/**
 * Returns true when viewport width <= breakpoint (default 480px).
 * Reactive – updates on resize.
 */
export default function useIsMobile(breakpoint = 480) {
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth <= breakpoint
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [breakpoint]);

  return isMobile;
}

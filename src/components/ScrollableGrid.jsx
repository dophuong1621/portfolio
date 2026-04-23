import { useRef, useState, useEffect, useCallback } from 'react';
import useDraggableScroll from '../hooks/useDraggableScroll';

const SCROLL_AMOUNT = 320;

export default function ScrollableGrid({ className = '', children, ...props }) {
  const dragRef = useDraggableScroll();
  const scrollRef = useRef(null);
  const thumbRef = useRef(null);
  const [canScrollLeft,  setCanScrollLeft]  = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const setRefs = useCallback((node) => {
    scrollRef.current = node;
    dragRef.current = node;
  }, [dragRef]);

  const updateState = useCallback(() => {
    const el = scrollRef.current;
    const thumbEl = thumbRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);

    if (!thumbEl) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    if (scrollWidth <= clientWidth) {
      thumbEl.style.left  = '0%';
      thumbEl.style.width = '100%';
      return;
    }
    const ratio  = clientWidth / scrollWidth;
    const thumbW = Math.max(ratio * 100, 8);
    const thumbL = (scrollLeft / (scrollWidth - clientWidth)) * (100 - thumbW);
    thumbEl.style.left  = `${thumbL}%`;
    thumbEl.style.width = `${thumbW}%`;
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateState();
    const observer = new ResizeObserver(updateState);
    observer.observe(el);
    el.addEventListener('scroll', updateState, { passive: true });
    window.addEventListener('resize', updateState);
    return () => {
      observer.disconnect();
      el.removeEventListener('scroll', updateState);
      window.removeEventListener('resize', updateState);
    };
  }, [updateState]);

  const scrollBy = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * SCROLL_AMOUNT, behavior: 'smooth' });
  };

  const handleTrackClick = (e) => {
    const el = scrollRef.current;
    if (!el) return;
    const track     = e.currentTarget.getBoundingClientRect();
    const clickRatio = (e.clientX - track.left) / track.width;
    el.scrollTo({ left: clickRatio * (el.scrollWidth - el.clientWidth), behavior: 'smooth' });
  };

  // ── Arrow button style ──────────────────────────────────────────────────────
  const arrow = (side, visible) => ({
    position:       'absolute',
    top:            '50%',
    [side]:         -16,          // nhô ra mép ngoài một chút
    transform:      'translateY(-50%)',
    zIndex:         10,
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    width:          32,
    height:         32,
    borderRadius:   '50%',
    border:         `1px solid rgba(255,255,255,${visible ? 0.14 : 0.06})`,
    background:     visible ? 'rgba(15,15,26,0.85)' : 'rgba(15,15,26,0.4)',
    backdropFilter: 'blur(8px)',
    color:          visible ? '#f1f0ff' : 'rgba(255,255,255,0.2)',
    cursor:         visible ? 'pointer' : 'default',
    transition:     'background 0.18s, border-color 0.18s, color 0.18s',
    boxShadow:      visible ? '0 2px 10px rgba(0,0,0,0.4)' : 'none',
    pointerEvents:  visible ? 'auto' : 'none',
  });

  return (
    /* position: relative để arrow absolute định vị theo wrapper */
    <div className="scrollable-grid-wrapper" style={{ position: 'relative' }}>

      {/* ── Arrow LEFT ─────────────────────────────────────── */}
      <button
        aria-label="Cuộn trái"
        style={arrow('left', canScrollLeft)}
        onClick={() => scrollBy(-1)}
        onMouseEnter={e => { if (canScrollLeft) e.currentTarget.style.background = 'rgba(79,70,229,0.55)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = canScrollLeft ? 'rgba(15,15,26,0.85)' : 'rgba(15,15,26,0.4)'; }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* ── Arrow RIGHT ────────────────────────────────────── */}
      <button
        aria-label="Cuộn phải"
        style={arrow('right', canScrollRight)}
        onClick={() => scrollBy(1)}
        onMouseEnter={e => { if (canScrollRight) e.currentTarget.style.background = 'rgba(79,70,229,0.55)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = canScrollRight ? 'rgba(15,15,26,0.85)' : 'rgba(15,15,26,0.4)'; }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* ── Scrollable cards ──────────────────────────────── */}
      <div
        ref={setRefs}
        className={`${className} hide-native-scrollbar`}
        {...props}
      >
        {children}
      </div>

      {/* ── Scroll track indicator ────────────────────────── */}
      <div className="scroll-track" onClick={handleTrackClick} role="scrollbar" aria-hidden="true">
        <div
          className="scroll-thumb"
          ref={thumbRef}
          style={{ left: '0%', width: '10%' }}
        />
      </div>
    </div>
  );
}

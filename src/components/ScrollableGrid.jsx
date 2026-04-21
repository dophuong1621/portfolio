import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import useDraggableScroll from '../hooks/useDraggableScroll';

/**
 * Wrapper bao quanh grid scroll ngang.
 * Thanh indicator luôn hiển thị (không ẩn như native scrollbar).
 * Hỗ trợ framer-motion variants (truyền qua props).
 */
export default function ScrollableGrid({ className = '', children, ...motionProps }) {
  const dragRef = useDraggableScroll();
  const scrollRef = useRef(null);
  const [thumbStyle, setThumbStyle] = useState({ left: 0, width: 20 });

  // Gán cả dragRef và scrollRef vào cùng 1 element
  const setRefs = useCallback((node) => {
    scrollRef.current = node;
    dragRef.current = node;
  }, [dragRef]);

  const updateThumb = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    if (scrollWidth <= clientWidth) {
      // Không có gì để scroll: thumb chiếm toàn bộ
      setThumbStyle({ left: 0, width: 100 });
      return;
    }
    const ratio = clientWidth / scrollWidth;
    const thumbW = Math.max(ratio * 100, 8);
    const thumbL = (scrollLeft / (scrollWidth - clientWidth)) * (100 - thumbW);
    setThumbStyle({ left: thumbL, width: thumbW });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    // Tính ngay sau mount (đợi layout xong)
    const raf = requestAnimationFrame(updateThumb);
    el.addEventListener('scroll', updateThumb, { passive: true });
    window.addEventListener('resize', updateThumb);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('scroll', updateThumb);
      window.removeEventListener('resize', updateThumb);
    };
  }, [updateThumb]);

  // Click vào track để nhảy đến vị trí đó
  const handleTrackClick = (e) => {
    const el = scrollRef.current;
    if (!el) return;
    const track = e.currentTarget.getBoundingClientRect();
    const clickRatio = (e.clientX - track.left) / track.width;
    el.scrollTo({
      left: clickRatio * (el.scrollWidth - el.clientWidth),
      behavior: 'smooth',
    });
  };

  return (
    <div className="scrollable-grid-wrapper">
      {/* Grid cards – dùng motion.div để hỗ trợ framer-motion variants */}
      <motion.div
        ref={setRefs}
        className={`${className} hide-native-scrollbar`}
        {...motionProps}
      >
        {children}
      </motion.div>

      {/* Thanh indicator luôn hiển thị */}
      <div className="scroll-track" onClick={handleTrackClick} role="scrollbar" aria-hidden="true">
        <div
          className="scroll-thumb"
          style={{
            left: `${thumbStyle.left}%`,
            width: `${thumbStyle.width}%`,
          }}
        />
      </div>
    </div>
  );
}

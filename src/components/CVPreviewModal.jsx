import { useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaDownload, FaEye } from 'react-icons/fa';
import CVTemplate from './CVTemplate';
import { usePdfExport } from '../hooks/usePdfExport';

// A4 kích thước thật ở 96 DPI
const A4_W_PX = 794;
const A4_H_PX = 1123;

// Lấy viewport width chính xác (hoạt động trong DevTools mobile simulation)
function getViewportWidth() {
  return document.documentElement.clientWidth || window.innerWidth;
}

// ─────────────────────────────────────────────────────────────────────────────
export default function CVPreviewModal({ isOpen, onClose }) {
  const cvRef = useRef(null);
  const { isDownloading, status, isReady, handleDownload } = usePdfExport(cvRef, isOpen);

  // Scale = viewport_width / A4_width, tối đa 1 (không phóng to)
  const [scale, setScale] = useState(() => Math.min(getViewportWidth() / A4_W_PX, 1));

  const remeasure = useCallback(() => {
    setScale(Math.min(getViewportWidth() / A4_W_PX, 1));
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    remeasure();
    const t = setTimeout(remeasure, 150); // backup sau 150ms
    window.addEventListener('resize', remeasure);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', remeasure);
    };
  }, [isOpen, remeasure]);

  // Khoá scroll body khi modal mở
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    document.body.style.cursor  = '';
    return () => {
      document.body.style.overflow = '';
      document.body.style.cursor  = '';
    };
  }, [isOpen]);

  // Đóng bằng phím Escape
  useEffect(() => {
    if (!isOpen) return;
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [isOpen, onClose]);

  // Kích thước visual sau khi scale
  const scaledW = A4_W_PX * scale;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Xem trước CV"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
          style={{
            position:             'fixed',
            inset:                0,
            zIndex:               100000,
            backgroundColor:      'rgba(0,0,0,0.88)',
            backdropFilter:       'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display:              'flex',
            flexDirection:        'column',
            cursor:               'default',
            fontFamily:           "'Be Vietnam Pro', sans-serif",
          }}
        >
          {/* ── HEADER ── */}
          <motion.header
            initial={{ y: -56, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30, delay: 0.04 }}
            style={{
              flexShrink:     0,
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'space-between',
              flexWrap:       'wrap',
              gap:            8,
              padding:        '10px 16px',
              minHeight:      56,
              background:     'linear-gradient(135deg, #151526 0%, #0f0f1a 100%)',
              borderBottom:   '1px solid rgba(255,255,255,0.08)',
              boxShadow:      '0 2px 20px rgba(0,0,0,0.6)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#fff' }}>
              <FaEye size={16} />
              <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: 0.2 }}>
                Xem trước CV
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              <AnimatePresence mode="wait">
                {status && (
                  <motion.span
                    key={status}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    style={{ color: '#bfdbfe', fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap' }}
                  >
                    {status}
                  </motion.span>
                )}
              </AnimatePresence>

              <button
                onClick={handleDownload}
                disabled={isDownloading || !isReady}
                style={{
                  display:      'flex',
                  alignItems:   'center',
                  gap:          6,
                  padding:      '8px 14px',
                  background:   (!isReady || isDownloading)
                    ? 'rgba(255,255,255,0.08)'
                    : 'linear-gradient(90deg, #4f46e5, #a855f7)',
                  color:        (!isReady || isDownloading) ? 'rgba(255,255,255,0.4)' : '#fff',
                  border:       'none',
                  borderRadius: 7,
                  fontFamily:   "'Be Vietnam Pro', sans-serif",
                  fontWeight:   700,
                  fontSize:     13,
                  cursor:       (!isReady || isDownloading) ? 'not-allowed' : 'pointer',
                  transition:   'all 0.2s',
                  boxShadow:    (!isReady || isDownloading) ? 'none' : '0 4px 14px rgba(168,85,247,0.4)',
                  whiteSpace:   'nowrap',
                  flexShrink:   0,
                }}
              >
                {isDownloading
                  ? <><InlineSpinner /> Đang xử lý...</>
                  : !isReady
                    ? <><InlineSpinner /> Chuẩn bị...</>
                    : <><FaDownload size={12} /> Tải xuống PDF</>
                }
              </button>

              <button
                onClick={onClose}
                title="Đóng (Esc)"
                style={{
                  width: 36, height: 36,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(255,255,255,0.12)',
                  border: 'none', borderRadius: '50%',
                  color: '#fff', fontSize: 15,
                  cursor: 'pointer', transition: 'background 0.15s',
                  flexShrink: 0,
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.26)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
              >
                <FaTimes />
              </button>
            </div>
          </motion.header>

          {/* ── SCROLLABLE PREVIEW ── */}
          <div
            onClick={onClose}
            style={{
              flex:          1,
              overflowY:     'auto',
              overflowX:     'hidden',
              background:    '#050509',
              display:       'flex',
              flexDirection: 'column',
              alignItems:    'center',
              padding:       '24px 0 60px',
            }}
          >
            {/*
              Kỹ thuật 2 lớp — giải quyết overflow và căn giữa đúng:

              Vấn đề cốt lõi: CSS transform KHÔNG thay đổi layout.
              Phần tử 794px sau khi scale(0.54) vẫn chiếm 794px trong layout
              → gây overflow → bị clip bởi overflowX:hidden.

              Giải pháp:
              1. Wrapper ngoài: width = A4_W * scale (≈382px trên 430px viewport)
                 → flex parent (alignItems:center) căn giữa wrapper này ✓
                 → layout chỉ chiếm 382px → không overflow ✓
              2. Inner div: width = 794px, transform: scale từ top-left
                 → CV render đủ 794px cho html2canvas ✓
                 → visual co lại đúng 382px ✓
              3. marginBottom âm bù chiều cao layout thừa sau scale
            */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, type: 'spring', stiffness: 240, damping: 26 }}
              onClick={e => e.stopPropagation()}
              style={{
                // Wrapper ngoài: kích thước visual
                width:     scaledW,
                flexShrink: 0,
                boxShadow: '0 24px 64px rgba(0,0,0,0.65)',
              }}
            >
              {/* Inner scaler: kích thước thật A4 */}
              <div
                style={{
                  width:           A4_W_PX,
                  transform:       `scale(${scale})`,
                  transformOrigin: 'top left',
                  // Bù layout height thừa: flow = A4_H, visual = A4_H*scale
                  marginBottom:    `${(scale - 1) * A4_H_PX}px`,
                  lineHeight:      0, // loại extra whitespace
                }}
              >
                <CVTemplate ref={cvRef} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

// ── Spinner ──────────────────────────────────────────────────────────────────
function InlineSpinner() {
  return (
    <span
      aria-hidden="true"
      style={{
        display:        'inline-block',
        width:          12, height: 12,
        border:         '2px solid rgba(29,78,216,0.2)',
        borderTopColor: '#1d4ed8',
        borderRadius:   '50%',
        animation:      'spin 0.7s linear infinite',
        flexShrink:     0,
      }}
    />
  );
}

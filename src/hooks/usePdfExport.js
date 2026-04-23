import { useRef, useState, useCallback, useEffect } from 'react';

const A4_W_MM  = 210;
const A4_H_MM  = 297;
const A4_W_PX  = 794;
const A4_H_PX  = 1123;
const SCALE    = 2;          // độ phân giải capture (2x = retina-like)
const MAX_PAGES = 2;         // CVTemplate có đúng 2 trang A4

/**
 * Tạm thời xoá transform khỏi parent của element để html2canvas
 * capture đúng kích thước thật (không bị ảnh hưởng bởi scale preview).
 * Trả về hàm restore.
 */
function suspendTransform(el) {
  const parent = el?.parentElement;
  if (!parent) return () => {};

  const savedTransform    = parent.style.transform;
  const savedMarginBottom = parent.style.marginBottom;
  const savedWidth        = parent.style.width;

  parent.style.transform    = 'none';
  parent.style.marginBottom = '0';
  parent.style.width        = `${A4_W_PX}px`;

  return () => {
    parent.style.transform    = savedTransform;
    parent.style.marginBottom = savedMarginBottom;
    parent.style.width        = savedWidth;
  };
}

/**
 * Chụp CVTemplate bằng html2canvas, trả về canvas object.
 * Tự động suspend transform trước khi chụp để tránh lỗi mobile.
 */
async function captureCV(el) {
  const restore = suspendTransform(el);

  // Đợi 1 frame sau khi xoá transform để browser re-layout
  await new Promise(r => requestAnimationFrame(r));

  try {
    const { default: html2canvas } = await import('html2canvas');
    return await html2canvas(el, {
      scale:           SCALE,
      useCORS:         true,
      allowTaint:      true,
      logging:         false,
      backgroundColor: '#080812',
      windowWidth:     A4_W_PX,
      // Không giới hạn height — để html2canvas capture toàn bộ CV
      // Trang trắng được chặn bởi pageNum >= MAX_PAGES trong vòng lặp PDF
    });
  } finally {
    restore(); // luôn restore dù có lỗi hay không
  }
}

/**
 * usePdfExport — pre-generates canvas khi modal mở,
 * cache lại để Download gần như tức thì.
 */
export function usePdfExport(cvRef, isOpen) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [status,        setStatus]        = useState('');
  const [isReady,       setIsReady]       = useState(false);

  const cachedCanvas = useRef(null);

  // ── Pre-render: chụp ngay khi modal mở ──────────────────────────────────────
  useEffect(() => {
    if (!isOpen) {
      cachedCanvas.current = null;
      setIsReady(false);
      return;
    }

    let cancelled = false;

    const preRender = async () => {
      // Đợi 2 frame để CVTemplate paint và scale preview ổn định
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
      if (cancelled || !cvRef.current) return;

      try {
        const canvas = await captureCV(cvRef.current);
        if (!cancelled) {
          cachedCanvas.current = canvas;
          setIsReady(true);
        }
      } catch (err) {
        console.warn('[usePdfExport] pre-render failed:', err);
      }
    };

    preRender();
    return () => { cancelled = true; };
  }, [isOpen, cvRef]);

  // ── Download ─────────────────────────────────────────────────────────────────
  const handleDownload = useCallback(async () => {
    if (isDownloading) return;
    setIsDownloading(true);

    try {
      const { jsPDF } = await import('jspdf');

      let canvas = cachedCanvas.current;
      if (!canvas) {
        setStatus('Đang chụp ảnh...');
        canvas = await captureCV(cvRef.current);
      }

      setStatus('Đang tạo PDF...');

      const pdf  = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pdfW = pdf.internal.pageSize.getWidth();   // 210mm
      const pdfH = pdf.internal.pageSize.getHeight();  // 297mm

      const totalCanvasH  = canvas.height;
      const totalMm       = (totalCanvasH / SCALE / A4_W_PX) * A4_W_MM;

      // Chiều cao 1 trang tính theo pixel canvas
      const pageHeightPx = (pdfH / totalMm) * totalCanvasH;

      let pageTop = 0;
      let pageNum = 0;

      while (pageTop < totalMm) {
        // Tính pixel bắt đầu của trang này trên canvas
        const srcYPx      = (pageTop / totalMm) * totalCanvasH;
        const remainingPx = totalCanvasH - srcYPx;

        // Bỏ qua nếu phần còn lại < 3% chiều cao 1 trang → tránh trang trắng
        if (remainingPx < pageHeightPx * 0.03) break;

        if (pageNum > 0) pdf.addPage();

        // Tô nền tối
        pdf.setFillColor(8, 8, 18);
        pdf.rect(0, 0, pdfW, pdfH, 'F');

        const srcHPx = Math.min(pageHeightPx, remainingPx);

        // Cắt slice cho trang này
        const slice    = document.createElement('canvas');
        slice.width    = canvas.width;
        slice.height   = Math.ceil(srcHPx);
        const ctx      = slice.getContext('2d');
        ctx.fillStyle  = '#080812';
        ctx.fillRect(0, 0, slice.width, slice.height);
        ctx.drawImage(canvas, 0, -srcYPx);

        const sliceHMm = (srcHPx / totalCanvasH) * totalMm;
        pdf.addImage(slice.toDataURL('image/jpeg', 0.93), 'JPEG', 0, 0, pdfW, sliceHMm);

        pageTop += pdfH;
        pageNum++;
      }


      pdf.save('DoThePhuong_CV.pdf');
      setStatus('✅ Tải xuống thành công!');
      setTimeout(() => setStatus(''), 2000);

    } catch (err) {
      console.error('[usePdfExport]', err);
      setStatus('❌ Có lỗi xảy ra. Vui lòng thử lại.');
      setTimeout(() => setStatus(''), 3000);
    } finally {
      setIsDownloading(false);
    }
  }, [isDownloading, cvRef]);

  return { isDownloading, status, isReady, handleDownload };
}

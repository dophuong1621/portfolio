import { useRef, useState, useCallback, useEffect } from 'react';

const A4_W_PX = 794;
const SCALE   = 2;

/**
 * usePdfExport — pre-generates canvas khi modal mở,
 * cache lại để Download gần như tức thì.
 *
 * @param {React.RefObject} cvRef  - ref của CVTemplate đang hiển thị
 * @param {boolean}         isOpen - modal có đang mở không
 */
export function usePdfExport(cvRef, isOpen) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [status,        setStatus]        = useState('');
  const [isReady,       setIsReady]       = useState(false);

  // Cache canvas đã chụp sẵn
  const cachedCanvas = useRef(null);

  // ── Pre-render: chụp ngay khi modal mở và CV đã paint xong ─────────────────
  useEffect(() => {
    if (!isOpen) {
      // Reset khi modal đóng
      cachedCanvas.current = null;
      setIsReady(false);
      return;
    }

    let cancelled = false;

    const preRender = async () => {
      // Đợi 1 frame để CVTemplate paint xong trên DOM
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

      if (cancelled || !cvRef.current) return;

      try {
        const { default: html2canvas } = await import('html2canvas');

        if (cancelled || !cvRef.current) return;

        const canvas = await html2canvas(cvRef.current, {
          scale:           SCALE,
          useCORS:         true,
          allowTaint:      true,
          logging:         false,
          backgroundColor: '#080812',
          windowWidth:     A4_W_PX,
        });

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

  // ── Download: dùng canvas cache → gần như tức thì ──────────────────────────
  const handleDownload = useCallback(async () => {
    if (isDownloading) return;
    setIsDownloading(true);

    try {
      const { jsPDF } = await import('jspdf');

      // Nếu cache chưa sẵn (hy hữu), chụp lại ngay
      let canvas = cachedCanvas.current;
      if (!canvas) {
        setStatus('Đang chụp ảnh...');
        const { default: html2canvas } = await import('html2canvas');
        canvas = await html2canvas(cvRef.current, {
          scale:           SCALE,
          useCORS:         true,
          allowTaint:      true,
          logging:         false,
          backgroundColor: '#080812',
          windowWidth:     A4_W_PX,
        });
      }

      setStatus('Đang tạo PDF...');

      const pdf  = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = pdf.internal.pageSize.getHeight();
      const totalHeightMm = (canvas.height / SCALE / A4_W_PX) * pdfW;

      let pageTop = 0, pageNum = 0;
      // Trừ đi 2mm threshold để tránh sai số làm nhảy thêm 1 trang trắng
      while (pageTop < totalHeightMm - 2) {
        if (pageNum > 0) pdf.addPage();

        // ── Tô nền tối trước để phần rỗng cuối trang không bị trắng ──
        pdf.setFillColor(8, 8, 18);   // #080812
        pdf.rect(0, 0, pdfW, pdfH, 'F');

        const srcYPx = (pageTop / totalHeightMm) * canvas.height;
        const srcHPx = Math.min(
          (pdfH / totalHeightMm) * canvas.height,
          canvas.height - srcYPx
        );

        const slice = document.createElement('canvas');
        slice.width  = canvas.width;
        slice.height = srcHPx;
        const ctx = slice.getContext('2d');
        ctx.fillStyle = '#080812';
        ctx.fillRect(0, 0, slice.width, slice.height);
        ctx.drawImage(canvas, 0, -srcYPx);

        const sliceHMm = (srcHPx / canvas.height) * totalHeightMm;
        pdf.addImage(slice.toDataURL('image/jpeg', 0.92), 'JPEG', 0, 0, pdfW, sliceHMm);

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

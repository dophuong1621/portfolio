import { useEffect, useState } from "react";

// Lazy-load tsparticles chỉ sau khi trang đã render xong + LCP hoàn thành
// Điều này giúp không block FCP/LCP trong lần load đầu tiên
let particlesLoaded = false;
let particlesEngine = null;

// Phát hiện LCP đã hoàn thành chưa
let lcpDoneGlobal = false;
if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
  try {
    const po = new PerformanceObserver((list) => {
      if (list.getEntries().length > 0) {
        lcpDoneGlobal = true;
        po.disconnect();
      }
    });
    po.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (e) { lcpDoneGlobal = true; } // Fallback nếu browser không hỗ trợ
}

export default function ParticleBackground() {
  const [init, setInit] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);

    // Tắt hoàn toàn nếu người dùng bật prefers-reduced-motion (accessibility + perf)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return; // Chỉ hiện blobs tĩnh
    }

    const initParticles = async () => {
      if (particlesLoaded) {
        setInit(true);
        return;
      }
      // Dynamic import – tách thành chunk riêng, chỉ fetch khi cần
      const [{ initParticlesEngine }, { loadSlim }] = await Promise.all([
        import("@tsparticles/react"),
        import("@tsparticles/slim"),
      ]);
      particlesEngine = await initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      });
      particlesLoaded = true;
      setInit(true);
    };

    // Tăng timeout: đợi sau LCP (~2.9s) mới load particles
    // requestIdleCallback timeout 4s → không bắt đầu cho đến khi browser rảnh VÀ sau LCP
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(initParticles, { timeout: 4000 });
      return () => cancelIdleCallback(id);
    } else {
      // Fallback: 1.5s để LCP hoàn thành trước
      const t = setTimeout(initParticles, 1500);
      return () => clearTimeout(t);
    }
  }, []);

  // Trong khi chờ particles init, hiện blobs đơn giản (zero JS cost)
  if (!init) {
    return (
      <>
        <div className="blob blob-1" />
        <div className="blob blob-2" />
      </>
    );
  }

  // Sau khi init: lazy-import component chính
  return <ParticlesCanvas isMobile={isMobile} />;
}

// Tách thành component con để React có thể lazy-load dễ hơn
function ParticlesCanvas({ isMobile }) {
  // Dynamic import Particles component
  const [Particles, setParticles] = useState(null);

  useEffect(() => {
    import("@tsparticles/react").then((m) => setParticles(() => m.default));
  }, []);

  if (!Particles) return null;

  // Mobile: ít hạt hơn nữa để tiết kiệm CPU/GPU
  const particleCount = isMobile ? 15 : 35;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        // Fix D: chỉ promote GPU layer sau LCP — tránh cạnh tranh với LCP image render
        willChange: lcpDoneGlobal ? "transform" : "auto",
        transform: "translateZ(0)",
      }}
    >
      <Particles
        id="tsparticles"
        style={{ pointerEvents: isMobile ? "none" : "auto" }}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: isMobile ? 25 : 40, // giảm từ 30/45 xuống
          interactivity: {
            events: {
              // Tắt hover/click trên mobile để tiết kiệm CPU
              onClick: { enable: !isMobile, mode: "push" },
              onHover: { enable: !isMobile, mode: "repulse" },
              resize: { enable: true, delay: 0.5 }, // debounce resize
            },
            modes: {
              push: { quantity: 2 },
              repulse: { distance: 80, duration: 0.4 },
            },
          },
          particles: {
            color: { value: "#818cf8" },
            links: {
              color: "#a855f7",
              distance: isMobile ? 100 : 130,
              enable: true,
              opacity: 0.12,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: { default: "bounce" },
              random: false,
              speed: isMobile ? 0.5 : 0.8,
              straight: false,
            },
            number: {
              density: { enable: true, area: 900 },
              value: particleCount,
            },
            opacity: { value: 0.2 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 2 } },
          },
          detectRetina: false, // tắt để tiết kiệm GPU trên mobile
        }}
      />
    </div>
  );
}

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { ArrowRight, Rocket } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef(null);
  const bgRef = useRef(null);

  // Simple parallax on mouse move
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(${(x - 0.5) * 20}px, ${(y - 0.5) * 20}px, 0)`;
      }
    };
    el.addEventListener('mousemove', handler);
    return () => el.removeEventListener('mousemove', handler);
  }, []);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section ref={containerRef} className="relative h-[92vh] w-full overflow-hidden">
      {/* Animated gradient background */}
      <div
        ref={bgRef}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(22,163,74,0.45),transparent_45%),radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.35),transparent_40%)]"
        style={{ filter: 'blur(60px)' }}
      />

      {/* Spline 3D scene */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Overlay content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-2xl backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl shadow-emerald-500/10"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-300 ring-1 ring-emerald-500/30">
            <Rocket className="h-4 w-4" />
            <span className="text-xs font-medium">Modern Financial Newsletters</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300">
            Insights that move with the market
          </h1>
          <p className="mt-4 text-slate-300/90 leading-relaxed">
            Real-time market highlights, AI summaries, and a premium glassmorphic experience.
            Subscribe to the pulse of stocks, crypto, forex, commodities, tech, and real estate.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => scrollToId('signup')}
              className="group inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-black shadow-lg shadow-emerald-500/25 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.99]"
            >
              Subscribe now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={() => scrollToId('news')}
              className="rounded-xl bg-white/10 px-5 py-3 font-semibold text-white ring-1 ring-white/20 backdrop-blur-md transition hover:bg-white/15"
            >
              Explore updates
            </button>
          </div>
        </motion.div>
      </div>

      {/* local styles for subtle gradient animation */}
      <style>{`
        @keyframes hueShift { from { filter: hue-rotate(0deg); } to { filter: hue-rotate(20deg); } }
        section:hover > div:first-child { animation: hueShift 10s linear infinite alternate; }
      `}</style>
    </section>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

function useTypewriter(text, speed = 18) {
  const [output, setOutput] = useState('');
  useEffect(() => {
    let i = 0;
    setOutput('');
    const id = setInterval(() => {
      i++;
      setOutput(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return output;
}

function SentimentBadge({ sentiment }) {
  const map = {
    positive: 'bg-emerald-500/15 text-emerald-300 ring-emerald-400/30',
    negative: 'bg-rose-500/15 text-rose-300 ring-rose-400/30',
    neutral: 'bg-amber-500/15 text-amber-300 ring-amber-400/30',
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ring-1 animate-pulse ${map[sentiment]}`}>
      {sentiment}
    </span>
  );
}

function NewsCard({ item, i }) {
  const [hover, setHover] = useState(false);
  const summary = useTypewriter(hover ? item.summary : '', 14);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: i * 0.06 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ perspective: 1000 }}
      className="group rounded-2xl"
    >
      <div
        className="relative h-64 w-full rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl shadow-xl transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(12deg)]"
      >
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent" />
        <div className="relative z-10 flex h-full flex-col justify-between">
          <div className="space-y-2">
            <h5 className="text-lg font-bold tracking-tight">{item.title}</h5>
            <SentimentBadge sentiment={item.sentiment} />
          </div>

          <div className="text-sm text-slate-300/90">
            <p className="min-h-[3.5rem] leading-relaxed">
              {summary || <span className="text-slate-500">Hover to reveal AI summary…</span>}
            </p>
          </div>

          <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
            <span className="opacity-90">{item.source}</span>
            <span className="opacity-60">{item.date}</span>
          </div>
        </div>

        <button className="absolute bottom-4 right-4 rounded-xl bg-emerald-500 px-3 py-2 text-xs font-bold text-black opacity-90 shadow-md transition hover:opacity-100">
          Subscribe
        </button>

        <div className="absolute -bottom-6 left-6 h-20 w-20 rounded-full bg-emerald-500/20 blur-2xl" />
      </div>
    </motion.div>
  );
}

export default function NewsFeed({ items }) {
  return (
    <div>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold">News feed</h3>
          <p className="text-slate-400">Glassmorphic cards with 3D hover and AI summaries</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <NewsCard key={item.id} item={item} i={i} />
        ))}
      </div>
    </div>
  );
}

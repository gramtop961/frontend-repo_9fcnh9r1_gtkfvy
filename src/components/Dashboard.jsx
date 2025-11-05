import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, Users, ArrowUpRight, Zap } from 'lucide-react';

function AnimatedNumber({ value, duration = 1.2 }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const from = display;
    const diff = value - from;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + diff * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <span>{display}</span>;
}

export default function Dashboard({ subscribers }) {
  const total = subscribers.length;

  const recent = useMemo(() => subscribers.slice(0, 6), [subscribers]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold">Dashboard</h3>
          <p className="text-slate-400">Live subscriber overview and premium upgrades</p>
        </div>
        {/* Premium CTA integrated here */}
        <button className="group relative overflow-hidden rounded-2xl bg-black/40 px-5 py-3 font-semibold ring-1 ring-white/10 backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.25),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.2),transparent_40%)]" />
          <div className="relative flex items-center gap-3">
            <span className="rounded-lg bg-emerald-500/20 p-2 text-emerald-300 ring-1 ring-emerald-500/40">
              <Zap className="h-5 w-5" />
            </span>
            <div className="text-left">
              <div className="text-sm text-slate-300">Premium</div>
              <div className="text-emerald-300">
                <span className="mr-1 align-middle text-lg font-extrabold">$</span>
                <motion.span
                  initial={{ y: 6, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="text-xl font-extrabold"
                >
                  9
                </motion.span>
                <span className="ml-1 text-sm text-slate-400">/mo</span>
              </div>
            </div>
            <span className="ml-auto inline-flex items-center gap-1 rounded-xl bg-emerald-500 px-3 py-2 text-sm font-bold text-black shadow shadow-emerald-500/30 transition group-hover:scale-[1.02]">
              Upgrade now
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="rounded-xl bg-emerald-500/20 p-2 text-emerald-300 ring-1 ring-emerald-500/40">
              <Users className="h-5 w-5" />
            </span>
            <div>
              <div className="text-sm text-slate-400">Total Subscribers</div>
              <div className="text-3xl font-extrabold"><AnimatedNumber value={total} /></div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <div className="text-sm text-slate-400">Active Rate</div>
          <div className="mt-1 text-3xl font-extrabold text-emerald-300">
            <AnimatedNumber value={Math.min(100, Math.max(0, Math.round(82 + Math.sin(total) * 6)))} />%
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <div className="text-sm text-slate-400">New this week</div>
          <div className="mt-1 text-3xl font-extrabold text-cyan-300">
            <AnimatedNumber value={Math.min(total, Math.floor(total * 0.6))} />
          </div>
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm text-slate-400">Recent subscribers</h4>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {recent.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 text-black font-bold">
                  {s.email.charAt(0).toUpperCase()}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-semibold">{s.email}</p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {s.topics.map((t) => (
                      <span
                        key={t}
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ring-1 ${
                          s.active ? 'bg-emerald-500/10 text-emerald-300 ring-emerald-400/30 animate-pulse' : 'bg-slate-700/40 text-slate-300 ring-white/10'
                        }`}
                      >
                        <BadgeCheck className="h-3 w-3" />{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {recent.length === 0 && (
            <div className="col-span-full rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-slate-400">
              No subscribers yet — be the first to sign up above!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

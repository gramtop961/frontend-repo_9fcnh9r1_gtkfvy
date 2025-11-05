import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, TrendingUp, Bitcoin, Activity, Package, Cpu, Building2, Check } from 'lucide-react';

const TOPICS = [
  { key: 'stocks', label: 'Stocks', icon: TrendingUp, color: 'from-emerald-400 to-green-500' },
  { key: 'crypto', label: 'Crypto', icon: Bitcoin, color: 'from-yellow-400 to-amber-500' },
  { key: 'forex', label: 'Forex', icon: Activity, color: 'from-cyan-400 to-sky-500' },
  { key: 'commodities', label: 'Commodities', icon: Package, color: 'from-orange-400 to-amber-600' },
  { key: 'tech', label: 'Tech', icon: Cpu, color: 'from-fuchsia-400 to-pink-500' },
  { key: 'realestate', label: 'Real Estate', icon: Building2, color: 'from-blue-400 to-indigo-500' },
];

export default function SignupForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const canSubmit = useMemo(() => email && selected.length > 0 && !loading, [email, selected, loading]);

  const toggleTopic = (key) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((t) => t !== key) : [...prev, key]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    onSubmit?.(email, selected);
    setLoading(false);
    setSuccess(true);
    setEmail('');
    setSelected([]);
    setTimeout(() => setSuccess(false), 2200);
  };

  return (
    <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
      <div className="pointer-events-none absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-cyan-500/10 to-blue-500/20 blur-2xl" />

      <div className="relative">
        <h2 className="text-2xl sm:text-3xl font-bold">Get the newsletter</h2>
        <p className="mt-1 text-slate-300/80">Select your favorite markets and we’ll send curated, AI-summarized updates.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="group relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Mail className="h-5 w-5" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@finance.com"
              className="w-full rounded-2xl bg-black/40 pl-11 pr-4 py-3 ring-1 ring-white/10 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/70 text-slate-100 shadow-inner"
            />
          </div>

          <div>
            <p className="mb-3 text-sm text-slate-400">Pick topics</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {TOPICS.map(({ key, label, icon: Icon, color }) => {
                const active = selected.includes(key);
                return (
                  <motion.button
                    key={key}
                    type="button"
                    onClick={() => toggleTopic(key)}
                    whileTap={{ scale: 0.96 }}
                    animate={{ y: 0, rotateX: active ? 12 : 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                    className={`relative overflow-hidden rounded-2xl p-3 text-left ring-1 ring-white/10 backdrop-blur bg-white/5 hover:bg-white/10 transition ${active ? 'shadow-lg' : ''}`}
                  >
                    <div className={`absolute -right-10 -top-10 h-32 w-32 bg-gradient-to-br ${color} opacity-20 blur-2xl`} />
                    <div className="relative flex items-center gap-3">
                      <div className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${color} text-black shadow-inner`}> 
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold">{label}</p>
                        <p className="text-xs text-slate-400">{active ? 'Selected' : 'Tap to select'}</p>
                      </div>
                      <motion.div
                        initial={false}
                        animate={{ scale: active ? 1 : 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        className="ml-auto rounded-full bg-emerald-500 p-1 text-black shadow"
                      >
                        <Check className="h-4 w-4" />
                      </motion.div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={!canSubmit}
              className={`relative inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                loading ? 'bg-slate-800' : 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/25 hover:scale-[1.01]'
              }`}
            >
              <AnimatePresence mode="popLayout">
                {loading ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="inline-flex items-center gap-2"
                  >
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />
                    Subscribing...
                  </motion.span>
                ) : (
                  <motion.span key="label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    Subscribe
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <p className="text-xs text-slate-400">Free weekly digest. No spam. Unsubscribe anytime.</p>
          </div>
        </form>

        {/* Success celebration */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="pointer-events-none absolute inset-0 grid place-items-center"
            >
              <div className="relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                  className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-500 text-black shadow-2xl"
                >
                  <Check className="h-10 w-10" />
                </motion.div>
                {/* simple confetti */}
                <div className="absolute inset-0">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <span
                      key={i}
                      className="absolute inline-block h-2 w-2 rotate-45"
                      style={{
                        left: `${(i * 37) % 100}%`,
                        top: `${(i * 53) % 100}%`,
                        background: ['#34d399','#60a5fa','#f472b6','#f59e0b','#22d3ee'][i % 5],
                        animation: `fly${i} 900ms ease-out both`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <style>{`${Array.from({length:24}).map((_,i)=>`@keyframes fly${i}{0%{transform:translate(0,0) scale(0.8)}100%{transform:translate(${(i%2?1:-1)*(8+i*2)}px, ${(i%3?1:-1)*(10+i*3)}px) scale(1)}}`).join('\n')}`}</style>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

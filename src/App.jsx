import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Hero from './components/Hero.jsx';
import SignupForm from './components/SignupForm.jsx';
import Dashboard from './components/Dashboard.jsx';
import NewsFeed from './components/NewsFeed.jsx';

export default function App() {
  const [subscribers, setSubscribers] = useState([]);

  const addSubscriber = (email, topics) => {
    const newSub = {
      id: Date.now(),
      email,
      topics,
      active: true,
      joinedAt: new Date().toISOString(),
    };
    setSubscribers(prev => [newSub, ...prev]);
  };

  const newsItems = useMemo(() => [
    {
      id: 1,
      title: 'Tech stocks rally as earnings beat expectations',
      summary: 'Mega-cap tech leads markets higher after stronger-than-expected earnings and guidance upgrades.',
      sentiment: 'positive',
      source: 'Bloomberg',
      date: 'Just now',
    },
    {
      id: 2,
      title: 'Crypto cools after sharp weekend surge',
      summary: 'Profit-taking hits across majors while on-chain activity remains elevated with healthy funding rates.',
      sentiment: 'neutral',
      source: 'CoinDesk',
      date: '10 min ago',
    },
    {
      id: 3,
      title: 'Oil slips as supply risks ease and demand concerns resurface',
      summary: 'Energy markets recalibrate as inventory builds and growth outlook moderates into Q4.',
      sentiment: 'negative',
      source: 'Reuters',
      date: '1 hr ago',
    },
  ], []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-black text-slate-100 overflow-x-hidden">
      <Hero />

      <main className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-24">
        <AnimatePresence>
          <motion.section
            id="signup"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <SignupForm onSubmit={addSubscriber} />
          </motion.section>

          <motion.section
            id="dashboard"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Dashboard subscribers={subscribers} />
          </motion.section>

          <motion.section
            id="news"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="pb-24"
          >
            <NewsFeed items={newsItems} />
          </motion.section>
        </AnimatePresence>
      </main>

      <footer className="border-t border-white/10 py-10 text-center text-sm text-slate-400">
        Built with love for markets — stay informed, stay ahead.
      </footer>
    </div>
  );
}

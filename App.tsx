import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import BadgeTable from './components/BadgeTable';
import Roadmap from './components/Roadmap';
import Dashboard from './components/Dashboard';
import AiGuide from './components/AiGuide';
import InfoGraphic from './components/InfoGraphic';
import { BADGES } from './constants';
import { UserProgress, GithubProfile } from './types';
import { fetchUserProfile, scanProfileForBadges } from './services/githubService';
import { Github, Heart, Sun, Moon } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'guide' | 'roadmap'>('all');
  
  // Theme Management
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
        // Check localStorage first, then system preference
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            return 'dark';
        }
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
        root.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        root.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Load progress from localStorage or default
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('badgeProgress');
    return saved ? JSON.parse(saved) : {};
  });

  // Github Profile State
  const [githubUser, setGithubUser] = useState<GithubProfile | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('badgeProgress', JSON.stringify(progress));
  }, [progress]);

  const toggleBadge = (id: string) => {
    setProgress(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleProfileScan = async (username: string) => {
    setIsScanning(true);
    setScanError(null);
    try {
      // 1. Fetch Profile
      const profile = await fetchUserProfile(username);
      setGithubUser(profile);

      // 2. Scan for auto-detectable badges
      const { badgesToUnlock } = await scanProfileForBadges(username);
      
      if (badgesToUnlock.length > 0) {
        setProgress(prev => {
           const newProgress = { ...prev };
           badgesToUnlock.forEach(id => {
             newProgress[id] = true;
           });
           return newProgress;
        });
      }

    } catch (error: any) {
      console.error(error);
      setScanError(error.message || "Failed to scan profile");
      setGithubUser(null);
    } finally {
      setIsScanning(false);
    }
  };

  const earnableBadges = BADGES.filter(b => !b.isHistorical);
  const historicalBadges = BADGES.filter(b => b.isHistorical);

  return (
    <div className="min-h-screen font-sans bg-github-dark text-github-text selection:bg-github-blue/30 transition-colors duration-300">
      <Hero />

      {/* Navigation */}
      <div className="sticky top-0 z-30 bg-github-dark/95 backdrop-blur border-b border-github-border shadow-sm transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="overflow-x-auto flex-1 no-scrollbar">
            <nav className="flex items-center gap-8 h-16 whitespace-nowrap">
              <button 
                onClick={() => setActiveTab('all')}
                className={`h-full border-b-2 px-1 font-medium text-sm transition-colors ${
                  activeTab === 'all' 
                  ? 'border-github-red text-github-text' 
                  : 'border-transparent text-github-muted hover:text-github-text'
                }`}
              >
                📊 All Badges
              </button>
              <button 
                onClick={() => setActiveTab('guide')}
                className={`h-full border-b-2 px-1 font-medium text-sm transition-colors ${
                  activeTab === 'guide' 
                  ? 'border-github-blue text-github-text' 
                  : 'border-transparent text-github-muted hover:text-github-text'
                }`}
              >
                🎯 Understanding
              </button>
              <button 
                onClick={() => setActiveTab('roadmap')}
                className={`h-full border-b-2 px-1 font-medium text-sm transition-colors ${
                  activeTab === 'roadmap' 
                  ? 'border-github-green text-github-text' 
                  : 'border-transparent text-github-muted hover:text-github-text'
                }`}
              >
                🗺️ Roadmap & Tracker
              </button>
            </nav>
          </div>

          <button 
            onClick={toggleTheme} 
            className="ml-4 p-2 rounded-full hover:bg-github-border/30 text-github-text transition-colors border border-transparent hover:border-github-border"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-12">
        
        {activeTab === 'all' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Dashboard 
                progress={progress} 
                onScan={handleProfileScan}
                isScanning={isScanning}
                scanError={scanError}
                githubUser={githubUser}
            />
            <BadgeTable title="🏅 Earnable Achievements" badges={earnableBadges} />
            <BadgeTable title="📜 Historical & Retired" badges={historicalBadges} showTiers={false} />
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12">
            <InfoGraphic />
            
            <div className="max-w-3xl mx-auto">
               <h3 className="text-2xl font-bold text-github-text mb-6">⚡ Earning: Quickdraw Badge</h3>
               <div className="bg-github-darker border border-github-border rounded-xl overflow-hidden transition-colors duration-300">
                  <div className="p-6 border-b border-github-border bg-github-inset">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h4 className="font-bold text-lg text-github-text">Goal: Close issue/PR within 5 minutes</h4>
                            <p className="text-github-muted text-sm">Difficulty: ⭐☆☆☆☆</p>
                        </div>
                        <div className="bg-github-blue/10 text-github-blue px-3 py-1 rounded-full text-xs font-bold">
                            Estimated: 10 mins
                        </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h5 className="font-bold text-github-text mb-4">🛠️ Step-by-Step:</h5>
                    <ol className="space-y-4 list-decimal list-inside text-github-text">
                        <li className="pl-2"><strong className="text-github-text">Find a simple issue</strong> in a friendly repository (or create one in your own test repo).</li>
                        <li className="pl-2"><strong className="text-github-text">Prepare your fix</strong> locally before even commenting or opening the PR.</li>
                        <li className="pl-2"><strong className="text-github-text">Submit & immediately close</strong>. The timer starts when the issue/PR is created.</li>
                        <li className="pl-2">🎉 <strong className="text-github-text">Badge unlocked!</strong> Check your profile in ~24 hours.</li>
                    </ol>
                    <div className="mt-6 p-4 bg-github-blue/10 border border-github-blue/20 rounded text-sm text-github-blue flex gap-2">
                        <span>💡</span>
                        <span><strong>Pro Tip:</strong> Use browser notifications to ensure you don't miss the 5-minute window if waiting for CI.</span>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'roadmap' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="mb-10 text-center">
                 <h2 className="text-3xl font-bold text-github-text mb-2">Your Interactive Roadmap</h2>
                 <p className="text-github-muted">Click items to mark them as complete. Data is saved locally.</p>
             </div>
             <Dashboard 
                progress={progress} 
                onScan={handleProfileScan}
                isScanning={isScanning}
                scanError={scanError}
                githubUser={githubUser}
             />
             <Roadmap progress={progress} toggleBadge={toggleBadge} />
          </div>
        )}

      </main>

      <footer className="border-t border-github-border bg-github-darker py-12 mt-12 transition-colors duration-300">
        <div className="max-w-4xl mx-auto text-center px-6">
           <div className="flex items-center justify-center gap-2 mb-6">
              <Github className="w-6 h-6 text-github-muted" />
              <span className="text-github-border mx-2">|</span>
              <span className="text-github-muted text-sm">Maintained with <Heart className="w-3 h-3 inline text-github-red" /> by the Community</span>
           </div>
           <p className="text-github-muted text-sm max-w-lg mx-auto">
             This is an unofficial guide. Badges and requirements are subject to change by GitHub at any time.
           </p>
        </div>
      </footer>

      <AiGuide />
    </div>
  );
};

export default App;
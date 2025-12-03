import React, { useState, useEffect, useMemo } from 'react';
import Hero from './components/Hero';
import BadgeTable from './components/BadgeTable';
import Roadmap from './components/Roadmap';
import Dashboard from './components/Dashboard';
import AiGuide from './components/AiGuide';
import InfoGraphic from './components/InfoGraphic';
import BadgeDetailModal from './components/BadgeDetailModal';
import { BADGES } from './constants';
import { UserProgress, GithubProfile, Badge } from './types';
import { fetchUserProfile, scanProfileForBadges } from './services/githubService';
import { Github, Heart, Sun, Moon, Search, Filter, ArrowUpDown } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'guide' | 'roadmap'>('all');
  
  // Theme Management
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
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

  // Progress State
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('badgeProgress');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('badgeProgress', JSON.stringify(progress));
  }, [progress]);

  const toggleBadge = (id: string) => {
    setProgress(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Modal State
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  // Github Profile State
  const [githubUser, setGithubUser] = useState<GithubProfile | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'rarity' | 'category'>('rarity');
  const [filterStatus, setFilterStatus] = useState<'all' | 'owned' | 'unowned'>('all');

  const handleProfileScan = async (username: string) => {
    setIsScanning(true);
    setScanError(null);
    try {
      const profile = await fetchUserProfile(username);
      setGithubUser(profile);
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

  // Filter and Sort Badges
  const processedBadges = useMemo(() => {
    let result = [...BADGES];

    // 1. Search (Fuzzy-like search across multiple fields)
    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        result = result.filter(b => 
            b.name.toLowerCase().includes(q) || 
            b.description.toLowerCase().includes(q) ||
            b.howToEarn.toLowerCase().includes(q) ||
            b.category.toLowerCase().includes(q) ||
            b.rarity.toLowerCase().includes(q)
        );
    }

    // 2. Filter Status
    if (filterStatus !== 'all') {
        result = result.filter(b => {
            const isOwned = !!progress[b.id];
            return filterStatus === 'owned' ? isOwned : !isOwned;
        });
    }

    // 3. Sort
    result.sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'category') return a.category.localeCompare(b.category);
        if (sortBy === 'rarity') {
            const rarityOrder = { 'Common': 1, 'Rare': 2, 'Epic': 3, 'Legendary': 4 };
            // Sort by rarity descending (Legendary first)
            return (rarityOrder[b.rarity] || 0) - (rarityOrder[a.rarity] || 0);
        }
        return 0;
    });

    return result;
  }, [BADGES, searchQuery, filterStatus, sortBy, progress]);

  const earnableBadges = processedBadges.filter(b => !b.isHistorical);
  const historicalBadges = processedBadges.filter(b => b.isHistorical);

  return (
    <div className="min-h-screen font-sans bg-github-dark text-github-text selection:bg-github-blue/30 transition-colors duration-300">
      <Hero />

      {/* Sticky Header with Nav and Search */}
      <div className="sticky top-0 z-30 bg-github-dark/95 backdrop-blur border-b border-github-border shadow-sm transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          
          {/* Tabs */}
          <div className="flex-1 overflow-x-auto no-scrollbar">
            <nav className="flex items-center gap-6 whitespace-nowrap h-full">
              <button 
                onClick={() => setActiveTab('all')}
                className={`h-16 flex items-center border-b-2 px-1 font-medium text-sm transition-colors ${
                  activeTab === 'all' 
                  ? 'border-github-red text-github-text' 
                  : 'border-transparent text-github-muted hover:text-github-text'
                }`}
              >
                📊 Gallery
              </button>
              <button 
                onClick={() => setActiveTab('guide')}
                className={`h-16 flex items-center border-b-2 px-1 font-medium text-sm transition-colors ${
                  activeTab === 'guide' 
                  ? 'border-github-blue text-github-text' 
                  : 'border-transparent text-github-muted hover:text-github-text'
                }`}
              >
                🎯 Guide
              </button>
              <button 
                onClick={() => setActiveTab('roadmap')}
                className={`h-16 flex items-center border-b-2 px-1 font-medium text-sm transition-colors ${
                  activeTab === 'roadmap' 
                  ? 'border-github-green text-github-text' 
                  : 'border-transparent text-github-muted hover:text-github-text'
                }`}
              >
                🗺️ Tracker
              </button>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex relative w-64">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-github-muted" />
             </div>
             <input 
                type="text"
                placeholder="Find a badge..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-github-inset border border-github-border rounded-md py-1.5 pl-9 pr-3 text-sm text-github-text focus:ring-1 focus:ring-github-blue focus:border-github-blue outline-none transition-all"
             />
          </div>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-github-border/30 text-github-text transition-colors border border-transparent hover:border-github-border"
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
            
            {/* Gallery Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-github-darker border border-github-border p-4 rounded-xl">
                 <div className="flex items-center gap-2 text-sm font-bold text-github-text">
                    <Filter className="w-4 h-4 text-github-muted" />
                    Filters
                 </div>
                 <div className="flex flex-wrap items-center gap-3">
                     {/* Search Mobile */}
                     <div className="md:hidden relative w-full sm:w-auto">
                        <input 
                            type="text"
                            placeholder="Find a badge..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-github-dark border border-github-border rounded-md py-1.5 px-3 text-sm text-github-text"
                        />
                     </div>

                     <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="bg-github-dark border border-github-border text-github-text text-sm rounded-md px-3 py-1.5 outline-none focus:border-github-blue cursor-pointer hover:border-github-muted transition-colors"
                     >
                         <option value="rarity">Sort by Rarity</option>
                         <option value="name">Sort by Name</option>
                         <option value="category">Sort by Category</option>
                     </select>

                     <div className="flex bg-github-dark border border-github-border rounded-md overflow-hidden">
                        <button 
                            onClick={() => setFilterStatus('all')}
                            className={`px-3 py-1.5 text-xs font-medium transition-colors ${filterStatus === 'all' ? 'bg-github-blue text-white' : 'text-github-muted hover:text-github-text hover:bg-github-inset'}`}
                        >
                            All
                        </button>
                        <div className="w-px bg-github-border"></div>
                        <button 
                            onClick={() => setFilterStatus('owned')}
                            className={`px-3 py-1.5 text-xs font-medium transition-colors ${filterStatus === 'owned' ? 'bg-github-green text-white' : 'text-github-muted hover:text-github-text hover:bg-github-inset'}`}
                        >
                            Owned
                        </button>
                        <div className="w-px bg-github-border"></div>
                        <button 
                            onClick={() => setFilterStatus('unowned')}
                            className={`px-3 py-1.5 text-xs font-medium transition-colors ${filterStatus === 'unowned' ? 'bg-github-muted/50 text-white' : 'text-github-muted hover:text-github-text hover:bg-github-inset'}`}
                        >
                            Missing
                        </button>
                     </div>
                 </div>
            </div>

            <BadgeTable 
                title="🏅 Earnable Achievements" 
                badges={earnableBadges} 
                progress={progress}
                onBadgeClick={setSelectedBadge}
            />
            {historicalBadges.length > 0 && (
                <BadgeTable 
                    title="📜 Historical & Retired" 
                    badges={historicalBadges} 
                    showTiers={false} 
                    progress={progress}
                    onBadgeClick={setSelectedBadge}
                />
            )}
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
                        <li className="pl-2"><strong className="text-github-text">Find a simple issue</strong> in a friendly repository.</li>
                        <li className="pl-2"><strong className="text-github-text">Prepare your fix</strong> locally before opening the PR.</li>
                        <li className="pl-2"><strong className="text-github-text">Submit & immediately close</strong>.</li>
                        <li className="pl-2">🎉 <strong className="text-github-text">Badge unlocked!</strong></li>
                    </ol>
                  </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'roadmap' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="mb-10 text-center">
                 <h2 className="text-3xl font-bold text-github-text mb-2">Your Interactive Roadmap</h2>
                 <p className="text-github-muted">Click items to mark them as complete.</p>
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

      {/* Footer */}
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

      {/* Detail Modal */}
      <BadgeDetailModal 
        badge={selectedBadge}
        isOpen={!!selectedBadge}
        onClose={() => setSelectedBadge(null)}
        isOwned={selectedBadge ? !!progress[selectedBadge.id] : false}
        onToggleStatus={toggleBadge}
      />
    </div>
  );
};

export default App;
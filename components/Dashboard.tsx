import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie } from 'recharts';
import { UserProgress, BadgeCategory, GithubProfile } from '../types';
import { BADGES } from '../constants';
import { Github, Search, Loader2, UserCheck, AlertCircle } from 'lucide-react';

interface DashboardProps {
  progress: UserProgress;
  onScan: (username: string) => Promise<void>;
  isScanning: boolean;
  scanError: string | null;
  githubUser: GithubProfile | null;
}

const Dashboard: React.FC<DashboardProps> = ({ progress, onScan, isScanning, scanError, githubUser }) => {
  const [usernameInput, setUsernameInput] = useState('');
  
  const earnedCount = Object.values(progress).filter(Boolean).length;
  const totalBadges = BADGES.length;
  const percentage = Math.round((earnedCount / totalBadges) * 100);

  // Data for Bar Chart (By Category)
  const categoryData = Object.values(BadgeCategory).map(cat => {
    const badgesInCat = BADGES.filter(b => b.category === cat);
    const earnedInCat = badgesInCat.filter(b => progress[b.id]).length;
    return {
      name: cat,
      earned: earnedInCat,
      total: badgesInCat.length,
      fullMark: badgesInCat.length
    };
  }).filter(d => d.total > 0);

  // Data for Pie Chart (Completion)
  const pieData = [
    { name: 'Earned', value: earnedCount },
    { name: 'Locked', value: totalBadges - earnedCount }
  ];

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput.trim()) {
      onScan(usernameInput.trim());
    }
  };

  return (
    <div className="space-y-8 mb-12">
      {/* GitHub Sync Section */}
      <div className="bg-gradient-to-r from-github-darker to-github-inset border border-github-border rounded-xl p-6 relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 right-0 p-4 opacity-5">
            <Github className="w-64 h-64 text-github-text" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="flex-1">
             <h2 className="text-2xl font-bold text-github-text mb-2 flex items-center gap-2">
                <Github className="w-6 h-6" />
                Sync Profile
             </h2>
             <p className="text-github-muted mb-6">
                Connect your real GitHub account to verify earned badges automatically.
                <br />
                <span className="text-xs text-github-blue opacity-80">*Currently auto-detects: Starstruck, Pull Shark</span>
             </p>
             
             <form onSubmit={handleScan} className="flex gap-2 max-w-md">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-github-muted">@</span>
                    </div>
                    <input 
                        type="text"
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}
                        placeholder="github-username"
                        className="w-full bg-github-dark border border-github-border rounded-lg pl-8 pr-4 py-2.5 text-github-text focus:ring-2 focus:ring-github-blue focus:border-transparent outline-none transition-all"
                    />
                </div>
                <button 
                    type="submit"
                    disabled={isScanning || !usernameInput}
                    className="bg-github-blue hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isScanning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                    Check
                </button>
             </form>
             {scanError && (
                 <div className="mt-3 text-github-red text-xs flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {scanError}
                 </div>
             )}
          </div>

          {githubUser && (
             <div className="w-full md:w-auto min-w-[280px]">
                <div className="bg-github-dark border border-github-border rounded-lg p-4 flex items-center gap-4 shadow-lg animate-in slide-in-from-right fade-in">
                    <img src={githubUser.avatar_url} alt={githubUser.login} className="w-16 h-16 rounded-full border-2 border-github-border" />
                    <div>
                        <h3 className="font-bold text-github-text">{githubUser.name || githubUser.login}</h3>
                        <a href={githubUser.html_url} target="_blank" rel="noreferrer" className="text-sm text-github-muted hover:text-github-blue hover:underline">
                            @{githubUser.login}
                        </a>
                        <div className="flex gap-3 mt-2 text-xs text-github-muted">
                            <div><strong className="text-github-text">{githubUser.public_repos}</strong> Repos</div>
                            <div><strong className="text-github-text">{githubUser.followers}</strong> Followers</div>
                        </div>
                        <div className="mt-2 inline-flex items-center gap-1 text-[10px] text-github-green bg-github-green/10 px-2 py-0.5 rounded-full">
                            <UserCheck className="w-3 h-3" />
                            Verified
                        </div>
                    </div>
                </div>
             </div>
          )}
        </div>
      </div>

      {/* Analytics Section */}
      <div className="bg-github-darker border border-github-border rounded-xl p-6 transition-colors duration-300">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
              <h2 className="text-2xl font-bold text-github-text mb-1">📊 Collection Tracker</h2>
              <p className="text-github-muted text-sm">Real-time analysis of your badge portfolio</p>
          </div>
          <div className="text-right mt-4 md:mt-0">
              <div className="text-4xl font-black text-github-blue">{percentage}%</div>
              <div className="text-xs text-github-muted uppercase tracking-wider">Completion</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-64">
          {/* Category Progress */}
          <div className="w-full h-full">
              <h4 className="text-xs font-bold text-github-muted uppercase mb-4 text-center">Category Mastery</h4>
              <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData} layout="vertical" margin={{ left: 40, right: 20 }}>
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" width={80} tick={{fill: 'rgb(var(--color-github-muted))', fontSize: 12}} />
                      <Tooltip 
                          contentStyle={{ backgroundColor: 'rgb(var(--color-github-darker))', borderColor: 'rgb(var(--color-github-border))', color: 'rgb(var(--color-github-text))' }} 
                          cursor={{fill: 'transparent'}}
                      />
                      <Bar dataKey="total" stackId="a" fill="rgb(var(--color-github-inset))" radius={[0, 4, 4, 0]} barSize={20} />
                      <Bar dataKey="earned" stackId="a" fill="rgb(var(--color-github-blue))" radius={[0, 0, 0, 0]} barSize={20}>
                          {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.earned === entry.total ? 'rgb(var(--color-github-green))' : 'rgb(var(--color-github-blue))'} />
                          ))}
                      </Bar>
                  </BarChart>
              </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="w-full h-full flex flex-col items-center justify-center relative">
              <h4 className="text-xs font-bold text-github-muted uppercase mb-2">Overall Progress</h4>
              <ResponsiveContainer width="100%" height="80%">
                  <PieChart>
                      <Pie
                          data={pieData}
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          stroke="none"
                      >
                          {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.name === 'Earned' ? 'rgb(var(--color-github-green))' : 'rgb(var(--color-github-border))'} />
                          ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: 'rgb(var(--color-github-darker))', borderColor: 'rgb(var(--color-github-border))', color: 'rgb(var(--color-github-text))' }} />
                  </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pt-6 pointer-events-none">
                  <span className="text-xl font-bold text-github-text">{earnedCount}</span>
                  <span className="text-github-muted">/{totalBadges}</span>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
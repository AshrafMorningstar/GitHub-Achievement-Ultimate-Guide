import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie } from 'recharts';
import { UserProgress, BadgeCategory } from '../types';
import { BADGES } from '../constants';

interface DashboardProps {
  progress: UserProgress;
}

const Dashboard: React.FC<DashboardProps> = ({ progress }) => {
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
    { name: 'Earned', value: earnedCount, color: '#238636' },
    { name: 'Locked', value: totalBadges - earnedCount, color: '#30363d' }
  ];

  return (
    <div className="bg-github-darker border border-github-border rounded-xl p-6 mb-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
             <h2 className="text-2xl font-bold text-white mb-1">📊 Your Collection Tracker</h2>
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
                    <YAxis dataKey="name" type="category" width={80} tick={{fill: '#8b949e', fontSize: 12}} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#161b22', borderColor: '#30363d', color: '#c9d1d9' }} 
                        cursor={{fill: 'transparent'}}
                    />
                    <Bar dataKey="total" stackId="a" fill="#161b22" radius={[0, 4, 4, 0]} barSize={20} />
                    <Bar dataKey="earned" stackId="a" fill="#58a6ff" radius={[0, 0, 0, 0]} barSize={20}>
                        {categoryData.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={entry.earned === entry.total ? '#238636' : '#58a6ff'} />
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
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#161b22', borderColor: '#30363d', color: '#c9d1d9' }} />
                </PieChart>
            </ResponsiveContainer>
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pt-6 pointer-events-none">
                <span className="text-xl font-bold text-white">{earnedCount}</span>
                <span className="text-github-muted">/{totalBadges}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
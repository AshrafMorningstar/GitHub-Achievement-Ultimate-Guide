import React from 'react';
import { Badge, BadgeTier } from '../types';

interface BadgeTableProps {
  title: string;
  badges: Badge[];
  showTiers?: boolean;
}

const BadgeTable: React.FC<BadgeTableProps> = ({ title, badges, showTiers = true }) => {
  return (
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-8 w-1.5 bg-gradient-to-b from-github-blue to-github-purple rounded-full"></div>
        <h3 className="text-2xl font-bold text-white tracking-tight">
          {title}
        </h3>
      </div>
      
      <div className="overflow-hidden rounded-xl border border-github-border bg-[#0d1117] shadow-xl">
        <table className="w-full text-left">
          <thead className="bg-[#161b22] border-b border-github-border">
            <tr>
              <th className="p-6 w-20 text-center text-xs font-bold text-github-muted uppercase tracking-widest">Icon</th>
              <th className="p-6 w-1/3 text-xs font-bold text-github-muted uppercase tracking-widest">Detail</th>
              <th className="p-6 text-xs font-bold text-github-muted uppercase tracking-widest">Requirement</th>
              {showTiers && <th className="p-6 w-1/3 text-xs font-bold text-github-muted uppercase tracking-widest">Mastery</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-github-border/40">
            {badges.map((badge) => (
              <tr key={badge.id} className={`group transition-all duration-300 hover:bg-[#161b22] ${badge.isHistorical ? 'opacity-60 grayscale hover:grayscale-0 hover:opacity-100' : ''}`}>
                <td className="p-6 text-center align-top">
                  <div className="w-12 h-12 flex items-center justify-center text-3xl bg-github-dark border border-github-border/50 rounded-lg group-hover:scale-110 group-hover:border-github-blue/50 group-hover:shadow-lg group-hover:shadow-github-blue/10 transition-all duration-300">
                    {badge.icon}
                  </div>
                </td>
                <td className="p-6 align-top">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-white text-lg group-hover:text-github-blue transition-colors">
                      {badge.name}
                    </span>
                    {badge.rarity && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium uppercase tracking-wider ${
                        badge.rarity === 'Common' ? 'border-github-border text-github-muted' :
                        badge.rarity === 'Rare' ? 'border-github-blue/30 text-github-blue bg-github-blue/5' :
                        badge.rarity === 'Epic' ? 'border-github-purple/30 text-github-purple bg-github-purple/5' :
                        'border-github-gold/30 text-github-gold bg-github-gold/5'
                      }`}>
                        {badge.rarity}
                      </span>
                    )}
                  </div>
                  <div className="text-github-muted text-sm leading-relaxed max-w-md">
                    {badge.description}
                  </div>
                </td>
                <td className="p-6 align-top">
                  <div className="bg-github-dark/50 border border-github-border/50 rounded-lg p-3 text-sm text-github-text group-hover:border-github-border transition-colors">
                     <span className="text-github-muted font-mono text-xs block mb-1 uppercase">Objective</span>
                     {badge.howToEarn}
                  </div>
                </td>
                {showTiers && (
                  <td className="p-6 align-top">
                    {badge.maxTier > 1 ? (
                      <div className="space-y-3 pt-1">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-github-muted font-medium">Progression</span>
                          <span className="text-github-blue font-mono">4 Tiers</span>
                        </div>
                        <div className="flex gap-2">
                          {[...Array(4)].map((_, i) => (
                             <div key={i} className="h-2 flex-1 rounded-sm bg-github-border relative overflow-hidden">
                                <div className={`absolute inset-0 ${
                                    i === 0 ? 'bg-github-blue opacity-100' : 
                                    i === 3 ? 'bg-github-gold opacity-30 group-hover:opacity-60' : 'bg-github-text opacity-10'
                                }`}></div>
                             </div>
                          ))}
                        </div>
                        <div className="flex justify-between items-end mt-2">
                            <span className="text-[10px] text-github-muted uppercase tracking-wider">Base</span>
                            <span className="text-[10px] text-github-gold uppercase tracking-wider font-bold">Gold</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 pt-2">
                         <div className="w-8 h-8 rounded-full bg-gradient-to-br from-github-gold to-yellow-600 flex items-center justify-center text-black font-bold shadow-lg shadow-github-gold/20">
                            1
                         </div>
                         <div>
                             <div className="text-xs font-bold text-github-gold uppercase tracking-wider">Exclusive</div>
                             <div className="text-[10px] text-github-muted">Single-tier achievement</div>
                         </div>
                      </div>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BadgeTable;
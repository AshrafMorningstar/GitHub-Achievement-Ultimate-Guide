import React from 'react';
import { Badge, UserProgress } from '../types';
import { CheckCircle2, Plus, ArrowRight } from 'lucide-react';

interface BadgeTableProps {
  title: string;
  badges: Badge[];
  progress: UserProgress;
  showTiers?: boolean;
  onBadgeClick: (badge: Badge) => void;
}

const BadgeTable: React.FC<BadgeTableProps> = ({ title, badges, progress, onBadgeClick }) => {
  return (
    <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-6 w-1 bg-gradient-to-b from-github-blue to-github-purple rounded-full"></div>
        <h3 className="text-xl font-bold text-github-text tracking-tight">
          {title} <span className="text-github-muted font-normal text-sm ml-2 bg-github-inset px-2 py-0.5 rounded-full border border-github-border">Count: {badges.length}</span>
        </h3>
      </div>
      
      {/* Container with shadow and border */}
      <div className="overflow-hidden rounded-xl border border-github-border bg-github-dark shadow-md relative">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-github-inset/80 backdrop-blur-sm border-b border-github-border text-xs font-semibold text-github-muted uppercase tracking-wider sticky top-0 z-10">
                <th className="px-6 py-4 w-20 text-center">Icon</th>
                <th className="px-6 py-4 w-1/3">Badge Identity</th>
                <th className="px-6 py-4 hidden md:table-cell">Requirement Strategy</th>
                <th className="px-6 py-4 w-32 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-github-border/40">
              {badges.length === 0 ? (
                  <tr>
                      <td colSpan={4} className="px-6 py-16 text-center text-github-muted flex flex-col items-center justify-center gap-2">
                          <span className="text-4xl opacity-20">🔍</span>
                          <p>No badges found matching your filters.</p>
                      </td>
                  </tr>
              ) : (
                  badges.map((badge) => {
                    const isOwned = progress[badge.id];
                    return (
                      <tr 
                          key={badge.id} 
                          onClick={() => onBadgeClick(badge)}
                          className={`group cursor-pointer transition-all duration-200 border-l-[3px] border-transparent hover:border-github-blue hover:bg-github-inset/60 ${badge.isHistorical ? 'opacity-60 grayscale-[0.8] hover:grayscale-0 hover:opacity-100' : ''}`}
                      >
                        <td className="px-6 py-5 align-middle text-center">
                          <div className="w-12 h-12 mx-auto flex items-center justify-center text-3xl bg-github-dark border border-github-border rounded-xl shadow-sm group-hover:scale-110 group-hover:shadow-md group-hover:border-github-blue/30 group-hover:rotate-3 transition-all duration-300 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 pointer-events-none"></div>
                            {badge.icon}
                          </div>
                        </td>
                        <td className="px-6 py-5 align-middle">
                          <div className="flex flex-col gap-1.5 transition-transform duration-200 group-hover:translate-x-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-github-text text-base group-hover:text-github-blue transition-colors">
                                {badge.name}
                              </span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full border uppercase font-bold tracking-wide shadow-sm ${
                                  badge.rarity === 'Common' ? 'bg-github-inset border-github-border text-github-muted' :
                                  badge.rarity === 'Rare' ? 'bg-github-blue/10 border-github-blue/20 text-github-blue' :
                                  badge.rarity === 'Epic' ? 'bg-github-purple/10 border-github-purple/20 text-github-purple' :
                                  'bg-github-gold/10 border-github-gold/20 text-github-gold'
                              }`}>
                                  {badge.rarity}
                              </span>
                            </div>
                            <p className="text-sm text-github-muted line-clamp-2 leading-relaxed">
                              {badge.description}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-5 hidden md:table-cell align-middle">
                          <div className="relative group/tooltip w-fit">
                              <div className="flex items-center gap-1.5 text-xs font-medium text-github-text/80 bg-github-inset/50 hover:bg-github-inset px-3 py-1.5 rounded-lg border border-github-border/50 transition-colors">
                                  <span>View Strategy</span>
                                  <ArrowRight className="w-3 h-3 opacity-50" />
                              </div>
                              {/* Tooltip */}
                              <div className="absolute bottom-full left-0 mb-3 w-72 p-4 bg-github-darker/95 backdrop-blur-md border border-github-border rounded-xl shadow-2xl opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-all duration-200 z-50 text-sm text-github-text transform translate-y-2 group-hover/tooltip:translate-y-0">
                                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-github-border/50">
                                      <span className="text-xs font-bold text-github-muted uppercase tracking-wider">How to Earn</span>
                                  </div>
                                  <p className="leading-relaxed text-github-text/90">{badge.howToEarn}</p>
                                  <div className="absolute -bottom-1.5 left-6 w-3 h-3 bg-github-darker border-r border-b border-github-border transform rotate-45"></div>
                              </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 align-middle text-center">
                           <div className="flex justify-center">
                             {isOwned ? (
                                 <div className="group/status relative">
                                     <div className="w-10 h-10 rounded-full bg-github-green/10 flex items-center justify-center text-github-green border border-github-green/20 shadow-sm transition-transform duration-300 group-hover:scale-110">
                                         <CheckCircle2 className="w-5 h-5" />
                                     </div>
                                     <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[10px] font-bold text-github-green opacity-0 group-hover/status:opacity-100 transition-opacity whitespace-nowrap">Owned</span>
                                 </div>
                             ) : (
                                 <button 
                                    className="group/btn w-10 h-10 rounded-full border border-github-border bg-github-dark text-github-muted hover:border-github-blue hover:text-github-blue hover:bg-github-blue/5 transition-all flex items-center justify-center shadow-sm"
                                    title="View Details & Unlock"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onBadgeClick(badge);
                                    }}
                                 >
                                     <Plus className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                                 </button>
                             )}
                           </div>
                        </td>
                      </tr>
                    );
                  })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BadgeTable;
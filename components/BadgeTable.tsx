import React from 'react';
import { Badge, BadgeTier } from '../types';

interface BadgeTableProps {
  title: string;
  badges: Badge[];
  showTiers?: boolean;
}

const BadgeTable: React.FC<BadgeTableProps> = ({ title, badges, showTiers = true }) => {
  return (
    <div className="mb-12">
      <h3 className="text-xl font-bold mb-4 text-white pl-2 border-l-4 border-github-blue">
        {title}
      </h3>
      <div className="overflow-x-auto rounded-lg border border-github-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-github-darker border-b border-github-border text-github-muted uppercase text-xs font-semibold tracking-wider">
            <tr>
              <th className="p-4 w-16 text-center">Icon</th>
              <th className="p-4 w-1/3">Name & Description</th>
              <th className="p-4">How to Earn</th>
              {showTiers && <th className="p-4 w-1/3">Progression Tiers</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-github-border bg-github-dark">
            {badges.map((badge) => (
              <tr key={badge.id} className={`group hover:bg-github-darker/50 transition-colors ${badge.isHistorical ? 'opacity-60 grayscale' : ''}`}>
                <td className="p-4 text-center text-2xl group-hover:scale-110 transition-transform">
                  {badge.icon}
                </td>
                <td className="p-4 align-top">
                  <div className="font-bold text-white text-base mb-1">{badge.name}</div>
                  <div className="text-github-muted text-xs leading-relaxed">{badge.description}</div>
                  {badge.rarity && (
                    <span className={`inline-block mt-2 text-[10px] px-2 py-0.5 rounded border ${
                      badge.rarity === 'Common' ? 'border-github-border text-github-muted' :
                      badge.rarity === 'Rare' ? 'border-github-blue/30 text-github-blue' :
                      badge.rarity === 'Epic' ? 'border-github-purple/30 text-github-purple' :
                      'border-github-gold/30 text-github-gold'
                    }`}>
                      {badge.rarity}
                    </span>
                  )}
                </td>
                <td className="p-4 align-top text-github-text">
                  {badge.howToEarn}
                </td>
                {showTiers && (
                  <td className="p-4 align-top">
                    {badge.maxTier > 1 ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="w-12 text-github-muted">Base</span>
                          <div className="flex gap-0.5">
                            <div className="w-3 h-3 bg-github-blue rounded-sm"></div>
                            <div className="w-3 h-3 bg-github-border rounded-sm"></div>
                            <div className="w-3 h-3 bg-github-border rounded-sm"></div>
                            <div className="w-3 h-3 bg-github-border rounded-sm"></div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="w-12 text-github-gold font-bold">Gold</span>
                          <div className="flex gap-0.5">
                             <div className="w-3 h-3 bg-github-gold rounded-sm"></div>
                             <div className="w-3 h-3 bg-github-gold rounded-sm"></div>
                             <div className="w-3 h-3 bg-github-gold rounded-sm"></div>
                             <div className="w-3 h-3 bg-github-gold rounded-sm"></div>
                          </div>
                        </div>
                        <p className="text-[10px] text-github-muted mt-1 italic">
                            *Requires x256 more activity
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                         <span className="text-github-gold">🏆</span>
                         <span className="text-xs text-github-muted">One-time Achievement</span>
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
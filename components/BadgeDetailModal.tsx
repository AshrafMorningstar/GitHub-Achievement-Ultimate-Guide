import React from 'react';
import { Badge } from '../types';
import { X, Trophy, CheckCircle2, ShieldAlert, Zap } from 'lucide-react';

interface BadgeDetailModalProps {
  badge: Badge | null;
  isOpen: boolean;
  onClose: () => void;
  isOwned: boolean;
  onToggleStatus: (id: string) => void;
}

const BadgeDetailModal: React.FC<BadgeDetailModalProps> = ({ badge, isOpen, onClose, isOwned, onToggleStatus }) => {
  if (!isOpen || !badge) return null;

  // Prevent background scrolling
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const rarityStyles = {
    'Common': { text: 'text-github-muted', bg: 'bg-github-inset', border: 'border-github-border' },
    'Rare': { text: 'text-github-blue', bg: 'bg-github-blue/10', border: 'border-github-blue/20' },
    'Epic': { text: 'text-github-purple', bg: 'bg-github-purple/10', border: 'border-github-purple/20' },
    'Legendary': { text: 'text-github-red', bg: 'bg-github-red/10', border: 'border-github-red/20' },
  }[badge.rarity] || { text: 'text-github-muted', bg: 'bg-github-inset', border: 'border-github-border' };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl bg-github-darker border border-github-border rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 fade-in duration-300 overflow-hidden">
        
        {/* Hero Header */}
        <div className="relative h-40 bg-gradient-to-br from-github-inset to-github-darker border-b border-github-border p-6 flex items-end overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute right-0 top-0 w-64 h-64 bg-github-text rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            </div>
            
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-github-muted hover:text-github-text hover:bg-github-border/50 rounded-full transition-all z-10"
            >
                <X className="w-6 h-6" />
            </button>
            
            <div className="absolute -bottom-12 left-8 z-10">
                <div className="w-28 h-28 bg-github-dark border-[6px] border-github-darker rounded-2xl flex items-center justify-center text-6xl shadow-xl transform transition-transform hover:scale-105 duration-300">
                    {badge.icon}
                </div>
            </div>
        </div>

        {/* Content Body */}
        <div className="pt-16 px-8 pb-8 flex-1 overflow-y-auto custom-scrollbar">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                <div>
                    <h2 className="text-3xl font-bold text-github-text flex items-center gap-3">
                        {badge.name}
                        {isOwned && (
                            <div className="bg-github-green/10 p-1 rounded-full animate-in fade-in zoom-in">
                                <CheckCircle2 className="w-6 h-6 text-github-green" />
                            </div>
                        )}
                    </h2>
                    <div className="flex gap-2 mt-3 flex-wrap">
                         <span className={`text-xs font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${rarityStyles.text} ${rarityStyles.bg} ${rarityStyles.border}`}>
                            {badge.rarity}
                         </span>
                         <span className="text-xs font-bold px-3 py-1 rounded-full border border-github-border bg-github-inset text-github-muted uppercase tracking-wider">
                            {badge.category}
                         </span>
                    </div>
                </div>
                
                <button
                    onClick={() => onToggleStatus(badge.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm ${
                        isOwned 
                        ? 'bg-github-dark border border-github-border text-github-muted hover:text-github-red hover:border-github-red hover:bg-github-red/5' 
                        : 'bg-github-green text-white hover:bg-green-600 hover:shadow-lg hover:shadow-green-900/20 active:scale-95'
                    }`}
                >
                    {isOwned ? (
                        <>
                            <X className="w-4 h-4" /> Locked
                        </>
                    ) : (
                        <>
                            <Trophy className="w-4 h-4" /> Unlock Badge
                        </>
                    )}
                </button>
            </div>

            <p className="text-lg text-github-text/90 mb-10 leading-relaxed font-light">
                {badge.description}
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-github-inset/50 to-transparent rounded-2xl p-6 border border-github-border shadow-sm hover:border-github-gold/30 transition-colors">
                    <h3 className="text-xs font-bold text-github-gold uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Earning Strategy
                    </h3>
                    <p className="text-sm text-github-text leading-relaxed">
                        {badge.howToEarn}
                    </p>
                </div>

                <div className="bg-gradient-to-br from-github-inset/50 to-transparent rounded-2xl p-6 border border-github-border shadow-sm hover:border-github-blue/30 transition-colors">
                    <h3 className="text-xs font-bold text-github-blue uppercase tracking-widest mb-4 flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4" />
                        Requirements
                    </h3>
                    {badge.maxTier > 1 ? (
                        <ul className="space-y-3">
                            <li className="flex justify-between items-center text-sm border-b border-github-border/30 pb-2 last:border-0 last:pb-0">
                                <span className="text-github-muted">Bronze Tier</span>
                                <span className="font-mono text-github-text bg-github-dark px-2 py-0.5 rounded border border-github-border/50">Level 1</span>
                            </li>
                            <li className="flex justify-between items-center text-sm border-b border-github-border/30 pb-2 last:border-0 last:pb-0">
                                <span className="text-github-muted">Silver Tier</span>
                                <span className="font-mono text-github-text bg-github-dark px-2 py-0.5 rounded border border-github-border/50">Level 2</span>
                            </li>
                            <li className="flex justify-between items-center text-sm border-b border-github-border/30 pb-2 last:border-0 last:pb-0">
                                <span className="text-github-muted">Gold Tier</span>
                                <span className="font-mono text-github-text bg-github-dark px-2 py-0.5 rounded border border-github-border/50">Level 3</span>
                            </li>
                        </ul>
                    ) : (
                        <p className="text-sm text-github-muted">
                            This is a single-tier achievement. Once earned, it remains permanently on your profile.
                        </p>
                    )}
                </div>
            </div>

            {/* Visual Tiers */}
            {badge.maxTier > 1 && (
                <div className="bg-github-dark rounded-xl p-6 border border-github-border">
                     <h3 className="text-xs font-bold text-github-muted uppercase tracking-widest mb-6">Tier Progression</h3>
                     <div className="relative px-2">
                        <div className="h-2 bg-github-border/30 rounded-full overflow-hidden flex">
                            <div className={`flex-1 border-r border-github-darker/20 transition-all duration-500 ${isOwned ? 'bg-gradient-to-r from-github-blue to-blue-400' : 'bg-transparent'}`}></div>
                            <div className="flex-1 border-r border-github-darker/20 bg-transparent"></div>
                            <div className="flex-1 border-r border-github-darker/20 bg-transparent"></div>
                        </div>
                        <div className="flex justify-between text-[10px] uppercase font-bold text-github-muted mt-3 tracking-wider">
                            <span>Base</span>
                            <span>Bronze</span>
                            <span>Silver</span>
                            <span>Gold</span>
                        </div>
                        {/* Markers */}
                        <div className="absolute -top-1.5 left-0 w-full flex justify-between px-2">
                             {[0, 1, 2, 3].map(i => (
                                 <div key={i} className={`w-5 h-5 rounded-full border-4 border-github-dark shadow-sm transition-all duration-500 ${
                                     (i === 0 && isOwned) ? 'bg-github-blue scale-110' : 'bg-github-border/50'
                                 }`}></div>
                             ))}
                        </div>
                     </div>
                </div>
            )}
        </div>
        
        {/* Footer */}
        <div className="p-4 bg-github-inset/30 border-t border-github-border flex justify-between items-center text-[10px] text-github-muted uppercase tracking-wider backdrop-blur-md">
            <span>ID: {badge.id}</span>
            {badge.isHistorical && <span className="text-github-red font-bold flex items-center gap-1">🚫 Retired Badge</span>}
        </div>

      </div>
    </div>
  );
};

export default BadgeDetailModal;
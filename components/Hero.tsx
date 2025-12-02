import React from 'react';
import { BADGES } from '../constants';

const Hero: React.FC = () => {
  const showcaseBadges = BADGES.filter(b => !b.isHistorical).slice(0, 6);

  return (
    <div className="relative overflow-hidden border-b border-github-border bg-gradient-to-b from-github-darker to-github-dark pt-16 pb-12">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-github-green via-github-blue to-github-purple opacity-50"></div>
      
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-github-border/30 border border-github-border text-xs text-github-muted mb-6">
          <span className="w-2 h-2 rounded-full bg-github-green animate-pulse"></span>
          Last Updated: October 2025
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-white">
          GitHub Profile <span className="bg-clip-text text-transparent bg-gradient-to-r from-github-blue to-github-purple">Badges</span>
        </h1>
        <h2 className="text-2xl md:text-3xl text-github-muted font-light italic mb-10">
          The Ultimate Visual Guide & Encyclopedia
        </h2>

        {/* Badge Ribbon */}
        <div className="flex justify-center items-center gap-4 flex-wrap mb-10">
          {showcaseBadges.map((badge) => (
            <div key={badge.id} className="group relative">
               <div className="w-16 h-16 md:w-20 md:h-20 bg-github-border/20 rounded-full flex items-center justify-center text-4xl border border-github-border hover:border-github-blue hover:scale-110 transition-all cursor-help shadow-lg">
                 {badge.icon}
               </div>
               {/* Tooltip */}
               <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-max bg-github-darker border border-github-border px-3 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                 {badge.name}
               </div>
            </div>
          ))}
        </div>

        <p className="text-github-muted max-w-2xl mx-auto text-lg leading-relaxed">
          Master the art of profile decoration. From the elusive 
          <span className="text-github-gold mx-1 font-semibold">Gold Starstruck</span> 
          to the lightning-fast 
          <span className="text-github-blue mx-1 font-semibold">Quickdraw</span>.
        </p>
      </div>
    </div>
  );
};

export default Hero;
import React from 'react';
import { BADGES } from '../constants';

const Hero: React.FC = () => {
  const showcaseBadges = BADGES.filter(b => !b.isHistorical).slice(0, 6);

  return (
    <div className="relative overflow-hidden border-b border-github-border bg-gradient-to-b from-github-darker to-github-dark pt-20 pb-16 transition-colors duration-300">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-github-green via-github-blue to-github-purple opacity-50"></div>
      
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-github-border/30 border border-github-border text-xs text-github-muted mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-github-green animate-pulse"></span>
          Last Updated: October 2025
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-github-text leading-tight">
          GitHub Achievement <br className="hidden md:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-github-blue to-github-purple">Ultimate Guide</span>
        </h1>
        <h2 className="text-xl md:text-2xl text-github-muted font-light italic mb-12 flex justify-center items-center gap-2">
          <span className="h-px w-8 bg-github-border"></span>
          The Master Architect Edition
          <span className="h-px w-8 bg-github-border"></span>
        </h2>

        {/* Badge Ribbon */}
        <div className="flex justify-center items-center gap-6 flex-wrap mb-12">
          {showcaseBadges.map((badge) => (
            <div key={badge.id} className="group relative">
               <div className="w-16 h-16 md:w-20 md:h-20 bg-github-darker rounded-2xl flex items-center justify-center text-4xl border border-github-border group-hover:border-github-blue group-hover:-translate-y-2 transition-all duration-300 cursor-help shadow-xl group-hover:shadow-github-blue/20">
                 {badge.icon}
               </div>
               {/* Tooltip */}
               <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-max bg-github-darker border border-github-border px-3 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg text-github-text font-medium">
                 {badge.name}
               </div>
            </div>
          ))}
        </div>

        <p className="text-github-muted max-w-2xl mx-auto text-lg leading-relaxed">
          Craft your digital legacy. From the elusive 
          <span className="text-github-gold mx-1 font-semibold border-b border-github-gold/30 pb-0.5">Gold Starstruck</span> 
          to the lightning-fast 
          <span className="text-github-blue mx-1 font-semibold border-b border-github-blue/30 pb-0.5">Quickdraw</span>.
        </p>
      </div>
    </div>
  );
};

export default Hero;
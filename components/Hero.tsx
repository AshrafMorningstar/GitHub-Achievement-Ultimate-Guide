/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

import React from 'react';
import { BADGES } from '../constants';
import { Sparkles, ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const showcaseBadges = BADGES.filter(b => !b.isHistorical).slice(0, 6);

  return (
    <div className="relative overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32">
      
      {/* Ambient Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-github-purple/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-github-blue/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] bg-github-green/10 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-github-dark"></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-github-inset/50 border border-github-border/50 text-xs font-medium text-github-text mb-8 backdrop-blur-md shadow-sm hover:border-github-blue/50 transition-colors cursor-default animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Sparkles className="w-3 h-3 text-github-gold animate-pulse" />
          <span className="text-github-muted">Updated for</span>
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-github-blue to-github-purple">2025 Master Edition</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-github-text leading-tight animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
          The GitHub <br className="hidden md:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-github-blue via-github-purple to-github-blue bg-[length:200%_auto] animate-[gradient_8s_ease-in-out_infinite]">
            Achievement Hunter
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-github-muted font-light max-w-2xl mx-auto mb-16 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          Your ultimate visual guide to crafting a legendary profile. Track progress, uncover hidden strategies, and master the art of the badge.
        </p>

        {/* Floating Badge Ribbon */}
        <div className="flex justify-center items-center gap-4 md:gap-8 flex-wrap mb-16 perspective-1000 animate-in fade-in zoom-in duration-1000 delay-300">
          {showcaseBadges.map((badge, idx) => (
            <div 
                key={badge.id} 
                className="group relative"
                style={{ animationDelay: `${idx * 150}ms` }}
            >
               <div className="w-16 h-16 md:w-24 md:h-24 glass-panel rounded-2xl flex items-center justify-center text-4xl md:text-5xl shadow-xl group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-github-blue/20 transition-all duration-500 ease-out cursor-pointer relative overflow-hidden animate-float">
                 <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <div className="relative z-10 transform group-hover:rotate-[10deg] transition-transform duration-500">
                    {badge.icon}
                 </div>
               </div>
               {/* Premium Tooltip */}
               <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-max bg-github-darker/90 backdrop-blur-md border border-github-border/50 px-4 py-2 rounded-lg text-xs font-bold text-github-text opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-xl pointer-events-none z-20">
                 {badge.name}
                 <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-github-darker/90 border-t border-l border-github-border/50 transform rotate-45"></div>
               </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center animate-bounce duration-[2000ms] text-github-muted/50">
            <ArrowDown className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
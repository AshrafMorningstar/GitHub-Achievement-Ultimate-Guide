import React from 'react';
import { Trophy, Star } from 'lucide-react';

const InfoGraphic: React.FC = () => {
  return (
    <div className="py-12 border-b border-github-border">
       <div className="text-center mb-10">
           <h2 className="text-3xl font-bold text-white mb-4">Understanding the System</h2>
           <p className="text-github-muted">Two distinct families of decorations for your profile.</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Achievements Card */}
          <div className="bg-github-darker border border-github-border rounded-xl p-8 relative overflow-hidden group hover:border-github-blue transition-colors">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Trophy className="w-32 h-32 text-github-blue" />
             </div>
             <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-github-blue/20 rounded-lg text-github-blue">
                    <Trophy className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Achievements</h3>
             </div>
             <ul className="space-y-3 text-github-text">
                <li className="flex items-start gap-2">
                    <span className="text-github-blue mt-1">●</span>
                    <span>Automatically earned through specific actions</span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="text-github-blue mt-1">●</span>
                    <span>Multi-tier progression (Bronze → Gold)</span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="text-github-blue mt-1">●</span>
                    <span>Can be hidden in settings</span>
                </li>
             </ul>
          </div>

          {/* Highlights Card */}
          <div className="bg-github-darker border border-github-border rounded-xl p-8 relative overflow-hidden group hover:border-github-purple transition-colors">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Star className="w-32 h-32 text-github-purple" />
             </div>
             <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-github-purple/20 rounded-lg text-github-purple">
                    <Star className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Highlights</h3>
             </div>
             <ul className="space-y-3 text-github-text">
                <li className="flex items-start gap-2">
                    <span className="text-github-purple mt-1">●</span>
                    <span>Indicates program status (Pro, Sponsor)</span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="text-github-purple mt-1">●</span>
                    <span>Often requires payment or verification</span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="text-github-purple mt-1">●</span>
                    <span>Permanent badge of honor</span>
                </li>
             </ul>
          </div>
       </div>
    </div>
  );
};

export default InfoGraphic;
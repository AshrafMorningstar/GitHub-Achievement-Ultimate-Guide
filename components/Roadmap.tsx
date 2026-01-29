import React from 'react';
import { UserProgress } from '../types';
import { BADGES } from '../constants';
import { CheckCircle2, Circle } from 'lucide-react';

interface RoadmapProps {
  progress: UserProgress;
  toggleBadge: (id: string) => void;
}

const Roadmap: React.FC<RoadmapProps> = ({ progress, toggleBadge }) => {
  const beginnerIds = ['starstruck', 'quickdraw', 'pair-extraordinaire'];
  const advancedIds = ['pull-shark', 'galaxy-brain', 'yolo', 'public-sponsor'];

  const renderItem = (badgeId: string) => {
    const badge = BADGES.find(b => b.id === badgeId);
    if (!badge) return null;
    const isUnlocked = progress[badgeId];

    return (
      <div 
        key={badgeId}
        onClick={() => toggleBadge(badgeId)}
        className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
          isUnlocked 
            ? 'bg-github-green/10 border-github-green/30' 
            : 'bg-github-dark border-github-border hover:border-github-muted'
        }`}
      >
        <div className={`text-2xl ${isUnlocked ? 'opacity-100' : 'opacity-50 grayscale'}`}>
          {badge.icon}
        </div>
        <div className="flex-1">
          <h4 className={`font-bold transition-colors ${isUnlocked ? 'text-github-text' : 'text-github-muted'}`}>
            {badge.name}
          </h4>
          <p className="text-sm text-github-muted">{badge.description}</p>
        </div>
        <div>
            {isUnlocked ? (
                <CheckCircle2 className="w-6 h-6 text-github-green" />
            ) : (
                <Circle className="w-6 h-6 text-github-border" />
            )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold text-github-blue mb-4 flex items-center gap-2">
            🌱 Beginner Quest (First Week)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {beginnerIds.map(renderItem)}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-github-purple mb-4 flex items-center gap-2">
            ⚔️ Community Builder (First Month)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {advancedIds.map(renderItem)}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
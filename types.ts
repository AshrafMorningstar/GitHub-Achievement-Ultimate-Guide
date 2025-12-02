export enum BadgeCategory {
  COMMUNITY = 'Community',
  SPEED = 'Speed',
  SECURITY = 'Security',
  PREMIUM = 'Premium',
  CODE = 'Code'
}

export enum BadgeTier {
  BASE = 'Base',
  BRONZE = 'Bronze',
  SILVER = 'Silver',
  GOLD = 'Gold',
  ONE_TIME = 'One-time'
}

export interface Badge {
  id: string;
  icon: string;
  name: string;
  description: string;
  howToEarn: string;
  category: BadgeCategory;
  tiers: BadgeTier[];
  maxTier: number; // 1 for one-time, 4 for gold etc.
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  isHistorical?: boolean;
}

export interface UserProgress {
  [badgeId: string]: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export interface GithubProfile {
  login: string;
  avatar_url: string;
  name: string;
  public_repos: number;
  followers: number;
  html_url: string;
  bio?: string;
  created_at: string;
}

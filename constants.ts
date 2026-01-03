/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

import { Badge, BadgeCategory, BadgeTier } from './types';

export const BADGES: Badge[] = [
  {
    id: 'starstruck',
    icon: '⭐',
    name: 'Starstruck',
    description: 'Created a repository that is gaining traction.',
    howToEarn: 'Receive stars on a repository you own.',
    category: BadgeCategory.COMMUNITY,
    tiers: [BadgeTier.BASE, BadgeTier.BRONZE, BadgeTier.SILVER, BadgeTier.GOLD],
    maxTier: 4,
    rarity: 'Common'
  },
  {
    id: 'quickdraw',
    icon: '⚡',
    name: 'Quickdraw',
    description: 'Closed an issue or PR within 5 minutes of opening.',
    howToEarn: 'Close an issue/PR within 5 mins.',
    category: BadgeCategory.SPEED,
    tiers: [BadgeTier.ONE_TIME],
    maxTier: 1,
    rarity: 'Rare'
  },
  {
    id: 'pair-extraordinaire',
    icon: '👯',
    name: 'Pair Extraordinaire',
    description: 'Co-authored commits in a merged pull request.',
    howToEarn: 'Use the "Co-authored-by" trailer in commits.',
    category: BadgeCategory.COMMUNITY,
    tiers: [BadgeTier.BASE, BadgeTier.BRONZE, BadgeTier.SILVER, BadgeTier.GOLD],
    maxTier: 4,
    rarity: 'Common'
  },
  {
    id: 'pull-shark',
    icon: '🦈',
    name: 'Pull Shark',
    description: 'Opened pull requests that have been merged.',
    howToEarn: 'Have your pull requests merged.',
    category: BadgeCategory.CODE,
    tiers: [BadgeTier.BASE, BadgeTier.BRONZE, BadgeTier.SILVER, BadgeTier.GOLD],
    maxTier: 4,
    rarity: 'Common'
  },
  {
    id: 'galaxy-brain',
    icon: '🧠',
    name: 'Galaxy Brain',
    description: 'Answered a discussion.',
    howToEarn: 'Have your answer marked as correct in a Discussion.',
    category: BadgeCategory.COMMUNITY,
    tiers: [BadgeTier.BASE, BadgeTier.BRONZE, BadgeTier.SILVER, BadgeTier.GOLD],
    maxTier: 4,
    rarity: 'Rare'
  },
  {
    id: 'yolo',
    icon: '🚀',
    name: 'YOLO',
    description: 'Merged a PR without code review.',
    howToEarn: 'Merge a pull request without a review.',
    category: BadgeCategory.SPEED,
    tiers: [BadgeTier.ONE_TIME],
    maxTier: 1,
    rarity: 'Epic'
  },
  {
    id: 'public-sponsor',
    icon: '💖',
    name: 'Public Sponsor',
    description: 'Sponsoring an open source contributor.',
    howToEarn: 'Sponsor a user or organization via GitHub Sponsors.',
    category: BadgeCategory.COMMUNITY,
    tiers: [BadgeTier.ONE_TIME],
    maxTier: 1,
    rarity: 'Common'
  },
  {
    id: 'mars-2020',
    icon: '🚁',
    name: 'Mars 2020 Contributor',
    description: 'Contributed to a repo used in the Mars 2020 mission.',
    howToEarn: 'Historical: Contributed to specific repos before the deadline.',
    category: BadgeCategory.PREMIUM,
    tiers: [BadgeTier.ONE_TIME],
    maxTier: 1,
    rarity: 'Legendary',
    isHistorical: true
  },
  {
    id: 'arctic-code-vault',
    icon: '❄️',
    name: 'Arctic Code Vault',
    description: 'Code stored in the Arctic World Archive.',
    howToEarn: 'Historical: Had code in a public repo during the 2020 snapshot.',
    category: BadgeCategory.PREMIUM,
    tiers: [BadgeTier.ONE_TIME],
    maxTier: 1,
    rarity: 'Legendary',
    isHistorical: true
  }
];

export const TIER_REQUIREMENTS = {
  starstruck: { base: 16, bronze: 128, silver: 512, gold: 4096 },
  pullShark: { base: 2, bronze: 16, silver: 128, gold: 1024 },
  galaxyBrain: { base: 2, bronze: 8, silver: 16, gold: 32 },
  pairExtraordinaire: { base: 1, bronze: 10, silver: 24, gold: 48 }
};

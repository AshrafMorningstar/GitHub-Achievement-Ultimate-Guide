/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

import React, { useState, useEffect, useMemo } from 'react';
import Hero from './components/Hero';
import BadgeTable from './components/BadgeTable';
import Roadmap from './components/Roadmap';
import Dashboard from './components/Dashboard';
import AiGuide from './components/AiGuide';
import InfoGraphic from './components/InfoGraphic';
import BadgeDetailModal from './components/BadgeDetailModal';
import { BADGES } from './constants';
import { UserProgress, GithubProfile, Badge } from './types';
import { fetchUserProfile, scanProfileForBadges } from './services/githubService';
import { Github, Heart, Sun, Moon, Search, Filter, LayoutGrid, Map, BookOpen, Trophy } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'guide' | 'roadmap'>('all');
  
  // Theme Management
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            return 'dark';
        }
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
        root.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        root.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Progress State
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('badgeProgress');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('badgeProgress', JSON.stringify(progress));
  }, [progress]);

  const toggleBadge = (id: string) => {
    setProgress(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Modal State
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  // Github Profile State
  const [githubUser, setGithubUser] = useState<GithubProfile | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'rarity' | 'category'>('rarity');
  const [filterStatus, setFilterStatus] = useState<'all' | 'owned' | 'unowned'>('all');

  const handleProfileScan = async (username: string) => {
    setIsScanning(true);
    setScanError(null);
    try {
      const profile = await fetchUserProfile(username);
      setGithubUser(profile);
      const { badgesToUnlock } = await scanProfileForBadges(username);
      
      if (badgesToUnlock.length > 0) {
        setProgress(prev => {
           const newProgress = { ...prev };
           badgesToUnlock.forEach(id => {
             newProgress[id] = true;
           });
           return newProgress;
        });
      }
    } catch (error: any) {
      console.error(error);
      setScanError(error.message || "Failed to scan profile");
      setGithubUser(null);
    } finally {
      setIsScanning(false);
    }
  };

  // Filter and Sort Badges
  const processedBadges = useMemo(() => {
    let result = [...BADGES];

    // 1. Search (Fuzzy-like search across multiple fields)
    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        result = result.filter(b => 
            b.name.toLowerCase().includes(q) || 
            b.description.toLowerCase().includes(q) ||
            b.howToEarn.toLowerCase().includes(q) ||
            b.category.toLowerCase().includes(q) ||
            b.rarity.toLowerCase().includes(q)
        );
    }

    // 2. Filter Status
    if (filterStatus !== 'all') {
        result = result.filter(b => {
            const isOwned = !!progress[b.id];
            return filterStatus === 'owned' ? isOwned : !isOwned;
        });
    }

    // 3. Sort
    result.sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'category') return a.category.localeCompare(b.category);
        if (sortBy === 'rarity') {
            const rarityOrder = { 'Common': 1, 'Rare': 2, 'Epic': 3, 'Legendary': 4 };
            // Sort by rarity descending (Legendary first)
            return (rarityOrder[b.rarity] || 0) - (
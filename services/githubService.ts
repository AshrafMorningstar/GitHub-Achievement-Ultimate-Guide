/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

import { TIER_REQUIREMENTS } from '../constants';
import { GithubProfile } from '../types';

const BASE_URL = 'https://api.github.com';

// Helper to handle API rate limits and errors
const fetchAPI = async (endpoint: string) => {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  if (!response.ok) {
    if (response.status === 403 || response.status === 429) {
      throw new Error("GitHub API rate limit exceeded. Please try again later.");
    }
    if (response.status === 404) {
      throw new Error("User not found.");
    }
    throw new Error(`GitHub API Error: ${response.statusText}`);
  }
  return response.json();
};

export const fetchUserProfile = async (username: string): Promise<GithubProfile> => {
  return await fetchAPI(`/users/${username}`);
};

// Check Starstruck: Max stars on any single repo
export const checkStarstruck = async (username: string): Promise<boolean> => {
  try {
    // Fetch user's repos (limit to 100 for this demo, sorted by stars)
    // Note: In a real prod app we might need to paginate, but top 100 is usually enough for "max stars" check if we sort by stargazers_count? 
    // GitHub API sort by 'pushed' is default. Let's try to get them all or just a reasonable amount.
    // Actually, 'sort=full_name' is default. We can't easily sort by stars via the user/repos endpoint without client side sorting.
    const repos: any[] = await fetchAPI(`/users/${username}/repos?per_page=100&type=owner`);
    
    if (!repos || repos.length === 0) return false;

    const maxStars = Math.max(...repos.map((r: any) => r.stargazers_count));
    
    // Check against Base requirement (16)
    return maxStars >= TIER_REQUIREMENTS.starstruck.base;
  } catch (error) {
    console.warn("Failed to check Starstruck", error);
    return false;
  }
};

// Check Pull Shark: Count of merged PRs
export const checkPullShark = async (username: string): Promise<boolean> => {
  try {
    // Search API is rate limited but allows precise counting
    const query = `author:${username} type:pr is:merged`;
    const result = await fetchAPI(`/search/issues?q=${encodeURIComponent(query)}`);
    
    return result.total_count >= TIER_REQUIREMENTS.pullShark.base;
  } catch (error) {
    console.warn("Failed to check Pull Shark", error);
    return false;
  }
};

export const scanProfileForBadges = async (username: string) => {
  const [hasStarstruck, hasPullShark] = await Promise.all([
    checkStarstruck(username),
    checkPullShark(username)
  ]);

  const badgesToUnlock: string[] = [];
  if (hasStarstruck) badgesToUnlock.push('starstruck');
  if (hasPullShark) badgesToUnlock.push('pull-shark');

  return { badgesToUnlock, stats: { starstruck: hasStarstruck, pullShark: hasPullShark } };
};

/**
 * QuickDispatch Theme Utilities
 * Provides JavaScript utilities for working with the centralized theme
 */

import { useState, useEffect } from 'react';

// Theme Configuration Object
export const themeConfig = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    secondary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    }
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },
  
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  }
};

// Theme state management
class ThemeManager {
  constructor() {
    this.currentTheme = this.getInitialTheme();
    this.subscribers = new Set();
    this.applyTheme(this.currentTheme);
  }

  getInitialTheme() {
    // Check localStorage first
    const savedTheme = localStorage.getItem('quickdispatch-theme');
    if (savedTheme && ['light', 'dark', 'auto'].includes(savedTheme)) {
      return savedTheme;
    }
    
    // Default to auto (follows system preference)
    return 'auto';
  }

  applyTheme(theme) {
    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    root.removeAttribute('data-theme');
    
    if (theme === 'auto') {
      // Let CSS media queries handle it
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
      root.classList.add(theme);
      root.setAttribute('data-theme', theme);
    }
  }

  setTheme(theme) {
    if (!['light', 'dark', 'auto'].includes(theme)) {
      console.warn(`Invalid theme: ${theme}. Must be 'light', 'dark', or 'auto'`);
      return;
    }
    
    this.currentTheme = theme;
    localStorage.setItem('quickdispatch-theme', theme);
    this.applyTheme(theme);
    
    // Notify subscribers
    this.subscribers.forEach(callback => callback(theme));
  }

  getTheme() {
    return this.currentTheme;
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  toggleTheme() {
    const nextTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(nextTheme);
  }

  // Check if current effective theme is dark
  isDark() {
    if (this.currentTheme === 'dark') return true;
    if (this.currentTheme === 'light') return false;
    // Auto mode - check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}

// Create singleton instance
export const themeManager = new ThemeManager();

// React hook for theme management
export const useTheme = () => {
  const [theme, setTheme] = useState(themeManager.getTheme());
  
  useEffect(() => {
    const unsubscribe = themeManager.subscribe(setTheme);
    return unsubscribe;
  }, []);
  
  return {
    theme,
    setTheme: themeManager.setTheme.bind(themeManager),
    toggleTheme: themeManager.toggleTheme.bind(themeManager),
    isDark: themeManager.isDark.bind(themeManager),
  };
};

// CSS variable getters
export const getCSSVariable = (variableName) => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim();
};

export const setCSSVariable = (variableName, value) => {
  document.documentElement.style.setProperty(variableName, value);
};

// Helper functions for common theme operations
export const getColor = (colorPath) => {
  const keys = colorPath.split('.');
  let current = themeConfig.colors;
  
  for (const key of keys) {
    if (current[key] === undefined) {
      console.warn(`Color path not found: ${colorPath}`);
      return null;
    }
    current = current[key];
  }
  
  return current;
};

// Status color helpers
export const getStatusColor = (status) => {
  const statusMap = {
    success: themeConfig.colors.success[500],
    error: themeConfig.colors.error[500],
    warning: themeConfig.colors.warning[500],
    info: themeConfig.colors.primary[500],
    pending: themeConfig.colors.warning[500],
    active: themeConfig.colors.success[500],
    inactive: themeConfig.colors.gray[400],
    online: themeConfig.colors.success[500],
    offline: themeConfig.colors.error[500],
  };
  
  return statusMap[status] || themeConfig.colors.gray[500];
};

// Role-based color helpers for dashboard
export const getRoleColor = (role) => {
  const roleMap = {
    admin: themeConfig.colors.primary[500],
    manager: themeConfig.colors.secondary[500],
    dispatcher: themeConfig.colors.success[500],
    driver: themeConfig.colors.warning[500],
    user: themeConfig.colors.gray[500],
  };
  
  return roleMap[role] || themeConfig.colors.gray[500];
};

// Utility for generating consistent component variants
export const generateVariants = (baseColor) => {
  return {
    solid: {
      bg: baseColor,
      color: '#ffffff',
      border: baseColor,
    },
    outline: {
      bg: 'transparent',
      color: baseColor,
      border: baseColor,
    },
    ghost: {
      bg: 'transparent',
      color: baseColor,
      border: 'transparent',
    },
    light: {
      bg: `${baseColor}10`, // 10% opacity
      color: baseColor,
      border: 'transparent',
    },
  };
};

// Animation helpers
export const fadeIn = (element, duration = 250) => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(10px)';
  element.style.transition = `opacity ${duration}ms ease-in-out, transform ${duration}ms ease-in-out`;
  
  requestAnimationFrame(() => {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  });
};

export const slideIn = (element, direction = 'left', duration = 250) => {
  const transforms = {
    left: 'translateX(-100%)',
    right: 'translateX(100%)',
    up: 'translateY(-100%)',
    down: 'translateY(100%)',
  };
  
  element.style.transform = transforms[direction];
  element.style.transition = `transform ${duration}ms ease-in-out`;
  
  requestAnimationFrame(() => {
    element.style.transform = 'translateX(0) translateY(0)';
  });
};

// Responsive breakpoint helpers
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const mediaQuery = (breakpoint) => {
  return `@media (min-width: ${breakpoints[breakpoint]})`;
};

// Export everything as default for convenience
export default {
  themeConfig,
  themeManager,
  useTheme,
  getCSSVariable,
  setCSSVariable,
  getColor,
  getStatusColor,
  getRoleColor,
  generateVariants,
  fadeIn,
  slideIn,
  breakpoints,
  mediaQuery,
};

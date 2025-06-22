# QuickDispatch Theme System Documentation

## Overview

The QuickDispatch application uses a centralized theme system that combines CSS variables, Tailwind CSS, and JavaScript utilities to provide a consistent and maintainable design system.

## Files Structure

```
src/
├── styles/
│   └── theme.css          # Main theme CSS with variables and utility classes
├── utilities/
│   └── theme.js           # JavaScript theme utilities and React hooks
└── index.css              # Main CSS file that imports theme
```

## Features

- 🎨 **Centralized Color Palette** - Consistent colors across the app
- 🌙 **Dark/Light Mode Support** - Automatic and manual theme switching
- ♿ **Accessibility** - High contrast and reduced motion support
- 📱 **Responsive Design** - Mobile-first responsive utilities
- 🔧 **CSS Variables** - Easy customization and runtime changes
- ⚛️ **React Integration** - Hooks and utilities for React components
- 🎭 **Tailwind Integration** - Extended Tailwind config with custom colors

## CSS Variables

### Color Palette

All colors are defined as CSS variables in the `:root` selector:

```css
:root {
  --color-primary-500: #3b82f6;
  --color-secondary-500: #0ea5e9;
  --color-success-500: #22c55e;
  --color-warning-500: #f59e0b;
  --color-error-500: #ef4444;
  /* ... and many more */
}
```

### Usage in CSS

```css
.my-button {
  background-color: var(--color-primary-500);
  color: white;
  border-radius: var(--radius-md);
  padding: var(--spacing-sm) var(--spacing-md);
}
```

### Usage with Tailwind

```jsx
<button className="bg-primary-500 text-white rounded-md px-md py-sm">
  Click me
</button>
```

## Theme Utility Classes

The theme system provides utility classes for common patterns:

### Cards
```jsx
<div className="theme-card">
  <div className="theme-card-header">
    <h3>Card Title</h3>
  </div>
  <div className="theme-card-body">
    Card content goes here
  </div>
</div>
```

### Buttons
```jsx
<button className="theme-btn theme-btn-primary">Primary Button</button>
<button className="theme-btn theme-btn-outline">Outline Button</button>
<button className="theme-btn theme-btn-ghost">Ghost Button</button>
```

### Form Elements
```jsx
<label className="theme-label">Email</label>
<input className="theme-input" type="email" />
```

### Status Indicators
```jsx
<span className="theme-status-online">Online</span>
<span className="theme-status-offline">Offline</span>
<span className="theme-status-pending">Pending</span>
```

## JavaScript Theme Utilities

### Theme Manager

The `themeManager` singleton handles theme state:

```javascript
import { themeManager } from '../utilities/theme';

// Set theme
themeManager.setTheme('dark'); // 'light', 'dark', or 'auto'

// Get current theme
const currentTheme = themeManager.getTheme();

// Toggle between light and dark
themeManager.toggleTheme();

// Check if dark mode is active
const isDark = themeManager.isDark();
```

### React Hook

Use the `useTheme` hook in React components:

```jsx
import { useTheme } from '../utilities/theme';

function ThemeToggle() {
  const { theme, setTheme, toggleTheme, isDark } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {isDark() ? '🌙' : '☀️'} Toggle Theme
    </button>
  );
}
```

### Color Utilities

```javascript
import { getColor, getStatusColor, getRoleColor } from '../utilities/theme';

// Get specific colors
const primaryColor = getColor('primary.500');
const errorColor = getColor('error.600');

// Get status-based colors
const successColor = getStatusColor('success');
const offlineColor = getStatusColor('offline');

// Get role-based colors
const adminColor = getRoleColor('admin');
const driverColor = getRoleColor('driver');
```

## Dark Mode Implementation

### Automatic Detection
The theme system automatically detects the user's system preference:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-dashboard-bg: var(--color-gray-900);
    --color-card-bg: var(--color-gray-800);
  }
}
```

### Manual Override
Users can manually set their preference, which is saved to localStorage:

```javascript
// Force dark mode
themeManager.setTheme('dark');

// Force light mode
themeManager.setTheme('light');

// Follow system preference
themeManager.setTheme('auto');
```

## Responsive Design

### Breakpoints
```javascript
import { breakpoints, mediaQuery } from '../utilities/theme';

// Available breakpoints
console.log(breakpoints.md); // '768px'

// Generate media queries
const styles = `
  ${mediaQuery('md')} {
    font-size: 1.2rem;
  }
`;
```

### Responsive Utilities
```jsx
<div className="theme-card md:p-lg p-md">
  Responsive padding
</div>
```

## Accessibility Features

### High Contrast Support
```css
@media (prefers-contrast: high) {
  :root {
    --color-border: #000000;
  }
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Focus Management
```jsx
<button className="theme-btn theme-focus-visible">
  Accessible Button
</button>
```

## Animation Helpers

### CSS Animations
```jsx
<div className="theme-fade-in">Fades in smoothly</div>
<div className="theme-slide-in">Slides in from left</div>
```

### JavaScript Animations
```javascript
import { fadeIn, slideIn } from '../utilities/theme';

// Fade in an element
fadeIn(element, 300);

// Slide in from a direction
slideIn(element, 'right', 250);
```

## Customization

### Adding New Colors
1. Add CSS variables to `theme.css`:
```css
:root {
  --color-custom-500: #your-color;
}
```

2. Update Tailwind config:
```javascript
// tailwind.config.mjs
theme: {
  extend: {
    colors: {
      custom: {
        500: 'var(--color-custom-500)',
      }
    }
  }
}
```

3. Update JavaScript config:
```javascript
// utilities/theme.js
export const themeConfig = {
  colors: {
    custom: {
      500: '#your-color',
    }
  }
};
```

### Creating Component Variants
```javascript
import { generateVariants } from '../utilities/theme';

const buttonVariants = generateVariants('#3b82f6');
// Returns: { solid: {...}, outline: {...}, ghost: {...}, light: {...} }
```

## Best Practices

1. **Use CSS Variables** - Always use CSS variables for colors and spacing
2. **Consistent Naming** - Follow the established naming convention
3. **Mobile First** - Design for mobile, then enhance for desktop
4. **Accessibility** - Always test with screen readers and keyboard navigation
5. **Dark Mode** - Ensure all components work in both light and dark modes
6. **Performance** - Use utility classes over inline styles when possible

## Common Patterns

### Dashboard Cards
```jsx
function StatsCard({ title, value, color = 'primary' }) {
  return (
    <div className="theme-card">
      <div className="theme-card-body">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
      </div>
    </div>
  );
}
```

### Status Badges
```jsx
function StatusBadge({ status, children }) {
  const colorClass = {
    online: 'theme-success-bg',
    offline: 'theme-error-bg',
    pending: 'theme-warning-bg',
  }[status] || 'bg-gray-500';

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
      {children}
    </span>
  );
}
```

### Form Fields
```jsx
function FormField({ label, error, children }) {
  return (
    <div className="space-y-1">
      <label className="theme-label">{label}</label>
      {children}
      {error && (
        <p className="text-sm theme-error">{error}</p>
      )}
    </div>
  );
}
```

## Migration Guide

If you're updating existing components to use the theme system:

1. Replace hardcoded colors with CSS variables or Tailwind classes
2. Use theme utility classes instead of custom CSS where possible
3. Add dark mode support by using theme-aware colors
4. Update any custom animations to use theme variables
5. Test components in both light and dark modes

## Troubleshooting

### Colors Not Updating
- Ensure CSS variables are properly defined
- Check that Tailwind config includes the custom colors
- Verify the theme CSS is imported in index.css

### Dark Mode Not Working
- Check that data-theme attribute is being set
- Verify CSS variables are defined for dark mode
- Ensure components use theme-aware colors

### Performance Issues
- Use Tailwind's purge feature to remove unused CSS
- Avoid inline styles in favor of utility classes
- Minimize CSS variable recalculations in animations

import React from 'react';
import { useTheme } from '../utilities/theme';

/**
 * Example component demonstrating the centralized theme system
 * This shows various theme utilities and patterns in action
 */
const ThemeExample = () => {
  const { theme, setTheme, toggleTheme, isDark } = useTheme();

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <div className="p-6 space-y-6 bg-dashboard-bg min-h-screen">
      {/* Header with theme controls */}
      <div className="theme-card">
        <div className="theme-card-header">
          <h1 className="text-2xl font-bold text-gray-900">Theme System Example</h1>
          <p className="text-sm text-gray-600">
            Current theme: <span className="font-medium">{theme}</span>
            {' '}(Effective: {isDark() ? 'Dark' : 'Light'})
          </p>
        </div>
        <div className="theme-card-body">
          <div className="flex gap-2">
            <button
              onClick={() => handleThemeChange('light')}
              className={`theme-btn ${theme === 'light' ? 'theme-btn-primary' : 'theme-btn-outline'}`}
            >
              ☀️ Light
            </button>
            <button
              onClick={() => handleThemeChange('dark')}
              className={`theme-btn ${theme === 'dark' ? 'theme-btn-primary' : 'theme-btn-outline'}`}
            >
              🌙 Dark
            </button>
            <button
              onClick={() => handleThemeChange('auto')}
              className={`theme-btn ${theme === 'auto' ? 'theme-btn-primary' : 'theme-btn-outline'}`}
            >
              🔄 Auto
            </button>
            <button
              onClick={toggleTheme}
              className="theme-btn theme-btn-ghost"
            >
              🔄 Toggle
            </button>
          </div>
        </div>
      </div>

      {/* Color palette showcase */}
      <div className="theme-card">
        <div className="theme-card-header">
          <h2 className="text-xl font-semibold">Color Palette</h2>
        </div>
        <div className="theme-card-body">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {/* Primary Colors */}
            <div className="space-y-2">
              <h3 className="font-medium text-sm">Primary</h3>
              <div className="space-y-1">
                <div className="h-8 bg-primary-300 rounded flex items-center justify-center text-xs">300</div>
                <div className="h-8 bg-primary-500 rounded flex items-center justify-center text-xs text-white">500</div>
                <div className="h-8 bg-primary-700 rounded flex items-center justify-center text-xs text-white">700</div>
              </div>
            </div>

            {/* Secondary Colors */}
            <div className="space-y-2">
              <h3 className="font-medium text-sm">Secondary</h3>
              <div className="space-y-1">
                <div className="h-8 bg-secondary-300 rounded flex items-center justify-center text-xs">300</div>
                <div className="h-8 bg-secondary-500 rounded flex items-center justify-center text-xs text-white">500</div>
                <div className="h-8 bg-secondary-700 rounded flex items-center justify-center text-xs text-white">700</div>
              </div>
            </div>

            {/* Success Colors */}
            <div className="space-y-2">
              <h3 className="font-medium text-sm">Success</h3>
              <div className="space-y-1">
                <div className="h-8 bg-success-300 rounded flex items-center justify-center text-xs">300</div>
                <div className="h-8 bg-success-500 rounded flex items-center justify-center text-xs text-white">500</div>
                <div className="h-8 bg-success-700 rounded flex items-center justify-center text-xs text-white">700</div>
              </div>
            </div>

            {/* Warning Colors */}
            <div className="space-y-2">
              <h3 className="font-medium text-sm">Warning</h3>
              <div className="space-y-1">
                <div className="h-8 bg-warning-300 rounded flex items-center justify-center text-xs">300</div>
                <div className="h-8 bg-warning-500 rounded flex items-center justify-center text-xs text-white">500</div>
                <div className="h-8 bg-warning-700 rounded flex items-center justify-center text-xs text-white">700</div>
              </div>
            </div>

            {/* Error Colors */}
            <div className="space-y-2">
              <h3 className="font-medium text-sm">Error</h3>
              <div className="space-y-1">
                <div className="h-8 bg-error-300 rounded flex items-center justify-center text-xs">300</div>
                <div className="h-8 bg-error-500 rounded flex items-center justify-center text-xs text-white">500</div>
                <div className="h-8 bg-error-700 rounded flex items-center justify-center text-xs text-white">700</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Button variants */}
      <div className="theme-card">
        <div className="theme-card-header">
          <h2 className="text-xl font-semibold">Button Variants</h2>
        </div>
        <div className="theme-card-body">
          <div className="flex flex-wrap gap-2">
            <button className="theme-btn theme-btn-primary">Primary</button>
            <button className="theme-btn theme-btn-secondary">Secondary</button>
            <button className="theme-btn theme-btn-outline">Outline</button>
            <button className="theme-btn theme-btn-ghost">Ghost</button>
            <button className="theme-btn theme-success-bg">Success</button>
            <button className="theme-btn theme-warning-bg">Warning</button>
            <button className="theme-btn theme-error-bg">Error</button>
          </div>
        </div>
      </div>

      {/* Status indicators */}
      <div className="theme-card">
        <div className="theme-card-header">
          <h2 className="text-xl font-semibold">Status Indicators</h2>
        </div>
        <div className="theme-card-body">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success-500"></div>
              <span className="theme-status-online">Online</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-error-500"></div>
              <span className="theme-status-offline">Offline</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-warning-500"></div>
              <span className="theme-status-pending">Pending</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form example */}
      <div className="theme-card">
        <div className="theme-card-header">
          <h2 className="text-xl font-semibold">Form Elements</h2>
        </div>
        <div className="theme-card-body">
          <div className="space-y-4 max-w-md">
            <div>
              <label className="theme-label">Email Address</label>
              <input 
                type="email" 
                className="theme-input" 
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="theme-label">Message</label>
              <textarea 
                className="theme-input" 
                rows="3"
                placeholder="Enter your message"
              ></textarea>
            </div>
            <div className="flex gap-2">
              <button className="theme-btn theme-btn-primary">Submit</button>
              <button className="theme-btn theme-btn-outline">Cancel</button>
            </div>
          </div>
        </div>
      </div>

      {/* Animation examples */}
      <div className="theme-card">
        <div className="theme-card-header">
          <h2 className="text-xl font-semibold">Animations</h2>
        </div>
        <div className="theme-card-body">
          <div className="space-y-4">
            <div className="theme-fade-in p-4 bg-primary-50 rounded-lg border border-primary-200">
              <p className="text-primary-700">This element fades in smoothly</p>
            </div>
            <div className="theme-slide-in p-4 bg-success-50 rounded-lg border border-success-200">
              <p className="text-success-700">This element slides in from the left</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats cards example */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="theme-card">
          <div className="theme-card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-primary-600">1,234</p>
              </div>
              <div className="p-2 bg-primary-100 rounded-lg">
                <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="theme-card">
          <div className="theme-card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Orders</p>
                <p className="text-2xl font-bold text-success-600">567</p>
              </div>
              <div className="p-2 bg-success-100 rounded-lg">
                <svg className="w-6 h-6 text-success-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="theme-card">
          <div className="theme-card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-warning-600">$12,345</p>
              </div>
              <div className="p-2 bg-warning-100 rounded-lg">
                <svg className="w-6 h-6 text-warning-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.51-1.31c-.562-.649-1.413-1.076-2.353-1.253V5z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="theme-card">
          <div className="theme-card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Issues</p>
                <p className="text-2xl font-bold text-error-600">23</p>
              </div>
              <div className="p-2 bg-error-100 rounded-lg">
                <svg className="w-6 h-6 text-error-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeExample;

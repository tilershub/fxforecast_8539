import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      setIsAuthenticated(!!token);
    };

    const checkTheme = () => {
      const savedTheme = localStorage.getItem('theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)')?.matches;
      const shouldUseDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
      
      setIsDarkMode(shouldUseDark);
      document.documentElement?.classList?.toggle('dark', shouldUseDark);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    checkAuth();
    checkTheme();
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', newTheme);
    document.documentElement?.classList?.toggle('dark', !isDarkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    window.location.href = '/home-page';
  };

  const publicNavItems = [
    { label: 'Home', path: '/home-page', icon: 'Home' },
    { label: 'Framework', path: '/framework-page', icon: 'BookOpen' },
    { label: 'Tools', path: '/trading-tools-dashboard', icon: 'Calculator' },
    { label: 'Blog', path: '/blog-post-detail-page', icon: 'FileText' },
  ];

  const adminNavItems = [
    { label: 'Dashboard', path: '/admin-cms-dashboard', icon: 'LayoutDashboard' },
    { label: 'Blog Editor', path: '/blog-post-editor', icon: 'Edit3' },
  ];

  const currentNavItems = isAuthenticated ? adminNavItems : publicNavItems;
  const currentPath = window.location?.pathname;

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-1000 bg-background/95 backdrop-blur-sm border-b border-border transition-all duration-300 ${isScrolled ? 'shadow-soft' : ''}`}>
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/home-page" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="TrendingUp" size={20} color="white" />
              </div>
              <span className="text-xl font-bold text-foreground">FXFORECAST</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {currentNavItems?.map((item) => (
              <a
                key={item?.path}
                href={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth hover:bg-muted ${
                  currentPath === item?.path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:text-foreground'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="w-9 h-9"
            >
              <Icon name={isDarkMode ? 'Sun' : 'Moon'} size={16} />
            </Button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <div className="px-2 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
                  Admin
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  iconName="LogOut"
                  iconPosition="left"
                  iconSize={14}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={() => window.location.href = '/admin-cms-dashboard'}
                iconName="User"
                iconPosition="left"
                iconSize={14}
              >
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden w-9 h-9"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Icon name="Menu" size={20} />
          </Button>
        </div>
      </header>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-1100 md:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-card border-l border-border shadow-elevated animate-slide-in-right">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                  <Icon name="TrendingUp" size={14} color="white" />
                </div>
                <span className="font-semibold text-card-foreground">FXFORECAST</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-8 h-8"
              >
                <Icon name="X" size={18} />
              </Button>
            </div>

            <nav className="p-4 space-y-2">
              {currentNavItems?.map((item) => (
                <a
                  key={item?.path}
                  href={item?.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-smooth ${
                    currentPath === item?.path
                      ? 'bg-primary text-primary-foreground'
                      : 'text-card-foreground hover:bg-muted'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </a>
              ))}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-card">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-card-foreground">Theme</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleTheme}
                  iconName={isDarkMode ? 'Sun' : 'Moon'}
                  iconPosition="left"
                  iconSize={14}
                >
                  {isDarkMode ? 'Light' : 'Dark'}
                </Button>
              </div>

              {isAuthenticated ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-center">
                    <div className="px-3 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
                      Admin Mode
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={handleLogout}
                    iconName="LogOut"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  variant="default"
                  fullWidth
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.location.href = '/admin-cms-dashboard';
                  }}
                  iconName="User"
                  iconPosition="left"
                  iconSize={16}
                >
                  Admin Login
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
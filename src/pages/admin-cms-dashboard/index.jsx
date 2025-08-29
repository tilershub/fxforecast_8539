import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import MetricsCard from './components/MetricsCard';
import PostsTable from './components/PostsTable';
import ActivityFeed from './components/ActivityFeed';
import QuickStats from './components/QuickStats';
import MediaGrid from './components/MediaGrid';
import FilterPanel from './components/FilterPanel';
import Input from '../../components/ui/Input';


const AdminCMSDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authForm, setAuthForm] = useState({ email: '', password: '' });
  const [authError, setAuthError] = useState('');
  const [filters, setFilters] = useState({});

  // Mock authentication check
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setShowAuthModal(true);
    }
  }, []);

  // Mock data
  const mockMetrics = [
    {
      title: "Total Posts",
      value: "24",
      change: "+12%",
      changeType: "positive",
      icon: "FileText",
      color: "primary"
    },
    {
      title: "Draft Posts",
      value: "8",
      change: "+3",
      changeType: "positive",
      icon: "Edit3",
      color: "warning"
    },
    {
      title: "Published",
      value: "16",
      change: "+5",
      changeType: "positive",
      icon: "Eye",
      color: "success"
    },
    {
      title: "Total Views",
      value: "12.5K",
      change: "+18%",
      changeType: "positive",
      icon: "BarChart3",
      color: "accent"
    }
  ];

  const mockPosts = [
    {
      id: 1,
      title: "Advanced Risk Management Strategies for Forex Trading",
      description: "Learn how to protect your capital with proven risk management techniques used by professional traders.",
      status: "published",
      author: "Admin",
      date: "2025-08-28T10:30:00Z",
      tags: ["Risk Management", "Forex", "Trading"]
    },
    {
      id: 2,
      title: "Understanding ADR in Forex: A Complete Guide",
      description: "Master Average Daily Range calculations and how to use them for better trade entries and exits.",
      status: "draft",
      author: "Admin",
      date: "2025-08-27T14:15:00Z",
      tags: ["ADR", "Technical Analysis", "Education"]
    },
    {
      id: 3,
      title: "FTMO Challenge: Tips for Success",
      description: "Proven strategies to pass your FTMO challenge and secure funded trading accounts.",
      status: "published",
      author: "Admin",
      date: "2025-08-26T09:45:00Z",
      tags: ["FTMO", "Funded Trading", "Challenge"]
    },
    {
      id: 4,
      title: "Position Sizing Calculator: Maximize Your Profits",
      description: "Learn how to calculate optimal position sizes for consistent profitability.",
      status: "published",
      author: "Admin",
      date: "2025-08-25T16:20:00Z",
      tags: ["Position Sizing", "Tools", "Risk Management"]
    },
    {
      id: 5,
      title: "Session Focus Trading Strategy",
      description: "How to trade specific market sessions for better consistency and reduced risk.",
      status: "draft",
      author: "Admin",
      date: "2025-08-24T11:10:00Z",
      tags: ["Trading Sessions", "Strategy", "Focus"]
    }
  ];

  const mockActivities = [
    {
      id: 1,
      type: "post_published",
      user: "Admin",
      action: "published post",
      target: "Advanced Risk Management Strategies",
      timestamp: "2025-08-29T10:15:00Z"
    },
    {
      id: 2,
      type: "post_updated",
      user: "Admin",
      action: "updated post",
      target: "Understanding ADR in Forex",
      timestamp: "2025-08-29T09:30:00Z"
    },
    {
      id: 3,
      type: "media_uploaded",
      user: "Admin",
      action: "uploaded 3 images",
      target: null,
      timestamp: "2025-08-29T08:45:00Z"
    },
    {
      id: 4,
      type: "post_created",
      user: "Admin",
      action: "created new post",
      target: "Session Focus Trading Strategy",
      timestamp: "2025-08-28T16:20:00Z"
    }
  ];

  const mockStats = {
    popularPosts: [
      { id: 1, title: "Advanced Risk Management Strategies", views: 2847 },
      { id: 2, title: "FTMO Challenge: Tips for Success", views: 1923 },
      { id: 3, title: "Position Sizing Calculator Guide", views: 1654 },
      { id: 4, title: "Understanding ADR in Forex", views: 1432 },
      { id: 5, title: "Session Focus Trading Strategy", views: 1201 }
    ],
    recentComments: [
      {
        id: 1,
        content: "This risk management guide really helped me improve my trading discipline. Thank you!",
        author: "TradingPro",
        date: "2025-08-29T08:30:00Z"
      },
      {
        id: 2,
        content: "The ADR calculations are spot on. Using this in my daily analysis now.",
        author: "ForexMaster",
        date: "2025-08-28T15:45:00Z"
      },
      {
        id: 3,
        content: "Passed my FTMO challenge using these tips! Highly recommended.",
        author: "FundedTrader",
        date: "2025-08-28T12:20:00Z"
      }
    ],
    traffic: {
      pageViews: 8947,
      uniqueVisitors: 3421,
      bounceRate: 34
    }
  };

  const mockMedia = [
    {
      id: 1,
      name: "risk-management-chart.jpg",
      url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400",
      size: 245760,
      uploadDate: "2025-08-29T10:00:00Z",
      dimensions: "1200x800",
      tags: ["charts", "risk"]
    },
    {
      id: 2,
      name: "forex-trading-setup.jpg",
      url: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400",
      size: 189440,
      uploadDate: "2025-08-28T14:30:00Z",
      dimensions: "1920x1080",
      tags: ["trading", "setup"]
    },
    {
      id: 3,
      name: "adr-calculation-example.png",
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
      size: 156672,
      uploadDate: "2025-08-27T09:15:00Z",
      dimensions: "800x600",
      tags: ["adr", "calculation"]
    },
    {
      id: 4,
      name: "position-size-formula.jpg",
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
      size: 203520,
      uploadDate: "2025-08-26T16:45:00Z",
      dimensions: "1600x900",
      tags: ["formula", "position"]
    }
  ];

  const mockSavedPresets = [
    {
      id: 1,
      name: "Published This Week",
      filters: { status: 'published', dateRange: 'week' }
    },
    {
      id: 2,
      name: "Draft Posts",
      filters: { status: 'draft' }
    }
  ];

  // Mock credentials
  const mockCredentials = {
    email: "admin@fxforecast.com",
    password: "FXAdmin2025!"
  };

  const handleAuth = (e) => {
    e?.preventDefault();
    setAuthError('');

    if (authForm?.email === mockCredentials?.email && authForm?.password === mockCredentials?.password) {
      localStorage.setItem('authToken', 'mock-admin-token');
      setIsAuthenticated(true);
      setShowAuthModal(false);
    } else {
      setAuthError('Invalid credentials. Use admin@fxforecast.com / FXAdmin2025!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setShowAuthModal(true);
  };

  const handlePostEdit = (postId) => {
    window.location.href = `/blog-post-editor?id=${postId}`;
  };

  const handlePostDelete = (postId) => {
    console.log('Delete post:', postId);
    // Mock delete functionality
  };

  const handlePostDuplicate = (postId) => {
    console.log('Duplicate post:', postId);
    // Mock duplicate functionality
  };

  const handleBulkAction = (action, postIds) => {
    console.log('Bulk action:', action, postIds);
    // Mock bulk action functionality
  };

  const handleMediaUpload = () => {
    console.log('Upload media');
    // Mock upload functionality
  };

  const handleMediaDelete = (mediaId) => {
    console.log('Delete media:', mediaId);
    // Mock delete functionality
  };

  const handleMediaBulkDelete = (mediaIds) => {
    console.log('Bulk delete media:', mediaIds);
    // Mock bulk delete functionality
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters changed:', newFilters);
  };

  const handleSavePreset = (filters) => {
    console.log('Save preset:', filters);
    // Mock save preset functionality
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { id: 'posts', label: 'Posts', icon: 'FileText' },
    { id: 'media', label: 'Media', icon: 'Image' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        {/* Auth Modal */}
        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="w-full max-w-md mx-4">
              <div className="bg-card border border-border rounded-lg shadow-elevated p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Shield" size={32} className="text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-card-foreground mb-2">Admin Access</h2>
                  <p className="text-muted-foreground">Enter your credentials to access the CMS dashboard</p>
                </div>

                <form onSubmit={handleAuth} className="space-y-4">
                  <Input
                    label="Email Address"
                    type="email"
                    required
                    value={authForm?.email}
                    onChange={(e) => setAuthForm({ ...authForm, email: e?.target?.value })}
                    placeholder="admin@fxforecast.com"
                  />
                  
                  <Input
                    label="Password"
                    type="password"
                    required
                    value={authForm?.password}
                    onChange={(e) => setAuthForm({ ...authForm, password: e?.target?.value })}
                    placeholder="Enter your password"
                  />

                  {authError && (
                    <div className="p-3 bg-error/10 border border-error/20 rounded-md">
                      <p className="text-sm text-error">{authError}</p>
                    </div>
                  )}

                  <Button type="submit" fullWidth iconName="LogIn" iconPosition="left">
                    Sign In
                  </Button>
                </form>

                <div className="mt-6 p-4 bg-muted/50 rounded-md">
                  <p className="text-xs text-muted-foreground text-center">
                    Demo credentials provided for testing purposes only
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs />
          
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your FXFORECAST content and settings</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="px-3 py-1 bg-success/10 text-success text-sm font-medium rounded-full">
                Admin Mode
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                iconName="LogOut"
                iconPosition="left"
                iconSize={16}
              >
                Logout
              </Button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-border mb-8">
            <nav className="flex space-x-8">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-smooth ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockMetrics?.map((metric, index) => (
                  <MetricsCard key={index} {...metric} />
                ))}
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2">
                  <ActivityFeed activities={mockActivities} />
                </div>

                {/* Quick Stats */}
                <div>
                  <QuickStats stats={mockStats} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'posts' && (
            <div className="space-y-6">
              {/* Posts Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-1">Blog Posts</h2>
                  <p className="text-muted-foreground">Manage your blog content and publications</p>
                </div>
                <Button
                  variant="default"
                  onClick={() => window.location.href = '/blog-post-editor'}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Create New Post
                </Button>
              </div>

              {/* Filter Panel */}
              <FilterPanel
                onFilterChange={handleFilterChange}
                onSavePreset={handleSavePreset}
                savedPresets={mockSavedPresets}
              />

              {/* Posts Table */}
              <PostsTable
                posts={mockPosts}
                onEdit={handlePostEdit}
                onDelete={handlePostDelete}
                onDuplicate={handlePostDuplicate}
                onBulkAction={handleBulkAction}
              />
            </div>
          )}

          {activeTab === 'media' && (
            <div className="space-y-6">
              <MediaGrid
                media={mockMedia}
                onUpload={handleMediaUpload}
                onDelete={handleMediaDelete}
                onBulkDelete={handleMediaBulkDelete}
              />
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-2xl font-bold text-card-foreground mb-4">Settings</h2>
                <p className="text-muted-foreground mb-6">Configure your CMS preferences and site settings</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-card-foreground">General Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                        <div>
                          <p className="font-medium text-card-foreground">Site Maintenance</p>
                          <p className="text-sm text-muted-foreground">Enable maintenance mode</p>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                        <div>
                          <p className="font-medium text-card-foreground">SEO Settings</p>
                          <p className="text-sm text-muted-foreground">Manage meta tags and sitemap</p>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-card-foreground">Security</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                        <div>
                          <p className="font-medium text-card-foreground">Change Password</p>
                          <p className="text-sm text-muted-foreground">Update your admin password</p>
                        </div>
                        <Button variant="outline" size="sm">Change</Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                        <div>
                          <p className="font-medium text-card-foreground">Session Timeout</p>
                          <p className="text-sm text-muted-foreground">Configure auto-logout time</p>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCMSDashboard;
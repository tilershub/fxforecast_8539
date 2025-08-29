import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import FrontmatterForm from './components/FrontmatterForm';
import MDXEditor from './components/MDXEditor';
import PreviewPanel from './components/PreviewPanel';
import SEOPanel from './components/SEOPanel';
import VersionHistory from './components/VersionHistory';

const BlogPostEditor = () => {
  const [activeTab, setActiveTab] = useState('editor');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [saveStatus, setSaveStatus] = useState('unsaved');
  const [showSEOPanel, setShowSEOPanel] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);

  const [frontmatter, setFrontmatter] = useState({
    title: '',
    slug: '',
    description: '',
    tags: [],
    author: 'admin',
    date: new Date()?.toISOString()?.slice(0, 16),
    draft: true,
    coverImage: '',
    canonicalUrl: '',
    metaTitle: '',
    keywords: ''
  });

  const [content, setContent] = useState(`---
title: "Your Post Title" description:"Brief description of your post"
tags: ["forex", "trading"]
author: "admin" date:"${new Date()?.toISOString()}"
draft: true
---

# Your Post Title

Start writing your content here...

## Introduction

Welcome to the FXFORECAST blog. This post will cover essential trading concepts and risk management strategies.

## Key Points

- **Risk Management**: Never risk more than 0.5% per trade
- **Session Focus**: Trade during your preferred market sessions
- **ADR Exits**: Use Average Daily Range for profit targets

## Code Example

\`\`\`javascript
// Position size calculator
const calculatePositionSize = (accountEquity, riskPercent, pipValue, stopLossPips) => {
  const riskAmount = accountEquity * (riskPercent / 100);
  const positionSize = riskAmount / (stopLossPips * pipValue);
  return positionSize;
};
\`\`\`

## Conclusion

Remember to always follow your trading plan and maintain proper risk management.

> "The goal of a successful trader is to make the best trades. Money is secondary." - Alexander Elder
`);

  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (content?.trim() && frontmatter?.title) {
        handleAutoSave();
      }
    }, 120000); // Auto-save every 2 minutes

    return () => clearInterval(autoSaveInterval);
  }, [content, frontmatter]);

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      window.location.href = '/admin-cms-dashboard';
    }
  }, []);

  const handleAutoSave = () => {
    setSaveStatus('saving');
    
    // Simulate auto-save
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('unsaved'), 3000);
    }, 1000);
  };

  const handleManualSave = () => {
    setSaveStatus('saving');
    
    // Simulate manual save
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('unsaved'), 5000);
    }, 500);
  };

  const handlePublish = () => {
    if (!frontmatter?.title || !content?.trim()) {
      alert('Please add a title and content before publishing.');
      return;
    }

    const updatedFrontmatter = { ...frontmatter, draft: false };
    setFrontmatter(updatedFrontmatter);
    
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      alert('Post published successfully!');
    }, 1000);
  };

  const handleVersionRestore = (version) => {
    // Simulate version restore
    console.log('Restoring version:', version);
    alert(`Restored to version: ${version?.title}`);
    setShowVersionHistory(false);
  };

  const breadcrumbItems = [
    { label: 'Admin', path: '/admin-cms-dashboard' },
    { label: 'Blog Editor', path: '/blog-post-editor' }
  ];

  const tabItems = [
    { id: 'editor', label: 'Editor', icon: 'Edit3' },
    { id: 'preview', label: 'Preview', icon: 'Eye' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <Breadcrumbs items={breadcrumbItems} />

          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {frontmatter?.title || 'New Blog Post'}
              </h1>
              <p className="text-muted-foreground">
                Create and edit blog posts with live preview and SEO optimization
              </p>
            </div>

            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowVersionHistory(!showVersionHistory)}
                iconName="History"
                iconPosition="left"
                iconSize={16}
              >
                History
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSEOPanel(!showSEOPanel)}
                iconName="Search"
                iconPosition="left"
                iconSize={16}
              >
                SEO
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleManualSave}
                loading={saveStatus === 'saving'}
                iconName="Save"
                iconPosition="left"
                iconSize={16}
              >
                Save Draft
              </Button>

              <Button
                variant="default"
                size="sm"
                onClick={handlePublish}
                iconName="Send"
                iconPosition="left"
                iconSize={16}
              >
                {frontmatter?.draft ? 'Publish' : 'Update'}
              </Button>
            </div>
          </div>

          {/* Mobile Tab Navigation */}
          <div className="lg:hidden mb-6">
            <div className="flex space-x-1 bg-muted p-1 rounded-lg">
              {tabItems?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                    activeTab === tab?.id
                      ? 'bg-background text-foreground shadow-soft'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar - Settings & Tools */}
            <div className={`lg:col-span-3 space-y-6 ${activeTab !== 'settings' ? 'hidden lg:block' : ''}`}>
              <FrontmatterForm
                frontmatter={frontmatter}
                onChange={setFrontmatter}
              />

              {showSEOPanel && (
                <SEOPanel
                  frontmatter={frontmatter}
                  onChange={setFrontmatter}
                />
              )}

              {showVersionHistory && (
                <VersionHistory onRestore={handleVersionRestore} />
              )}
            </div>

            {/* Main Editor Area */}
            <div className={`lg:col-span-9 ${activeTab === 'settings' ? 'hidden lg:block' : ''}`}>
              {/* Desktop: Side-by-side Editor and Preview */}
              <div className="hidden lg:grid lg:grid-cols-2 lg:gap-6 h-[calc(100vh-200px)]">
                <MDXEditor
                  content={content}
                  onChange={setContent}
                  onSave={handleManualSave}
                  saveStatus={saveStatus}
                />
                <PreviewPanel
                  content={content}
                  frontmatter={frontmatter}
                />
              </div>

              {/* Mobile: Tabbed Editor and Preview */}
              <div className="lg:hidden h-[calc(100vh-250px)]">
                {activeTab === 'editor' && (
                  <MDXEditor
                    content={content}
                    onChange={setContent}
                    onSave={handleManualSave}
                    saveStatus={saveStatus}
                  />
                )}
                {activeTab === 'preview' && (
                  <PreviewPanel
                    content={content}
                    frontmatter={frontmatter}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Status Bar */}
          <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-3 lg:hidden">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4 text-muted-foreground">
                <span>Words: {content?.split(' ')?.filter(word => word?.length > 0)?.length}</span>
                <span>•</span>
                <span>Characters: {content?.length}</span>
              </div>
              
              <div className={`flex items-center space-x-2 ${
                saveStatus === 'saving' ? 'text-warning' :
                saveStatus === 'saved' ? 'text-success' : 'text-muted-foreground'
              }`}>
                <Icon 
                  name={saveStatus === 'saving' ? 'Loader2' : saveStatus === 'saved' ? 'Check' : 'AlertCircle'} 
                  size={14}
                  className={saveStatus === 'saving' ? 'animate-spin' : ''}
                />
                <span className="text-xs">
                  {saveStatus === 'saving' ? 'Saving...' : 
                   saveStatus === 'saved' ? 'Saved' : 'Unsaved'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogPostEditor;
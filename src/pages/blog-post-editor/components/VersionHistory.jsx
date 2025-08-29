import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const VersionHistory = ({ onRestore }) => {
  const [versions] = useState([
    {
      id: 1,
      timestamp: new Date(Date.now() - 300000),
      title: "Auto-save",
      changes: "Added introduction paragraph and updated meta description",
      wordCount: 1250,
      isCurrent: true
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 900000),
      title: "Manual save",
      changes: "Completed section on risk management strategies",
      wordCount: 1180,
      isCurrent: false
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 1800000),
      title: "Auto-save",
      changes: "Added code examples and formatting improvements",
      wordCount: 980,
      isCurrent: false
    },
    {
      id: 4,
      timestamp: new Date(Date.now() - 3600000),
      title: "Initial draft",
      changes: "Created post with basic structure and outline",
      wordCount: 450,
      isCurrent: false
    }
  ]);

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const handleRestore = (version) => {
    if (window.confirm(`Are you sure you want to restore to "${version?.title}" from ${formatTimestamp(version?.timestamp)}? This will replace your current content.`)) {
      onRestore(version);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center">
        <Icon name="History" size={20} className="mr-2" />
        Version History
      </h3>
      <div className="space-y-3">
        {versions?.map((version) => (
          <div
            key={version?.id}
            className={`border border-border rounded-lg p-4 transition-smooth hover:bg-muted/30 ${
              version?.isCurrent ? 'bg-primary/5 border-primary/20' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={version?.title === 'Auto-save' ? 'Clock' : 'Save'} 
                  size={16} 
                  className={version?.isCurrent ? 'text-primary' : 'text-muted-foreground'}
                />
                <span className={`font-medium ${version?.isCurrent ? 'text-primary' : 'text-card-foreground'}`}>
                  {version?.title}
                </span>
                {version?.isCurrent && (
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    Current
                  </span>
                )}
              </div>
              <span className="text-xs text-muted-foreground">
                {formatTimestamp(version?.timestamp)}
              </span>
            </div>

            <p className="text-sm text-muted-foreground mb-3">
              {version?.changes}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span>{version?.wordCount} words</span>
                <span>•</span>
                <span>{version?.timestamp?.toLocaleDateString()}</span>
                <span>{version?.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>

              {!version?.isCurrent && (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRestore(version)}
                    iconName="RotateCcw"
                    iconPosition="left"
                    iconSize={14}
                  >
                    Restore
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Auto-save every 2 minutes</span>
          <Button
            variant="ghost"
            size="sm"
            iconName="Download"
            iconPosition="left"
            iconSize={14}
          >
            Export History
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VersionHistory;
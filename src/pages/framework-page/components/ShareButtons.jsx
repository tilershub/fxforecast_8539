import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ShareButtons = () => {
  const [copied, setCopied] = useState(false);

  const currentUrl = window.location?.href;
  const shareTitle = "FXFORECAST Trading Framework - Disciplined Risk Management for Forex Traders";
  const shareDescription = "Learn the complete FXFORECAST methodology for funded trading success with structured risk management and ADR-based exits.";

  const shareLinks = [
    {
      name: 'Twitter',
      icon: 'Twitter',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(currentUrl)}`,
      color: 'text-blue-500 hover:text-blue-600'
    },
    {
      name: 'LinkedIn',
      icon: 'Linkedin',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
      color: 'text-blue-700 hover:text-blue-800'
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      color: 'text-blue-600 hover:text-blue-700'
    },
    {
      name: 'Reddit',
      icon: 'MessageCircle',
      url: `https://reddit.com/submit?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(shareTitle)}`,
      color: 'text-orange-500 hover:text-orange-600'
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard?.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const handleShare = (url) => {
    window.open(url, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Icon name="Share2" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-card-foreground">Share This Framework</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Help other traders discover disciplined risk management strategies
        </p>
      </div>
      {/* Social Share Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {shareLinks?.map((platform) => (
          <Button
            key={platform?.name}
            variant="outline"
            size="sm"
            onClick={() => handleShare(platform?.url)}
            className="flex items-center justify-center space-x-2 h-10"
          >
            <Icon name={platform?.icon} size={16} className={platform?.color} />
            <span className="hidden sm:inline text-xs">{platform?.name}</span>
          </Button>
        ))}
      </div>
      {/* Copy Link */}
      <div className="flex items-center space-x-2">
        <div className="flex-1 bg-muted rounded-lg px-3 py-2 text-sm text-muted-foreground font-mono truncate">
          {currentUrl}
        </div>
        <Button
          variant={copied ? "success" : "outline"}
          size="sm"
          onClick={copyToClipboard}
          iconName={copied ? "Check" : "Copy"}
          iconPosition="left"
          iconSize={14}
        >
          {copied ? 'Copied!' : 'Copy'}
        </Button>
      </div>
      {/* Share Stats */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Share and help grow the trading community</span>
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={12} />
            <span>Join 2,500+ traders</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareButtons;
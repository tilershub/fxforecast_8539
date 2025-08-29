import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StickyShareButtons = ({ article }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState('');

  const shareButtons = [
    { 
      name: 'Twitter', 
      icon: 'Twitter', 
      color: '#1DA1F2',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(article?.title)}&url=${encodeURIComponent(window.location?.href)}`
    },
    { 
      name: 'Facebook', 
      icon: 'Facebook', 
      color: '#1877F2',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location?.href)}`
    },
    { 
      name: 'LinkedIn', 
      icon: 'Linkedin', 
      color: '#0A66C2',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location?.href)}`
    },
    { 
      name: 'Copy', 
      icon: 'Copy', 
      color: 'var(--color-muted-foreground)',
      action: 'copy'
    }
  ];

  const handleShare = async (button) => {
    if (button?.action === 'copy') {
      try {
        await navigator.clipboard?.writeText(window.location?.href);
        setShowTooltip('copy');
        setTimeout(() => setShowTooltip(''), 2000);
      } catch (err) {
        console.error('Failed to copy URL:', err);
      }
    } else {
      window.open(button?.url, '_blank', 'width=600,height=400');
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      {/* Desktop Sticky Share */}
      <div className="hidden lg:block fixed left-8 top-1/2 transform -translate-y-1/2 z-40">
        <div className="bg-card border border-border rounded-lg p-2 shadow-soft">
          <div className="flex flex-col space-y-2">
            {shareButtons?.map((button) => (
              <div key={button?.name} className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleShare(button)}
                  className="w-10 h-10 hover:bg-muted"
                  onMouseEnter={() => setShowTooltip(button?.name?.toLowerCase())}
                  onMouseLeave={() => setShowTooltip('')}
                >
                  <Icon name={button?.icon} size={18} />
                </Button>
                
                {showTooltip === button?.name?.toLowerCase() && (
                  <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-foreground text-background px-2 py-1 rounded text-xs whitespace-nowrap">
                    {button?.name === 'Copy' && showTooltip === 'copy' ? 'Copied!' : `Share on ${button?.name}`}
                    <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Mobile Floating Action Button */}
      <div className="lg:hidden fixed bottom-20 right-6 z-40">
        {/* Share Options */}
        {isVisible && (
          <div className="absolute bottom-full right-0 mb-4 bg-card border border-border rounded-lg p-2 shadow-elevated">
            <div className="flex flex-col space-y-2">
              {shareButtons?.map((button) => (
                <Button
                  key={button?.name}
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    handleShare(button);
                    setIsVisible(false);
                  }}
                  iconName={button?.icon}
                  iconPosition="left"
                  iconSize={16}
                  className="justify-start w-32"
                >
                  {button?.name}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Main FAB */}
        <Button
          variant="default"
          size="icon"
          onClick={toggleVisibility}
          className="w-12 h-12 rounded-full shadow-elevated"
        >
          <Icon name={isVisible ? 'X' : 'Share2'} size={20} />
        </Button>
      </div>
    </>
  );
};

export default StickyShareButtons;
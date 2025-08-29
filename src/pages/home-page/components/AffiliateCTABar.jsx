import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AffiliateCTABar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleScroll = () => {
      // Show/hide based on scroll position on mobile
      if (window.innerWidth < 768) {
        const scrolled = window.scrollY;
        const threshold = 200;
        setIsVisible(scrolled > threshold);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleFTMOClick = () => {
    // Track affiliate click
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'affiliate',
        event_label: 'ftmo_sticky_cta',
        value: 1
      });
    }
    
    window.open('https://ftmo.com/?utm_source=fxforecast&utm_medium=site&utm_campaign=sticky_cta', '_blank');
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('affiliateBarDismissed', 'true');
  };

  // Check if user previously dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem('affiliateBarDismissed');
    if (dismissed) {
      setIsVisible(false);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Mobile Floating Bar */}
      {isMobile && (
        <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
          <div className="bg-primary text-primary-foreground rounded-lg p-4 shadow-elevated border border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex-1 mr-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Star" size={16} className="text-warning" />
                  <span className="text-sm font-semibold">Ready to Get Funded?</span>
                </div>
                <p className="text-xs opacity-90">
                  Start your FTMO challenge today with our proven framework
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleFTMOClick}
                  iconName="ExternalLink"
                  iconPosition="right"
                  iconSize={14}
                  className="text-xs px-3 py-2"
                >
                  Try FTMO
                </Button>
                
                <button
                  onClick={handleDismiss}
                  className="p-1 hover:bg-primary-foreground/20 rounded transition-colors"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
          <div className="bg-card border border-border rounded-lg p-6 shadow-elevated max-w-xs">
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 p-1 hover:bg-muted rounded transition-colors"
            >
              <Icon name="X" size={14} className="text-muted-foreground" />
            </button>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon name="TrendingUp" size={24} className="text-primary" />
              </div>
              
              <h3 className="font-bold text-card-foreground mb-2">
                Ready for FTMO?
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4">
                Apply our framework to your FTMO challenge and increase your success rate
              </p>
              
              <Button
                variant="default"
                size="sm"
                onClick={handleFTMOClick}
                iconName="ExternalLink"
                iconPosition="right"
                iconSize={14}
                className="w-full mb-2"
              >
                Start Challenge
              </Button>
              
              <p className="text-xs text-muted-foreground">
                Affiliate partnership • No extra cost
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AffiliateCTABar;
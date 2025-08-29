import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  const handleStartJourney = () => {
    window.location.href = '/framework-page';
  };

  const handleTryFTMO = () => {
    // Track affiliate click
    if (typeof gtag !== 'undefined') {
      gtag('event', 'click', {
        event_category: 'affiliate',
        event_label: 'ftmo_hero_cta',
        value: 1
      });
    }
    
    window.open('https://ftmo.com/?utm_source=fxforecast&utm_medium=site&utm_campaign=hero_cta', '_blank');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 px-4 py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>
      </div>

      <div className="relative max-w-6xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
          <Icon name="TrendingUp" size={16} />
          <span>Funded Trading Framework</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
          Master Forex Trading with
          <span className="block text-primary mt-2">FXFORECAST</span>
        </h1>

        {/* Subcopy */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
          Join thousands of traders who've transformed their approach with our disciplined risk management framework. 
          Get funded faster with proven strategies that prioritize consistency over quick wins.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button
            variant="default"
            size="lg"
            onClick={handleStartJourney}
            iconName="ArrowRight"
            iconPosition="right"
            iconSize={20}
            className="w-full sm:w-auto px-8 py-4 text-lg font-semibold"
          >
            Start Your Funded Journey
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={handleTryFTMO}
            iconName="ExternalLink"
            iconPosition="right"
            iconSize={18}
            className="w-full sm:w-auto px-8 py-4 text-lg font-semibold"
          >
            Try FTMO (Affiliate)
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-3 text-muted-foreground">
            <Icon name="Shield" size={20} className="text-success" />
            <span className="text-sm font-medium">Risk-First Approach</span>
          </div>
          
          <div className="flex items-center justify-center space-x-3 text-muted-foreground">
            <Icon name="Users" size={20} className="text-primary" />
            <span className="text-sm font-medium">5,000+ Active Traders</span>
          </div>
          
          <div className="flex items-center justify-center space-x-3 text-muted-foreground">
            <Icon name="Award" size={20} className="text-warning" />
            <span className="text-sm font-medium">Proven Framework</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" size={24} className="text-muted-foreground" />
      </div>
    </section>
  );
};

export default HeroSection;
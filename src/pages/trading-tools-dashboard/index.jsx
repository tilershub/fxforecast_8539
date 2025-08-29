import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import Icon from '../../components/AppIcon';
import ToolsNavigation from './components/ToolsNavigation';
import PositionSizeCalculator from './components/PositionSizeCalculator';
import ADRExitHelper from './components/ADRExitHelper';
import RiskGuard from './components/RiskGuard';

const TradingToolsDashboard = () => {
  const [activeTab, setActiveTab] = useState('position-size');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const breadcrumbItems = [
    { label: 'Home', path: '/home-page' },
    { label: 'Trading Tools', path: '/trading-tools-dashboard' }
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'position-size':
        return <PositionSizeCalculator />;
      case 'adr-exit':
        return <ADRExitHelper />;
      case 'risk-guard':
        return <RiskGuard />;
      default:
        return <PositionSizeCalculator />;
    }
  };

  const getToolTitle = () => {
    switch (activeTab) {
      case 'position-size':
        return 'Position Size Calculator';
      case 'adr-exit':
        return 'ADR Exit Helper';
      case 'risk-guard':
        return 'Risk Guard Monitor';
      default:
        return 'Position Size Calculator';
    }
  };

  const getToolDescription = () => {
    switch (activeTab) {
      case 'position-size':
        return 'Calculate optimal lot sizes based on your account equity and risk tolerance. Follow the FXFORECAST framework with disciplined position sizing.';
      case 'adr-exit':
        return 'Determine take profit levels using Average Daily Range (ADR) methodology. Set realistic exit targets at 30% and 50% ADR levels.';
      case 'risk-guard':
        return 'Monitor your risk parameters in real-time. Stay within FXFORECAST limits: max 0.5% risk per trade, 2 trades daily, -1% daily and -4% weekly drawdown limits.';
      default:
        return 'Calculate optimal lot sizes based on your account equity and risk tolerance.';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={breadcrumbItems} />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Calculator" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Trading Tools Dashboard</h1>
                <p className="text-muted-foreground">Essential calculators for disciplined forex trading</p>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Info" size={20} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground mb-2">FXFORECAST Framework Tools</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    These tools implement the core risk management principles of the FXFORECAST funded trading framework. 
                    Use them to maintain discipline, calculate proper position sizes, and monitor your risk exposure in real-time. 
                    Remember: consistency and risk control are more important than individual trade profits.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tools Navigation */}
          <div className={isMobile ? 'sticky top-16 z-10 mb-6' : 'mb-8'}>
            <ToolsNavigation 
              activeTab={activeTab} 
              onTabChange={setActiveTab}
              isMobile={isMobile}
            />
          </div>

          {/* Active Tool Content */}
          <div className="bg-card border border-border rounded-lg">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-semibold text-card-foreground mb-2">{getToolTitle()}</h2>
              <p className="text-muted-foreground text-sm">{getToolDescription()}</p>
            </div>
            
            <div className="p-6">
              {renderActiveComponent()}
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-8 bg-muted/30 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="AlertTriangle" size={20} className="text-warning" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Risk Disclaimer</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  These tools are for educational purposes and should be used as part of a comprehensive trading plan. 
                  Past performance does not guarantee future results. Forex trading involves substantial risk of loss. 
                  Always verify calculations independently and never risk more than you can afford to lose.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TradingToolsDashboard;
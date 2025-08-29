import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RelatedToolsSection = () => {
  const tools = [
    {
      id: 'position-calculator',
      name: 'Position Size Calculator',
      description: 'Calculate optimal position sizes based on your account equity and risk percentage. Supports all major currency pairs with automatic pip value detection.',
      icon: 'Calculator',
      features: [
        'Account equity input',
        'Risk percentage (0.5% default)',
        'Currency pair selection',
        'Entry/SL pip calculation',
        'Lot size precision'
      ],
      color: 'primary'
    },
    {
      id: 'adr-helper',
      name: 'ADR Exit Helper',
      description: 'Track daily progress against Average Daily Range and get optimal exit levels. Perfect for implementing the FXFORECAST exit strategy.',
      icon: 'Target',
      features: [
        'Real-time ADR tracking',
        'Multiple exit targets',
        'Daily progress monitoring',
        'Volatility analysis',
        'Profit optimization'
      ],
      color: 'accent'
    },
    {
      id: 'risk-guard',
      name: 'Risk Guard',
      description: 'Monitor your daily and weekly risk exposure with automated warnings. Prevents overtrading and maintains disciplined risk management.',
      icon: 'Shield',
      features: [
        'Daily P/L tracking',
        'Weekly drawdown limits',
        'Trade counter',
        'Risk status badges',
        'Automatic lockouts'
      ],
      color: 'warning'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: {
        bg: 'bg-primary/10',
        text: 'text-primary',
        border: 'border-primary/20',
        button: 'primary'
      },
      accent: {
        bg: 'bg-accent/10',
        text: 'text-accent',
        border: 'border-accent/20',
        button: 'default'
      },
      warning: {
        bg: 'bg-warning/10',
        text: 'text-warning',
        border: 'border-warning/20',
        button: 'outline'
      }
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  return (
    <section id="related-tools" className="py-12">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Icon name="Wrench" size={24} className="text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Related Trading Tools</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Complement your framework knowledge with our specialized trading calculators and risk management tools. 
          Each tool is designed to work seamlessly with the FXFORECAST methodology.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools?.map((tool) => {
          const colors = getColorClasses(tool?.color);
          
          return (
            <div key={tool?.id} className="bg-card border border-border rounded-lg p-6 shadow-soft hover:shadow-elevated transition-all duration-300">
              {/* Header */}
              <div className="flex items-start space-x-3 mb-4">
                <div className={`w-12 h-12 ${colors?.bg} rounded-lg flex items-center justify-center border ${colors?.border}`}>
                  <Icon name={tool?.icon} size={24} className={colors?.text} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-card-foreground mb-1">{tool?.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tool?.description}</p>
                </div>
              </div>
              {/* Features */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-card-foreground mb-3">Key Features</h4>
                <ul className="space-y-2">
                  {tool?.features?.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm">
                      <Icon name="Check" size={14} className={`${colors?.text} flex-shrink-0`} />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Action */}
              <Button
                variant={colors?.button}
                fullWidth
                onClick={() => window.location.href = '/trading-tools-dashboard'}
                iconName="ExternalLink"
                iconPosition="right"
                iconSize={16}
              >
                Use Tool
              </Button>
            </div>
          );
        })}
      </div>
      {/* CTA Section */}
      <div className="mt-12 bg-muted rounded-lg p-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold text-foreground mb-3">Ready to Apply the Framework?</h3>
          <p className="text-muted-foreground mb-6">
            Start using our trading tools to implement the FXFORECAST methodology in your daily trading routine. 
            Each tool is calibrated to work with the risk management principles you've learned.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="default"
              onClick={() => window.location.href = '/trading-tools-dashboard'}
              iconName="Calculator"
              iconPosition="left"
              iconSize={16}
            >
              Access Trading Tools
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.href = '/home-page'}
              iconName="Home"
              iconPosition="left"
              iconSize={16}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedToolsSection;
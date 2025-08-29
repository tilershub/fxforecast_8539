import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ToolsPreviewSection = () => {
  const tools = [
    {
      id: 1,
      icon: "Calculator",
      title: "Position Size Calculator",
      description: "Calculate exact lot sizes based on your risk percentage and account equity. Never guess your position size again.",
      features: [
        "Account equity input",
        "Risk percentage (0.5% default)",
        "Currency pair selection",
        "Pip value calculations"
      ],
      color: "primary",
      route: "/trading-tools-dashboard"
    },
    {
      id: 2,
      icon: "Target",
      title: "ADR Exit Helper",
      description: "Set realistic profit targets using Average Daily Range data. Know when to exit for maximum consistency.",
      features: [
        "14-period ADR calculation",
        "30-50% exit levels",
        "Daily progress tracking",
        "Pair-specific ranges"
      ],
      color: "success",
      route: "/trading-tools-dashboard"
    },
    {
      id: 3,
      icon: "Shield",
      title: "Risk Guard",
      description: "Monitor your daily and weekly risk exposure. Get real-time status updates to stay within funded account limits.",
      features: [
        "Daily P/L tracking",
        "Weekly drawdown monitor",
        "Trade counter",
        "SAFE/WARNING/LOCKED status"
      ],
      color: "warning",
      route: "/trading-tools-dashboard"
    }
  ];

  const handleToolClick = (route) => {
    window.location.href = route;
  };

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="Wrench" size={16} />
            <span>Trading Tools</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Essential Trading Calculators
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Professional-grade tools designed specifically for funded traders. 
            Calculate, monitor, and manage your risk with precision.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {tools?.map((tool) => (
            <div
              key={tool?.id}
              className="bg-card rounded-xl p-8 shadow-soft hover:shadow-elevated transition-all duration-300 border border-border group cursor-pointer"
              onClick={() => handleToolClick(tool?.route)}
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-lg bg-${tool?.color}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={tool?.icon} size={32} className={`text-${tool?.color}`} />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-card-foreground mb-4 group-hover:text-primary transition-colors">
                {tool?.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {tool?.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {tool?.features?.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Icon name="Check" size={14} className={`text-${tool?.color}`} />
                    <span className="text-sm text-card-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant="outline"
                size="sm"
                iconName="ArrowRight"
                iconPosition="right"
                iconSize={14}
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all"
              >
                Try Now
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Button
            variant="default"
            size="lg"
            onClick={() => handleToolClick('/trading-tools-dashboard')}
            iconName="Calculator"
            iconPosition="left"
            iconSize={20}
            className="px-8 py-4"
          >
            Access All Trading Tools
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ToolsPreviewSection;
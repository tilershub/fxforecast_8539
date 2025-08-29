import React from 'react';
import Icon from '../../../components/AppIcon';

const WhyThisWorksSection = () => {
  const pillars = [
    {
      id: 1,
      icon: "Shield",
      title: "Risk Discipline",
      description: "Never risk more than 0.5% per trade with strict daily and weekly drawdown limits. Our framework enforces discipline when emotions run high.",
      features: [
        "0.5% maximum risk per trade",
        "2 trades per day limit",
        "-1% daily stop loss",
        "-4% weekly drawdown protection"
      ],
      color: "text-success"
    },
    {
      id: 2,
      icon: "Clock",
      title: "Session Focus",
      description: "Trade only during high-probability sessions with clear market structure. Focus beats frequency every time in funded trading.",
      features: [
        "London & New York sessions",
        "High volatility periods",
        "Clear market structure",
        "Quality over quantity"
      ],
      color: "text-primary"
    },
    {
      id: 3,
      icon: "Target",
      title: "ADR Exits",
      description: "Use Average Daily Range to set realistic profit targets. Exit at 30-50% ADR levels for consistent, sustainable gains.",
      features: [
        "ADR-based profit targets",
        "30-50% range exits",
        "Consistent profit taking",
        "Sustainable growth"
      ],
      color: "text-warning"
    }
  ];

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Why This Framework Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Three core principles that separate successful funded traders from the rest. 
            Built on discipline, timing, and realistic expectations.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars?.map((pillar, index) => (
            <div
              key={pillar?.id}
              className="bg-card rounded-xl p-8 shadow-soft hover:shadow-elevated transition-all duration-300 border border-border group"
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-lg bg-${pillar?.color?.split('-')?.[1]}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={pillar?.icon} size={32} className={pillar?.color} />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-card-foreground mb-4">
                {pillar?.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {pillar?.description}
              </p>

              {/* Features List */}
              <ul className="space-y-3">
                {pillar?.features?.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full bg-${pillar?.color?.split('-')?.[1]}`}></div>
                    <span className="text-sm text-card-foreground font-medium">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Step Number */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-medium">
            <Icon name="CheckCircle" size={16} />
            <span>Proven by 5,000+ funded traders worldwide</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyThisWorksSection;
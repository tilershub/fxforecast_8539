import React, { useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RuleCard from './components/RuleCard';
import ADRTutorial from './components/ADRTutorial';
import TableOfContents from './components/TableOfContents';
import RelatedToolsSection from './components/RelatedToolsSection';
import ShareButtons from './components/ShareButtons';

const FrameworkPage = () => {
  useEffect(() => {
    document.title = 'FXFORECAST Trading Framework - Complete Risk Management Guide';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription?.setAttribute('content', 'Master the complete FXFORECAST trading framework with structured risk management rules, ADR-based exits, and disciplined trading psychology for funded account success.');
    }
  }, []);

  const frameworkRules = [
    {
      id: 'risk-per-trade',
      category: 'Risk Management',
      priority: 'Critical',
      title: 'Maximum 0.5% Risk Per Trade',
      description: 'Never risk more than 0.5% of your account balance on any single trade. This is the foundation of capital preservation and the key to long-term funded account success.',
      coreRule: 'Risk = Account Balance × 0.005',
      example: 'On a $100,000 account, maximum risk per trade is $500. If your stop loss is 20 pips on EUR/USD, your position size should be 2.5 lots maximum.',
      calculation: `Position Size = Risk Amount ÷ (Stop Loss in Pips × Pip Value)

Example:
Account: $100,000
Risk: 0.5% = $500
Stop Loss: 20 pips
Pair: EUR/USD (pip value = $10 per lot)

Position Size = $500 ÷ (20 × $10) = 2.5 lots`,
      hasAdvanced: true,
      advanced: {
        tips: [
          'Use position size calculators to avoid manual calculation errors',
          'Account for spread when calculating stop loss distance',
          'Consider correlation risk when holding multiple positions'
        ],
        warnings: [
          'Never increase position size to "make up" for previous losses',
          'Don\'t ignore swap costs on overnight positions',
          'Avoid risking more during "high confidence" setups'
        ]
      },
      relatedTools: ['Position Size Calculator', 'Risk Guard']
    },
    {
      id: 'daily-trade-limit',
      category: 'Risk Management',
      priority: 'Critical',
      title: 'Maximum 2 Trades Per Day',
      description: 'Limit yourself to a maximum of 2 trades per trading day. This prevents overtrading, maintains focus on quality setups, and preserves mental capital.',
      coreRule: 'Daily Trade Count ≤ 2',
      example: 'If you take a trade on EUR/USD at 8:00 AM and it hits your stop loss, you have one more trade opportunity for the day. Use it wisely on your highest conviction setup.',
      hasAdvanced: true,
      advanced: {
        tips: [
          'Plan your trades during pre-market analysis',
          'If first trade is profitable, consider taking profits and waiting',
          'Use trade journal to track daily trade count'
        ],
        warnings: [
          'Don\'t count demo trades toward your daily limit',
          'Avoid "revenge trading" after a loss',
          'Don\'t split one trade idea into multiple smaller trades'
        ]
      },
      relatedTools: ['Risk Guard']
    },
    {
      id: 'session-focus',
      category: 'Session Focus',
      priority: 'High',
      title: 'Trade Only During Your Chosen Session',
      description: 'Focus on one major trading session (London, New York, or Asian) to develop expertise in specific market conditions and price action patterns.',
      coreRule: 'One Session = One Specialty',
      example: 'If you choose London session (8:00-12:00 GMT), only take trades during this window. This allows you to master the volatility patterns and typical price movements of this session.',
      hasAdvanced: true,
      advanced: {
        tips: [
          'London session: Best for EUR/GBP pairs and breakouts',
          'New York session: Strong trends and USD pairs',
          'Asian session: Range trading and JPY pairs'
        ],
        warnings: [
          'Don\'t trade during session overlaps until you\'re experienced',
          'Avoid trading during major news releases outside your session',
          'Don\'t switch sessions based on recent performance'
        ]
      }
    },
    {
      id: 'adr-exits',
      category: 'Exit Strategy',
      priority: 'High',
      title: 'Use ADR-Based Exit Targets',
      description: 'Set profit targets based on Average Daily Range (ADR) percentages. Take partial profits at 30% and 50% ADR levels to maximize probability of profit.',
      coreRule: 'Target 1: 30% ADR | Target 2: 50% ADR',
      example: 'EUR/USD has an ADR of 80 pips. Your targets should be at 24 pips (30%) and 40 pips (50%) from your entry point.',
      calculation: `ADR Calculation:
ADR = Sum of Daily Ranges ÷ 14 days
Daily Range = High - Low (in pips)

Exit Targets:
Target 1 = Entry ± (ADR × 0.30)
Target 2 = Entry ± (ADR × 0.50)`,
      hasAdvanced: true,
      advanced: {
        tips: [
          'Close 50% of position at Target 1, 50% at Target 2',
          'Move stop loss to breakeven after Target 1 is hit',
          'Use trailing stops beyond Target 2 if momentum continues'
        ],
        warnings: [
          'Don\'t hold for full ADR on low volatility days',
          'Adjust targets for news events and market conditions',
          'Don\'t ignore support/resistance levels near ADR targets'
        ]
      },
      relatedTools: ['ADR Exit Helper']
    },
    {
      id: 'daily-drawdown',
      category: 'Risk Management',
      priority: 'Critical',
      title: 'Stop Trading at -1% Daily Loss',
      description: 'If your account reaches -1% loss for the day, stop trading immediately. This prevents emotional decision-making and protects your capital from further damage.',
      coreRule: 'Daily Loss ≥ 1% = Trading Stop',
      example: 'On a $100,000 account, if you lose $1,000 in a day, close all positions and stop trading until the next day.',
      hasAdvanced: true,
      advanced: {
        tips: [
          'Set account alerts at -0.75% to prepare for potential stop',
          'Use this time for trade review and analysis',
          'Plan next day\'s trades during the break'
        ],
        warnings: [
          'Don\'t try to "make it back" with larger position sizes',
          'Avoid switching to different currency pairs',
          'Don\'t count unrealized P&L toward the daily limit'
        ]
      },
      relatedTools: ['Risk Guard']
    },
    {
      id: 'weekly-drawdown',
      category: 'Risk Management',
      priority: 'Critical',
      title: 'Stop Trading at -4% Weekly Loss',
      description: 'If your account reaches -4% loss for the week, stop trading until the following Monday. This provides time to reassess strategy and emotional state.',
      coreRule: 'Weekly Loss ≥ 4% = Week Break',
      example: 'On a $100,000 account, if you lose $4,000 in a week, take a break until Monday to reset mentally and review your trading approach.',
      hasAdvanced: true,
      advanced: {
        tips: [
          'Use the break for education and strategy refinement',
          'Review all trades from the week for patterns',
          'Consider reducing position sizes when returning'
        ],
        warnings: [
          'Don\'t trade on demo to "stay sharp" during the break',
          'Avoid analyzing charts obsessively during time off',
          'Don\'t blame external factors for the drawdown'
        ]
      },
      relatedTools: ['Risk Guard']
    },
    {
      id: 'entry-confirmation',
      category: 'Entry Rules',
      priority: 'Medium',
      title: 'Wait for 3-Point Confirmation',
      description: 'Only enter trades when you have confirmation from three independent factors: technical setup, momentum, and risk-reward ratio of at least 1:2.',
      coreRule: 'Entry = Technical + Momentum + R:R ≥ 1:2',
      example: 'EUR/USD shows support bounce (technical), RSI oversold recovery (momentum), and 20-pip stop with 40-pip target (1:2 R:R). All three confirm - trade is valid.',
      hasAdvanced: true,
      advanced: {
        tips: [
          'Technical: Support/resistance, trendlines, patterns',
          'Momentum: RSI, MACD, price action signals',
          'Always calculate R:R before entering'
        ],
        warnings: [
          'Don\'t force trades when only 2 factors align',
          'Avoid entering during major news events',
          'Don\'t ignore overall market sentiment'
        ]
      }
    },
    {
      id: 'psychology-discipline',
      category: 'Psychology',
      priority: 'High',
      title: 'Follow Rules Without Exception',
      description: 'Discipline is the difference between profitable and unprofitable traders. Follow every rule consistently, regardless of recent performance or market conditions.',
      coreRule: 'Rules > Emotions > Opinions',
      example: 'Even if you\'ve had 5 winning trades in a row, don\'t increase your risk per trade. Even if you\'ve had 3 losses, don\'t skip the next valid setup.',
      hasAdvanced: true,
      advanced: {
        tips: [
          'Keep a trading journal to track rule adherence',
          'Set up automated alerts for risk limits',
          'Review rules daily before market open'
        ],
        warnings: [
          'Don\'t modify rules based on short-term results',
          'Avoid "just this once" exceptions',
          'Don\'t let winning streaks create overconfidence'
        ]
      }
    }
  ];

  const breadcrumbItems = [
    { label: 'Home', path: '/home-page' },
    { label: 'Framework', path: '/framework-page' }
  ];

  const tocSections = [
    { id: 'framework-overview', title: 'Framework Overview', level: 1 },
    { id: 'risk-management', title: 'Risk Management Rules', level: 1 },
    { id: 'session-focus', title: 'Session Focus Strategy', level: 1 },
    { id: 'exit-strategy', title: 'ADR-Based Exits', level: 1 },
    { id: 'entry-rules', title: 'Entry Confirmation', level: 1 },
    { id: 'psychology', title: 'Trading Psychology', level: 1 },
    { id: 'adr-tutorial', title: 'ADR Tutorial', level: 1 },
    { id: 'related-tools', title: 'Related Tools', level: 1 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={breadcrumbItems} />
          
          {/* Hero Section */}
          <section id="framework-overview" className="text-center mb-12">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="BookOpen" size={28} className="text-primary" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  FXFORECAST Trading Framework
                </h1>
              </div>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Master the complete methodology for disciplined forex trading. This framework has been designed 
                specifically for funded account success through structured risk management, session-focused trading, 
                and ADR-based exit strategies.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => document.getElementById('risk-management')?.scrollIntoView({ behavior: 'smooth' })}
                  iconName="ArrowDown"
                  iconPosition="right"
                  iconSize={18}
                >
                  Start Learning
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.location.href = '/trading-tools-dashboard'}
                  iconName="Calculator"
                  iconPosition="left"
                  iconSize={18}
                >
                  Try Tools
                </Button>
              </div>

              {/* Framework Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary mb-1">8</div>
                  <div className="text-xs text-muted-foreground">Core Rules</div>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="text-2xl font-bold text-accent mb-1">0.5%</div>
                  <div className="text-xs text-muted-foreground">Max Risk</div>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="text-2xl font-bold text-warning mb-1">2</div>
                  <div className="text-xs text-muted-foreground">Daily Trades</div>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="text-2xl font-bold text-success mb-1">ADR</div>
                  <div className="text-xs text-muted-foreground">Based Exits</div>
                </div>
              </div>
            </div>
          </section>

          {/* Framework Rules */}
          <section id="risk-management" className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-3">Framework Rules</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Each rule is designed to work together as a complete system. Follow all rules consistently 
                for optimal results in funded trading environments.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {frameworkRules?.map((rule, index) => (
                <RuleCard key={rule?.id} rule={rule} index={index} />
              ))}
            </div>
          </section>

          {/* ADR Tutorial Section */}
          <section id="adr-tutorial" className="mb-12">
            <ADRTutorial />
          </section>

          {/* Share Section */}
          <section className="mb-12">
            <div className="max-w-md mx-auto">
              <ShareButtons />
            </div>
          </section>

          {/* Related Tools */}
          <RelatedToolsSection />

          {/* Call to Action */}
          <section className="mt-16 bg-primary/5 border border-primary/10 rounded-lg p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Icon name="Rocket" size={24} className="text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Ready to Start Your Funded Journey?</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Apply this framework with our trading tools and take the next step toward funded account success. 
                Join thousands of traders who trust the FXFORECAST methodology.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => window.open('https://ftmo.com/?utm_source=fxforecast&utm_medium=site&utm_campaign=cta', '_blank')}
                  iconName="ExternalLink"
                  iconPosition="right"
                  iconSize={18}
                >
                  Try FTMO Challenge
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.location.href = '/home-page'}
                  iconName="Home"
                  iconPosition="left"
                  iconSize={18}
                >
                  Back to Home
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
      {/* Table of Contents */}
      <TableOfContents sections={tocSections} />
    </div>
  );
};

export default FrameworkPage;
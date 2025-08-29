import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ADRTutorial = () => {
  const [selectedPair, setSelectedPair] = useState('EURUSD');
  const [currentStep, setCurrentStep] = useState(0);

  const currencyPairs = [
    { value: 'EURUSD', label: 'EUR/USD', pipValue: 0.0001, adr: 85 },
    { value: 'GBPUSD', label: 'GBP/USD', pipValue: 0.0001, adr: 95 },
    { value: 'USDJPY', label: 'USD/JPY', pipValue: 0.01, adr: 78 },
    { value: 'AUDUSD', label: 'AUD/USD', pipValue: 0.0001, adr: 72 },
    { value: 'USDCAD', label: 'USD/CAD', pipValue: 0.0001, adr: 68 },
    { value: 'EURJPY', label: 'EUR/JPY', pipValue: 0.01, adr: 92 }
  ];

  const selectedPairData = currencyPairs?.find(pair => pair?.value === selectedPair);

  const tutorialSteps = [
    {
      title: "Understanding ADR (Average Daily Range)",
      content: `ADR represents the average number of pips a currency pair moves in a single trading day over a specified period (typically 14 days).\n\nThis metric helps traders:\n• Set realistic profit targets\n• Determine appropriate stop losses\n• Understand market volatility patterns`,
      icon: "BarChart3"
    },
    {
      title: "Calculating ADR",
      content: `ADR is calculated using this formula:\n\nADR = Sum of Daily Ranges ÷ Number of Days\n\nDaily Range = High - Low (in pips)\n\nFor ${selectedPair}: Current ADR(14) = ${selectedPairData?.adr} pips`,
      icon: "Calculator"
    },
    {
      title: "Using ADR for Exit Strategy",
      content: `FXFORECAST uses ADR-based exits:\n\n• 30% ADR Target: ${Math.round(selectedPairData?.adr * 0.3)} pips\n• 50% ADR Target: ${Math.round(selectedPairData?.adr * 0.5)} pips\n• 70% ADR Target: ${Math.round(selectedPairData?.adr * 0.7)} pips\n\nExit portions of your position at these levels to maximize probability of profit.`,
      icon: "Target"
    },
    {
      title: "Practical Application",
      content: `Example Trade Setup for ${selectedPair}:\n\nEntry: 1.0850\nStop Loss: 1.0830 (20 pips)\nTarget 1 (30% ADR): 1.0875 (25 pips)\nTarget 2 (50% ADR): 1.0892 (42 pips)\n\nThis gives you a 1:2+ risk-reward ratio while respecting daily volatility limits.`,
      icon: "TrendingUp"
    }
  ];

  const currentStepData = tutorialSteps?.[currentStep];

  const nextStep = () => {
    if (currentStep < tutorialSteps?.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="GraduationCap" size={20} className="text-accent" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-card-foreground">ADR Tutorial</h2>
            <p className="text-sm text-muted-foreground">Learn to use Average Daily Range in your trading</p>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          Step {currentStep + 1} of {tutorialSteps?.length}
        </div>
      </div>
      {/* Currency Pair Selector */}
      <div className="mb-6">
        <Select
          label="Select Currency Pair"
          options={currencyPairs}
          value={selectedPair}
          onChange={setSelectedPair}
          className="max-w-xs"
        />
      </div>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-card-foreground">Progress</span>
          <span className="text-sm text-muted-foreground">
            {Math.round(((currentStep + 1) / tutorialSteps?.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-accent h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / tutorialSteps?.length) * 100}%` }}
          />
        </div>
      </div>
      {/* Tutorial Content */}
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={currentStepData?.icon} size={18} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-card-foreground">{currentStepData?.title}</h3>
        </div>
        
        <div className="bg-background border border-border rounded-lg p-4">
          <pre className="text-sm text-foreground whitespace-pre-wrap font-sans leading-relaxed">
            {currentStepData?.content}
          </pre>
        </div>
      </div>
      {/* Current Pair Stats */}
      <div className="bg-muted rounded-lg p-4 mb-6">
        <h4 className="font-medium text-card-foreground mb-3 flex items-center">
          <Icon name="Info" size={16} className="mr-2 text-primary" />
          {selectedPair} Statistics
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Pip Value</div>
            <div className="font-mono text-sm text-card-foreground">{selectedPairData?.pipValue}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">ADR(14)</div>
            <div className="font-mono text-sm text-card-foreground">{selectedPairData?.adr} pips</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">30% Target</div>
            <div className="font-mono text-sm text-accent">{Math.round(selectedPairData?.adr * 0.3)} pips</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">50% Target</div>
            <div className="font-mono text-sm text-accent">{Math.round(selectedPairData?.adr * 0.5)} pips</div>
          </div>
        </div>
      </div>
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
          iconName="ChevronLeft"
          iconPosition="left"
          iconSize={16}
        >
          Previous
        </Button>

        <div className="flex space-x-1">
          {tutorialSteps?.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentStep ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>

        <Button
          variant="default"
          onClick={nextStep}
          disabled={currentStep === tutorialSteps?.length - 1}
          iconName="ChevronRight"
          iconPosition="right"
          iconSize={16}
        >
          {currentStep === tutorialSteps?.length - 1 ? 'Complete' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default ADRTutorial;
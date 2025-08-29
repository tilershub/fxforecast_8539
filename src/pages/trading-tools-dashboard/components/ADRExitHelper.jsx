import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ADRExitHelper = () => {
  const [formData, setFormData] = useState({
    currencyPair: 'EURUSD',
    adrValue: '',
    entryPrice: '',
    direction: 'long'
  });
  
  const [results, setResults] = useState({
    tp30: 0,
    tp50: 0,
    currentProgress: 0,
    progressPercentage: 0
  });
  
  const [todayProgress, setTodayProgress] = useState({
    high: '',
    low: '',
    current: ''
  });
  
  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);

  const currencyPairs = [
    { value: 'EURUSD', label: 'EUR/USD', avgADR: '75' },
    { value: 'GBPUSD', label: 'GBP/USD', avgADR: '95' },
    { value: 'USDJPY', label: 'USD/JPY', avgADR: '85' },
    { value: 'USDCHF', label: 'USD/CHF', avgADR: '70' },
    { value: 'AUDUSD', label: 'AUD/USD', avgADR: '80' },
    { value: 'USDCAD', label: 'USD/CAD', avgADR: '75' },
    { value: 'NZDUSD', label: 'NZD/USD', avgADR: '85' },
    { value: 'EURJPY', label: 'EUR/JPY', avgADR: '110' },
    { value: 'GBPJPY', label: 'GBP/JPY', avgADR: '130' },
    { value: 'EURGBP', label: 'EUR/GBP', avgADR: '60' }
  ];

  const directionOptions = [
    { value: 'long', label: 'Long (Buy)' },
    { value: 'short', label: 'Short (Sell)' }
  ];

  const validateInputs = () => {
    const newErrors = {};
    
    if (!formData?.adrValue || parseFloat(formData?.adrValue) <= 0) {
      newErrors.adrValue = 'ADR value must be greater than 0';
    }
    
    if (!formData?.entryPrice || parseFloat(formData?.entryPrice) <= 0) {
      newErrors.entryPrice = 'Entry price must be greater than 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const calculateExitLevels = () => {
    if (!validateInputs()) return;
    
    const adr = parseFloat(formData?.adrValue);
    const entry = parseFloat(formData?.entryPrice);
    const isJpyPair = formData?.currencyPair?.includes('JPY');
    const pipMultiplier = isJpyPair ? 0.01 : 0.0001;
    
    const adr30Pips = adr * 0.3;
    const adr50Pips = adr * 0.5;
    
    let tp30, tp50;
    
    if (formData?.direction === 'long') {
      tp30 = entry + (adr30Pips * pipMultiplier);
      tp50 = entry + (adr50Pips * pipMultiplier);
    } else {
      tp30 = entry - (adr30Pips * pipMultiplier);
      tp50 = entry - (adr50Pips * pipMultiplier);
    }
    
    setResults({
      tp30: Math.round(tp30 * 100000) / 100000,
      tp50: Math.round(tp50 * 100000) / 100000,
      currentProgress: 0,
      progressPercentage: 0
    });
  };

  const calculateProgress = () => {
    if (!todayProgress?.current || !formData?.entryPrice || !formData?.adrValue) return;
    
    const entry = parseFloat(formData?.entryPrice);
    const current = parseFloat(todayProgress?.current);
    const adr = parseFloat(formData?.adrValue);
    const isJpyPair = formData?.currencyPair?.includes('JPY');
    const pipMultiplier = isJpyPair ? 0.01 : 0.0001;
    
    let progressPips;
    if (formData?.direction === 'long') {
      progressPips = (current - entry) / pipMultiplier;
    } else {
      progressPips = (entry - current) / pipMultiplier;
    }
    
    const progressPercentage = Math.max(0, Math.min(100, (progressPips / adr) * 100));
    
    setResults(prev => ({
      ...prev,
      currentProgress: Math.round(progressPips * 10) / 10,
      progressPercentage: Math.round(progressPercentage * 10) / 10
    }));
  };

  useEffect(() => {
    if (formData?.adrValue && formData?.entryPrice) {
      calculateExitLevels();
    }
  }, [formData?.adrValue, formData?.entryPrice, formData?.direction, formData?.currencyPair]);

  useEffect(() => {
    calculateProgress();
  }, [todayProgress?.current, formData?.entryPrice, formData?.adrValue, formData?.direction]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePairChange = (value) => {
    const selectedPair = currencyPairs?.find(pair => pair?.value === value);
    setFormData(prev => ({ 
      ...prev, 
      currencyPair: value,
      adrValue: selectedPair?.avgADR || ''
    }));
  };

  const copyResults = async () => {
    const resultText = `ADR Exit Helper Results:
Pair: ${formData?.currencyPair}
Direction: ${formData?.direction?.toUpperCase()}
Entry: ${formData?.entryPrice}
ADR(14): ${formData?.adrValue} pips
30% TP: ${results?.tp30}
50% TP: ${results?.tp50}
Current Progress: ${results?.currentProgress} pips (${results?.progressPercentage}%)`;

    try {
      await navigator.clipboard?.writeText(resultText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getProgressColor = () => {
    if (results?.progressPercentage >= 50) return 'bg-success';
    if (results?.progressPercentage >= 30) return 'bg-warning';
    return 'bg-primary';
  };

  const getProgressStatus = () => {
    if (results?.progressPercentage >= 50) return 'Target Reached';
    if (results?.progressPercentage >= 30) return 'Partial Target';
    return 'In Progress';
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Currency Pair"
          options={currencyPairs}
          value={formData?.currencyPair}
          onChange={handlePairChange}
          description="ADR value auto-fills with average"
          required
        />
        
        <Select
          label="Trade Direction"
          options={directionOptions}
          value={formData?.direction}
          onChange={(value) => handleInputChange('direction', value)}
          required
        />
        
        <Input
          label="ADR(14) Value (pips)"
          type="number"
          placeholder="75"
          value={formData?.adrValue}
          onChange={(e) => handleInputChange('adrValue', e?.target?.value)}
          error={errors?.adrValue}
          description="14-day Average Daily Range"
          required
        />
        
        <Input
          label="Entry Price"
          type="number"
          step="0.00001"
          placeholder="1.08500"
          value={formData?.entryPrice}
          onChange={(e) => handleInputChange('entryPrice', e?.target?.value)}
          error={errors?.entryPrice}
          required
        />
      </div>
      {results?.tp30 > 0 && (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-card-foreground">Exit Levels</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={copyResults}
              iconName={copied ? "Check" : "Copy"}
              iconPosition="left"
              iconSize={16}
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <div className="text-sm text-muted-foreground">30% ADR Target</div>
                  <div className="text-xl font-bold text-foreground">{results?.tp30}</div>
                </div>
                <div className="w-12 h-12 bg-warning/20 rounded-full flex items-center justify-center">
                  <Icon name="Target" size={20} className="text-warning" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <div className="text-sm text-muted-foreground">50% ADR Target</div>
                  <div className="text-xl font-bold text-foreground">{results?.tp50}</div>
                </div>
                <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center">
                  <Icon name="Target" size={20} className="text-success" />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-card-foreground">Today's Progress Tracker</h4>
              
              <Input
                label="Current Price"
                type="number"
                step="0.00001"
                placeholder="1.08350"
                value={todayProgress?.current}
                onChange={(e) => setTodayProgress(prev => ({ ...prev, current: e?.target?.value }))}
                description="Enter current market price"
              />
              
              {results?.currentProgress !== 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-card-foreground">Progress</span>
                    <span className="text-sm font-medium text-card-foreground">
                      {results?.currentProgress} pips ({results?.progressPercentage}%)
                    </span>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-300 ${getProgressColor()}`}
                      style={{ width: `${Math.min(100, results?.progressPercentage)}%` }}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${getProgressColor()}`} />
                    <span className="text-sm font-medium text-card-foreground">{getProgressStatus()}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ADRExitHelper;
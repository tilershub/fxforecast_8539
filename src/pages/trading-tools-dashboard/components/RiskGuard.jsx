import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RiskGuard = () => {
  const [riskData, setRiskData] = useState({
    dailyPL: '0',
    weeklyPL: '0',
    tradesTaken: '0',
    openRiskPercent: '0'
  });
  
  const [guardStatus, setGuardStatus] = useState({
    overall: 'SAFE',
    dailyStatus: 'SAFE',
    weeklyStatus: 'SAFE',
    tradesStatus: 'SAFE',
    riskStatus: 'SAFE'
  });
  
  const [explanations, setExplanations] = useState([]);

  const riskLimits = {
    maxDailyLoss: -1.0,
    maxWeeklyLoss: -4.0,
    maxDailyTrades: 2,
    maxRiskPerTrade: 0.5
  };

  const evaluateRiskStatus = () => {
    const dailyPL = parseFloat(riskData?.dailyPL) || 0;
    const weeklyPL = parseFloat(riskData?.weeklyPL) || 0;
    const trades = parseInt(riskData?.tradesTaken) || 0;
    const openRisk = parseFloat(riskData?.openRiskPercent) || 0;
    
    const newStatus = {
      dailyStatus: 'SAFE',
      weeklyStatus: 'SAFE',
      tradesStatus: 'SAFE',
      riskStatus: 'SAFE',
      overall: 'SAFE'
    };
    
    const newExplanations = [];
    
    // Daily P/L Check
    if (dailyPL <= riskLimits?.maxDailyLoss) {
      newStatus.dailyStatus = 'LOCKED';
      newExplanations?.push({
        type: 'error',
        title: 'Daily Loss Limit Reached',
        message: `You've hit the -1% daily loss limit. No more trades today.`
      });
    } else if (dailyPL <= -0.5) {
      newStatus.dailyStatus = 'WARNING';
      newExplanations?.push({
        type: 'warning',
        title: 'Daily Loss Warning',
        message: `You're at ${dailyPL}% daily loss. Approach -1% limit carefully.`
      });
    } else if (dailyPL > 0) {
      newExplanations?.push({
        type: 'success',
        title: 'Daily Performance',
        message: `Positive day with +${dailyPL}% gain. Stay disciplined.`
      });
    }
    
    // Weekly P/L Check
    if (weeklyPL <= riskLimits?.maxWeeklyLoss) {
      newStatus.weeklyStatus = 'LOCKED';
      newExplanations?.push({
        type: 'error',
        title: 'Weekly Loss Limit Reached',
        message: `You've hit the -4% weekly loss limit. No more trades this week.`
      });
    } else if (weeklyPL <= -2.0) {
      newStatus.weeklyStatus = 'WARNING';
      newExplanations?.push({
        type: 'warning',
        title: 'Weekly Loss Warning',
        message: `You're at ${weeklyPL}% weekly loss. Approach -4% limit carefully.`
      });
    }
    
    // Trades Count Check
    if (trades >= riskLimits?.maxDailyTrades) {
      newStatus.tradesStatus = 'LOCKED';
      newExplanations?.push({
        type: 'error',
        title: 'Daily Trade Limit Reached',
        message: `You've taken ${trades} trades today. Maximum is ${riskLimits?.maxDailyTrades}.`
      });
    } else if (trades === 1) {
      newStatus.tradesStatus = 'WARNING';
      newExplanations?.push({
        type: 'warning',
        title: 'Trade Count Warning',
        message: `You've taken 1 trade today. Only 1 more allowed.`
      });
    }
    
    // Open Risk Check
    if (openRisk > riskLimits?.maxRiskPerTrade) {
      newStatus.riskStatus = 'WARNING';
      newExplanations?.push({
        type: 'warning',
        title: 'High Risk Per Trade',
        message: `Current open risk is ${openRisk}%. Recommended maximum is ${riskLimits?.maxRiskPerTrade}%.`
      });
    }
    
    // Overall Status
    if (Object.values(newStatus)?.some(status => status === 'LOCKED')) {
      newStatus.overall = 'LOCKED';
    } else if (Object.values(newStatus)?.some(status => status === 'WARNING')) {
      newStatus.overall = 'WARNING';
    }
    
    // Add safe message if everything is good
    if (newStatus?.overall === 'SAFE' && newExplanations?.length === 0) {
      newExplanations?.push({
        type: 'success',
        title: 'All Systems Green',
        message: 'You\'re within all risk parameters. Trade with confidence but stay disciplined.'
      });
    }
    
    setGuardStatus(newStatus);
    setExplanations(newExplanations);
  };

  useEffect(() => {
    evaluateRiskStatus();
  }, [riskData]);

  const handleInputChange = (field, value) => {
    setRiskData(prev => ({ ...prev, [field]: value }));
  };

  const resetCounters = () => {
    setRiskData(prev => ({
      ...prev,
      tradesTaken: '0',
      openRiskPercent: '0'
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'SAFE': return 'text-success bg-success/10 border-success/20';
      case 'WARNING': return 'text-warning bg-warning/10 border-warning/20';
      case 'LOCKED': return 'text-error bg-error/10 border-error/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'SAFE': return 'Shield';
      case 'WARNING': return 'AlertTriangle';
      case 'LOCKED': return 'Lock';
      default: return 'Shield';
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Overview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-card-foreground">Risk Guard Status</h3>
          <div className={`px-4 py-2 rounded-full border font-semibold text-sm flex items-center space-x-2 ${getStatusColor(guardStatus?.overall)}`}>
            <Icon name={getStatusIcon(guardStatus?.overall)} size={16} />
            <span>{guardStatus?.overall}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 ${getStatusColor(guardStatus?.dailyStatus)}`}>
              <Icon name="Calendar" size={20} />
            </div>
            <div className="text-sm font-medium text-card-foreground">Daily P/L</div>
            <div className="text-xs text-muted-foreground">{guardStatus?.dailyStatus}</div>
          </div>
          
          <div className="text-center">
            <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 ${getStatusColor(guardStatus?.weeklyStatus)}`}>
              <Icon name="CalendarDays" size={20} />
            </div>
            <div className="text-sm font-medium text-card-foreground">Weekly P/L</div>
            <div className="text-xs text-muted-foreground">{guardStatus?.weeklyStatus}</div>
          </div>
          
          <div className="text-center">
            <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 ${getStatusColor(guardStatus?.tradesStatus)}`}>
              <Icon name="BarChart3" size={20} />
            </div>
            <div className="text-sm font-medium text-card-foreground">Trade Count</div>
            <div className="text-xs text-muted-foreground">{guardStatus?.tradesStatus}</div>
          </div>
          
          <div className="text-center">
            <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 ${getStatusColor(guardStatus?.riskStatus)}`}>
              <Icon name="TrendingUp" size={20} />
            </div>
            <div className="text-sm font-medium text-card-foreground">Open Risk</div>
            <div className="text-xs text-muted-foreground">{guardStatus?.riskStatus}</div>
          </div>
        </div>
      </div>
      {/* Input Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Daily P/L (%)"
          type="number"
          step="0.1"
          placeholder="0.0"
          value={riskData?.dailyPL}
          onChange={(e) => handleInputChange('dailyPL', e?.target?.value)}
          description="Today's profit/loss percentage"
        />
        
        <Input
          label="Weekly P/L (%)"
          type="number"
          step="0.1"
          placeholder="0.0"
          value={riskData?.weeklyPL}
          onChange={(e) => handleInputChange('weeklyPL', e?.target?.value)}
          description="This week's profit/loss percentage"
        />
        
        <Input
          label="Trades Taken Today"
          type="number"
          min="0"
          max="10"
          placeholder="0"
          value={riskData?.tradesTaken}
          onChange={(e) => handleInputChange('tradesTaken', e?.target?.value)}
          description={`Maximum: ${riskLimits?.maxDailyTrades} trades per day`}
        />
        
        <Input
          label="Open Risk (%)"
          type="number"
          step="0.1"
          min="0"
          placeholder="0.0"
          value={riskData?.openRiskPercent}
          onChange={(e) => handleInputChange('openRiskPercent', e?.target?.value)}
          description="Current open position risk percentage"
        />
      </div>
      {/* Reset Controls */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={resetCounters}
          iconName="RotateCcw"
          iconPosition="left"
          iconSize={16}
        >
          Reset Counters
        </Button>
      </div>
      {/* Explanations */}
      <div className="space-y-3">
        <h4 className="font-medium text-card-foreground">Risk Analysis</h4>
        {explanations?.map((explanation, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border flex items-start space-x-3 ${
              explanation?.type === 'success' ?'bg-success/10 text-success border-success/20'
                : explanation?.type === 'warning' ?'bg-warning/10 text-warning border-warning/20' :'bg-error/10 text-error border-error/20'
            }`}
          >
            <Icon 
              name={
                explanation?.type === 'success' ? 'CheckCircle' :
                explanation?.type === 'warning' ? 'AlertTriangle' : 'XCircle'
              } 
              size={20} 
              className="mt-0.5 flex-shrink-0"
            />
            <div>
              <div className="font-medium text-sm mb-1">{explanation?.title}</div>
              <div className="text-sm opacity-90">{explanation?.message}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Risk Limits Reference */}
      <div className="bg-muted/50 rounded-lg p-4">
        <h4 className="font-medium text-card-foreground mb-3">FXFORECAST Risk Limits</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">Max Daily Loss</div>
            <div className="font-medium text-card-foreground">-1.0%</div>
          </div>
          <div>
            <div className="text-muted-foreground">Max Weekly Loss</div>
            <div className="font-medium text-card-foreground">-4.0%</div>
          </div>
          <div>
            <div className="text-muted-foreground">Max Daily Trades</div>
            <div className="font-medium text-card-foreground">2 trades</div>
          </div>
          <div>
            <div className="text-muted-foreground">Max Risk Per Trade</div>
            <div className="font-medium text-card-foreground">0.5%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskGuard;
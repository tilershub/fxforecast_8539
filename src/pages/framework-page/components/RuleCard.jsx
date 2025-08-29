import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RuleCard = ({ rule, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getRuleIcon = (category) => {
    const iconMap = {
      'Risk Management': 'Shield',
      'Session Focus': 'Clock',
      'Exit Strategy': 'Target',
      'Entry Rules': 'TrendingUp',
      'Psychology': 'Brain',
      'Analysis': 'BarChart3'
    };
    return iconMap?.[category] || 'CheckCircle';
  };

  const getPriorityColor = (priority) => {
    const colorMap = {
      'Critical': 'bg-error/10 text-error border-error/20',
      'High': 'bg-warning/10 text-warning border-warning/20',
      'Medium': 'bg-primary/10 text-primary border-primary/20',
      'Low': 'bg-muted text-muted-foreground border-border'
    };
    return colorMap?.[priority] || colorMap?.['Medium'];
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft hover:shadow-elevated transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={getRuleIcon(rule?.category)} size={20} className="text-primary" />
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-xs font-medium text-muted-foreground">Rule {index + 1}</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(rule?.priority)}`}>
                {rule?.priority}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-card-foreground">{rule?.title}</h3>
          </div>
        </div>
        {rule?.hasAdvanced && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
            iconPosition="right"
            iconSize={16}
          >
            {isExpanded ? 'Less' : 'More'}
          </Button>
        )}
      </div>
      {/* Category Badge */}
      <div className="mb-4">
        <span className="inline-flex items-center px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full">
          {rule?.category}
        </span>
      </div>
      {/* Description */}
      <p className="text-card-foreground mb-4 leading-relaxed">
        {rule?.description}
      </p>
      {/* Core Rule */}
      <div className="bg-muted rounded-lg p-4 mb-4">
        <div className="flex items-start space-x-2">
          <Icon name="AlertCircle" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-card-foreground mb-1">Core Rule</h4>
            <p className="text-sm text-muted-foreground font-mono">{rule?.coreRule}</p>
          </div>
        </div>
      </div>
      {/* Example */}
      {rule?.example && (
        <div className="mb-4">
          <h4 className="font-medium text-card-foreground mb-2 flex items-center">
            <Icon name="Lightbulb" size={16} className="mr-2 text-warning" />
            Example
          </h4>
          <div className="bg-background border border-border rounded-lg p-3">
            <p className="text-sm text-foreground">{rule?.example}</p>
          </div>
        </div>
      )}
      {/* Calculation */}
      {rule?.calculation && (
        <div className="mb-4">
          <h4 className="font-medium text-card-foreground mb-2 flex items-center">
            <Icon name="Calculator" size={16} className="mr-2 text-accent" />
            Calculation
          </h4>
          <div className="bg-background border border-border rounded-lg p-3 font-mono text-sm">
            <pre className="text-foreground whitespace-pre-wrap">{rule?.calculation}</pre>
          </div>
        </div>
      )}
      {/* Advanced Content */}
      {rule?.hasAdvanced && isExpanded && (
        <div className="border-t border-border pt-4 mt-4">
          <div className="space-y-4">
            {rule?.advanced?.tips && (
              <div>
                <h4 className="font-medium text-card-foreground mb-2 flex items-center">
                  <Icon name="Zap" size={16} className="mr-2 text-success" />
                  Pro Tips
                </h4>
                <ul className="space-y-2">
                  {rule?.advanced?.tips?.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start space-x-2 text-sm">
                      <Icon name="ArrowRight" size={14} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {rule?.advanced?.warnings && (
              <div>
                <h4 className="font-medium text-card-foreground mb-2 flex items-center">
                  <Icon name="AlertTriangle" size={16} className="mr-2 text-warning" />
                  Common Mistakes
                </h4>
                <ul className="space-y-2">
                  {rule?.advanced?.warnings?.map((warning, warningIndex) => (
                    <li key={warningIndex} className="flex items-start space-x-2 text-sm">
                      <Icon name="X" size={14} className="text-error mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Related Tools */}
      {rule?.relatedTools && rule?.relatedTools?.length > 0 && (
        <div className="border-t border-border pt-4 mt-4">
          <h4 className="font-medium text-card-foreground mb-3 flex items-center">
            <Icon name="Wrench" size={16} className="mr-2 text-primary" />
            Related Tools
          </h4>
          <div className="flex flex-wrap gap-2">
            {rule?.relatedTools?.map((tool, toolIndex) => (
              <Button
                key={toolIndex}
                variant="outline"
                size="sm"
                onClick={() => window.location.href = '/trading-tools-dashboard'}
                iconName="ExternalLink"
                iconPosition="right"
                iconSize={14}
              >
                {tool}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RuleCard;
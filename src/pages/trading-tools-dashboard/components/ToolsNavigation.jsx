import React from 'react';
import Icon from '../../../components/AppIcon';

const ToolsNavigation = ({ activeTab, onTabChange, isMobile = false }) => {
  const tools = [
    {
      id: 'position-size',
      name: 'Position Size',
      icon: 'Calculator',
      description: 'Calculate optimal lot sizes'
    },
    {
      id: 'adr-exit',
      name: 'ADR Exit',
      icon: 'Target',
      description: 'ADR-based exit levels'
    },
    {
      id: 'risk-guard',
      name: 'Risk Guard',
      icon: 'Shield',
      description: 'Risk management monitor'
    }
  ];

  if (isMobile) {
    return (
      <div className="flex overflow-x-auto scrollbar-hide border-b border-border bg-background">
        {tools?.map((tool) => (
          <button
            key={tool?.id}
            onClick={() => onTabChange(tool?.id)}
            className={`flex-shrink-0 flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tool?.id
                ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
            }`}
          >
            <Icon name={tool?.icon} size={16} />
            <span>{tool?.name}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {tools?.map((tool) => (
        <button
          key={tool?.id}
          onClick={() => onTabChange(tool?.id)}
          className={`p-6 rounded-lg border-2 transition-all text-left hover:shadow-soft ${
            activeTab === tool?.id
              ? 'border-primary bg-primary/5 shadow-soft'
              : 'border-border bg-card hover:border-primary/30'
          }`}
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              activeTab === tool?.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              <Icon name={tool?.icon} size={20} />
            </div>
            <div>
              <h3 className={`font-semibold ${
                activeTab === tool?.id ? 'text-primary' : 'text-card-foreground'
              }`}>
                {tool?.name}
              </h3>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{tool?.description}</p>
        </button>
      ))}
    </div>
  );
};

export default ToolsNavigation;
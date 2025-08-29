import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ onFilterChange, onSavePreset, savedPresets = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    dateRange: '',
    author: '',
    tags: '',
    customDateFrom: '',
    customDateTo: ''
  });

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'published', label: 'Published' },
    { value: 'draft', label: 'Draft' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const authorOptions = [
    { value: '', label: 'All Authors' },
    { value: 'admin', label: 'Admin' },
    { value: 'editor', label: 'Editor' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      status: '',
      dateRange: '',
      author: '',
      tags: '',
      customDateFrom: '',
      customDateTo: ''
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={16} className="text-muted-foreground" />
          <span className="font-medium text-card-foreground">Filters</span>
          {hasActiveFilters && (
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              Active
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              iconName="X"
              iconPosition="left"
              iconSize={14}
            >
              Clear
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-8 h-8"
          >
            <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
          </Button>
        </div>
      </div>
      {isExpanded && (
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              label="Status"
              options={statusOptions}
              value={filters?.status}
              onChange={(value) => handleFilterChange('status', value)}
            />

            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={filters?.dateRange}
              onChange={(value) => handleFilterChange('dateRange', value)}
            />

            <Select
              label="Author"
              options={authorOptions}
              value={filters?.author}
              onChange={(value) => handleFilterChange('author', value)}
            />

            <Input
              label="Tags"
              type="text"
              placeholder="Enter tags..."
              value={filters?.tags}
              onChange={(e) => handleFilterChange('tags', e?.target?.value)}
            />
          </div>

          {filters?.dateRange === 'custom' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-border">
              <Input
                label="From Date"
                type="date"
                value={filters?.customDateFrom}
                onChange={(e) => handleFilterChange('customDateFrom', e?.target?.value)}
              />
              <Input
                label="To Date"
                type="date"
                value={filters?.customDateTo}
                onChange={(e) => handleFilterChange('customDateTo', e?.target?.value)}
              />
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Saved Presets:</span>
              {savedPresets?.map((preset) => (
                <Button
                  key={preset?.id}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFilters(preset?.filters);
                    onFilterChange(preset?.filters);
                  }}
                >
                  {preset?.name}
                </Button>
              ))}
            </div>
            
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSavePreset(filters)}
                iconName="Save"
                iconPosition="left"
                iconSize={14}
              >
                Save Preset
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
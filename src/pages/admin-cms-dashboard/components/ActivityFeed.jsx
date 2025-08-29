import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'post_created':
        return { name: 'Plus', color: 'text-success' };
      case 'post_published':
        return { name: 'Eye', color: 'text-primary' };
      case 'post_updated':
        return { name: 'Edit3', color: 'text-warning' };
      case 'post_deleted':
        return { name: 'Trash2', color: 'text-error' };
      case 'media_uploaded':
        return { name: 'Upload', color: 'text-accent' };
      default:
        return { name: 'Activity', color: 'text-muted-foreground' };
    }
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-card-foreground">Recent Activity</h3>
        <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
      </div>
      <div className="space-y-4">
        {activities?.map((activity) => {
          const iconConfig = getActivityIcon(activity?.type);
          
          return (
            <div key={activity?.id} className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${iconConfig?.color}`}>
                <Icon name={iconConfig?.name} size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-card-foreground">
                  <span className="font-medium">{activity?.user}</span> {activity?.action}
                  {activity?.target && (
                    <span className="font-medium"> "{activity?.target}"</span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatTimeAgo(activity?.timestamp)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {activities?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Activity" size={32} className="mx-auto text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground">No recent activity</p>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;
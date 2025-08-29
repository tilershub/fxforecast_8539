import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStats = ({ stats }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-6">Quick Stats</h3>
      <div className="space-y-6">
        {/* Popular Posts */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-card-foreground">Popular Posts</h4>
            <Icon name="TrendingUp" size={16} className="text-success" />
          </div>
          <div className="space-y-2">
            {stats?.popularPosts?.map((post, index) => (
              <div key={post?.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <span className="text-xs font-medium text-muted-foreground w-4">
                    {index + 1}
                  </span>
                  <span className="text-sm text-card-foreground truncate">
                    {post?.title}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground ml-2">
                  {post?.views?.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Comments */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-card-foreground">Recent Comments</h4>
            <Icon name="MessageCircle" size={16} className="text-primary" />
          </div>
          <div className="space-y-3">
            {stats?.recentComments?.map((comment) => (
              <div key={comment?.id} className="border-l-2 border-muted pl-3">
                <p className="text-sm text-card-foreground line-clamp-2 mb-1">
                  "{comment?.content}"
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>by {comment?.author}</span>
                  <span>{new Date(comment.date)?.toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Analytics */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-card-foreground">Traffic Today</h4>
            <Icon name="BarChart3" size={16} className="text-accent" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Page Views</span>
              <span className="text-sm font-medium text-card-foreground">
                {stats?.traffic?.pageViews?.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Unique Visitors</span>
              <span className="text-sm font-medium text-card-foreground">
                {stats?.traffic?.uniqueVisitors?.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Bounce Rate</span>
              <span className="text-sm font-medium text-card-foreground">
                {stats?.traffic?.bounceRate}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;
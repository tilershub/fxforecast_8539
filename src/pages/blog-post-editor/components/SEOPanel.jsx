import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SEOPanel = ({ frontmatter, onChange }) => {
  const handleInputChange = (field, value) => {
    onChange({ ...frontmatter, [field]: value });
  };

  const getMetaDescription = () => {
    return frontmatter?.description || frontmatter?.title || '';
  };

  const getPreviewUrl = () => {
    const baseUrl = 'https://fxforecast.com';
    return `${baseUrl}/blog/${frontmatter?.slug || 'your-post-slug'}`;
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text?.length > maxLength ? text?.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center">
        <Icon name="Search" size={20} className="mr-2" />
        SEO Optimization
      </h3>
      <div className="space-y-6">
        {/* Meta Fields */}
        <div className="space-y-4">
          <Input
            label="Meta Title"
            type="text"
            placeholder="SEO-optimized title (50-60 characters)"
            description={`${(frontmatter?.metaTitle || frontmatter?.title || '')?.length}/60 characters`}
            value={frontmatter?.metaTitle || frontmatter?.title || ''}
            onChange={(e) => handleInputChange('metaTitle', e?.target?.value)}
            maxLength={60}
          />

          <Input
            label="Meta Description"
            type="text"
            placeholder="Brief description for search results (120-160 characters)"
            description={`${getMetaDescription()?.length}/160 characters`}
            value={getMetaDescription()}
            onChange={(e) => handleInputChange('description', e?.target?.value)}
            maxLength={160}
          />

          <Input
            label="Focus Keywords"
            type="text"
            placeholder="forex trading, risk management, funded trading"
            description="Comma-separated keywords for SEO targeting"
            value={frontmatter?.keywords || ''}
            onChange={(e) => handleInputChange('keywords', e?.target?.value)}
          />
        </div>

        {/* Social Media Preview */}
        <div className="space-y-4">
          <h4 className="font-medium text-card-foreground flex items-center">
            <Icon name="Share2" size={16} className="mr-2" />
            Social Media Preview
          </h4>

          {/* Google Search Preview */}
          <div className="border border-border rounded-lg p-4 bg-muted/30">
            <div className="text-xs text-muted-foreground mb-1">Google Search Result</div>
            <div className="space-y-1">
              <div className="text-primary text-sm hover:underline cursor-pointer">
                {truncateText(frontmatter?.metaTitle || frontmatter?.title || 'Your Post Title', 60)}
              </div>
              <div className="text-success text-xs">
                {getPreviewUrl()}
              </div>
              <div className="text-muted-foreground text-sm">
                {truncateText(getMetaDescription(), 160)}
              </div>
            </div>
          </div>

          {/* Facebook/LinkedIn Preview */}
          <div className="border border-border rounded-lg p-4 bg-muted/30">
            <div className="text-xs text-muted-foreground mb-2">Facebook/LinkedIn Preview</div>
            <div className="flex space-x-3">
              {frontmatter?.coverImage && (
                <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={frontmatter?.coverImage}
                    alt="Social preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-card-foreground mb-1">
                  {truncateText(frontmatter?.title || 'Your Post Title', 95)}
                </div>
                <div className="text-xs text-muted-foreground mb-1">
                  {truncateText(getMetaDescription(), 125)}
                </div>
                <div className="text-xs text-muted-foreground uppercase">
                  FXFORECAST.COM
                </div>
              </div>
            </div>
          </div>

          {/* Twitter Preview */}
          <div className="border border-border rounded-lg p-4 bg-muted/30">
            <div className="text-xs text-muted-foreground mb-2">Twitter Preview</div>
            <div className="space-y-2">
              {frontmatter?.coverImage && (
                <div className="w-full h-32 rounded overflow-hidden">
                  <Image
                    src={frontmatter?.coverImage}
                    alt="Twitter preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div>
                <div className="text-sm font-medium text-card-foreground mb-1">
                  {truncateText(frontmatter?.title || 'Your Post Title', 70)}
                </div>
                <div className="text-xs text-muted-foreground mb-1">
                  {truncateText(getMetaDescription(), 125)}
                </div>
                <div className="text-xs text-muted-foreground">
                  🔗 fxforecast.com
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Score */}
        <div className="border border-border rounded-lg p-4 bg-muted/30">
          <h4 className="font-medium text-card-foreground mb-3 flex items-center">
            <Icon name="BarChart3" size={16} className="mr-2" />
            SEO Score
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-card-foreground">Title Length</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                (frontmatter?.title || '')?.length >= 30 && (frontmatter?.title || '')?.length <= 60
                  ? 'bg-success/10 text-success' :'bg-warning/10 text-warning'
              }`}>
                {(frontmatter?.title || '')?.length >= 30 && (frontmatter?.title || '')?.length <= 60 ? 'Good' : 'Needs Work'}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-card-foreground">Meta Description</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                getMetaDescription()?.length >= 120 && getMetaDescription()?.length <= 160
                  ? 'bg-success/10 text-success' :'bg-warning/10 text-warning'
              }`}>
                {getMetaDescription()?.length >= 120 && getMetaDescription()?.length <= 160 ? 'Good' : 'Needs Work'}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-card-foreground">Cover Image</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                frontmatter?.coverImage
                  ? 'bg-success/10 text-success' :'bg-warning/10 text-warning'
              }`}>
                {frontmatter?.coverImage ? 'Added' : 'Missing'}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-card-foreground">Tags</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                frontmatter?.tags && frontmatter?.tags?.length > 0
                  ? 'bg-success/10 text-success' :'bg-warning/10 text-warning'
              }`}>
                {frontmatter?.tags && frontmatter?.tags?.length > 0 ? 'Added' : 'Missing'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOPanel;
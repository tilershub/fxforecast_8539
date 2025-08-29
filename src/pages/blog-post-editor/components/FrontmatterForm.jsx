import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const FrontmatterForm = ({ frontmatter, onChange }) => {
  const [imagePreview, setImagePreview] = useState(frontmatter?.coverImage || '');
  const [availableTags] = useState([
    { value: 'forex', label: 'Forex' },
    { value: 'trading', label: 'Trading' },
    { value: 'risk-management', label: 'Risk Management' },
    { value: 'funded-trading', label: 'Funded Trading' },
    { value: 'adr', label: 'ADR' },
    { value: 'position-sizing', label: 'Position Sizing' },
    { value: 'ftmo', label: 'FTMO' },
    { value: 'strategy', label: 'Strategy' },
    { value: 'education', label: 'Education' },
    { value: 'tools', label: 'Tools' }
  ]);

  const [authorOptions] = useState([
    { value: 'admin', label: 'FXFORECAST Team' },
    { value: 'guest', label: 'Guest Author' }
  ]);

  useEffect(() => {
    if (frontmatter?.title && !frontmatter?.slug) {
      const generatedSlug = frontmatter?.title?.toLowerCase()?.replace(/[^a-z0-9\s-]/g, '')?.replace(/\s+/g, '-')?.replace(/-+/g, '-')?.trim();
      onChange({ ...frontmatter, slug: generatedSlug });
    }
  }, [frontmatter?.title]);

  const handleInputChange = (field, value) => {
    onChange({ ...frontmatter, [field]: value });
  };

  const handleImageUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e?.target?.result;
        setImagePreview(imageUrl);
        handleInputChange('coverImage', imageUrl);
      };
      reader?.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview('');
    handleInputChange('coverImage', '');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center">
        <Icon name="Settings" size={20} className="mr-2" />
        Post Settings
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <Input
            label="Title"
            type="text"
            placeholder="Enter post title"
            value={frontmatter?.title || ''}
            onChange={(e) => handleInputChange('title', e?.target?.value)}
            required
          />

          <Input
            label="Slug"
            type="text"
            placeholder="post-url-slug"
            description="Auto-generated from title, but you can customize it"
            value={frontmatter?.slug || ''}
            onChange={(e) => handleInputChange('slug', e?.target?.value)}
            required
          />

          <Input
            label="Description"
            type="text"
            placeholder="Brief description for SEO and previews"
            description="Recommended: 120-160 characters"
            value={frontmatter?.description || ''}
            onChange={(e) => handleInputChange('description', e?.target?.value)}
            maxLength={160}
          />

          <Select
            label="Tags"
            description="Select relevant tags for categorization"
            options={availableTags}
            value={frontmatter?.tags || []}
            onChange={(value) => handleInputChange('tags', value)}
            multiple
            searchable
            clearable
            placeholder="Choose tags..."
          />
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <Select
            label="Author"
            options={authorOptions}
            value={frontmatter?.author || 'admin'}
            onChange={(value) => handleInputChange('author', value)}
            placeholder="Select author"
          />

          <Input
            label="Publication Date"
            type="datetime-local"
            value={frontmatter?.date || new Date()?.toISOString()?.slice(0, 16)}
            onChange={(e) => handleInputChange('date', e?.target?.value)}
          />

          <Input
            label="Canonical URL"
            type="url"
            placeholder="https://example.com/original-post"
            description="Optional: If this content was published elsewhere first"
            value={frontmatter?.canonicalUrl || ''}
            onChange={(e) => handleInputChange('canonicalUrl', e?.target?.value)}
          />

          <div className="flex items-center space-x-4">
            <Checkbox
              label="Published"
              description="Uncheck to save as draft"
              checked={!frontmatter?.draft}
              onChange={(e) => handleInputChange('draft', !e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      {/* Cover Image Section */}
      <div className="mt-6 pt-6 border-t border-border">
        <label className="block text-sm font-medium text-card-foreground mb-3">
          Cover Image
        </label>
        
        {imagePreview ? (
          <div className="relative">
            <div className="w-full h-48 rounded-lg overflow-hidden bg-muted">
              <Image
                src={imagePreview}
                alt="Cover image preview"
                className="w-full h-full object-cover"
              />
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={removeImage}
              className="absolute top-2 right-2"
              iconName="X"
              iconSize={14}
            >
              Remove
            </Button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <Icon name="Upload" size={32} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-4">
              Drag and drop an image, or click to browse
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="cover-image-upload"
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById('cover-image-upload')?.click()}
              iconName="Upload"
              iconPosition="left"
              iconSize={16}
            >
              Choose Image
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FrontmatterForm;
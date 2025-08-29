import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const MediaGrid = ({ media, onUpload, onDelete, onBulkDelete }) => {
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  const filteredMedia = media?.filter(item =>
    item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    item?.tags?.some(tag => tag?.toLowerCase()?.includes(searchTerm?.toLowerCase()))
  );

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedMedia(filteredMedia?.map(item => item?.id));
    } else {
      setSelectedMedia([]);
    }
  };

  const handleSelectMedia = (mediaId, checked) => {
    if (checked) {
      setSelectedMedia([...selectedMedia, mediaId]);
    } else {
      setSelectedMedia(selectedMedia?.filter(id => id !== mediaId));
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="border-b border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground">Media Library</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('grid')}
              className="w-8 h-8"
            >
              <Icon name="Grid3X3" size={16} />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('list')}
              className="w-8 h-8"
            >
              <Icon name="List" size={16} />
            </Button>
            <Button
              variant="default"
              onClick={onUpload}
              iconName="Upload"
              iconPosition="left"
              iconSize={16}
            >
              Upload
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search media files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
            />
          </div>
          {selectedMedia?.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onBulkDelete(selectedMedia)}
              iconName="Trash2"
              iconPosition="left"
              iconSize={14}
            >
              Delete ({selectedMedia?.length})
            </Button>
          )}
        </div>
      </div>
      {/* Bulk Selection */}
      {filteredMedia?.length > 0 && (
        <div className="border-b border-border px-6 py-3 bg-muted/30">
          <Checkbox
            label={`Select all (${filteredMedia?.length} items)`}
            checked={selectedMedia?.length === filteredMedia?.length && filteredMedia?.length > 0}
            indeterminate={selectedMedia?.length > 0 && selectedMedia?.length < filteredMedia?.length}
            onChange={(e) => handleSelectAll(e?.target?.checked)}
          />
        </div>
      )}
      {/* Media Content */}
      <div className="p-6">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {filteredMedia?.map((item) => (
              <div
                key={item?.id}
                className="group relative bg-muted rounded-lg overflow-hidden hover:shadow-elevated transition-smooth"
              >
                <div className="absolute top-2 left-2 z-10">
                  <Checkbox
                    checked={selectedMedia?.includes(item?.id)}
                    onChange={(e) => handleSelectMedia(item?.id, e?.target?.checked)}
                    className="bg-background/80 backdrop-blur-sm"
                  />
                </div>
                
                <div className="aspect-square">
                  <Image
                    src={item?.url}
                    alt={item?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-smooth flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="w-8 h-8"
                    >
                      <Icon name="Eye" size={14} />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => onDelete(item?.id)}
                      className="w-8 h-8"
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </div>
                
                <div className="p-2">
                  <p className="text-xs text-card-foreground font-medium truncate">
                    {item?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(item?.size)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredMedia?.map((item) => (
              <div
                key={item?.id}
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-smooth"
              >
                <Checkbox
                  checked={selectedMedia?.includes(item?.id)}
                  onChange={(e) => handleSelectMedia(item?.id, e?.target?.checked)}
                />
                
                <div className="w-12 h-12 rounded-md overflow-hidden bg-muted">
                  <Image
                    src={item?.url}
                    alt={item?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-card-foreground truncate">
                    {item?.name}
                  </h4>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                    <span>{formatFileSize(item?.size)}</span>
                    <span>{formatDate(item?.uploadDate)}</span>
                    <span>{item?.dimensions}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  {item?.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="icon" className="w-8 h-8">
                    <Icon name="Eye" size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(item?.id)}
                    className="w-8 h-8 text-error hover:text-error"
                  >
                    <Icon name="Trash2" size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredMedia?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Image" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-card-foreground mb-2">
              {searchTerm ? 'No media found' : 'No media uploaded'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm 
                ? 'Try adjusting your search terms' :'Upload images to get started with your media library'
              }
            </p>
            {!searchTerm && (
              <Button
                variant="default"
                onClick={onUpload}
                iconName="Upload"
                iconPosition="left"
              >
                Upload Media
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaGrid;
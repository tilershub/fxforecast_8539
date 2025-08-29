import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const PostsTable = ({ posts, onEdit, onDelete, onDuplicate, onBulkAction }) => {
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedPosts(posts?.map(post => post?.id));
    } else {
      setSelectedPosts([]);
    }
  };

  const handleSelectPost = (postId, checked) => {
    if (checked) {
      setSelectedPosts([...selectedPosts, postId]);
    } else {
      setSelectedPosts(selectedPosts?.filter(id => id !== postId));
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedPosts = [...posts]?.sort((a, b) => {
    const aValue = a?.[sortField];
    const bValue = b?.[sortField];
    const modifier = sortDirection === 'asc' ? 1 : -1;
    
    if (sortField === 'date') {
      return (new Date(aValue) - new Date(bValue)) * modifier;
    }
    return aValue?.localeCompare(bValue) * modifier;
  });

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    switch (status) {
      case 'published':
        return `${baseClasses} bg-success/10 text-success`;
      case 'draft':
        return `${baseClasses} bg-warning/10 text-warning`;
      default:
        return `${baseClasses} bg-muted text-muted-foreground`;
    }
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
      {/* Bulk Actions Bar */}
      {selectedPosts?.length > 0 && (
        <div className="bg-muted/50 border-b border-border px-6 py-3 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {selectedPosts?.length} post{selectedPosts?.length !== 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkAction('publish', selectedPosts)}
              iconName="Eye"
              iconPosition="left"
              iconSize={14}
            >
              Publish
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkAction('draft', selectedPosts)}
              iconName="EyeOff"
              iconPosition="left"
              iconSize={14}
            >
              Draft
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onBulkAction('delete', selectedPosts)}
              iconName="Trash2"
              iconPosition="left"
              iconSize={14}
            >
              Delete
            </Button>
          </div>
        </div>
      )}
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30 border-b border-border">
            <tr>
              <th className="w-12 px-6 py-4">
                <Checkbox
                  checked={selectedPosts?.length === posts?.length && posts?.length > 0}
                  indeterminate={selectedPosts?.length > 0 && selectedPosts?.length < posts?.length}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                />
              </th>
              <th className="text-left px-6 py-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('title')}
                  className="flex items-center space-x-1 hover:text-foreground transition-smooth"
                >
                  <span>Title</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left px-6 py-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 hover:text-foreground transition-smooth"
                >
                  <span>Status</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left px-6 py-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('author')}
                  className="flex items-center space-x-1 hover:text-foreground transition-smooth"
                >
                  <span>Author</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left px-6 py-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('date')}
                  className="flex items-center space-x-1 hover:text-foreground transition-smooth"
                >
                  <span>Date</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left px-6 py-4 font-medium text-muted-foreground">Tags</th>
              <th className="text-right px-6 py-4 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedPosts?.map((post) => (
              <tr key={post?.id} className="border-b border-border hover:bg-muted/20 transition-smooth">
                <td className="px-6 py-4">
                  <Checkbox
                    checked={selectedPosts?.includes(post?.id)}
                    onChange={(e) => handleSelectPost(post?.id, e?.target?.checked)}
                  />
                </td>
                <td className="px-6 py-4">
                  <div>
                    <h4 className="font-medium text-card-foreground line-clamp-1">{post?.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{post?.description}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={getStatusBadge(post?.status)}>{post?.status}</span>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{post?.author}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{formatDate(post?.date)}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {post?.tags?.slice(0, 2)?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                    {post?.tags?.length > 2 && (
                      <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                        +{post?.tags?.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(post?.id)}
                      className="w-8 h-8"
                    >
                      <Icon name="Edit3" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDuplicate(post?.id)}
                      className="w-8 h-8"
                    >
                      <Icon name="Copy" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(post?.id)}
                      className="w-8 h-8 text-error hover:text-error"
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {posts?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileText" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-card-foreground mb-2">No posts found</h3>
          <p className="text-muted-foreground mb-4">Get started by creating your first blog post.</p>
          <Button variant="default" iconName="Plus" iconPosition="left">
            Create New Post
          </Button>
        </div>
      )}
    </div>
  );
};

export default PostsTable;
import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PreviewPanel = ({ content, frontmatter }) => {
  const parseMarkdown = (markdown) => {
    // Simple markdown parser for preview
    let html = markdown;
    
    // Headers
    html = html?.replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-card-foreground mt-6 mb-3">$1</h3>');
    html = html?.replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold text-card-foreground mt-8 mb-4">$1</h2>');
    html = html?.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-card-foreground mt-8 mb-4">$1</h1>');
    
    // Bold and Italic
    html = html?.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>');
    html = html?.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
    
    // Inline code
    html = html?.replace(/`(.*?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm font-mono">$1</code>');
    
    // Links
    html = html?.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>');
    
    // Images
    html = html?.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-4" />');
    
    // Blockquotes
    html = html?.replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-primary pl-4 py-2 my-4 bg-muted/50 italic text-muted-foreground">$1</blockquote>');
    
    // Lists
    html = html?.replace(/^\* (.*$)/gim, '<li class="ml-4 mb-1">• $1</li>');
    html = html?.replace(/^\d+\. (.*$)/gim, '<li class="ml-4 mb-1 list-decimal">$1</li>');
    
    // Code blocks
    html = html?.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
      return `<pre class="bg-muted p-4 rounded-lg my-4 overflow-x-auto"><code class="font-mono text-sm">${code?.trim()}</code></pre>`;
    });
    
    // Horizontal rules
    html = html?.replace(/^---$/gim, '<hr class="border-t border-border my-8" />');
    
    // Paragraphs
    html = html?.replace(/\n\n/g, '</p><p class="mb-4 text-card-foreground leading-relaxed">');
    html = '<p class="mb-4 text-card-foreground leading-relaxed">' + html + '</p>';
    
    return html;
  };

  const getContentWithoutFrontmatter = () => {
    // Remove frontmatter from content for preview
    const frontmatterRegex = /^---\n[\s\S]*?\n---\n/;
    return content?.replace(frontmatterRegex, '')?.trim();
  };

  const formatDate = (dateString) => {
    if (!dateString) return new Date()?.toLocaleDateString();
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAuthorName = (author) => {
    const authorMap = {
      'admin': 'FXFORECAST Team',
      'guest': 'Guest Author'
    };
    return authorMap?.[author] || 'FXFORECAST Team';
  };

  const markdownContent = getContentWithoutFrontmatter();
  const parsedContent = parseMarkdown(markdownContent);

  return (
    <div className="flex flex-col h-full bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
        <div className="flex items-center space-x-2">
          <Icon name="Eye" size={18} />
          <span className="font-medium text-card-foreground">Live Preview</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="RefreshCw" size={14} />
          <span>Auto-updating</span>
        </div>
      </div>
      {/* Preview Content */}
      <div className="flex-1 overflow-y-auto">
        <article className="max-w-none p-6">
          {/* Cover Image */}
          {frontmatter?.coverImage && (
            <div className="mb-8 -mx-6">
              <Image
                src={frontmatter?.coverImage}
                alt={frontmatter?.title || 'Cover image'}
                className="w-full h-64 object-cover"
              />
            </div>
          )}

          {/* Article Header */}
          <header className="mb-8">
            {frontmatter?.tags && frontmatter?.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {frontmatter?.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-3xl font-bold text-card-foreground mb-4">
              {frontmatter?.title || 'Untitled Post'}
            </h1>

            {frontmatter?.description && (
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {frontmatter?.description}
              </p>
            )}

            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="User" size={16} />
                <span>{getAuthorName(frontmatter?.author)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} />
                <span>{formatDate(frontmatter?.date)}</span>
              </div>
              {frontmatter?.draft && (
                <div className="flex items-center space-x-2 text-warning">
                  <Icon name="FileText" size={16} />
                  <span>Draft</span>
                </div>
              )}
            </div>
          </header>

          {/* Article Content */}
          <div 
            className="prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: parsedContent }}
          />

          {/* Empty State */}
          {!markdownContent && (
            <div className="text-center py-12">
              <Icon name="FileText" size={48} className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium text-card-foreground mb-2">
                Start Writing
              </h3>
              <p className="text-muted-foreground">
                Your content will appear here as you type in the editor.
              </p>
            </div>
          )}
        </article>
      </div>
      {/* Footer */}
      <div className="border-t border-border bg-muted/30 p-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Preview updates automatically</span>
          <div className="flex items-center space-x-4">
            <span>Reading time: ~{Math.ceil(markdownContent?.split(' ')?.length / 200)} min</span>
            <span>•</span>
            <span>{markdownContent?.split(' ')?.length} words</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;
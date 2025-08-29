import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ArticleHeader = ({ article, onShare }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content?.split(' ')?.length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const shareButtons = [
    { name: 'Twitter', icon: 'Twitter', color: '#1DA1F2' },
    { name: 'Facebook', icon: 'Facebook', color: '#1877F2' },
    { name: 'LinkedIn', icon: 'Linkedin', color: '#0A66C2' },
    { name: 'Copy', icon: 'Copy', color: 'var(--color-muted-foreground)' }
  ];

  return (
    <header className="mb-8">
      {/* Cover Image */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 mb-6 rounded-lg overflow-hidden">
        <Image
          src={article?.coverImage}
          alt={article?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      {/* Article Meta */}
      <div className="space-y-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {article?.tags?.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
          {article?.title}
        </h1>

        {/* Description */}
        <p className="text-lg text-muted-foreground leading-relaxed">
          {article?.description}
        </p>

        {/* Author & Meta Info */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 border-t border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={article?.author?.avatar}
                alt={article?.author?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-foreground">{article?.author?.name}</p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>{formatDate(article?.publishedAt)}</span>
                <span>•</span>
                <span>{calculateReadTime(article?.content)} min read</span>
              </div>
            </div>
          </div>

          {/* Share Buttons - Desktop */}
          <div className="hidden sm:flex items-center space-x-2">
            <span className="text-sm text-muted-foreground mr-2">Share:</span>
            {shareButtons?.map((button) => (
              <Button
                key={button?.name}
                variant="ghost"
                size="icon"
                onClick={() => onShare(button?.name?.toLowerCase())}
                className="w-8 h-8 hover:bg-muted"
                title={`Share on ${button?.name}`}
              >
                <Icon name={button?.icon} size={16} />
              </Button>
            ))}
          </div>
        </div>

        {/* Share Buttons - Mobile */}
        <div className="flex sm:hidden items-center justify-center space-x-4 py-4 bg-muted/50 rounded-lg">
          <span className="text-sm text-muted-foreground">Share this article:</span>
          <div className="flex space-x-2">
            {shareButtons?.map((button) => (
              <Button
                key={button?.name}
                variant="ghost"
                size="icon"
                onClick={() => onShare(button?.name?.toLowerCase())}
                className="w-9 h-9"
                title={`Share on ${button?.name}`}
              >
                <Icon name={button?.icon} size={18} />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default ArticleHeader;
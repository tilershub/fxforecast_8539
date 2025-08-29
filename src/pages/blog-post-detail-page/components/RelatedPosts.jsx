import React from 'react';

import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RelatedPosts = ({ posts, currentPostId }) => {
  const filteredPosts = posts?.filter(post => post?.id !== currentPostId)?.slice(0, 3);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content?.split(' ')?.length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  if (filteredPosts?.length === 0) return null;

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Related Articles</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.location.href = '/blog-post-detail-page'}
          iconName="ArrowRight"
          iconPosition="right"
          iconSize={14}
        >
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts?.map((post) => (
          <article
            key={post?.id}
            className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevated transition-all duration-300 group cursor-pointer"
            onClick={() => window.location.href = '/blog-post-detail-page'}
          >
            {/* Post Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={post?.coverImage}
                alt={post?.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              
              {/* Reading Time Badge */}
              <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-foreground">
                {calculateReadTime(post?.content)} min read
              </div>
            </div>

            {/* Post Content */}
            <div className="p-6">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {post?.tags?.slice(0, 2)?.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-smooth">
                {post?.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                {post?.description}
              </p>

              {/* Author & Date */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <Image
                      src={post?.author?.avatar}
                      alt={post?.author?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {post?.author?.name}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatDate(post?.publishedAt)}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
      {/* Load More Button - Mobile */}
      <div className="md:hidden mt-6 text-center">
        <Button
          variant="outline"
          onClick={() => window.location.href = '/blog-post-detail-page'}
          iconName="Plus"
          iconPosition="left"
          iconSize={16}
        >
          Load More Articles
        </Button>
      </div>
    </section>
  );
};

export default RelatedPosts;
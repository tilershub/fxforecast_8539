import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import ArticleHeader from './components/ArticleHeader';
import TableOfContents from './components/TableOfContents';
import ArticleContent from './components/ArticleContent';
import ReadingProgress from './components/ReadingProgress';
import StickyShareButtons from './components/StickyShareButtons';
import AuthorBio from './components/AuthorBio';
import RelatedPosts from './components/RelatedPosts';
import CommentSection from './components/CommentSection';

const BlogPostDetailPage = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Mock article data
  const article = {
    id: 1,
    title: "Mastering Risk Management: The Complete FXFORECAST Framework Guide",
    description: "Learn how to implement disciplined risk management strategies that professional funded traders use to maintain consistent profitability in forex markets.",
    coverImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=600&fit=crop",
    content: `# Introduction to Risk Management

Risk management is the cornerstone of successful forex trading. Without proper risk controls, even the most profitable trading strategies will eventually lead to account destruction.

## The FXFORECAST Framework

The FXFORECAST framework is built on three fundamental pillars:

### 1. Risk Discipline
Never risk more than 0.5% of your account on any single trade. This conservative approach ensures that you can withstand multiple consecutive losses without significant account damage.

### 2. Session Focus
Trade only during your chosen market session. Whether it's London, New York, or Asian session, stick to one and master its characteristics.

### 3. ADR Exits
Use Average Daily Range (ADR) calculations to determine optimal exit points. Take profits at 30-50% of the daily ADR to capture the most probable price movements.

## Position Sizing Calculator

Before entering any trade, use our position sizing calculator to determine the exact lot size based on:

- Account equity
- Risk percentage (default 0.5%)
- Currency pair
- Entry and stop loss levels

\`\`\`javascript
function calculatePositionSize(equity, riskPercent, pipValue, stopLossPips) {
  const riskAmount = equity * (riskPercent / 100);
  const positionSize = riskAmount / (stopLossPips * pipValue);
  return Math.round(positionSize * 100) / 100;
}
\`\`\`

## ADR Exit Strategy

The Average Daily Range exit strategy helps you:

1. **Identify realistic profit targets** based on historical price movement
2. **Avoid overextending trades** beyond probable ranges
3. **Maintain consistent risk-reward ratios**

### Calculating ADR

To calculate the 14-period ADR:

1. Take the high-low range for each of the last 14 trading days
2. Sum all ranges
3. Divide by 14 to get the average

## Risk Guard System

Our Risk Guard tool monitors your trading activity and enforces discipline:

- **Daily P/L tracking** with -1% maximum drawdown
- **Weekly P/L monitoring** with -4% maximum drawdown  
- **Trade counter** limiting to 2 trades per day
- **Open risk calculation** ensuring total exposure stays within limits

## Common Risk Management Mistakes

### Overleveraging
Many traders risk too much per trade, leading to emotional decision-making and account destruction.

### Ignoring Correlation
Trading multiple correlated pairs simultaneously increases risk exposure beyond intended levels.

### Moving Stop Losses
Adjusting stop losses against your position violates risk management rules and often leads to larger losses.

## Conclusion

Implementing the FXFORECAST framework requires discipline and consistency. Start with demo trading to build the habits, then gradually transition to live trading with proper risk controls in place.

Remember: **Preservation of capital is more important than profit generation**. Focus on not losing money, and profits will follow naturally.`,
    author: {
      name: "Alex Thompson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      bio: "Professional forex trader and risk management specialist with over 8 years of experience in funded trading programs. Creator of the FXFORECAST framework and advocate for disciplined trading approaches.",
      articleCount: 47,
      followers: 12500,
      joinedDate: "March 2019",
      social: {
        twitter: "https://twitter.com/alextrader",
        linkedin: "https://linkedin.com/in/alexthompson",
        website: "https://alexthompson.trading"
      }
    },
    tags: ["Risk Management", "Forex Trading", "FXFORECAST", "Position Sizing", "ADR Strategy"],
    publishedAt: "2025-08-25T10:30:00Z",
    readTime: 8
  };

  // Mock related posts data
  const relatedPosts = [
    {
      id: 2,
      title: "Advanced Position Sizing Techniques for Forex Traders",
      description: "Explore sophisticated position sizing methods that go beyond basic percentage risk models to optimize your trading performance.",
      coverImage: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=250&fit=crop",
      author: {
        name: "Sarah Martinez",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      tags: ["Position Sizing", "Risk Management", "Advanced Trading"],
      publishedAt: "2025-08-20T14:15:00Z",
      content: "Advanced position sizing content here..."
    },
    {
      id: 3,
      title: "Understanding Market Sessions: London vs New York",
      description: "Deep dive into the characteristics of major forex trading sessions and how to choose the right one for your trading style.",
      coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      author: {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      tags: ["Market Sessions", "Trading Strategy", "Forex"],
      publishedAt: "2025-08-18T09:45:00Z",
      content: "Market sessions content here..."
    },
    {
      id: 4,
      title: "The Psychology of Risk: Overcoming Trading Emotions",
      description: "Learn how to master your emotions and maintain discipline when implementing risk management strategies in live trading.",
      coverImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=250&fit=crop",
      author: {
        name: "Emma Johnson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      tags: ["Trading Psychology", "Risk Management", "Discipline"],
      publishedAt: "2025-08-15T16:20:00Z",
      content: "Trading psychology content here..."
    }
  ];

  const breadcrumbItems = [
    { label: 'Home', path: '/home-page' },
    { label: 'Blog', path: '/blog-post-detail-page' },
    { label: article?.title, path: '/blog-post-detail-page' }
  ];

  const handleShare = (platform) => {
    const url = window.location?.href;
    const title = article?.title;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard?.writeText(url);
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ReadingProgress />
      <StickyShareButtons article={article} />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={breadcrumbItems} />
          
          <ArticleHeader article={article} onShare={handleShare} />
          
          <div className="lg:pr-80">
            <TableOfContents content={article?.content} />
            <ArticleContent content={article?.content} />
          </div>
          
          <AuthorBio author={article?.author} />
          <RelatedPosts posts={relatedPosts} currentPostId={article?.id} />
          <CommentSection articleId={article?.id} />
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} FXFORECAST. All rights reserved. | 
              <span className="ml-2">
                Trading involves substantial risk of loss and is not suitable for all investors.
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogPostDetailPage;
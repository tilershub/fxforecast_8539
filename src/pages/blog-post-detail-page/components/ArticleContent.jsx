import React, { useEffect } from 'react';
import Icon from '../../../components/AppIcon';


const ArticleContent = ({ content }) => {
  useEffect(() => {
    // Add IDs to headings for TOC navigation
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings?.forEach((heading) => {
      if (!heading?.id) {
        const id = heading?.textContent?.toLowerCase()?.replace(/[^a-z0-9]+/g, '-')?.replace(/(^-|-$)/g, '');
        heading.id = id;
      }
    });

    // Add copy buttons to code blocks
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks?.forEach((block) => {
      if (!block?.parentElement?.querySelector('.copy-button')) {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button absolute top-2 right-2 p-2 bg-muted hover:bg-muted/80 rounded-md transition-smooth';
        copyButton.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="m4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';
        copyButton.onclick = () => {
          navigator.clipboard?.writeText(block?.textContent);
          copyButton.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20,6 9,17 4,12"/></svg>';
          setTimeout(() => {
            copyButton.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="m4 16c-1.1 0-2-.9-2 2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';
          }, 2000);
        };
        block.parentElement.style.position = 'relative';
        block?.parentElement?.appendChild(copyButton);
      }
    });
  }, [content]);

  const renderContent = () => {
    // Convert markdown-like content to HTML
    let htmlContent = // Line breaks
    // Paragraphs
    // Links
    // Italic text
    // Bold text
    // Inline code
    // Code blocks
    // Headers
    content?.replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-foreground mt-8 mb-4">$1</h3>')?.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-foreground mt-10 mb-6">$1</h2>')?.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-foreground mt-12 mb-8">$1</h1>')?.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="relative bg-muted p-4 rounded-lg overflow-x-auto my-6"><code class="text-sm font-mono">$2</code></pre>')?.replace(/`([^`]+)`/g, '<code class="bg-muted px-2 py-1 rounded text-sm font-mono">$1</code>')?.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')?.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')?.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:text-primary/80 underline transition-smooth" target="_blank" rel="noopener noreferrer">$1</a>')?.replace(/\n\n/g, '</p><p class="text-foreground leading-relaxed mb-4">')?.replace(/\n/g, '<br>');

    // Wrap in paragraph tags
    htmlContent = '<p class="text-foreground leading-relaxed mb-4">' + htmlContent + '</p>';

    return htmlContent;
  };

  return (
    <article className="prose prose-lg max-w-none">
      <div 
        className="article-content"
        dangerouslySetInnerHTML={{ __html: renderContent() }}
      />
      
      {/* Pull Quote Example */}
      <blockquote className="border-l-4 border-primary pl-6 py-4 my-8 bg-muted/30 rounded-r-lg">
        <p className="text-lg font-medium text-foreground italic mb-2">
          "Risk management is not about avoiding risk entirely, but about understanding and controlling it to maximize your trading potential."
        </p>
        <cite className="text-sm text-muted-foreground">— FXFORECAST Framework</cite>
      </blockquote>

      {/* Callout Box */}
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-6 my-8">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <Icon name="Lightbulb" size={20} className="text-accent mt-1" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Pro Tip</h4>
            <p className="text-muted-foreground">
              Always use the ADR Exit Helper tool to calculate your take profit levels before entering any trade. This ensures you're following the framework's disciplined approach to profit-taking.
            </p>
          </div>
        </div>
      </div>

      {/* Warning Box */}
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-6 my-8">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <Icon name="AlertTriangle" size={20} className="text-warning mt-1" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Risk Warning</h4>
            <p className="text-muted-foreground">
              Forex trading involves substantial risk of loss and is not suitable for all investors. Past performance is not indicative of future results. Always trade with money you can afford to lose.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleContent;
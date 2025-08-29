import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TableOfContents = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    // Extract headings from content
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const extractedHeadings = [];
    let match;

    while ((match = headingRegex?.exec(content)) !== null) {
      const level = match?.[1]?.length;
      const text = match?.[2]?.trim();
      const id = text?.toLowerCase()?.replace(/[^a-z0-9]+/g, '-')?.replace(/(^-|-$)/g, '');
      
      extractedHeadings?.push({
        id,
        text,
        level
      });
    }

    setHeadings(extractedHeadings);
  }, [content]);

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings?.map(h => document.getElementById(h?.id))?.filter(Boolean);
      
      for (let i = headingElements?.length - 1; i >= 0; i--) {
        const element = headingElements?.[i];
        if (element && element?.getBoundingClientRect()?.top <= 100) {
          setActiveSection(element?.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  if (headings?.length === 0) return null;

  return (
    <>
      {/* Mobile TOC Toggle */}
      <div className="lg:hidden mb-6">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          iconName={isOpen ? 'ChevronUp' : 'ChevronDown'}
          iconPosition="right"
          className="w-full justify-between"
        >
          Table of Contents
        </Button>
        
        {isOpen && (
          <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border">
            <nav className="space-y-2">
              {headings?.map((heading) => (
                <button
                  key={heading?.id}
                  onClick={() => scrollToSection(heading?.id)}
                  className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-smooth ${
                    activeSection === heading?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  style={{ paddingLeft: `${(heading?.level - 1) * 12 + 12}px` }}
                >
                  {heading?.text}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
      {/* Desktop TOC Sidebar */}
      <div className="hidden lg:block fixed top-24 right-8 w-64 max-h-[calc(100vh-200px)] overflow-y-auto">
        <div className="bg-card border border-border rounded-lg p-4 shadow-soft">
          <h3 className="font-semibold text-foreground mb-4 flex items-center">
            <Icon name="List" size={16} className="mr-2" />
            Table of Contents
          </h3>
          <nav className="space-y-1">
            {headings?.map((heading) => (
              <button
                key={heading?.id}
                onClick={() => scrollToSection(heading?.id)}
                className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-smooth ${
                  activeSection === heading?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                style={{ paddingLeft: `${(heading?.level - 1) * 8 + 12}px` }}
              >
                {heading?.text}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default TableOfContents;
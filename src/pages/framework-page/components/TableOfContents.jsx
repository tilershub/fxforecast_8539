import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TableOfContents = ({ sections = [] }) => {
  const [activeSection, setActiveSection] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const defaultSections = [
    { id: 'risk-management', title: 'Risk Management Rules', level: 1 },
    { id: 'session-focus', title: 'Session Focus Strategy', level: 1 },
    { id: 'exit-strategy', title: 'ADR-Based Exits', level: 1 },
    { id: 'entry-rules', title: 'Entry Confirmation', level: 1 },
    { id: 'psychology', title: 'Trading Psychology', level: 1 },
    { id: 'adr-tutorial', title: 'ADR Tutorial', level: 1 },
    { id: 'related-tools', title: 'Related Tools', level: 1 }
  ];

  const tocSections = sections?.length > 0 ? sections : defaultSections;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      // Show/hide TOC based on scroll position
      setIsVisible(scrollPosition > 300);

      // Find active section
      const sectionElements = tocSections?.map(section => ({
        id: section?.id,
        element: document.getElementById(section?.id),
        title: section?.title
      }));

      const currentSection = sectionElements?.filter(section => section?.element)?.find(section => {
          const rect = section?.element?.getBoundingClientRect();
          return rect?.top <= 150 && rect?.bottom >= 150;
        });

      if (currentSection) {
        setActiveSection(currentSection?.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [tocSections]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element?.getBoundingClientRect()?.top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Desktop TOC */}
      <div className="hidden lg:block fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
        <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-4 shadow-elevated max-w-xs">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="List" size={16} className="text-primary" />
            <h3 className="font-medium text-card-foreground text-sm">Contents</h3>
          </div>
          
          <nav className="space-y-1">
            {tocSections?.map((section) => (
              <button
                key={section?.id}
                onClick={() => scrollToSection(section?.id)}
                className={`w-full text-left px-2 py-1.5 text-xs rounded transition-colors ${
                  activeSection === section?.id
                    ? 'bg-primary/10 text-primary font-medium' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                } ${section?.level === 2 ? 'ml-3' : ''}`}
              >
                {section?.title}
              </button>
            ))}
          </nav>

          <div className="mt-4 pt-3 border-t border-border">
            <div className="text-xs text-muted-foreground mb-2">Reading Progress</div>
            <div className="w-full bg-muted rounded-full h-1">
              <div 
                className="bg-primary h-1 rounded-full transition-all duration-300"
                style={{ 
                  width: `${Math.min(100, Math.max(0, (window.scrollY / (document.documentElement?.scrollHeight - window.innerHeight)) * 100))}%` 
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Mobile TOC Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <Button
          variant="default"
          size="icon"
          onClick={() => setIsMobileMenuOpen(true)}
          className="w-12 h-12 rounded-full shadow-elevated"
        >
          <Icon name="List" size={20} />
        </Button>
      </div>
      {/* Mobile TOC Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-1100">
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />
          <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border rounded-t-lg p-6 max-h-[70vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Icon name="List" size={18} className="text-primary" />
                <h3 className="font-semibold text-card-foreground">Table of Contents</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-8 h-8"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>

            <nav className="space-y-2">
              {tocSections?.map((section) => (
                <button
                  key={section?.id}
                  onClick={() => scrollToSection(section?.id)}
                  className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                    activeSection === section?.id
                      ? 'bg-primary/10 text-primary font-medium' :'text-card-foreground hover:bg-muted'
                  } ${section?.level === 2 ? 'ml-4' : ''}`}
                >
                  <div className="flex items-center space-x-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      activeSection === section?.id ? 'bg-primary' : 'bg-muted-foreground/40'
                    }`} />
                    <span>{section?.title}</span>
                  </div>
                </button>
              ))}
            </nav>

            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <span>Reading Progress</span>
                <span>{Math.round((window.scrollY / (document.documentElement?.scrollHeight - window.innerHeight)) * 100)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${Math.min(100, Math.max(0, (window.scrollY / (document.documentElement?.scrollHeight - window.innerHeight)) * 100))}%` 
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TableOfContents;
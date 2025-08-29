import React, { useEffect } from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import WhyThisWorksSection from './components/WhyThisWorksSection';
import ToolsPreviewSection from './components/ToolsPreviewSection';
import LatestBlogSection from './components/LatestBlogSection';
import AffiliateCTABar from './components/AffiliateCTABar';
import FooterSection from './components/FooterSection';

const HomePage = () => {
  useEffect(() => {
    // Set page title
    document.title = 'FXFORECAST - Master Forex Trading with Proven Framework';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription?.setAttribute('content', 'Join thousands of traders who have transformed their approach with FXFORECAST disciplined risk management framework. Get funded faster with proven strategies.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Join thousands of traders who have transformed their approach with FXFORECAST disciplined risk management framework. Get funded faster with proven strategies.';
      document.getElementsByTagName('head')?.[0]?.appendChild(meta);
    }

    // Add structured data for homepage
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "FXFORECAST",
      "description": "Forex trading education, tools, and framework for funded traders",
      "url": window.location?.origin,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${window.location?.origin}/blog-post-detail-page?search={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head?.appendChild(script);

    // Cleanup function
    return () => {
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        document.head?.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <HeroSection />
        <WhyThisWorksSection />
        <ToolsPreviewSection />
        <LatestBlogSection />
      </main>

      <AffiliateCTABar />
      <FooterSection />
    </div>
  );
};

export default HomePage;
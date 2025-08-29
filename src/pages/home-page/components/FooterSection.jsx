import React from 'react';
import Icon from '../../../components/AppIcon';

const FooterSection = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    product: [
      { label: 'Framework', href: '/framework-page' },
      { label: 'Trading Tools', href: '/trading-tools-dashboard' },
      { label: 'Blog', href: '/blog-post-detail-page' }
    ],
    resources: [
      { label: 'Risk Calculator', href: '/trading-tools-dashboard' },
      { label: 'ADR Helper', href: '/trading-tools-dashboard' },
      { label: 'Position Sizer', href: '/trading-tools-dashboard' }
    ],
    company: [
      { label: 'About Us', href: '/home-page#about' },
      { label: 'Contact', href: '/home-page#contact' },
      { label: 'Privacy Policy', href: '/home-page#privacy' }
    ]
  };

  const socialLinks = [
    { name: 'Twitter', icon: 'Twitter', href: 'https://twitter.com/fxforecast' },
    { name: 'YouTube', icon: 'Youtube', href: 'https://youtube.com/fxforecast' },
    { name: 'Discord', icon: 'MessageCircle', href: 'https://discord.gg/fxforecast' },
    { name: 'Telegram', icon: 'Send', href: 'https://t.me/fxforecast' }
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="TrendingUp" size={20} color="white" />
              </div>
              <span className="text-xl font-bold text-card-foreground">FXFORECAST</span>
            </div>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Empowering forex traders with disciplined risk management frameworks 
              and professional-grade tools for funded trading success.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks?.map((social) => (
                <a
                  key={social?.name}
                  href={social?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg flex items-center justify-center transition-all duration-200"
                  aria-label={social?.name}
                >
                  <Icon name={social?.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks?.product?.map((link) => (
                <li key={link?.label}>
                  <a
                    href={link?.href}
                    className="text-muted-foreground hover:text-card-foreground transition-colors text-sm"
                  >
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks?.resources?.map((link) => (
                <li key={link?.label}>
                  <a
                    href={link?.href}
                    className="text-muted-foreground hover:text-card-foreground transition-colors text-sm"
                  >
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks?.company?.map((link) => (
                <li key={link?.label}>
                  <a
                    href={link?.href}
                    className="text-muted-foreground hover:text-card-foreground transition-colors text-sm"
                  >
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimers */}
        <div className="border-t border-border pt-8 mb-8">
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-card-foreground mb-2">Risk Disclaimer</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Trading foreign exchange on margin carries a high level of risk and may not be suitable for all investors. 
                  Past performance is not indicative of future results. The high degree of leverage can work against you as well as for you.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={20} className="text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-card-foreground mb-2">Affiliate Disclosure</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  FXFORECAST may receive compensation from FTMO and other partners when you click on certain links. 
                  This does not affect our editorial independence or the cost of services to you.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {currentYear} FXFORECAST. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <a href="/home-page#privacy" className="hover:text-card-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="/home-page#terms" className="hover:text-card-foreground transition-colors">
              Terms of Service
            </a>
            <a href="/home-page#cookies" className="hover:text-card-foreground transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
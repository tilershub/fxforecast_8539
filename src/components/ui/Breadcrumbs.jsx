import React from 'react';
import Icon from '../AppIcon';

const Breadcrumbs = ({ items = [] }) => {
  if (!items || items?.length === 0) return null;

  const generateBreadcrumbs = () => {
    const currentPath = window.location?.pathname;
    
    // Default breadcrumbs based on current path
    const pathMap = {
      '/home-page': [{ label: 'Home', path: '/home-page' }],
      '/framework-page': [
        { label: 'Home', path: '/home-page' },
        { label: 'Framework', path: '/framework-page' }
      ],
      '/trading-tools-dashboard': [
        { label: 'Home', path: '/home-page' },
        { label: 'Trading Tools', path: '/trading-tools-dashboard' }
      ],
      '/blog-post-detail-page': [
        { label: 'Home', path: '/home-page' },
        { label: 'Blog', path: '/blog-post-detail-page' }
      ],
      '/admin-cms-dashboard': [
        { label: 'Admin', path: '/admin-cms-dashboard' },
        { label: 'Dashboard', path: '/admin-cms-dashboard' }
      ],
      '/blog-post-editor': [
        { label: 'Admin', path: '/admin-cms-dashboard' },
        { label: 'Blog Editor', path: '/blog-post-editor' }
      ]
    };

    return items?.length > 0 ? items : (pathMap?.[currentPath] || []);
  };

  const breadcrumbItems = generateBreadcrumbs();

  if (breadcrumbItems?.length <= 1) return null;

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {breadcrumbItems?.map((item, index) => (
          <li key={item?.path || index} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={14} 
                className="mx-2 text-muted-foreground/60" 
              />
            )}
            {index === breadcrumbItems?.length - 1 ? (
              <span className="font-medium text-foreground" aria-current="page">
                {item?.label}
              </span>
            ) : (
              <a
                href={item?.path}
                className="hover:text-foreground transition-smooth font-medium"
              >
                {item?.label}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
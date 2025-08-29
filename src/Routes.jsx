import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AdminCMSDashboard from './pages/admin-cms-dashboard';
import BlogPostEditor from './pages/blog-post-editor';
import BlogPostDetailPage from './pages/blog-post-detail-page';
import TradingToolsDashboard from './pages/trading-tools-dashboard';
import FrameworkPage from './pages/framework-page';
import HomePage from './pages/home-page';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AdminCMSDashboard />} />
        <Route path="/admin-cms-dashboard" element={<AdminCMSDashboard />} />
        <Route path="/blog-post-editor" element={<BlogPostEditor />} />
        <Route path="/blog-post-detail-page" element={<BlogPostDetailPage />} />
        <Route path="/trading-tools-dashboard" element={<TradingToolsDashboard />} />
        <Route path="/framework-page" element={<FrameworkPage />} />
        <Route path="/home-page" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;

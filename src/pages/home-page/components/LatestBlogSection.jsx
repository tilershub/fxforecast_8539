import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { format } from 'date-fns';
import { useSupabaseData } from '../../../hooks/useSupabaseData';
import { articlesService } from '../../../services/articles';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import ErrorMessage from '../../../components/ui/ErrorMessage';

const LatestBlogSection = () => {
  const { 
    data: articles, 
    loading, 
    error, 
    refetch 
  } = useSupabaseData(
    articlesService?.getFeaturedArticles, 
    [3] // Get 3 featured articles for the homepage
  );

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Latest Trading Insights
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Stay updated with the latest market analysis and trading strategies
            </p>
          </div>
          <div className="flex justify-center">
            <LoadingSpinner size="lg" text="Loading latest articles..." />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Latest Trading Insights
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Stay updated with the latest market analysis and trading strategies
            </p>
          </div>
          <ErrorMessage 
            error={error} 
            onRetry={refetch}
            onDismiss={() => {}} // Add missing required prop
            title="Failed to load articles"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Latest Trading Insights
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Stay updated with the latest market analysis and trading strategies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles?.map((article) => (
            <article
              key={article?.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              {article?.featured_image_url && (
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={article?.featured_image_url}
                    alt={article?.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}

              <div className="p-6">
                {article?.category && (
                  <div className="flex items-center mb-3">
                    <span
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: article?.category?.color || '#6B7280' }}
                    >
                      {article?.category?.name}
                    </span>
                  </div>
                )}

                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  <Link
                    to={`/blog/${article?.slug}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {article?.title}
                  </Link>
                </h3>

                {article?.excerpt && (
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article?.excerpt}
                  </p>
                )}

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    {article?.author && (
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        <span>{article?.author?.full_name}</span>
                      </div>
                    )}
                    {article?.reading_time_minutes && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{article?.reading_time_minutes} min read</span>
                      </div>
                    )}
                  </div>
                </div>

                {article?.published_at && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <time dateTime={article?.published_at}>
                        {format(new Date(article?.published_at), 'MMM d, yyyy')}
                      </time>
                    </div>
                    <Link
                      to={`/blog/${article?.slug}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      Read more
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            View All Articles
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestBlogSection;
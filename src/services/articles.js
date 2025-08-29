import { supabase } from '../lib/supabase';

export const articlesService = {
  // Get all published articles with pagination
  async getPublishedArticles(page = 1, limit = 10) {
    try {
      const from = (page - 1) * limit
      const to = from + limit - 1

      const { data, error, count } = await supabase?.from('articles')?.select(`
          *,
          author:user_profiles!author_id(
            id,
            full_name,
            avatar_url
          ),
          category:article_categories(
            id,
            name,
            slug,
            color,
            icon
          )
        `, { count: 'exact' })?.eq('status', 'published')?.order('published_at', { ascending: false })?.range(from, to)

      if (error) throw error

      return {
        data: data || [],
        count: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
        currentPage: page,
        error: null
      }
    } catch (error) {
      console.error('Get published articles error:', error)
      return { data: [], count: 0, totalPages: 0, currentPage: page, error: error?.message };
    }
  },

  // Get featured articles
  async getFeaturedArticles(limit = 5) {
    try {
      const { data, error } = await supabase?.from('articles')?.select(`
          *,
          author:user_profiles!author_id(
            id,
            full_name,
            avatar_url
          ),
          category:article_categories(
            id,
            name,
            slug,
            color,
            icon
          )
        `)?.eq('status', 'published')?.eq('is_featured', true)?.order('published_at', { ascending: false })?.limit(limit)

      if (error) throw error
      return { data: data || [], error: null }
    } catch (error) {
      console.error('Get featured articles error:', error)
      return { data: [], error: error?.message };
    }
  },

  // Get article by slug
  async getArticleBySlug(slug) {
    try {
      const { data, error } = await supabase?.from('articles')?.select(`
          *,
          author:user_profiles!author_id(
            id,
            full_name,
            avatar_url,
            bio
          ),
          category:article_categories(
            id,
            name,
            slug,
            color,
            icon
          )
        `)?.eq('slug', slug)?.eq('status', 'published')?.single()

      if (error) throw error
      
      // Increment view count
      await this.incrementViewCount(data?.id)
      
      return { data, error: null }
    } catch (error) {
      console.error('Get article by slug error:', error)
      return { data: null, error: error?.message };
    }
  },

  // Increment article view count
  async incrementViewCount(articleId) {
    if (!articleId) return

    try {
      const { error } = await supabase?.from('articles')?.update({ view_count: supabase.sql`view_count + 1` })?.eq('id', articleId)

      if (error) throw error
    } catch (error) {
      console.error('Increment view count error:', error)
    }
  },

  // Get articles by category
  async getArticlesByCategory(categorySlug, page = 1, limit = 10) {
    try {
      const from = (page - 1) * limit
      const to = from + limit - 1

      const { data, error, count } = await supabase?.from('articles')?.select(`
          *,
          author:user_profiles!author_id(
            id,
            full_name,
            avatar_url
          ),
          category:article_categories!category_id(
            id,
            name,
            slug,
            color,
            icon
          )
        `, { count: 'exact' })?.eq('status', 'published')?.eq('article_categories.slug', categorySlug)?.order('published_at', { ascending: false })?.range(from, to)

      if (error) throw error

      return {
        data: data || [],
        count: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
        currentPage: page,
        error: null
      }
    } catch (error) {
      console.error('Get articles by category error:', error)
      return { data: [], count: 0, totalPages: 0, currentPage: page, error: error?.message };
    }
  },

  // Get related articles
  async getRelatedArticles(articleId, categoryId, limit = 4) {
    try {
      const { data, error } = await supabase?.from('articles')?.select(`
          *,
          author:user_profiles!author_id(
            id,
            full_name,
            avatar_url
          ),
          category:article_categories(
            id,
            name,
            slug,
            color,
            icon
          )
        `)?.eq('status', 'published')?.eq('category_id', categoryId)?.neq('id', articleId)?.order('published_at', { ascending: false })?.limit(limit)

      if (error) throw error
      return { data: data || [], error: null }
    } catch (error) {
      console.error('Get related articles error:', error)
      return { data: [], error: error?.message };
    }
  },

  // Create new article (authenticated users)
  async createArticle(articleData) {
    try {
      const { data, error } = await supabase?.from('articles')?.insert([articleData])?.select(`
          *,
          author:user_profiles!author_id(
            id,
            full_name,
            avatar_url
          ),
          category:article_categories(
            id,
            name,
            slug,
            color,
            icon
          )
        `)?.single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Create article error:', error)
      return { data: null, error: error?.message };
    }
  },

  // Update article (authenticated users - own articles only)
  async updateArticle(articleId, updates) {
    try {
      const { data, error } = await supabase?.from('articles')?.update(updates)?.eq('id', articleId)?.select(`
          *,
          author:user_profiles!author_id(
            id,
            full_name,
            avatar_url
          ),
          category:article_categories(
            id,
            name,
            slug,
            color,
            icon
          )
        `)?.single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Update article error:', error)
      return { data: null, error: error?.message };
    }
  },

  // Delete article (authenticated users - own articles only)
  async deleteArticle(articleId) {
    try {
      const { error } = await supabase?.from('articles')?.delete()?.eq('id', articleId)

      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Delete article error:', error)
      return { error: error?.message };
    }
  }
}

export default articlesService
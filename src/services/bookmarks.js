import { supabase } from '../lib/supabase';

export const bookmarksService = {
  // Get user bookmarks
  async getUserBookmarks(userId, page = 1, limit = 10) {
    try {
      const from = (page - 1) * limit
      const to = from + limit - 1

      const { data, error, count } = await supabase?.from('user_bookmarks')?.select(`
          *,
          article:articles(
            id,
            title,
            slug,
            excerpt,
            featured_image_url,
            published_at,
            reading_time_minutes,
            view_count,
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
          )
        `, { count: 'exact' })?.eq('user_id', userId)?.order('created_at', { ascending: false })?.range(from, to)

      if (error) throw error

      return {
        data: data || [],
        count: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
        currentPage: page,
        error: null
      }
    } catch (error) {
      console.error('Get user bookmarks error:', error)
      return { data: [], count: 0, totalPages: 0, currentPage: page, error: error?.message };
    }
  },

  // Check if article is bookmarked
  async isArticleBookmarked(userId, articleId) {
    try {
      const { data, error } = await supabase?.from('user_bookmarks')?.select('id')?.eq('user_id', userId)?.eq('article_id', articleId)?.maybeSingle()

      if (error) throw error
      return { bookmarked: !!data, error: null }
    } catch (error) {
      console.error('Check bookmark error:', error)
      return { bookmarked: false, error: error?.message };
    }
  },

  // Add bookmark
  async addBookmark(userId, articleId) {
    try {
      const { data, error } = await supabase?.from('user_bookmarks')?.insert([{ user_id: userId, article_id: articleId }])?.select()?.single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Add bookmark error:', error)
      return { data: null, error: error?.message };
    }
  },

  // Remove bookmark
  async removeBookmark(userId, articleId) {
    try {
      const { error } = await supabase?.from('user_bookmarks')?.delete()?.eq('user_id', userId)?.eq('article_id', articleId)

      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Remove bookmark error:', error)
      return { error: error?.message };
    }
  },

  // Toggle bookmark
  async toggleBookmark(userId, articleId) {
    try {
      const { bookmarked } = await this.isArticleBookmarked(userId, articleId)
      
      if (bookmarked) {
        return await this.removeBookmark(userId, articleId)
      } else {
        return await this.addBookmark(userId, articleId)
      }
    } catch (error) {
      console.error('Toggle bookmark error:', error)
      return { error: error?.message };
    }
  }
}

export default bookmarksService
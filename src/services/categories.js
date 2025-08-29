import { supabase } from '../lib/supabase';

export const categoriesService = {
  // Get all categories
  async getCategories() {
    try {
      const { data, error } = await supabase?.from('article_categories')?.select('*')?.order('display_order', { ascending: true })?.order('name', { ascending: true })

      if (error) throw error
      return { data: data || [], error: null }
    } catch (error) {
      console.error('Get categories error:', error)
      return { data: [], error: error?.message };
    }
  },

  // Get category by slug
  async getCategoryBySlug(slug) {
    try {
      const { data, error } = await supabase?.from('article_categories')?.select('*')?.eq('slug', slug)?.single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Get category by slug error:', error)
      return { data: null, error: error?.message };
    }
  },

  // Create category (admin only)
  async createCategory(categoryData) {
    try {
      const { data, error } = await supabase?.from('article_categories')?.insert([categoryData])?.select()?.single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Create category error:', error)
      return { data: null, error: error?.message };
    }
  },

  // Update category (admin only)
  async updateCategory(categoryId, updates) {
    try {
      const { data, error } = await supabase?.from('article_categories')?.update(updates)?.eq('id', categoryId)?.select()?.single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Update category error:', error)
      return { data: null, error: error?.message };
    }
  },

  // Delete category (admin only)
  async deleteCategory(categoryId) {
    try {
      const { error } = await supabase?.from('article_categories')?.delete()?.eq('id', categoryId)

      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Delete category error:', error)
      return { error: error?.message };
    }
  }
}

export default categoriesService
import { supabase } from '../lib/supabase';

export const tradingService = {
  // Get all active trading instruments
  async getTradingInstruments() {
    try {
      const { data, error } = await supabase?.from('trading_instruments')?.select('*')?.eq('is_active', true)?.order('category')?.order('name')

      if (error) throw error
      return { data: data || [], error: null }
    } catch (error) {
      console.error('Get trading instruments error:', error)
      return { data: [], error: error?.message };
    }
  },

  // Get trading tools
  async getTradingTools() {
    try {
      const { data, error } = await supabase?.from('trading_tools')?.select(`
          *,
          creator:user_profiles!created_by(
            id,
            full_name
          )
        `)?.order('created_at', { ascending: false })

      if (error) throw error
      return { data: data || [], error: null }
    } catch (error) {
      console.error('Get trading tools error:', error)
      return { data: [], error: error?.message };
    }
  },

  // Get trading tool by ID
  async getTradingToolById(toolId) {
    try {
      const { data, error } = await supabase?.from('trading_tools')?.select(`
          *,
          creator:user_profiles!created_by(
            id,
            full_name,
            avatar_url
          )
        `)?.eq('id', toolId)?.single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Get trading tool by ID error:', error)
      return { data: null, error: error?.message };
    }
  },

  // Increment tool usage count
  async incrementToolUsage(toolId) {
    if (!toolId) return

    try {
      const { error } = await supabase?.from('trading_tools')?.update({ usage_count: supabase.sql`usage_count + 1` })?.eq('id', toolId)

      if (error) throw error
    } catch (error) {
      console.error('Increment tool usage error:', error)
    }
  },

  // Save user calculation
  async saveUserCalculation(calculationData) {
    try {
      const { data, error } = await supabase?.from('user_calculations')?.insert([calculationData])?.select(`
          *,
          tool:trading_tools(
            id,
            name,
            tool_type
          ),
          instrument:trading_instruments(
            id,
            name,
            symbol
          )
        `)?.single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Save user calculation error:', error)
      return { data: null, error: error?.message };
    }
  },

  // Get user calculations
  async getUserCalculations(userId, page = 1, limit = 10) {
    try {
      const from = (page - 1) * limit
      const to = from + limit - 1

      const { data, error, count } = await supabase?.from('user_calculations')?.select(`
          *,
          tool:trading_tools(
            id,
            name,
            tool_type
          ),
          instrument:trading_instruments(
            id,
            name,
            symbol
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
      console.error('Get user calculations error:', error)
      return { data: [], count: 0, totalPages: 0, currentPage: page, error: error?.message };
    }
  },

  // Update user calculation
  async updateUserCalculation(calculationId, updates) {
    try {
      const { data, error } = await supabase?.from('user_calculations')?.update(updates)?.eq('id', calculationId)?.select(`
          *,
          tool:trading_tools(
            id,
            name,
            tool_type
          ),
          instrument:trading_instruments(
            id,
            name,
            symbol
          )
        `)?.single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Update user calculation error:', error)
      return { data: null, error: error?.message };
    }
  },

  // Delete user calculation
  async deleteUserCalculation(calculationId) {
    try {
      const { error } = await supabase?.from('user_calculations')?.delete()?.eq('id', calculationId)

      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Delete user calculation error:', error)
      return { error: error?.message };
    }
  }
}

export default tradingService
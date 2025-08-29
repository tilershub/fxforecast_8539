import { supabase } from '../lib/supabase';

export const authService = {
  // Sign up with email and password
  async signUp(email, password, fullName = '') {
    try {
      const { data, error } = await supabase?.auth?.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: 'member'
          }
        }
      })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Auth signup error:', error)
      return { data: null, error: error?.message };
    }
  },

  // Sign in with email and password
  async signIn(email, password) {
    try {
      const { data, error } = await supabase?.auth?.signInWithPassword({
        email,
        password
      })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Auth signin error:', error)
      return { data: null, error: error?.message };
    }
  },

  // Sign out
  async signOut() {
    try {
      const { error } = await supabase?.auth?.signOut()
      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Auth signout error:', error)
      return { error: error?.message };
    }
  },

  // Get current session
  async getSession() {
    try {
      const { data: { session }, error } = await supabase?.auth?.getSession()
      if (error) throw error
      return { session, error: null }
    } catch (error) {
      console.error('Get session error:', error)
      return { session: null, error: error?.message };
    }
  },

  // Get current user profile
  async getUserProfile(userId) {
    try {
      const { data, error } = await supabase?.from('user_profiles')?.select('*')?.eq('id', userId)?.single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Get user profile error:', error)
      return { data: null, error: error?.message };
    }
  },

  // Update user profile
  async updateUserProfile(userId, updates) {
    try {
      const { data, error } = await supabase?.from('user_profiles')?.update(updates)?.eq('id', userId)?.select()?.single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Update user profile error:', error)
      return { data: null, error: error?.message };
    }
  }
}

export default authService
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useSupabaseAuth = () => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase?.auth?.getSession()
        
        if (error) throw error
        
        if (session?.user) {
          setUser(session?.user)
          await fetchUserProfile(session?.user?.id)
        }
      } catch (error) {
        console.error('Error getting initial session:', error)
        setError(error?.message)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase?.auth?.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session?.user)
          await fetchUserProfile(session?.user?.id)
        } else {
          setUser(null)
          setProfile(null)
        }
        setLoading(false)
      }
    )

    return () => subscription?.unsubscribe();
  }, [])

  const fetchUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase?.from('user_profiles')?.select('*')?.eq('id', userId)?.single()

      if (error && error?.code !== 'PGRST116') {
        throw error
      }

      setProfile(data)
      setError(null)
    } catch (error) {
      console.error('Error fetching user profile:', error)
      setError(error?.message)
    }
  }

  const signUp = async (email, password, fullName) => {
    try {
      setLoading(true)
      setError(null)

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
      console.error('Sign up error:', error)
      setError(error?.message)
      return { data: null, error: error?.message };
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email, password) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase?.auth?.signInWithPassword({
        email,
        password
      })

      if (error) throw error
      
      return { data, error: null }
    } catch (error) {
      console.error('Sign in error:', error)
      setError(error?.message)
      return { data: null, error: error?.message };
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      const { error } = await supabase?.auth?.signOut()
      if (error) throw error
    } catch (error) {
      console.error('Sign out error:', error)
      setError(error?.message)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates) => {
    try {
      if (!user) throw new Error('No user logged in')

      setLoading(true)
      setError(null)

      const { data, error } = await supabase?.from('user_profiles')?.update(updates)?.eq('id', user?.id)?.select()?.single()

      if (error) throw error
      
      setProfile(data)
      return { data, error: null }
    } catch (error) {
      console.error('Update profile error:', error)
      setError(error?.message)
      return { data: null, error: error?.message };
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    profile,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin: profile?.role === 'admin',
    isPremium: profile?.subscription_status === 'active'
  }
}

export default useSupabaseAuth
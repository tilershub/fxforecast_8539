import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // ⚠️ PROTECTED FUNCTION - DO NOT MODIFY OR ADD ASYNC OPERATIONS
  // This is a Supabase auth state change listener that must remain synchronous
  const handleAuthStateChange = (event, session) => {
    // SYNC OPERATIONS ONLY - NO ASYNC/AWAIT ALLOWED
    if (session?.user) {
      setUser(session?.user)
      // Fetch profile separately to avoid async operations in auth callback
      fetchUserProfile(session?.user?.id)
    } else {
      setUser(null)
      setProfile(null)
    }
    setLoading(false)
  }

  const fetchUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase?.from('user_profiles')?.select('*')?.eq('id', userId)?.single()

      if (error && error?.code !== 'PGRST116') {
        console.error('Error fetching user profile:', error)
        setError(error?.message)
        return
      }

      setProfile(data)
      setError(null)
    } catch (err) {
      console.error('Error fetching user profile:', err)
      setError(err?.message)
    }
  }

  useEffect(() => {
    // Get initial session - Use Promise chain
    supabase?.auth?.getSession()?.then(({ data: { session } }) => {
        if (session?.user) {
          setUser(session?.user)
          fetchUserProfile(session?.user?.id)
        }
        setLoading(false)
      })?.catch(err => {
        console.error('Error getting initial session:', err)
        setError(err?.message)
        setLoading(false)
      })

    const { data: { subscription } } = supabase?.auth?.onAuthStateChange(handleAuthStateChange)

    return () => subscription?.unsubscribe()
  }, [])

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
    } catch (err) {
      console.error('Sign up error:', err)
      setError(err?.message)
      return { data: null, error: err?.message };
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
    } catch (err) {
      console.error('Sign in error:', err)
      setError(err?.message)
      return { data: null, error: err?.message };
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { error } = await supabase?.auth?.signOut()
      if (error) throw error
    } catch (err) {
      console.error('Sign out error:', err)
      setError(err?.message)
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
    } catch (err) {
      console.error('Update profile error:', err)
      setError(err?.message)
      return { data: null, error: err?.message };
    } finally {
      setLoading(false)
    }
  }

  const value = {
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

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider
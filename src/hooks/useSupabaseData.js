import { useState, useEffect, useCallback } from 'react';

export const useSupabaseData = (
  serviceMethod,
  dependencies = [],
  options = {}
) => {
  const [data, setData] = useState(options?.initialData || null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async (...args) => {
    try {
      setLoading(true)
      setError(null)

      const result = await serviceMethod(...args)
      
      if (result?.error) {
        throw new Error(result.error)
      }

      setData(result?.data || result)
      return result
    } catch (err) {
      console.error('Data fetch error:', err)
      setError(err?.message)
      return { data: null, error: err?.message };
    } finally {
      setLoading(false)
    }
  }, [serviceMethod])

  const refetch = useCallback((...args) => {
    return fetchData(...args)
  }, [fetchData])

  useEffect(() => {
    if (options?.enabled !== false) {
      fetchData(...dependencies)
    }
  }, dependencies) // eslint-disable-line react-hooks/exhaustive-deps

  return {
    data,
    loading,
    error,
    refetch,
    setData
  }
}

export default useSupabaseData
import { useQuery } from '@tanstack/react-query'
import { fetchSalesData } from '../api'
import type { SalesFilters } from '../types'

export function useSalesData(token: string | undefined, filters: SalesFilters) {
  return useQuery({
    queryKey: ['sales', filters],
    queryFn: () => {
      if (!token) throw new Error('No token available')
      return fetchSalesData(token, filters)
    },
    enabled: !!token, // Only run query when token is available
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: true,
    retry: 2,
  })
}

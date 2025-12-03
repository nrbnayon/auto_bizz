import { useQuery } from '@tanstack/react-query'
import { getAuthorization } from '../api'

const TOKEN_EXPIRATION_MS = 7200 * 1000 // 2 hours in milliseconds
const REFRESH_BEFORE_EXPIRY_MS = 300 * 1000 // Refresh 5 minutes before expiry

export function useAuth() {
  return useQuery({
    queryKey: ['auth'],
    queryFn: getAuthorization,
    staleTime: TOKEN_EXPIRATION_MS - REFRESH_BEFORE_EXPIRY_MS, // Refetch 5 min before expiry
    gcTime: TOKEN_EXPIRATION_MS, // Keep in cache for 2 hours
    refetchInterval: TOKEN_EXPIRATION_MS - REFRESH_BEFORE_EXPIRY_MS, // Auto-refresh before expiration
    retry: 3,
    retryDelay: 1000,
  })
}

import type { AuthResponse, SalesResponse, SalesFilters } from './types'

const BASE_URL = 'https://autobizz-425913.uc.r.appspot.com'

export class APIError extends Error {
  constructor(message: string, public status?: number) {
    super(message)
    this.name = 'APIError'
  }
}

export async function getAuthorization(): Promise<string> {
  try {
    const response = await fetch(`${BASE_URL}/getAuthorize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tokenType: 'frontEndTest' }),
    })

    if (!response.ok) {
      throw new APIError('Failed to get authorization', response.status)
    }

    const data: AuthResponse = await response.json()
    return data.token
  } catch (error) {
    if (error instanceof APIError) throw error
    throw new APIError('Network error during authorization')
  }
}

export async function fetchSalesData(
  token: string,
  filters: SalesFilters
): Promise<SalesResponse> {
  try {
    const params = new URLSearchParams({
      startDate: filters.startDate,
      endDate: filters.endDate,
      sortBy: filters.sortBy || 'date',
      sortOrder: filters.sortOrder || 'asc',
      priceMin: filters.priceMin || '',
      email: filters.email || '',
      phone: filters.phone || '',
      after: filters.after || '',
      before: filters.before || '',
    })

    const response = await fetch(`${BASE_URL}/sales?${params.toString()}`, {
      method: 'GET',
      headers: {
        'X-AUTOBIZZ-TOKEN': token,
      },
    })

    if (!response.ok) {
      throw new APIError('Failed to fetch sales data', response.status)
    }

    const data: SalesResponse = await response.json()
    return data
  } catch (error) {
    if (error instanceof APIError) throw error
    throw new APIError('Network error while fetching sales data')
  }
}

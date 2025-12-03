export interface Sale {
  _id: string
  date: string
  price: number
  customerEmail: string
  customerPhone: string
  __v: number
}

export interface DailyTotal {
  day: string
  totalSale: number
}

export interface SalesResponse {
  results: {
    TotalSales: DailyTotal[]
    Sales: Sale[]
  }
  pagination: {
    before: string
    after: string
  }
}

export interface SalesFilters {
  startDate: string
  endDate: string
  priceMin?: string
  email?: string
  phone?: string
  sortBy?: 'date' | 'price'
  sortOrder?: 'asc' | 'desc'
  after?: string
  before?: string
}

export interface AuthResponse {
  token: string
}

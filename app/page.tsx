"use client"

import { useState } from 'react'
import { useAuth } from '@/lib/hooks/useAuth'
import { useSalesData } from '@/lib/hooks/useSalesData'
import { Sidebar } from '@/components/Sidebar'
import { TopNav } from '@/components/TopNav'
import { DashboardHeader } from '@/components/DashboardHeader'
import { DateRangeFilter } from '@/components/date-range-filter'
import { OtherFilters } from '@/components/other-filters'
import { SalesChart } from '@/components/sales-chart'
import { SalesTable } from '@/components/sales-table'
import { ChartSkeleton, TableSkeleton } from '@/components/LoadingStates'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, Loader2 } from 'lucide-react'
import type { SalesFilters } from '@/lib/types'

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  // Get auth token
  const { data: token, isLoading: authLoading, error: authError } = useAuth()

  // Filter state
  const [filters, setFilters] = useState<SalesFilters>({
    startDate: '2025-01-01',
    endDate: '2025-01-31',
    priceMin: '',
    email: '',
    phone: '',
    sortBy: 'date',
    sortOrder: 'asc',
  })

  const [currentPage, setCurrentPage] = useState(1)

  // Fetch sales data
  const { data: salesData, isLoading: salesLoading, error: salesError } = useSalesData(token, filters)

  // Handle sort
  const handleSort = (column: 'date' | 'price') => {
    setFilters(prev => ({
      ...prev,
      sortBy: column,
      sortOrder: prev.sortBy === column && prev.sortOrder === 'asc' ? 'desc' : 'asc',
      after: '',
      before: '',
    }))
    setCurrentPage(1)
  }

  // Handle pagination
  const handlePageChange = (direction: 'next' | 'prev', token: string) => {
    if (direction === 'next') {
      setFilters(prev => ({
        ...prev,
        after: token,
        before: '',
      }))
      setCurrentPage(prev => prev + 1)
    } else {
      setFilters(prev => ({
        ...prev,
        after: '',
        before: token,
      }))
      setCurrentPage(prev => Math.max(1, prev - 1))
    }
  }

  // Handle filter changes
  const handleFilterChange = (key: keyof SalesFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      after: '',
      before: '',
    }))
    setCurrentPage(1)
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Top Navigation */}
        <TopNav onMenuClick={() => setSidebarOpen(true)} />

        {/* Content Area */}
        <main className="p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <DashboardHeader />

            {/* Error States */}
            {authError && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Authorization Error: {authError.message}
                </AlertDescription>
              </Alert>
            )}

            {salesError && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Error loading sales data: {salesError.message}
                </AlertDescription>
              </Alert>
            )}

            {/* Loading State */}
            {authLoading ? (
              <div className="bg-white rounded-lg border border-gray-200 p-12 flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground text-lg">Initializing dashboard...</p>
              </div>
            ) : (
              <>
                {/* Filters Section */}
                <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Filters</h3>
                  <div className="space-y-4">
                    <DateRangeFilter
                      startDate={filters.startDate}
                      endDate={filters.endDate}
                      onStartDateChange={(date) => handleFilterChange('startDate', date)}
                      onEndDateChange={(date) => handleFilterChange('endDate', date)}
                    />
                    <OtherFilters
                      priceMin={filters.priceMin || ''}
                      email={filters.email || ''}
                      phone={filters.phone || ''}
                      onPriceMinChange={(price) => handleFilterChange('priceMin', price)}
                      onEmailChange={(email) => handleFilterChange('email', email)}
                      onPhoneChange={(phone) => handleFilterChange('phone', phone)}
                    />
                  </div>
                </div>

                {/* Chart Section */}
                <div className="mb-6">
                  {salesLoading ? (
                    <ChartSkeleton />
                  ) : salesData ? (
                    <SalesChart data={salesData.results.TotalSales} />
                  ) : null}
                </div>

                {/* Table Section */}
                {salesLoading ? (
                  <TableSkeleton />
                ) : salesData ? (
                  <SalesTable
                    sales={salesData.results.Sales}
                    sortBy={filters.sortBy || 'date'}
                    sortOrder={filters.sortOrder || 'asc'}
                    onSort={handleSort}
                    pagination={salesData.pagination}
                    onPageChange={handlePageChange}
                    currentPage={currentPage}
                  />
                ) : null}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

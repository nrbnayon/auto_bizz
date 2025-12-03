"use client"

import { Filter, RefreshCcw } from 'lucide-react'
import { Button } from './ui/button'
import { DateRangeFilter } from './date-range-filter'
import { OtherFilters } from './other-filters'

interface VerticalFilterBarProps {
  startDate: string
  endDate: string
  priceMin: string
  email: string
  phone: string
  onStartDateChange: (date: string) => void
  onEndDateChange: (date: string) => void
  onPriceMinChange: (price: string) => void
  onEmailChange: (email: string) => void
  onPhoneChange: (phone: string) => void
  onReset: () => void
}

export function VerticalFilterBar({
  startDate,
  endDate,
  priceMin,
  email,
  phone,
  onStartDateChange,
  onEndDateChange,
  onPriceMinChange,
  onEmailChange,
  onPhoneChange,
  onReset,
}: VerticalFilterBarProps) {
  const activeFiltersCount = [priceMin, email, phone].filter(Boolean).length

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-foreground">
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </div>
        {(activeFiltersCount > 0 || startDate !== '2025-01-01' || endDate !== '2025-01-31') && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-xs h-8 px-2 text-muted-foreground hover:text-foreground"
          >
            <RefreshCcw className="w-3 h-3 mr-1.5" />
            Reset
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* Date Range */}
        <div className="space-y-3">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Date Range
          </label>
          <div className="flex flex-col gap-2">
            <DateRangeFilter
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={onStartDateChange}
              onEndDateChange={onEndDateChange}
              vertical
            />
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-gray-100" />

        {/* Advanced Filters */}
        <div className="space-y-3">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Advanced Filters
          </label>
          <OtherFilters
            priceMin={priceMin}
            email={email}
            phone={phone}
            onPriceMinChange={onPriceMinChange}
            onEmailChange={onEmailChange}
            onPhoneChange={onPhoneChange}
            vertical
          />
        </div>
      </div>
    </div>
  )
}

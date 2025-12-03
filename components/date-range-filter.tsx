"use client"

import { Calendar } from 'lucide-react'
import { Input } from './ui/input'

interface DateRangeFilterProps {
  startDate: string
  endDate: string
  onStartDateChange: (date: string) => void
  onEndDateChange: (date: string) => void
}

export function DateRangeFilter({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DateRangeFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        <Input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className="pl-10 w-36 md:w-40 h-9 text-sm bg-gray-50 border-gray-200 focus:bg-white transition-colors"
        />
      </div>
      <span className="text-gray-400 text-sm">to</span>
      <div className="relative">
        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        <Input
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          className="pl-10 w-36 md:w-40 h-9 text-sm bg-gray-50 border-gray-200 focus:bg-white transition-colors"
        />
      </div>
    </div>
  )
}

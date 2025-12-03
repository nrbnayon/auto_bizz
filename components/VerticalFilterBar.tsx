"use client";

import { Filter, RefreshCcw } from "lucide-react";
import { Button } from "./ui/button";
import { DateRangeFilter } from "./date-range-filter";
import { OtherFilters } from "./other-filters";

interface VerticalFilterBarProps {
  startDate: string;
  endDate: string;
  priceMin: string;
  email: string;
  phone: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onPriceMinChange: (price: string) => void;
  onEmailChange: (email: string) => void;
  onPhoneChange: (phone: string) => void;
  onReset: () => void;
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
  const activeFiltersCount = [priceMin, email, phone].filter(Boolean).length;

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2 font-bold text-gray-900">
          <div className="p-2 bg-linear-to-br from-blue-100 to-blue-50 rounded-lg">
            <Filter className="w-4 h-4 text-blue-600" />
          </div>
          <span>Filters</span>
        </div>
        {(activeFiltersCount > 0 ||
          startDate !== "2025-01-01" ||
          endDate !== "2025-01-31") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-xs h-8 px-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 font-medium"
          >
            <RefreshCcw className="w-3 h-3 mr-1.5" />
            Reset
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* Date Range */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
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
        <div className="h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />

        {/* Advanced Filters */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
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
  );
}

"use client";

import { useState } from "react";
import { Filter, X, ChevronDown, ChevronUp, RefreshCcw } from "lucide-react";
import { Button } from "./ui/button";
import { DateRangeFilter } from "./date-range-filter";
import { OtherFilters } from "./other-filters";

interface FilterBarProps {
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

export function FilterBar({
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
}: FilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const activeFiltersCount = [priceMin, email, phone].filter(Boolean).length;

  return (
    <div className="filter-card rounded-lg border border-gray-200 mb-6">
      {/* Primary Bar */}
      <div className="p-5 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto items-start md:items-center">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <div className="p-1.5 bg-linear-to-br from-blue-100 to-blue-50 rounded-lg">
              <Filter className="w-4 h-4 text-blue-600" />
            </div>
            <span>Filters</span>
          </div>

          <div className="w-full md:w-auto">
            <DateRangeFilter
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={onStartDateChange}
              onEndDateChange={onEndDateChange}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className={`flex-1 md:flex-none gap-2 font-medium ${
              isExpanded ? "bg-blue-50 border-blue-200" : ""
            }`}
          >
            More Filters
            {activeFiltersCount > 0 && (
              <span className="bg-linear-to-r from-blue-600 to-blue-700 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                {activeFiltersCount}
              </span>
            )}
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>

          {(activeFiltersCount > 0 ||
            startDate !== "2025-01-01" ||
            endDate !== "2025-01-31") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 font-medium"
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-5 bg-linear-to-b from-blue-50/30 to-white rounded-b-lg animate-in slide-in-from-top-2 duration-200">
          <OtherFilters
            priceMin={priceMin}
            email={email}
            phone={phone}
            onPriceMinChange={onPriceMinChange}
            onEmailChange={onEmailChange}
            onPhoneChange={onPhoneChange}
          />
        </div>
      )}
    </div>
  );
}

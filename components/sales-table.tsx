"use client";

import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import type { Sale } from "@/lib/types";

interface SalesTableProps {
  sales: Sale[];
  sortBy: "date" | "price";
  sortOrder: "asc" | "desc";
  onSort: (column: "date" | "price") => void;
  pagination: {
    before: string;
    after: string;
  };
  onPageChange: (direction: "next" | "prev", token: string) => void;
  currentPage: number;
}

export function SalesTable({
  sales,
  sortBy,
  sortOrder,
  onSort,
  pagination,
  onPageChange,
  currentPage,
}: SalesTableProps) {
  const getSortIcon = (column: "date" | "price") => {
    if (sortBy !== column) {
      return <ArrowUpDown className="w-4 h-4 text-muted-foreground" />;
    }
    return sortOrder === "asc" ? (
      <ArrowUp className="w-4 h-4 text-primary" />
    ) : (
      <ArrowDown className="w-4 h-4 text-primary" />
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200 bg-linear-to-r from-gray-50 to-blue-50/30">
        <h3 className="text-lg font-bold text-gray-900">Sales Records</h3>
        <p className="text-sm text-gray-600 mt-1">
          {sales.length} items • Page {currentPage}
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                  <button
                    onClick={() => onSort("date")}
                    className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                  >
                    Date {getSortIcon("date")}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                  <button
                    onClick={() => onSort("price")}
                    className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                  >
                    Price {getSortIcon("price")}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                  Customer Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                  Phone
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sales.map((sale) => (
                <tr
                  key={sale._id}
                  className="table-row hover:bg-blue-50/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                    #{sale._id.slice(-8)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(sale.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                    ${sale.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {sale.customerEmail}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {sale.customerPhone}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards - Modern Design */}
      <div className="md:hidden bg-gray-50/50 p-4 space-y-4">
        {sales.map((sale) => (
          <div
            key={sale._id}
            className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
          >
            {/* Card Header - Amount & Status */}
            <div className="flex items-start justify-between p-4 border-b border-gray-100">
              <div className="flex-1">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Amount
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ${sale.price.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-linear-to-r from-green-100 to-green-50 text-green-800 border border-green-200">
                  ✓ Completed
                </span>
              </div>
            </div>

            {/* Card Body - Transaction Details */}
            <div className="p-4 space-y-4">
              {/* Transaction ID */}
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Transaction ID
                </p>
                <p className="text-sm font-mono bg-gray-50 rounded px-3 py-2 text-gray-700 border border-gray-200">
                  #{sale._id.slice(-8)}
                </p>
              </div>

              {/* Date & Time */}
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Date
                </p>
                <p className="text-sm text-gray-700">
                  {new Date(sale.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>

              {/* Customer Info Section */}
              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                  Customer Details
                </p>
                <div className="space-y-3">
                  {/* Email */}
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-1">
                      Email
                    </p>
                    <p className="text-sm text-blue-600 break-all font-medium">
                      {sale.customerEmail}
                    </p>
                  </div>
                  {/* Phone */}
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-1">
                      Phone
                    </p>
                    <p className="text-sm text-gray-700 font-medium">
                      {sale.customerPhone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="md:hidden flex flex-col gap-3 px-4 py-4 border-t border-gray-200 bg-white">
        <span className="text-xs font-bold text-gray-600 uppercase tracking-wider text-center">
          Page {currentPage}
        </span>
        <div className="flex gap-2">
          <Button
            onClick={() => onPageChange("prev", pagination.before)}
            disabled={currentPage === 1}
            variant="outline"
            size="sm"
            className="flex-1 gap-2 font-semibold hover:bg-blue-50"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
          <Button
            onClick={() => onPageChange("next", pagination.after)}
            disabled={sales.length < 50}
            variant="outline"
            size="sm"
            className="flex-1 gap-2 font-semibold hover:bg-blue-50"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Desktop Pagination */}
      <div className="hidden md:flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50/50">
        <Button
          onClick={() => onPageChange("prev", pagination.before)}
          disabled={currentPage === 1}
          variant="outline"
          size="sm"
          className="gap-2 font-medium hover:bg-gray-100"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        <span className="text-sm font-semibold text-gray-700 px-4 py-2 bg-white rounded-lg border border-gray-200">
          Page {currentPage}
        </span>

        <Button
          onClick={() => onPageChange("next", pagination.after)}
          disabled={sales.length < 50}
          variant="outline"
          size="sm"
          className="gap-2 font-medium hover:bg-gray-100"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

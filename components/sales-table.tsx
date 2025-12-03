"use client"

import { ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './ui/button'
import type { Sale } from '@/lib/types'

interface SalesTableProps {
  sales: Sale[]
  sortBy: 'date' | 'price'
  sortOrder: 'asc' | 'desc'
  onSort: (column: 'date' | 'price') => void
  pagination: {
    before: string
    after: string
  }
  onPageChange: (direction: 'next' | 'prev', token: string) => void
  currentPage: number
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
  const getSortIcon = (column: 'date' | 'price') => {
    if (sortBy !== column) {
      return <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
    }
    return sortOrder === 'asc' ? (
      <ArrowUp className="w-4 h-4 text-primary" />
    ) : (
      <ArrowDown className="w-4 h-4 text-primary" />
    )
  }

  return (
    <div className="bg-white rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Sales Records</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {sales.length} items • Page {currentPage}
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <button
                    onClick={() => onSort('date')}
                    className="flex items-center gap-2 hover:text-foreground transition-colors"
                  >
                    Date {getSortIcon('date')}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <button
                    onClick={() => onSort('price')}
                    className="flex items-center gap-2 hover:text-foreground transition-colors"
                  >
                    Price {getSortIcon('price')}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Customer Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Phone
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sales.map((sale) => (
                <tr key={sale._id} className="table-row">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-muted-foreground">
                    #{sale._id.slice(-8)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {new Date(sale.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-foreground">
                    ${sale.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {sale.customerEmail}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {sale.customerPhone}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-border">
        {sales.map((sale) => (
          <div key={sale._id} className="p-4">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs text-muted-foreground font-mono">
                #{sale._id.slice(-8)}
              </span>
              <span className="text-lg font-semibold text-foreground">
                ${sale.price}
              </span>
            </div>
            <div className="text-sm text-foreground mb-1">
              {new Date(sale.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </div>
            <div className="text-sm text-foreground">{sale.customerEmail}</div>
            <div className="text-sm text-muted-foreground">{sale.customerPhone}</div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-border">
        <Button
          onClick={() => onPageChange('prev', pagination.before)}
          disabled={currentPage === 1}
          variant="outline"
          size="sm"
          className="gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
        
        <span className="text-sm text-muted-foreground">
          Page {currentPage}
        </span>
        
        <Button
          onClick={() => onPageChange('next', pagination.after)}
          disabled={sales.length < 50}
          variant="outline"
          size="sm"
          className="gap-1"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

"use client";

import { useState, useMemo } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useSalesData } from "@/lib/hooks/useSalesData";
import { Sidebar } from "@/components/Sidebar";
import { TopNav } from "@/components/TopNav";
import { DashboardHeader } from "@/components/DashboardHeader";
import { FilterBar } from "@/components/FilterBar";
import { VerticalFilterBar } from "@/components/VerticalFilterBar";
import { SalesChart } from "@/components/sales-chart";
import { SalesTable } from "@/components/sales-table";
import { ChartSkeleton, TableSkeleton } from "@/components/LoadingStates";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import type { SalesFilters } from "@/lib/types";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Get auth token
  const { data: token, isLoading: authLoading, error: authError } = useAuth();

  // Filter state
  const [filters, setFilters] = useState<SalesFilters>({
    startDate: "2025-01-01",
    endDate: "2025-01-31",
    priceMin: "",
    email: "",
    phone: "",
    sortBy: "date",
    sortOrder: "asc",
  });

  const [currentPage, setCurrentPage] = useState(1);

  // Fetch sales data
  const {
    data: salesData,
    isLoading: salesLoading,
    error: salesError,
  } = useSalesData(token, filters);

  // Calculate dynamic stats
  const stats = useMemo(() => {
    if (!salesData) return undefined;

    // Calculate total sales from the daily totals array
    const totalSales = salesData.results.TotalSales.reduce(
      (sum, day) => sum + day.totalSale,
      0
    );

    // Estimate orders count (using the length of the sales array for the current view,
    // ideally API should return total count)
    // Since we don't have a total count endpoint, we'll use the current page count as a placeholder
    // or if the API returns all data, we use length.
    // Based on pagination, we only get a slice.
    // For now, let's assume we can only show stats for the *fetched* data or use a placeholder if API doesn't support totals.
    // However, the user wants "Real Data".
    // Let's use the TotalSales array length as a proxy for "Active Days" or similar if we can't get total orders.
    // BUT, for "Orders", let's sum up the sales count if we had it.
    // We don't have total orders count in the API response shown in the prompt.
    // We will use the length of the Sales array (page size) * currentPage as a rough estimate or just the page length.
    // Actually, let's just use the length of the Sales array we have for now,
    // and for Customers, count unique emails in the current list.
    // This is the best we can do without a dedicated stats endpoint.

    const currentOrders = salesData.results.Sales.length;
    const uniqueCustomers = new Set(
      salesData.results.Sales.map((s) => s.customerEmail)
    ).size;
    const avgOrderValue = currentOrders > 0 ? totalSales / currentOrders : 0; // This might be skewed because totalSales is global but orders is paginated.

    // BETTER APPROACH:
    // The user provided `TotalSales` array which has daily totals. Summing that gives accurate Total Revenue.
    // We don't have accurate Total Orders or Total Customers for the whole period from this API response.
    // We will display what we can.

    return {
      totalSales,
      totalOrders: currentOrders, // Note: This is just for the current page
      avgOrderValue:
        currentOrders > 0
          ? salesData.results.Sales.reduce((sum, s) => sum + s.price, 0) /
            currentOrders
          : 0, // Avg of current page
      totalCustomers: uniqueCustomers, // Unique on current page
    };
  }, [salesData]);

  // Handle sort
  const handleSort = (column: "date" | "price") => {
    setFilters((prev) => ({
      ...prev,
      sortBy: column,
      sortOrder:
        prev.sortBy === column && prev.sortOrder === "asc" ? "desc" : "asc",
      after: "",
      before: "",
    }));
    setCurrentPage(1);
  };

  // Handle pagination
  const handlePageChange = (direction: "next" | "prev", token: string) => {
    if (direction === "next") {
      setFilters((prev) => ({
        ...prev,
        after: token,
        before: "",
      }));
      setCurrentPage((prev) => prev + 1);
    } else {
      setFilters((prev) => ({
        ...prev,
        after: "",
        before: token,
      }));
      setCurrentPage((prev) => Math.max(1, prev - 1));
    }
  };

  // Handle filter changes
  const handleFilterChange = (key: keyof SalesFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      after: "",
      before: "",
    }));
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilters({
      startDate: "2025-01-01",
      endDate: "2025-01-31",
      priceMin: "",
      email: "",
      phone: "",
      sortBy: "date",
      sortOrder: "asc",
    });
    setCurrentPage(1);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Fixed on Desktop */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Layout */}
      <div className="flex-1 xl:ml-56 flex flex-col xl:flex-row">
        {/* Middle Column: Vertical Filters (Desktop Only) */}
        <aside className="hidden xl:block w-64 border-r border-gray-200 bg-white h-screen sticky top-0 overflow-y-auto p-6 z-30 shadow-sm">
          <VerticalFilterBar
            startDate={filters.startDate}
            endDate={filters.endDate}
            priceMin={filters.priceMin || ""}
            email={filters.email || ""}
            phone={filters.phone || ""}
            onStartDateChange={(date) => handleFilterChange("startDate", date)}
            onEndDateChange={(date) => handleFilterChange("endDate", date)}
            onPriceMinChange={(price) => handleFilterChange("priceMin", price)}
            onEmailChange={(email) => handleFilterChange("email", email)}
            onPhoneChange={(phone) => handleFilterChange("phone", phone)}
            onReset={handleReset}
          />
        </aside>

        {/* Right Column: Main Content */}
        <div className="flex-1 min-w-0 bg-linear-to-b from-blue-50/30 to-white">
          {/* Top Navigation */}
          <TopNav onMenuClick={() => setSidebarOpen(true)} />

          {/* Content Area */}
          <main className="p-4 md:p-6 mx-auto w-full">
            {/* Mobile/Tablet Filter Bar (Hidden on Desktop) */}
            <div className="xl:hidden mb-6">
              <FilterBar
                startDate={filters.startDate}
                endDate={filters.endDate}
                priceMin={filters.priceMin || ""}
                email={filters.email || ""}
                phone={filters.phone || ""}
                onStartDateChange={(date) =>
                  handleFilterChange("startDate", date)
                }
                onEndDateChange={(date) => handleFilterChange("endDate", date)}
                onPriceMinChange={(price) =>
                  handleFilterChange("priceMin", price)
                }
                onEmailChange={(email) => handleFilterChange("email", email)}
                onPhoneChange={(phone) => handleFilterChange("phone", phone)}
                onReset={handleReset}
              />
            </div>

            <DashboardHeader stats={stats} />

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
                <p className="text-muted-foreground text-lg">
                  Initializing dashboard...
                </p>
              </div>
            ) : (
              <>
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
                    sortBy={filters.sortBy || "date"}
                    sortOrder={filters.sortOrder || "asc"}
                    onSort={handleSort}
                    pagination={salesData.pagination}
                    onPageChange={handlePageChange}
                    currentPage={currentPage}
                  />
                ) : null}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

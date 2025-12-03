import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  ArrowUpRight,
} from "lucide-react";

interface DashboardHeaderProps {
  stats?: {
    totalSales: number;
    totalOrders: number;
    avgOrderValue: number;
    totalCustomers: number;
  };
}

export function DashboardHeader({ stats }: DashboardHeaderProps) {
  // Default values if no stats provided
  const {
    totalSales = 0,
    totalOrders = 0,
    avgOrderValue = 0,
    totalCustomers = 0,
  } = stats || {};

  return (
    <div className="mb-6">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Sales Overview
        </h2>
        <p className="text-base text-gray-600">
          Track your sales performance and analyze trends
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="stat-card p-6 relative">
          <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-green-100 to-transparent opacity-0 group-hover:opacity-100 rounded-full -mr-10 -mt-10 transition-opacity"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Total Sales
              </span>
              <div className="p-2 bg-linear-to-br from-green-100 to-green-50 rounded-lg">
                <DollarSign className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              ${totalSales.toLocaleString()}
            </p>
            <div className="flex items-center gap-1 text-xs font-medium">
              <ArrowUpRight className="w-3 h-3 text-green-600" />
              <span className="text-green-600">+20.1% from last month</span>
            </div>
          </div>
        </div>

        <div className="stat-card p-6 relative">
          <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-blue-100 to-transparent opacity-0 group-hover:opacity-100 rounded-full -mr-10 -mt-10 transition-opacity"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Orders
              </span>
              <div className="p-2 bg-linear-to-br from-blue-100 to-blue-50 rounded-lg">
                <ShoppingCart className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {totalOrders.toLocaleString()}
            </p>
            <div className="flex items-center gap-1 text-xs font-medium">
              <ArrowUpRight className="w-3 h-3 text-blue-600" />
              <span className="text-blue-600">+15.3% from last month</span>
            </div>
          </div>
        </div>

        <div className="stat-card p-6 relative">
          <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-purple-100 to-transparent opacity-0 group-hover:opacity-100 rounded-full -mr-10 -mt-10 transition-opacity"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Avg Order Value
              </span>
              <div className="p-2 bg-linear-to-br from-purple-100 to-purple-50 rounded-lg">
                <TrendingUp className="w-4 h-4 text-purple-600" />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              ${Math.round(avgOrderValue).toLocaleString()}
            </p>
            <div className="flex items-center gap-1 text-xs font-medium">
              <ArrowUpRight className="w-3 h-3 text-purple-600" />
              <span className="text-purple-600">+5.2% from last month</span>
            </div>
          </div>
        </div>

        <div className="stat-card p-6 relative">
          <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-orange-100 to-transparent opacity-0 group-hover:opacity-100 rounded-full -mr-10 -mt-10 transition-opacity"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Customers
              </span>
              <div className="p-2 bg-linear-to-br from-orange-100 to-orange-50 rounded-lg">
                <Users className="w-4 h-4 text-orange-600" />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {totalCustomers.toLocaleString()}
            </p>
            <div className="flex items-center gap-1 text-xs font-medium">
              <ArrowUpRight className="w-3 h-3 text-orange-600" />
              <span className="text-orange-600">+12.5% from last month</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

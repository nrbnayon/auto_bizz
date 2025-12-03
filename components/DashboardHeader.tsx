import { TrendingUp, DollarSign, ShoppingCart, Users } from 'lucide-react'

export function DashboardHeader() {
  return (
    <div className="mb-8">
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-1">Sales Overview</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Track your sales performance and analyze trends
      </p>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Total Sales</span>
            <DollarSign className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-lg md:text-2xl font-bold text-foreground">$45,231</p>
          <p className="text-xs text-green-600 mt-1">+20.1% from last month</p>
        </div>
        
        <div className="stat-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Orders</span>
            <ShoppingCart className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-lg md:text-2xl font-bold text-foreground">1,245</p>
          <p className="text-xs text-blue-600 mt-1">+15.3% from last month</p>
        </div>
        
        <div className="stat-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Avg. Order Value</span>
            <TrendingUp className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-lg md:text-2xl font-bold text-foreground">$363</p>
          <p className="text-xs text-purple-600 mt-1">+5.2% from last month</p>
        </div>
        
        <div className="stat-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Customers</span>
            <Users className="w-4 h-4 text-orange-600" />
          </div>
          <p className="text-lg md:text-2xl font-bold text-foreground">892</p>
          <p className="text-xs text-orange-600 mt-1">+12.5% from last month</p>
        </div>
      </div>
    </div>
  )
}

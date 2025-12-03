"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import type { DailyTotal } from '@/lib/types'

interface SalesChartProps {
  data: DailyTotal[]
}

export function SalesChart({ data }: SalesChartProps) {
  const formattedData = data.map(item => ({
    date: new Date(item.day).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    sales: item.totalSale,
  }))

  const totalSales = data.reduce((sum, item) => sum + item.totalSale, 0)

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Sales Trend</h3>
        <p className="text-sm text-muted-foreground mt-1">Daily sales over the selected period</p>
        <p className="text-3xl font-bold text-foreground mt-2">
          ${totalSales.toLocaleString()}
          <span className="text-sm font-normal text-muted-foreground ml-2">Total</span>
        </p>
      </div>

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={formattedData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(220 90% 56%)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(220 90% 56%)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" vertical={false} />
            <XAxis 
              dataKey="date" 
              stroke="hsl(220 9% 46%)"
              style={{ fontSize: '12px' }}
              tickLine={false}
            />
            <YAxis 
              stroke="hsl(220 9% 46%)"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid hsl(220 13% 91%)',
                borderRadius: '6px',
                boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
              }}
              labelStyle={{ color: 'hsl(224 71% 4%)', fontWeight: 500 }}
              itemStyle={{ color: 'hsl(220 90% 56%)' }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Sales']}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="hsl(220 90% 56%)"
              strokeWidth={2}
              fill="url(#salesGradient)"
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

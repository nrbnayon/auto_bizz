"use client"

import { useState } from 'react'
import { BarChart3, Settings, FileText, X } from 'lucide-react'
import { Button } from './ui/button'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [activeItem, setActiveItem] = useState('analytics')

  const navItems = [
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="sidebar-overlay md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`sidebar w-64 h-screen fixed left-0 top-0 flex flex-col z-50 md:z-auto
          ${isOpen ? 'sidebar-mobile open' : 'sidebar-mobile'} md:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-8 h-8 text-primary" />
            <div>
              <h1 className="font-bold text-lg">Sales Analytics</h1>
              <p className="text-xs text-muted-foreground">Dashboard</p>
            </div>
          </div>
          
          {/* Close button for mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeItem === item.id
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveItem(item.id)
                    if (window.innerWidth < 768) {
                      onClose()
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors
                    ${isActive 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              )
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <p className="text-xs text-muted-foreground">© 2025 Sales Analytics</p>
        </div>
      </aside>
    </>
  )
}

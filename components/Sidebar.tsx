"use client";

import { useState } from "react";
import { BarChart3, Settings, FileText, X } from "lucide-react";
import { Button } from "./ui/button";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [activeItem, setActiveItem] = useState("analytics");

  const navItems = [
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 xl:hidden
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-56 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out flex flex-col xl:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Logo Section with Gradient */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-linear-to-r from-white to-blue-50/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-linear-to-br from-blue-600 to-blue-700 rounded-lg">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-base text-gray-900">
                Sales Analytics
              </h1>
              <p className="text-xs text-gray-500 font-medium">Dashboard</p>
            </div>
          </div>

          {/* Close button for mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="xl:hidden"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveItem(item.id);
                    if (window.innerWidth < 1024) {
                      onClose();
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all
                    ${
                      isActive
                        ? "bg-linear-to-r from-blue-600/10 to-blue-500/5 text-blue-700 border-l-4 border-blue-600 shadow-sm"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {isActive && (
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></div>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <p className="text-xs text-muted-foreground">
            © 2025 Sales Analytics
          </p>
        </div>
      </aside>
    </>
  );
}

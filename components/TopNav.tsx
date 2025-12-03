"use client";

import { useState } from "react";
import { Search, Bell, User, Menu } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface TopNavProps {
  onMenuClick: () => void;
}

export function TopNav({ onMenuClick }: TopNavProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: "New sale recorded: $450", time: "5m ago" },
    { id: 2, text: "Monthly report ready", time: "1h ago" },
    { id: 3, text: "New customer registered", time: "2h ago" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
    }
  };

  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-4 md:px-6 shadow-sm">
      {/* Left side - Mobile menu + Search */}
      <div className="flex items-center gap-3 flex-1">
        {/* Hamburger menu for mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="xl:hidden"
          onClick={onMenuClick}
        >
          <Menu className="w-5 h-5" />
        </Button>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search transactions, customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-gray-50 border-gray-200 hover:bg-gray-100/80 focus:bg-white transition-colors"
            />
          </div>
        </form>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-gray-100"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </Button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                <div className="p-4 border-b border-gray-200 bg-linear-to-r from-gray-50 to-gray-100/50">
                  <h3 className="font-bold text-sm text-gray-900">
                    Notifications
                  </h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="p-4 border-b border-gray-100 hover:bg-blue-50/50 cursor-pointer transition-colors"
                      onClick={() => setShowNotifications(false)}
                    >
                      <p className="text-sm text-gray-900 font-medium">
                        {notif.text}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t border-gray-200 bg-gray-50/50">
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Profile */}
        <div className="hidden md:flex items-center gap-2 pl-4 border-l border-gray-200">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-100 to-blue-50 flex items-center justify-center">
            <User className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-sm hidden xl:block">
            <p className="font-medium text-gray-900">Admin</p>
            <p className="text-xs text-gray-500">admin@example.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}

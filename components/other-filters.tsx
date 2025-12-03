"use client"

import { DollarSign, Mail, Phone } from 'lucide-react'
import { Input } from './ui/input'
import { Label } from './ui/label'

interface OtherFiltersProps {
  priceMin: string
  email: string
  phone: string
  onPriceMinChange: (price: string) => void
  onEmailChange: (email: string) => void
  onPhoneChange: (phone: string) => void
}

export function OtherFilters({
  priceMin,
  email,
  phone,
  onPriceMinChange,
  onEmailChange,
  onPhoneChange,
}: OtherFiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="space-y-1.5">
        <Label htmlFor="price-min" className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Min Price
        </Label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <Input
            id="price-min"
            type="number"
            placeholder="0.00"
            value={priceMin}
            onChange={(e) => onPriceMinChange(e.target.value)}
            className="pl-9 h-10 bg-white border-gray-200 focus:border-primary"
          />
        </div>
      </div>
      
      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Email
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <Input
            id="email"
            type="email"
            placeholder="Search email..."
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className="pl-9 h-10 bg-white border-gray-200 focus:border-primary"
          />
        </div>
      </div>
      
      <div className="space-y-1.5">
        <Label htmlFor="phone" className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Phone
        </Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <Input
            id="phone"
            type="tel"
            placeholder="Search phone..."
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            className="pl-9 h-10 bg-white border-gray-200 focus:border-primary"
          />
        </div>
      </div>
    </div>
  )
}

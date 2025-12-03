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
      <div className="space-y-2">
        <Label htmlFor="price-min" className="text-sm font-medium">
          Minimum Price
        </Label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            id="price-min"
            type="number"
            placeholder="0"
            value={priceMin}
            onChange={(e) => onPriceMinChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Customer Email
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            id="email"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium">
          Phone Number
        </Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            id="phone"
            type="tel"
            placeholder="+1234567890"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
    </div>
  )
}

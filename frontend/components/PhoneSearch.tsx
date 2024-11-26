'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'

interface PhoneSearchProps {
  onPhoneSelect: (phone: { name: string; img: string }) => void;
}

export function PhoneSearch({ onPhoneSelect }: PhoneSearchProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searching, setSearching] = useState(false)
  const [results, setResults] = useState<any[]>([])

  const searchPhones = async () => {
    if (!searchTerm) return
    
    setSearching(true)
    try {
      const response = await fetch(`https://dummyjson.com/products/search?q=${searchTerm}&category=smartphones`)
      const data = await response.json()
      setResults(data.products || [])
    } catch (error) {
      console.error('Error searching phones:', error)
    }
    setSearching(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Buscar teléfono..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && searchPhones()}
        />
        <Button onClick={searchPhones} disabled={searching}>
          {searching ? 'Buscando...' : 'Buscar'}
        </Button>
      </div>
      
      {results.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {results.map((phone) => (
            <div
              key={phone.id}
              className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => onPhoneSelect({ name: phone.title, img: phone.thumbnail })}
            >
              <img
                src={phone.thumbnail}
                alt={phone.title}
                className="w-full h-48 object-contain mb-2"
              />
              <p className="text-sm text-center">{phone.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

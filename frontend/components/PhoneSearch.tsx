'use client'

import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Trash2 } from 'lucide-react'

interface PhoneSearchProps {
  onPhoneSelect: (productName: string) => void;
}

export function PhoneSearch({ onPhoneSelect }: PhoneSearchProps) {
  const [productName, setProductName] = useState('')
  const [products, setProducts] = useState<any[]>([])

  // Cargar productos al montar el componente
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/products/')
      if (!response.ok) throw new Error('Failed to fetch products')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const handleSubmit = async () => {
    if (!productName) return;
    
    try {
      const response = await fetch('http://localhost:8000/api/products/search_and_create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: productName
        })
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const data = await response.json();
      onPhoneSelect(productName);
      setProductName('');
      // Actualizar la lista de productos
      await fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product. Please try again.');
    }
  }

  const handleDelete = async (productName: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/products/${encodeURIComponent(productName)}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      // Actualizar la lista de productos después de eliminar
      await fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product. Please try again.');
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Nombre del producto..."
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <Button onClick={handleSubmit}>
          Agregar Producto
        </Button>
      </div>

      {/* Lista de productos */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Productos Agregados</h3>
        <div className="space-y-2">
          {products.map((product) => (
            <div key={product.nombre} className="flex items-center justify-between bg-white p-3 rounded-lg shadow">
              <div>
                <p className="font-medium">{product.nombre}</p>
                <p className="text-sm text-gray-600">${product.precio}</p>
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(product.nombre)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

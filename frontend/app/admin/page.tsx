'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ProductTable } from '@/components/ProductTable';
import { AddProductDialog } from '@/components/AddProductDialog';

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/products/');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>Add New Product</Button>
      </div>
      
      <ProductTable products={products} onProductsChange={fetchProducts} />
      
      <AddProductDialog 
        open={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen}
        onProductAdded={fetchProducts}
      />
    </div>
  );
}

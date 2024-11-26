import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EditProductDialog } from "./EditProductDialog";
import { useState } from "react";

interface Product {
  id: number;
  nombre: string;
  precio: number;
  imagen_url: string;
}

interface ProductTableProps {
  products: Product[];
  onProductsChange: () => void;
}

export function ProductTable({ products, onProductsChange }: ProductTableProps) {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await fetch(`http://localhost:8000/api/products/${id}/`, {
        method: 'DELETE',
      });
      onProductsChange();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <img 
                  src={product.imagen_url} 
                  alt={product.nombre}
                  className="w-16 h-16 object-cover rounded"
                />
              </TableCell>
              <TableCell>{product.nombre}</TableCell>
              <TableCell>${product.precio}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => setEditingProduct(product)}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <EditProductDialog
        product={editingProduct}
        open={!!editingProduct}
        onOpenChange={(open) => !open && setEditingProduct(null)}
        onProductUpdated={() => {
          setEditingProduct(null);
          onProductsChange();
        }}
      />
    </>
  );
}

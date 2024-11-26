import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  nombre: string;
  precio: number;
  imagen_url: string;
}

interface EditProductDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProductUpdated: () => void;
}

export function EditProductDialog({ 
  product, 
  open, 
  onOpenChange, 
  onProductUpdated 
}: EditProductDialogProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    imagen_url: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre,
        precio: product.precio.toString(),
        imagen_url: product.imagen_url
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    
    try {
      const response = await fetch(`http://localhost:8000/api/products/${product.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          precio: parseFloat(formData.precio)
        }),
      });

      if (response.ok) {
        onOpenChange(false);
        onProductUpdated();
      } else {
        console.error('Error updating product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Name</Label>
            <Input
              id="nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="precio">Price</Label>
            <Input
              id="precio"
              type="number"
              step="0.01"
              value={formData.precio}
              onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imagen_url">Image URL</Label>
            <Input
              id="imagen_url"
              type="url"
              value={formData.imagen_url}
              onChange={(e) => setFormData({ ...formData, imagen_url: e.target.value })}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Update Product</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

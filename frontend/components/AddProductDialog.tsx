import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProductAdded: () => void;
}

export function AddProductDialog({ open, onOpenChange, onProductAdded }: AddProductDialogProps) {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !productPrice) return;

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:8000/api/products/search_and_create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: productName,
          precio: Number(productPrice)
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add product');
      }

      const data = await response.json();
      console.log('Product added:', data);

      setProductName('');
      setProductPrice('');
      onOpenChange(false);
      onProductAdded();
    } catch (error) {
      console.error('Error adding product:', error);
      setError(error instanceof Error ? error.message : 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Product Name</Label>
            <Input
              id="nombre"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name (e.g., Samsung Galaxy S23)"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="precio">Price</Label>
            <Input
              id="precio"
              type="number"
              step="0.01"
              min="0"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              placeholder="Enter price (e.g., 999.99)"
              required
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm">
              {error}
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !productName || !productPrice}>
              {loading ? 'Adding...' : 'Add Product'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

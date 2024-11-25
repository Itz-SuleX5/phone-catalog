"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, Phone, ShoppingCart, User, Star, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SocialLinks } from "@/components/SocialLinks"

export default function Component() {
  const [isOpen, setIsOpen] = useState(false)
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/api/products/')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-4 left-4 right-4 bg-black/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center justify-between z-50">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-white">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col gap-4">
                <Link className="block px-2 py-1 text-lg" href="#">
                  Inicio
                </Link>
                <Link className="block px-2 py-1 text-lg" href="#">
                  Productos
                </Link>
                <Link className="block px-2 py-1 text-lg" href="#">
                  Ofertas
                </Link>
                <Link className="block px-2 py-1 text-lg" href="#">
                  Contacto
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link className="flex items-center gap-2 text-white" href="#">
            <Phone className="h-6 w-6" />
            <span className="font-bold text-xl hidden sm:inline">MobileStore</span>
          </Link>
        </div>
        <div className="hidden lg:flex items-center gap-6 text-white">
          <Link className="hover:text-primary-foreground/80" href="#">
            Inicio
          </Link>
          <Link className="hover:text-primary-foreground/80" href="#">
            Productos
          </Link>
          <Link className="hover:text-primary-foreground/80" href="#">
            Ofertas
          </Link>
          <Link className="hover:text-primary-foreground/80" href="#">
            Contacto
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-white">
            <User className="h-6 w-6" />
            <span className="sr-only">User account</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-white">
            <ShoppingCart className="h-6 w-6" />
            <span className="sr-only">Shopping cart</span>
          </Button>
        </div>
      </nav>

      {/* Hero Section with Gradient */}
      <section className="bg-gradient-to-br from-rose-100 via-teal-100 to-violet-200 animate-gradient-xy pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900">
              Descubre tu Próximo Smartphone
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Encuentra los últimos modelos de las mejores marcas con ofertas increíbles y envío gratuito
            </p>
            <Button size="lg" className="rounded-full bg-black text-white hover:bg-black/90">
              Ver Catálogo
            </Button>
          </div>
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="aspect-square rounded-2xl bg-white/50 backdrop-blur-sm p-4 flex items-center justify-center">
              <img
                alt="Latest iPhone"
                className="object-contain"
                height="200"
                src="/placeholder.svg?height=200&width=200"
                width="200"
              />
            </div>
            <div className="aspect-square rounded-2xl bg-white/50 backdrop-blur-sm p-4 flex items-center justify-center">
              <img
                alt="Samsung Galaxy"
                className="object-contain"
                height="200"
                src="/placeholder.svg?height=200&width=200"
                width="200"
              />
            </div>
            <div className="aspect-square rounded-2xl bg-white/50 backdrop-blur-sm p-4 flex items-center justify-center">
              <img
                alt="Google Pixel"
                className="object-contain"
                height="200"
                src="/placeholder.svg?height=200&width=200"
                width="200"
              />
            </div>
            <div className="aspect-square rounded-2xl bg-white/50 backdrop-blur-sm p-4 flex items-center justify-center">
              <img
                alt="Xiaomi Phone"
                className="object-contain"
                height="200"
                src="/placeholder.svg?height=200&width=200"
                width="200"
              />
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4">
        {/* Productos más vendidos */}
        <section className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-8">Productos más vendidos</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product: any) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={`http://localhost:8000${product.imagen}`}
                  alt={product.nombre}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.nombre}</h3>
                  <p className="text-gray-600">${product.precio}</p>
                  <Button className="w-full mt-4">Añadir al carrito</Button>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Nuevos productos */}
        <section className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-8">Nuevos productos</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product: any) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={`http://localhost:8000${product.imagen}`}
                  alt={product.nombre}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.nombre}</h3>
                  <p className="text-gray-600">${product.precio}</p>
                  <Button className="w-full mt-4">Ver detalles</Button>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Reseñas */}
        <section className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-8">Lo que dicen nuestros clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <img
                    src={`/placeholder.svg?height=50&width=50&text=User ${item}`}
                    alt={`User ${item}`}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">Usuario {item}</h3>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Excelente servicio y productos de alta calidad. Definitivamente volveré a comprar aquí."
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Contacto - Full Width with Deep Blue Gradient */}
      <section className="mt-24 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 py-16 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">Contáctanos</h2>
          <form className="max-w-md mx-auto space-y-6">
            <div className="space-y-4">
              <Input 
                placeholder="Nombre" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Input 
                type="email" 
                placeholder="Email" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Textarea 
                placeholder="Mensaje" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-[120px]"
              />
            </div>
            <Button className="w-full bg-white text-blue-900 hover:bg-white/90">
              Enviar mensaje
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-black text-white py-8 mt-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Acerca de nosotros</h3>
              <p className="text-sm">
                MobileStore es tu tienda de confianza para encontrar los mejores smartphones del mercado.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm hover:underline">Inicio</Link></li>
                <li><Link href="#" className="text-sm hover:underline">Productos</Link></li>
                <li><Link href="#" className="text-sm hover:underline">Ofertas</Link></li>
                <li><Link href="#" className="text-sm hover:underline">Contacto</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
              <SocialLinks />
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            2024 MobileStore. Todos los derechos reservados.
          </div>
        </div>
      </footer>
      
      <style jsx global>{`
        @keyframes gradient-xy {
          0% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
          100% {
            background-position: 0% 0%;
          }
        }
        .animate-gradient-xy {
          background-size: 400% 400%;
          animation: gradient-xy 15s ease infinite;
        }
      `}</style>
    </div>
  )
}
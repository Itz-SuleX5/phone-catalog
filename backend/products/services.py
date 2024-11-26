import requests
from decimal import Decimal
import json
import os
from pathlib import Path

class ProductDatabaseAPI:
    API_URL = "https://products-database.p.rapidapi.com/api/products"
    HEADERS = {
        "x-rapidapi-key": "bb18653d4dmsh9763ddd8e0a6f76p1896cejsnb2c4604c6ecc",
        "x-rapidapi-host": "products-database.p.rapidapi.com"
    }
    JSON_FILE = Path(__file__).parent.parent / 'data' / 'products.json'
    DEFAULT_IMAGE = 'https://fdn2.gsmarena.com/vv/bigpic/dummy.jpg'

    @classmethod
    def get_all_products(cls):
        if not cls.JSON_FILE.exists():
            return []
        
        with open(cls.JSON_FILE, 'r') as f:
            return json.load(f)

    @classmethod
    def save_product(cls, product_data):
        products = cls.get_all_products()
        products.append(product_data)
        
        with open(cls.JSON_FILE, 'w') as f:
            json.dump(products, f, indent=2)

    @classmethod
    def delete_product(cls, product_name):
        products = cls.get_all_products()
        # Filtrar los productos, manteniendo todos excepto el que queremos eliminar
        updated_products = [p for p in products if p['nombre'] != product_name]
        
        # Guardar la lista actualizada
        with open(cls.JSON_FILE, 'w') as f:
            json.dump(updated_products, f, indent=2)
        
        return len(products) != len(updated_products)  # Retorna True si se eliminó algo

    @classmethod
    def search_product(cls, query, precio=0.0):
        print(f"Searching for product with query: {query}")
        print(f"Received price: {precio}")
        
        try:
            response = requests.get(
                cls.API_URL,
                headers=cls.HEADERS,
                params={
                    "query": query,
                    "page": "1",
                    "lang": "en"
                }
            )
            response.raise_for_status()
            data = response.json()
            print(f"API Response: {data}")

            if not data or not isinstance(data, dict):
                raise Exception('Invalid response format')

            products = data.get('products', [])
            if not products:
                raise Exception('No products found')

            product = products[0]
            print(f"Found product: {product}")

            # Obtener la primera imagen del array de imágenes si existe
            image_url = cls.DEFAULT_IMAGE
            if 'images' in product and isinstance(product['images'], list) and len(product['images']) > 0:
                image_url = product['images'][0]

            # Crear el producto con el precio proporcionado
            product_data = {
                'nombre': query,
                'precio': float(precio),
                'imagen_url': image_url
            }

            print(f"Saving product data: {product_data}")
            # Guardar el producto en el archivo JSON
            cls.save_product(product_data)
            
            return product_data

        except Exception as e:
            print(f"Error searching product: {str(e)}")
            raise
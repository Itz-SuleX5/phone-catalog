import requests
from decimal import Decimal

class ProductDatabaseAPI:
    BASE_URL = "https://products-database.p.rapidapi.com/api/products"
    HEADERS = {
        "x-rapidapi-key": "bb18653d4dmsh9763ddd8e0a6f76p1896cejsnb2c4604c6ecc",
        "x-rapidapi-host": "products-database.p.rapidapi.com"
    }

    @classmethod
    def search_product(cls, query):
        params = {
            "query": query,
            "page": "1",
            "lang": "en"
        }

        try:
            response = requests.get(
                cls.BASE_URL,
                headers=cls.HEADERS,
                params=params
            )
            response.raise_for_status()
            data = response.json()

            if not data or 'products' not in data or not data['products']:
                return None

            # Get the first product from the results
            product = data['products'][0]

            # Extract relevant information
            return {
                'nombre': product.get('title', query),
                'precio': Decimal(str(product.get('price', 0))),
                'imagen_url': product.get('image', ''),
                'description': product.get('description', ''),
                'brand': product.get('brand', ''),
                'category': product.get('category', '')
            }

        except requests.RequestException as e:
            print(f"Error fetching product data: {e}")
            return None
        except (KeyError, ValueError) as e:
            print(f"Error processing product data: {e}")
            return None

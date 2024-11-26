# Phone Catalog - Development Guide

This guide documents the step-by-step development process of the Phone Catalog project, a full-stack web application built with Django and Next.js.

## Project Overview

Phone Catalog is a web application that allows users to manage a catalog of mobile phones. It features a modern UI built with Next.js and Tailwind CSS, backed by a Django REST Framework API.

### Tech Stack

- **Backend:**
  - Django 5.0.1
  - Django REST Framework
  - SQLite Database
  - django-cors-headers

- **Frontend:**
  - Next.js 14
  - TypeScript
  - Tailwind CSS
  - Shadcn/ui Components

## Development Steps

### 1. Initial Setup

#### 1.1 Backend Setup
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install django djangorestframework django-cors-headers Pillow

# Create Django project
django-admin startproject backend
cd backend

# Create products app
python manage.py startapp products

# Create requirements.txt
pip freeze > requirements.txt
```

#### 1.2 Frontend Setup
```bash
# Create Next.js project with TypeScript
npx create-next-app@latest frontend --typescript --tailwind --eslint
cd frontend

# Install additional dependencies
npm install @radix-ui/react-dialog
npm install @radix-ui/react-label
npm install @radix-ui/react-slot
npm install class-variance-authority
npm install clsx
npm install lucide-react
npm install tailwind-merge
npm install tailwindcss-animate
```

### 2. Backend Development

#### 2.1 Django Configuration
1. Added 'products', 'rest_framework', and 'corsheaders' to INSTALLED_APPS
2. Configured CORS settings in settings.py:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]
```

#### 2.2 Product Model
Created the Product model in products/models.py:
```python
class Product(models.Model):
    nombre = models.CharField(max_length=200)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    imagen_url = models.URLField()

    def __str__(self):
        return self.nombre
```

#### 2.3 API Development
1. Created serializers for the Product model
2. Implemented ViewSets for CRUD operations
3. Set up URL routing for the API endpoints

### 3. Frontend Development

#### 3.1 Project Structure
```
frontend/
├── app/
│   ├── page.tsx
│   └── admin/
│       └── page.tsx
├── components/
│   ├── ui/
│   ├── ProductTable.tsx
│   ├── AddProductDialog.tsx
│   ├── EditProductDialog.tsx
│   └── PhoneSearch.tsx
└── public/
```

#### 3.2 Main Features Implementation

1. **Product Display Page**
   - Created responsive grid layout
   - Implemented product cards with images
   - Added price formatting

2. **Admin Panel**
   - Implemented product table with CRUD operations
   - Created forms for adding and editing products
   - Added confirmation dialogs for delete operations
   - Integrated with backend API

3. **Phone Search Feature**
   - Integrated with Dummyjson API
   - Implemented search functionality
   - Added product selection capability

### 4. API Integration

#### 4.1 Backend Endpoints
- GET /api/products/ - List all products
- POST /api/products/ - Create new product
- PUT /api/products/{id}/ - Update product
- DELETE /api/products/{id}/ - Delete product

#### 4.2 Frontend API Integration
- Implemented fetch calls for CRUD operations
- Added error handling
- Implemented loading states

### 5. RapidAPI Integration and Data Flow

#### 5.1 RapidAPI Setup
1. Signed up for RapidAPI and obtained API key
2. Selected Products Database API for product information
3. Configured API credentials in backend:
```python
HEADERS = {
    "x-rapidapi-key": "bb18653d4dmsh9763ddd8e0a6f76p1896cejsnb2c4604c6ecc",
    "x-rapidapi-host": "products-database.p.rapidapi.com"
}
API_URL = "https://products-database.p.rapidapi.com/api/products"
```

#### 5.2 Backend Implementation
1. Created ProductDatabaseAPI service in `services.py`:
```python
class ProductDatabaseAPI:
    @classmethod
    def search_product(cls, query, precio=0.0):
        try:
            # Make API request
            response = requests.get(
                cls.API_URL,
                headers=cls.HEADERS,
                params={
                    "query": query,
                    "page": "1",
                    "lang": "en"
                }
            )
            
            data = response.json()
            products = data.get('products', [])
            
            if not products:
                raise Exception('No products found')

            # Extract first image URL
            product = products[0]
            image_url = cls.DEFAULT_IMAGE
            if 'images' in product and product['images']:
                image_url = product['images'][0]

            # Create product data
            product_data = {
                'nombre': query,
                'precio': float(precio),
                'imagen_url': image_url
            }

            # Save to JSON file
            cls.save_product(product_data)
            return product_data

        except Exception as e:
            raise
```

2. Implemented JSON storage in `services.py`:
```python
@classmethod
def save_product(cls, product_data):
    products = cls.get_all_products()
    products.append(product_data)
    
    with open(cls.JSON_FILE, 'w') as f:
        json.dump(products, f, indent=2)
```

#### 5.3 Frontend Components

1. Created AddProductDialog for product input:
```typescript
export function AddProductDialog({ onProductAdded }: AddProductDialogProps) {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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

      if (!response.ok) throw new Error('Failed to add product');
      
      onProductAdded();
    } catch (error) {
      console.error('Error:', error);
    }
  };
}
```

#### 5.4 Data Flow Process

1. **User Input**
   - User enters product name and price in frontend form
   - Form validates input (required fields, number validation)

2. **Frontend to Backend**
   - Frontend sends POST request to `/api/products/search_and_create/`
   - Request includes product name and price

3. **Backend Processing**
   - Backend receives request and extracts data
   - Makes API call to RapidAPI Products Database
   - Processes response and extracts first image URL
   - Creates product object with user's price and API image

4. **Data Storage**
   - Backend saves product to local JSON file
   - Product includes: name, price, and image URL

5. **Frontend Display**
   - Frontend fetches updated product list
   - Displays products in responsive grid
   - Shows product image, name, and price

#### 5.5 Error Handling

1. **Frontend Validation**
   - Required field validation
   - Number format validation for price
   - Loading states during API calls

2. **Backend Validation**
   - API response validation
   - Default image fallback
   - Exception handling for API failures

This implementation provides a seamless experience where users only need to input basic product information, while the system automatically enriches it with data from RapidAPI.

### 6. UI/UX Improvements

1. **Styling**
   - Implemented Tailwind CSS for responsive design
   - Added Shadcn/ui components for consistent UI
   - Created custom animations for interactions

2. **User Experience**
   - Added form validation
   - Implemented error messages
   - Added loading states
   - Created confirmation dialogs

### 7. Testing and Debugging

1. **Backend Testing**
   - Tested API endpoints
   - Validated data serialization
   - Checked CORS configuration

2. **Frontend Testing**
   - Tested CRUD operations
   - Verified form validation
   - Checked responsive design

### 8. Deployment Preparation

1. **Backend Configuration**
   - Added proper CORS settings
   - Configured static and media files
   - Created superuser for admin access

2. **Frontend Configuration**
   - Environment variables setup
   - API URL configuration
   - Build optimization

## Running the Project

### Backend
```bash
cd backend
python manage.py migrate
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api/
- Admin Panel: http://localhost:3000/admin

## Future Improvements

1. Authentication and Authorization
   - Implement user authentication
   - Add role-based access control
   - Secure admin panel access

2. Enhanced Features
   - Advanced product filtering
   - Product categories
   - Product reviews and ratings
   - Image upload functionality

3. Performance Optimizations
   - Image optimization
   - API response caching
   - Lazy loading for products

4. Additional Features
   - Product search functionality
   - Product comparison
   - Favorite products
   - Product recommendations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

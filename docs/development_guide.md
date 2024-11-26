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

### 5. UI/UX Improvements

1. **Styling**
   - Implemented Tailwind CSS for responsive design
   - Added Shadcn/ui components for consistent UI
   - Created custom animations for interactions

2. **User Experience**
   - Added form validation
   - Implemented error messages
   - Added loading states
   - Created confirmation dialogs

### 6. Testing and Debugging

1. **Backend Testing**
   - Tested API endpoints
   - Validated data serialization
   - Checked CORS configuration

2. **Frontend Testing**
   - Tested CRUD operations
   - Verified form validation
   - Checked responsive design

### 7. Deployment Preparation

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

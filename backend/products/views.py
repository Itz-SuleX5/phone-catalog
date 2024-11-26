from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Product
from .serializers import ProductSerializer
from .services import ProductDatabaseAPI

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    @action(detail=False, methods=['post'])
    def search_and_create(self, request):
        product_name = request.data.get('nombre')
        if not product_name:
            return Response(
                {'error': 'Product name is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Search for product details using the API
        product_data = ProductDatabaseAPI.search_product(product_name)
        
        if not product_data:
            return Response(
                {'error': 'Product not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        # Create new product with the fetched data
        serializer = self.get_serializer(data=product_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

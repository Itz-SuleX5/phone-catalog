from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .services import ProductDatabaseAPI

class ProductViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['post'])
    def search_and_create(self, request):
        nombre = request.data.get('nombre')
        precio = request.data.get('precio', 0.0)

        if not nombre:
            return Response(
                {'error': 'Product name is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            product = ProductDatabaseAPI.search_product(nombre, precio)
            return Response(product, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    def list(self, request):
        # Get all products from JSON file
        products = ProductDatabaseAPI.get_all_products()
        return Response(products)

    def destroy(self, request, pk=None):
        # pk será el nombre del producto en este caso
        if not pk:
            return Response(
                {'error': 'Product name is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        success = ProductDatabaseAPI.delete_product(pk)
        if success:
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(
            {'error': 'Product not found'},
            status=status.HTTP_404_NOT_FOUND
        )

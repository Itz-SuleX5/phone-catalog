from django.db import models

class Product(models.Model):
    nombre = models.CharField(max_length=200)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    imagen_url = models.URLField(max_length=500, default='https://fdn2.gsmarena.com/vv/bigpic/dummy.jpg')

    def __str__(self):
        return self.nombre

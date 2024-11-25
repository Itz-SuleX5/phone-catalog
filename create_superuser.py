import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth.models import User

if not User.objects.filter(username='root').exists():
    User.objects.create_superuser('root', 'admin@example.com', 'toor')

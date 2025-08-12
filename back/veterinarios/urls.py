from django.urls import path, include
from rest_framework import routers
from .views import VeterinarioViewSet

router = routers.DefaultRouter()
router.register(r'', VeterinarioViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

from django.urls import path, include
from rest_framework import routers
from .views import AnimalViewSet


router = routers.DefaultRouter()
router.register(r'animales', AnimalViewSet) 

urlpatterns = [
    path('animales/', include(router.urls)),
]

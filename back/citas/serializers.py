from rest_framework import serializers
from .models import Cita
from animales.serializers import AnimalSerializer
from veterinarios.serializers import VeterinarioSerializer

class CitaSerializer(serializers.ModelSerializer):
    animal = AnimalSerializer()
    veterinario = VeterinarioSerializer()


    class Meta:
        model = Cita
        fields = '__all__'
        
        
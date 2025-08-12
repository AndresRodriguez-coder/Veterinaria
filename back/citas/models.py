from django.db import models
from animales.models import Animal
from veterinarios.models import Veterinario
# Create your models here.
class Cita(models.Model):
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE)
    fecha = models.DateTimeField()
    veterinario = models.ForeignKey(Veterinario, on_delete=models.CASCADE)

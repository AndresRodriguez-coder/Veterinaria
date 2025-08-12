from django.db import models


# Create your models here.
class Veterinario(models.Model):
    nombre = models.CharField(max_length=100)
    telefono = models.CharField(max_length=15)
    direccion = models.CharField(max_length=255)
    email = models.EmailField(max_length=100)
    especialidad = models.CharField(max_length=100)
    experiencia = models.IntegerField()
    disponibilidad = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre
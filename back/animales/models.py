from django.db import models

# Create your models here.

class Animal(models.Model):
    nombre = models.CharField(max_length=100)
    especie = models.CharField(max_length=100)
    raza = models.CharField(max_length=100)
    finca = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre
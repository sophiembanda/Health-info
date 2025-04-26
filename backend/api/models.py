# This file defines the models for the Django application.
# It includes three models: HealthProgram, Client, and Enrollment.
# api/models.py

from django.db import models
from django.contrib.auth.models import User

class HealthProgram(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='programs')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Client(models.Model):
    name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class Enrollment(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='enrollments')
    program = models.ForeignKey(HealthProgram, on_delete=models.CASCADE, related_name='enrollments')
    enrollment_date = models.DateField(auto_now_add=True)

    class Meta:
        unique_together = ['client', 'program']

    def __str__(self):
        return f"{self.client.name} - {self.program.name}"


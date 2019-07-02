from django.db import models


class Employee(models.Model):
    company_id = models.IntegerField()
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=10)

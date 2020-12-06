from django.db import models

class User(models.Model):
    email = models.CharField(max_length=30, blank=False, unique=True )
    password = models.CharField(max_length=15, blank=False )

from django.db import models

# Create your models here.
class Usermap(models.Model):
    map = models.CharField(max_length=600)
    def __str__(self):
        return self.map

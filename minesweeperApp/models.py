from django.db import models

# Create your models here.
class Usermap(models.Model):
    user_name = models.CharField(max_length=40)
    map = models.CharField(max_length=300)
    def __str__(self):
        return self.user_name + self.map

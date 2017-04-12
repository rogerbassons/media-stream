from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Video(models.Model):
    title = models.CharField(max_length=200)
    videoId = models.CharField(max_length=200)
    likes = models.BigIntegerField()
    unlikes = models.BigIntegerField()
    date = models.DateField(auto_now=False, auto_now_add=True)
    description = models.CharField(max_length=1000)
    numberviews = models.BigIntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

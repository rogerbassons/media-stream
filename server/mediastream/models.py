from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Video(models.Model):
    title = models.CharField(max_length=200)
    videoId = models.CharField(max_length=200)
    date = models.DateField(auto_now=False, auto_now_add=True)
    description = models.CharField(max_length=1000)
    numberviews = models.BigIntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Comment(models.Model):
    text = models.CharField(max_length=1000)
    date = models.DateField(auto_now=False, auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    video = models.ForeignKey(Video, related_name="comments", on_delete=models.CASCADE)

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    video = models.ForeignKey(Video, related_name="likes", on_delete=models.CASCADE)

class Unlike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    video = models.ForeignKey(Video, related_name="unlikes", on_delete=models.CASCADE)

from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    video_id = models.CharField(max_length=255,blank=True)
    text = models.CharField(max_length=255)
    likes = models.IntegerField(null=True, blank=True, default=0)
    dislikes = models.IntegerField(null=True, blank=True, default=0)
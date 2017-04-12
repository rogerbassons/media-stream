from rest_framework import serializers
from .models import Video
from django.contrib.auth.models import User

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'last_name')

class VideoThumbSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Video
        fields = ('title', 'videoId', 'numberviews')

class VideoSerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Video
        fields = ('title', 'videoId', 'numberviews', 'likes', 'unlikes', 'date', 'description', 'user')

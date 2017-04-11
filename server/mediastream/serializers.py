from rest_framework import serializers
from .models import Video

class VideoThumbSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Video
        fields = ('title', 'videoId', 'numberviews')

class VideoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Video
        fields = ('title', 'videoId', 'numberviews', 'likes', 'unlikes', 'date', 'description')

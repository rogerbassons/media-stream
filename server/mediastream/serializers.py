from rest_framework import serializers
from .models import Video, Comment, LiveStream
from django.contrib.auth.models import User

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'last_name')

class CommentSerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Comment
        fields = ('text', 'user', 'date')

class LiveStreamSerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = LiveStream
        fields = ('title', 'description', 'user', 'live_at')

class VideoThumbSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Video
        fields = ('title', 'videoId', 'numberviews')

class VideoSerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    likes = serializers.SerializerMethodField()
    unlikes = serializers.SerializerMethodField()
    currentuserlike = serializers.SerializerMethodField()
    class Meta:
        model = Video
        fields = ('title', 'videoId', 'numberviews', 'likes', 'unlikes', 'date', 'description', 'user', 'comments', 'currentuserlike')
    def get_likes(self, obj):
        return obj.likes.count()
    def get_unlikes(self, obj):
        return obj.unlikes.count()
    def get_currentuserlike(self, obj):
        if 'request' in self.context:
            user = self.context['request'].user
            if obj.likes.all().filter(user__id=user.id):
                return 'LIKE'
            elif obj.unlikes.all().filter(user__id=user.id):
                return 'UNLIKE'
        return ' '

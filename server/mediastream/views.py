from django.shortcuts import render
from rest_framework import viewsets
from .models import Video
from .serializers import VideoSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly

# Create your views here.

class VideoViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows to get videos
    """
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Video.objects.all()
    serializer_class = VideoSerializer

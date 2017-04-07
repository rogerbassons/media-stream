from django.shortcuts import render
from rest_framework import viewsets
from .models import Video
from .serializers import VideoSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.decorators import list_route

# Create your views here.

class VideoViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows to get videos
    """
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Video.objects.all()
    serializer_class = VideoSerializer

    def get_queryset(self):
        queryset = Video.objects.all()
        searchtext = self.request.query_params.get('search', None)
        if searchtext is not None:
            queryset = queryset.filter(title__icontains=searchtext)
        return queryset

    @list_route()
    def last(self, request):
        last_videos = Video.objects.all().order_by('-date')[:20]

        page = self.paginate_queryset(last_videos)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(last_videos, many=True)
        return Response(serializer.data)

    @list_route()
    def best(self, request):
        best_videos = Video.objects.all().order_by('-likes')[:20]

        page = self.paginate_queryset(best_videos)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(best_videos, many=True)
        return Response(serializer.data)

from django.shortcuts import render
from rest_framework import viewsets, status
from .models import Video, Like, Unlike, Comment
from .serializers import VideoSerializer, VideoThumbSerializer, CommentSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.decorators import list_route, api_view, permission_classes
from rest_framework import generics
from rest_framework.response import Response
import json
# Create your views here.

class VideoByIdView(generics.RetrieveAPIView):
    serializer_class = VideoSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    lookup_field = 'videoId'
    queryset = Video.objects.all()

@api_view(['PUT'])
@permission_classes((IsAuthenticated, ))
def likeVideoView(request, videoId):
    id = videoId
    try:
        v = Video.objects.get(videoId=id)
    except v.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'PUT':
        if not v.likes.filter(user=request.user):
            v.unlikes.filter(user=request.user).delete()
            l = Like(user=request.user, video=v)
            l.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['PUT'])
@permission_classes((IsAuthenticated, ))
def unLikeVideoView(request, videoId):
    id = videoId
    try:
        v = Video.objects.get(videoId=id)
    except v.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'PUT':
        if not v.unlikes.filter(user=request.user):
            v.likes.filter(user=request.user).delete()
            l = Unlike(user=request.user, video=v)
            l.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['PUT'])
@permission_classes((IsAuthenticated, ))
def commentVideoView(request, videoId):
    id = videoId
    try:
        v = Video.objects.get(videoId=id)
    except v.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'PUT':
        if request.data.get('text'):
            c = Comment(text=request.data.get('text'), user=request.user, video=v)
            c.save()
            return Response(VideoSerializer(v).data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class VideoViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows to get videos
    """
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Video.objects.all()
    serializer_class = VideoThumbSerializer


    def get_queryset(self):
        queryset = Video.objects.all()
        searchtext = self.request.query_params.get('search', None)
        if searchtext is not None:
            queryset = queryset.filter(title__icontains=searchtext)

        serializer = self.get_serializer(queryset, many=True)
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

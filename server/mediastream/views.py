from django.shortcuts import render
from rest_framework import viewsets, status
from .models import Video, Like, Unlike, Comment, LiveStream
from .serializers import VideoSerializer, VideoThumbSerializer, CommentSerializer,  LiveStreamSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated, AllowAny
from rest_framework.decorators import list_route, api_view, permission_classes
from rest_framework import generics
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponseRedirect, QueryDict
from .forms import UploadFileForm
import hashlib
import datetime
import os
import json
# Create your views here.

@api_view(['POST'])
@permission_classes((AllowAny, ))
def on_publish(request):
    key = request.POST['name']

    try:
        ls = LiveStream.objects.get(key=key)
        ls.enabled = True
        ls.live_at = datetime.datetime.now()
        ls.save()
        return HttpResponseRedirect(ls.user.username + "/")
    except ObjectDoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes((AllowAny, ))
def on_publish_done(request):
    key = request.POST['name']

    s = LiveStream.objects.get(key=key)
    s.enabled = False
    s.live_at = None
    s.save()

    return Response(status=status.HTTP_200_OK)


@api_view(['GET', 'PUT'])
@permission_classes((IsAuthenticatedOrReadOnly, ))
def VideoByIdView(request, videoId):
    id = videoId
    try:
        v = Video.objects.get(videoId=id)
    except v.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        v = Video.objects.get(videoId=videoId)
        v.numberviews += 1
        v.save()
        return Response(VideoSerializer(v, context={'request': request}).data, status=status.HTTP_200_OK)
    if request.method == 'PUT' and request.user:
        title = request.data.get('title')
        description = request.data.get('description')
        if  title and description and v.user == request.user:
            v.title = title
            v.description = description
            v.enabled = True
            v.save()
            return Response(VideoSerializer(v, context={'request': request}).data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
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
            return Response(VideoSerializer(v, context={'request': request}).data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_204_NO_CONTENT)
    if request.method == 'DELETE':
        if v.likes.filter(user=request.user):
            v.likes.filter(user=request.user).delete()
            v.save()
            return Response(VideoSerializer(v, context={'request': request}).data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['PUT', 'DELETE'])
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
            return Response(VideoSerializer(v, context={'request': request}).data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_204_NO_CONTENT)
    if request.method == 'DELETE':
        if v.unlikes.filter(user=request.user):
            v.unlikes.filter(user=request.user).delete()
            v.save()
            return Response(VideoSerializer(v, context={'request': request}).data, status=status.HTTP_201_CREATED)
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
            return Response(VideoSerializer(v, context={'request': request}).data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


def handle_uploaded_file(f, name):
    with open(name, 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)

def hashFile(file, string):
    BLOCKSIZE = 65536
    hasher = hashlib.md5()
    buf = file.read(BLOCKSIZE)
    while len(buf) > 0:
        hasher.update(buf)
        buf = file.read(BLOCKSIZE)
    hasher.update(string.encode('utf-8'))
    return hasher.hexdigest()

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

    def create(self, request):
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            file = request.FILES['file']

            id = hashFile(file,request.user.get_username() + datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
            saveDir = 'tmp/'
            extension = '.' + file.name.rsplit('.', 1)[-1]
            path = saveDir + id + extension
            dashPath = saveDir + id + 'DASH.mp4'

            handle_uploaded_file(file, path)

            os.system('ffmpeg -i ' + path + ' -ss 00:00:00 -vframes 1 -filter:v scale=\'min(1280\, iw):-1\' ../thumbs/' + id + '.png')
            os.system('ffmpeg -i ' + path + ' -c:v libx264 -b:v 4000k -r 24 -x264opts keyint=48:min-keyint=48:no-scenecut -profile:v main -preset medium -movflags +faststart -c:a aac -b:a 128k -ac 2 ' + dashPath)
            os.system('mkdir ../videos/' + id)
            os.system('MP4Box -dash 4000 -rap -bs-switching no -profile dashavc264:live -out ../videos/' + id + '/' + id + '.mpd ' + dashPath + '#audio ' + dashPath + '#video')

            os.remove(dashPath)
            os.remove(path)

            v = Video(videoId=id, user=request.user)
            v.save()
            return Response(data={'videoId': id},status=status.HTTP_200_OK)
        else:
            form = UploadFileForm()
        return Response(status=status.HTTP_400_BAD_REQUEST)

    @list_route()
    def last(self, request):
        last_videos = Video.objects.all().exclude(enabled=False).order_by('-date')[:20]

        page = self.paginate_queryset(last_videos)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(last_videos, many=True)
        return Response(serializer.data)

    @list_route()
    def best(self, request):
        best_videos = Video.objects.all().exclude(enabled=False).order_by('-likes')[:20]

        page = self.paginate_queryset(best_videos)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(best_videos, many=True)
        return Response(serializer.data)

class LiveStreamViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = LiveStream.objects.all()
    serializer_class = LiveStreamSerializer


    def get_queryset(self):
        searchtext = self.request.query_params.get('search', None)
        if searchtext is not None:
            queryset = queryset.filter(title__icontains=searchtext)

        serializer = self.get_serializer(queryset, many=True)
        return queryset

    def create(self, request):
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        title = body['title']
        description = body['description']
        user = request.user
        try:
            ls = LiveStream.objects.get(user=user)
            ls.title = title
            ls.description = description
            ls.save()
            return Response(data={'key': ls.key},status=status.HTTP_201_CREATED)
        except ObjectDoesNotExist:
            hasher = hashlib.md5()
            hasher.update(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S").encode('utf-8'))
            hasher.update(request.user.get_username().encode('utf-8'))
            key = hasher.hexdigest()

            ls = LiveStream(user=user, title=title, description=description, key=key)

            ls.save()

            return Response(data={'key': key},status=status.HTTP_201_CREATED)

    @list_route()
    def last(self, request):
        last_videos = LiveStream.objects.all().exclude(enabled=False).order_by('-live_at')[:20]

        page = self.paginate_queryset(last_videos)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(last_videos, many=True)
        return Response(serializer.data)

    @list_route()
    def best(self, request):
        best_videos = LiveStream.objects.all().exclude(enabled=False).order_by('-likes')[:20]

        page = self.paginate_queryset(best_videos)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(best_videos, many=True)
        return Response(serializer.data)

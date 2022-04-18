from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Comment
from .serializers import CommentSerializer
from django.shortcuts import get_object_or_404

@api_view(['GET'])
@permission_classes([AllowAny])
def get_video_comments(request, video_id):
    comment = Comment.objects.filter(video_id = video_id)
    serializer = CommentSerializer(comment, many= True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def add_comment(request):
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_comment(request, pk):
        comment = Comment.objects.filter(pk = pk)
        serializer = CommentSerializer(comment, data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
 
# [OrderedDict([('id', 1), ('user', OrderedDict([('id', 1), ('password', 'pbkdf2_sha256$320000$9Tzzcq9SbYnat2E9DSn5yb$UfkLsYV8h55nCv9PuVJGO018V8ZgMcght7m8MjXW+Ps='), ('last_login', '2022-04-15T12:51:55.332234Z'), ('is_superuser', True), ('username', 'bigm'), ('first_name', ''), ('last_name', ''), ('email', 'e.m.krakue@gmail.com'), ('is_staff', True), ('is_active', True), ('date_joined', '2022-04-14T16:32:56.989939Z'), ('groups', []), ('user_permissions', [])])), ('video_id', 'dfdfdfaff'), ('text', 'Awesome stuff!!! Keep it up!'), ('likes', 5), ('dislikes', 1)])]
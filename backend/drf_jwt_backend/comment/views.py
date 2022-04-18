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
        userInfo = {"id":request.user.id, "username":request.user.username}
        serializer.save(user=userInfo)
       # print (f"id: {serializer.data.id}, user:{'id':serializer.data.user.id, 'username':serializer.data.user.username}, video_id:{serializer.data.video_id}, text:{serializer.data.text}, likes:{serializer.data.likes}, dislikes:{serializer.data.dislikes}")
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def user_comment_update(request, pk):
        comment = get_object_or_404(Comment, pk = pk)
        if request.method == 'GET':
            serializer = CommentSerializer(comment)
            return Response(serializer.data)
        elif request.method == 'Put':
            serializer = CommentSerializer(comment, data = request.data)
            serializer.is_valid()
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
 

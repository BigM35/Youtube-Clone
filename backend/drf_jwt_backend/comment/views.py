from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Comment
from .serializers import CommentSerializer
from django.shortcuts import get_object_or_404

@api_view(['GET'])
@permission_classes([AllowAny])
def get_video_comments(request, pk):
    comment = Comment.objects.all(video_id = pk)
    serializer = CommentSerializer(comment)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_comment(request):
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
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
 

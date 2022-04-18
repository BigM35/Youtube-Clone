from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Comment
from .serializers import CommentSerializer

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
        comment = Comment.objects.get(pk = pk)
        serializer = CommentSerializer(comment, data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)
 
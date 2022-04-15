from django.urls import path
from . import views



urlpatterns = [
	path('<str:pk>/', views.get_video_comments),
	path('auth/', views.user_comment),
	path('<int:pk>/', views.user_comment_update)
]
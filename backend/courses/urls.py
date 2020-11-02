from django.urls import path
from . import views
from .serializers import *
from rest_framework import routers

app_name = 'courses'

urlpatterns = [
    path('', views.test_pandas),
    path('tester/', views.CourseViewSet ),
    path('api/', views.CourseView.as_view(), name='api')
]
from django.urls import path
from . import views


app_name = 'courses'

urlpatterns = [
    path('', views.test_pandas),
    path('api/', views.CourseView.as_view(), name='api')
]
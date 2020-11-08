from django.urls import path
from . import views


app_name = 'api'
urlpatterns = [
    path('courses/', views.api_course_list, name='course'),
    path('courses/<course_code>/', views.api_course_detail, name='course_detail'),
    path('mycourses/', views.api_my_course_list, name='my_course'),
    path('mycourses/<course_code>/', views.api_my_courses_detail, name='my_course_detail'),
    path('grades/', views.api_grades_list, name='grades_list'),
    path('user/', views.api_user_detail, name='user'),
    path('curriculum/', views.api_curriculum_detail, name='curriculum'),
]

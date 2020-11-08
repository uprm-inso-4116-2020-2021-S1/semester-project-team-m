from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from courses.models import Course, MyCourse
from rest_framework.permissions import IsAuthenticated
from .serializers import CourseSerializer, MyCourseSerializer, GradesSerializer, UserCourseSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_user_detail(request):
    if request.method == "GET":
        data = {
            'username': request.user.username,
            'email': request.user.email,
            'student_id': request.user.profile.student_id,
            'first_name': request.user.first_name,
            'last_name': request.user.last_name,
            'date_joined': request.user.date_joined,
            'last_login': request.user.last_login,
        }
        return Response(data)


@api_view(['GET'])
def api_course_list(request):
    if request.method == "GET":

        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return JsonResponse(serializer.data, safe=False)


@api_view(['GET'])
def api_course_detail(request, course_code):
    try:
        course_code = course_code.upper()
        courses = Course.objects.get(code=course_code)
    except Course.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = CourseSerializer(courses)
        return JsonResponse(serializer.data, safe=False)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_my_course_list(request, format='json'):
    try:
        my_courses = MyCourse.objects.filter(email=request.user.email)
    except MyCourse.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = MyCourseSerializer(my_courses, many=True)
        return JsonResponse(serializer.data, safe=False)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_my_courses_detail(request, course_code):
    try:
        course_code = course_code.upper()
        my_courses = MyCourse.objects.get(email=request.user.email, course__code=course_code)
    except MyCourse.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = MyCourseSerializer(my_courses)
        return JsonResponse(serializer.data, safe=False)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_grades_list(request):
    try:
        my_courses = MyCourse.objects.filter(email=request.user.email)
    except MyCourse.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = GradesSerializer(my_courses, many=True)
        return JsonResponse(serializer.data, safe=False)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_curriculum_detail(request):
    year = request.user.profile.curriculum_year if request.user.profile.curriculum_year is not '0' else ''
    currirculum = request.user.profile.major + year

    if request.method == "GET":
        courses = Course.objects.filter(curriculum__contains=[currirculum])
        serializer = UserCourseSerializer(courses, many=True)
        return JsonResponse(serializer.data, safe=False)

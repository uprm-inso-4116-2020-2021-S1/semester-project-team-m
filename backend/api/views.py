from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from courses.models import Course, MyCourse
from rest_framework.permissions import IsAuthenticated
from .serializers import CourseSerializer, MyCourseSerializer, GradesSerializer, UserCourseSerializer, UserSerializer
from rest_framework import serializers
from django.contrib.auth.models import User
import json


@api_view(['POST'])
def api_user_register(request):
    if request.method == "POST":
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            try:
                User.objects.get(username=serializer.validated_data['email'])
            except User.DoesNotExist:
                user = serializer.save()
                if user:
                    return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
                return JsonResponse(status=status.HTTP_400_BAD_REQUEST)
            raise serializers.ValidationError({"email": "Another user is registered with the same email."})
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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


@api_view(['GET', 'POST'])
def api_course_list(request):
    if request.method == "GET":
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == "POST":
        if 'code' in request.POST:
            request.POST._mutable = True
            request.POST['code'] = request.POST['code'].upper()
            request.POST._mutable = False
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(code=request.data['code'].upper())
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def api_course_detail(request, course_code):
    try:
        course_code = course_code.upper()
        course = Course.objects.get(code=course_code)
    except Course.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = CourseSerializer(course)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == "PUT":
        if 'code' in request.POST:
            request.POST._mutable = True
            request.POST['code'] = request.POST['code'].upper()
            request.POST._mutable = False
        serializer = CourseSerializer(course, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        course.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def api_my_course_list(request, format='json'):
    try:
        my_courses = MyCourse.objects.filter(user=request.user.profile)
    except MyCourse.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = MyCourseSerializer(my_courses, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == "POST":
        data = json.loads(request.body)
        if 'code' not in data:
            raise serializers.ValidationError({"code": "This field is required."})

        serializer = MyCourseSerializer(data=data)
        if serializer.is_valid():
            try:
                course = Course.objects.get(code=data['code'].upper())
            except Course.DoesNotExist:
                raise serializers.ValidationError({"code": "Please provide a valid course."})
            serializer.save(course=course, user=request.user.profile)
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def api_my_courses_detail(request, course_code):
    try:
        course_code = course_code.upper()
        my_courses = MyCourse.objects.filter(user=request.user.profile, course__code=course_code).order_by('grade').first()
    except MyCourse.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = MyCourseSerializer(my_courses)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == "PUT":
        serializer = MyCourseSerializer(my_courses, data=request.data, partial=True)
        if serializer.is_valid():
            if 'code' in request.POST:
                try:
                    course = Course.objects.get(code=request.POST['code'].upper())
                except Course.DoesNotExist:
                    raise serializers.ValidationError({"code": "Please provide a valid course."})
                serializer.save(course=course, user=request.user.profile)
            else:
                serializer.save(user=request.user.profile)
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        MyCourse.objects.filter(user=request.user.profile, course__code=course_code).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_grades_list(request):
    try:
        my_courses = MyCourse.objects.filter(user=request.user.profile)
    except MyCourse.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = GradesSerializer(my_courses, many=True)
        return JsonResponse(serializer.data, safe=False)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_curriculum_detail(request):
    year = request.user.profile.curriculum_year if request.user.profile.curriculum_year != '0' else ''
    currirculum = request.user.profile.major + year

    if request.method == "GET":
        courses = Course.objects.filter(curriculum__contains=[currirculum])
        serializer = UserCourseSerializer(courses, many=True, context={'profile': request.user.profile})
        return JsonResponse(serializer.data, safe=False)

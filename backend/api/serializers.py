from rest_framework import serializers
from courses.models import Course, MyCourse


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('code', 'title', 'worth', 'pre')


class MyCourseSerializer(serializers.ModelSerializer):
    course = CourseSerializer(many=False, read_only=True)

    class Meta:
        model = MyCourse
        fields = ('grade', 'term', 'course')


class GradesSerializer(serializers.ModelSerializer):
    course = CourseSerializer(many=False, read_only=True)

    class Meta:
        model = MyCourse
        fields = ('course', 'grade')
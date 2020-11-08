from rest_framework import serializers
from courses.models import Course, MyCourse


class CourseSerializer(serializers.ModelSerializer):
    grade = serializers.SerializerMethodField('get_grade')
    term = serializers.SerializerMethodField('get_term')

    class Meta:
        model = Course
        fields = ('code', 'title', 'worth', 'pre', 'grade', 'term')

    def get_grade(self, obj):
        mycourse = obj.taken_courses()
        return None if mycourse is None else mycourse.grade

    def get_term(self, obj):
        mycourse = obj.taken_courses()
        return None if mycourse is None else mycourse.term


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

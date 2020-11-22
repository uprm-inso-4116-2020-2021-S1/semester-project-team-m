from rest_framework import serializers
from courses.models import Course, MyCourse, Profile
from django.contrib.auth.models import User


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('code', 'title', 'worth', 'curriculum', 'pre')


class UserCourseSerializer(serializers.ModelSerializer):
    grade = serializers.SerializerMethodField('get_grade')
    term = serializers.SerializerMethodField('get_term')

    class Meta:
        model = Course
        fields = ('code', 'title', 'worth', 'pre', 'grade', 'term')

    def get_grade(self, obj):
        profile = self.context.get("profile")
        mycourse = obj.taken_courses(profile=profile)
        return None if mycourse is None else mycourse.grade

    def get_term(self, obj):
        profile = self.context.get("profile")
        mycourse = obj.taken_courses(profile=profile)
        return None if mycourse is None else mycourse.term


class MyCourseSerializer(serializers.ModelSerializer):
    course = CourseSerializer(many=False, read_only=True)

    class Meta:
        model = MyCourse
        fields = ('grade', 'term', 'course')

    def create(self, validated_data):
        return MyCourse.objects.create(**validated_data)


class GradesSerializer(serializers.ModelSerializer):
    course = CourseSerializer(many=False, read_only=True)

    class Meta:
        model = MyCourse
        fields = ('course', 'grade')


class ProfileSerializer(serializers.ModelSerializer):#
    class Meta:
        model = Profile
        fields = ('student_id', 'major', 'curriculum_year')


class UserSerializer(serializers.ModelSerializer):
    student_id = serializers.CharField(source='profile.student_id', max_length=9)
    major = serializers.CharField(source='profile.major', max_length=4)
    curriculum_year = serializers.CharField(source='profile.curriculum_year', max_length=4)

    class Meta:
        model = User
        fields = ('username', 'password', 'student_id', 'major', 'curriculum_year')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        profile = validated_data.pop('profile')
        password = validated_data.pop('password')

        user = User(**validated_data)
        user.set_password(password)
        user.save()

        user.profile.student_id = profile['student_id']
        user.profile.major = profile['major']
        user.profile.curriculum_year = profile['curriculum_year']
        user.profile.save()
        return user

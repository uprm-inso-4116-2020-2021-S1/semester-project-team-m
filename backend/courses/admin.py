from django.contrib import admin
from .models import MyCourse, Profile, Course


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ['code', 'title', 'worth', 'pre']


@admin.register(MyCourse)
class MyCourseAdmin(admin.ModelAdmin):
    list_display = ['course', 'grade', 'term']


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['student_id', 'major']


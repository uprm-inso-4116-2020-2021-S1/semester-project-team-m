from django.contrib import admin
from .models import MyCourse, User, Course


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ['code', 'title', 'worth']


@admin.register(MyCourse)
class MyCourseAdmin(admin.ModelAdmin):
    list_display = ['course', 'grade', 'term']


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'student_id', 'major']


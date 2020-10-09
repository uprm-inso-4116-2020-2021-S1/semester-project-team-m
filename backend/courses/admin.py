from django.contrib import admin
from .models import MyCourse, User


@admin.register(MyCourse)
class MyCourseAdmin(admin.ModelAdmin):
    list_display = ['code', 'worth', 'grade', 'term']


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'student_id', 'major']


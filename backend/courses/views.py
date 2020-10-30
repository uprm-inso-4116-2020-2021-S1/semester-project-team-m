from django.shortcuts import render
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from .models import MyCourse


class CourseView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        content = {'message': 'Welcome to Course API'}
        return Response(content)


@login_required(login_url='/admin')
def test_pandas(requests):
    data = MyCourse.objects.all()
    df = data.to_dataframe(fieldnames=['email', 'course__code', 'course__title', 'course__worth', 'grade', 'course__pre'])
    return HttpResponse(df.to_html())

from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.generic import View
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from .serializers import *
from .models import MyCourse, Course


class FrontEndRenderView(View):

    def get(self, request, *args, **kwargs):
        return render(request, 'pages/front-end-render.html', {})

class CourseViewSet(viewsets.ModelViewSet):

    queryset =  Course.objects.all()
    serializer_class = CourseSerializer

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

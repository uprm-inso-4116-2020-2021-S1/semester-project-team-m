from django.shortcuts import render
import requests
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from .models import MyCourse


@login_required(login_url='/admin')
def test_pandas(requests):
    data = MyCourse.objects.all()
    df = data.to_dataframe(fieldnames=['email', 'course__code', 'course__title', 'course__worth', 'grade', 'course__pre'])
    return HttpResponse(df.to_html())

# Generated by Django 3.1.2 on 2020-10-13 01:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0006_course_department'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='course',
            name='department',
        ),
    ]

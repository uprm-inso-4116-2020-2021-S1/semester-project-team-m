# Generated by Django 3.1.2 on 2020-10-13 00:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0004_course_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='mycourse',
            name='email',
            field=models.CharField(default='', max_length=50),
            preserve_default=False,
        ),
    ]

# Generated by Django 3.1.2 on 2020-11-20 16:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0014_profile_curriculum_year'),
    ]

    operations = [
        migrations.AddField(
            model_name='mycourse',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='courses.profile'),
            preserve_default=False,
        ),
    ]

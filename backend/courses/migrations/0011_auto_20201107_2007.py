# Generated by Django 3.1.2 on 2020-11-07 20:07

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0010_auto_20201107_1933'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='pre',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=12), blank=True, null=True, size=None),
        ),
    ]

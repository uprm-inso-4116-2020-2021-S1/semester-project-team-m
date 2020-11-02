from django.db import models
from django_pandas.managers import DataFrameManager
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


GRADES = (
    ('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D'), ('F', 'F'), ('W', 'W'), ('P', 'P')
)

MAJOR = (
    ("INSO", "Software Engineering"), ("CIIC", "Computer Science and Engineering")
)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    student_id = models.CharField(max_length=9)
    major = models.CharField(max_length=4, choices=MAJOR)

    def __str__(self):
        return self.user.email

    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)

    @receiver(post_save, sender=User)
    def save_user_profile(sender, instance, **kwargs):
        instance.profile.save()


class Course(models.Model):
    code = models.CharField(max_length=12)
    title = models.CharField(max_length=60)
    worth = models.IntegerField()
    pre = ArrayField(models.CharField(max_length=12), blank=True)
    objects = DataFrameManager()  # pandas

    def as_json(self):
        return dict(
            code = self.code,
            title = self.title,
            worth = self.worth,
            pre = self.pre,

        )

    def __str__(self):
        return self.code


class MyCourse(models.Model):
    email = models.CharField(max_length=50)
    course = models.ForeignKey(Course, on_delete=models.PROTECT)
    grade = models.CharField(max_length=1, choices=GRADES)
    term = models.CharField(max_length=6)
    objects = DataFrameManager()  # pandas

    def __str__(self):
        return self.course.code

    """
    course_code: String = CIIC3011
    title: String = Introduction to Programming
    worth: Integer = 3
    grade: [Character] = {A, B, C, D, F, W, P}
    requirements : models.Model.OneToMny
    """
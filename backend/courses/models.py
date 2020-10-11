from django.db import models

GRADES = (
    ('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D'), ('F', 'F'), ('W', 'W'), ('P', 'P')
)

MAJOR = (
    ("INSO", "Software Engineering"), ("CIIC", "Computer Science and Engineering")
)


class User(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()
    student_id = models.CharField(max_length=9)
    major = models.CharField(max_length=4, choices=MAJOR)

    def __str__(self):
        return self.name


class Course(models.Model):
    code = models.CharField(max_length=12)
    title = models.CharField(max_length=60)
    worth = models.IntegerField()
    pre = models.ManyToManyField("self", blank=True)

    def __str__(self):
        return self.code


class MyCourse(models.Model):
    # email = models.CharField(max_length=50)
    course = models.ForeignKey(Course, on_delete=models.PROTECT)
    grade = models.CharField(max_length=1, choices=GRADES)
    term = models.CharField(max_length=6)

    def __str__(self):
        return self.course.code

    """
    course_code: String = CIIC3011
    title: String = Introduction to Programming
    worth: Integer = 3
    grade: [Character] = {A, B, C, D, F, W, P}
    requirements : models.Model.OneToMny
    """
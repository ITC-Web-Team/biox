from django.db import models
from django.core.validators import RegexValidator



class Project(models.Model):
    title = models.CharField(max_length=100)
    mentor = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.title

class Registration(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    student_name = models.CharField(max_length=100)
    student_email = models.EmailField()
    phone_validator = RegexValidator(r'^\d{10}$', "Enter a valid 10-digit phone number")
    student_phoneno = models.CharField(max_length=10, validators=[phone_validator])
    student_sop = models.CharField(max_length=1000, default= "null")

    def __str__(self):
        return f"{self.student_name} - {self.project.title}"
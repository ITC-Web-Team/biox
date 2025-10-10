from django.db import models
from django.core.validators import RegexValidator

# Event-based models (for events system)
class Event(models.Model):
  event_id = models.CharField(max_length=100, unique=True)
  type = models.CharField(max_length=100)
  title = models.CharField(max_length=100)
  description = models.CharField(max_length=200)
  image = models.ImageField(upload_to='event_images/', blank=True, null=True)
  has_teams = models.BooleanField(default=False)
  min_team_size = models.IntegerField(default=1)
  max_team_size = models.IntegerField(default=1)
  
  def __str__(self):
    return self.title

class Team(models.Model):
  team_id = models.CharField(max_length=50, unique=True)
  team_name = models.CharField(max_length=50)
  event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='teams')
  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return f"{self.team_name} - {self.event.title}"
  
  def get_member_count(self):
    """Return the number of team members"""
    return self.members.count()
  
  def is_team_full(self):
    """Check if team has reached maximum size"""
    if self.event.max_team_size:
      return self.get_member_count() >= self.event.max_team_size
    return False
  
  def can_add_member(self):
    """Check if more members can be added to the team"""
    return not self.is_team_full()

class EventRegistration(models.Model):
  event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='registrations')
  team = models.ForeignKey(Team, on_delete=models.CASCADE, null=True, blank=True, related_name='members')
  name = models.CharField(max_length=100)
  email = models.EmailField()
  phone = models.CharField(max_length=15)
  ldap_id = models.CharField(max_length=20, blank=True, null=True)
  registration_date = models.DateTimeField(auto_now_add=True)
  is_team_leader = models.BooleanField(default=False)

  class Meta:
    unique_together = ('event', 'email')

  def __str__(self):
    return f"{self.name} - {self.event.title}"

# Project-based models (for projects system)
class Project(models.Model):
    title = models.CharField(max_length=100)
    mentor = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/', blank=True, null=True)

    def __str__(self):
        return self.title

class ProjectRegistration(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    student_name = models.CharField(max_length=100)
    student_email = models.EmailField()
    phone_validator = RegexValidator(r'^\d{10}$', "Enter a valid 10-digit phone number")
    student_phoneno = models.CharField(max_length=10, validators=[phone_validator])
    student_sop = models.CharField(max_length=1000, default="null")

    def __str__(self):
        return f"{self.student_name} - {self.project.title}"

# Contact model for contact form submissions
class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200, blank=True, null=True)
    message = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-submitted_at']

    def __str__(self):
        return f"{self.name} - {self.subject or 'No Subject'}"

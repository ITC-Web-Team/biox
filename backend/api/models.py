from django.db import models

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

class Registration(models.Model):
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


from django.contrib import admin
from .models import Event, EventRegistration, Team, Project, ProjectRegistration, ContactMessage

# Event system admin
@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
  list_display = ('event_id', 'title', 'type')
  search_fields = ('title', 'event_id')
  list_filter = ('type',)

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
  list_display = ('team_id', 'team_name', 'event', 'created_at')
  search_fields = ('team_name', 'event__title')
  list_filter = ('event', 'created_at')

@admin.register(EventRegistration)
class EventRegistrationAdmin(admin.ModelAdmin):
  list_display = ('name', 'email', 'event', 'registration_date', 'is_team_leader')
  search_fields = ('name', 'email', 'event__title')
  list_filter = ('event', 'registration_date', 'is_team_leader')

# Project system admin
@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
  list_display = ('title', 'mentor')
  search_fields = ('title', 'mentor')

@admin.register(ProjectRegistration)
class ProjectRegistrationAdmin(admin.ModelAdmin):
  list_display = ('student_name', 'student_email', 'project')
  search_fields = ('student_name', 'student_email', 'project__title')
  list_filter = ('project',)

# Contact system admin
@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
  list_display = ('name', 'email', 'subject', 'submitted_at', 'is_read')
  search_fields = ('name', 'email', 'subject')
  list_filter = ('submitted_at', 'is_read')
  readonly_fields = ('submitted_at',)
  actions = ['mark_as_read', 'mark_as_unread']

  def mark_as_read(self, request, queryset):
    queryset.update(is_read=True)
  mark_as_read.short_description = "Mark selected messages as read"

  def mark_as_unread(self, request, queryset):
    queryset.update(is_read=False)
  mark_as_unread.short_description = "Mark selected messages as unread"

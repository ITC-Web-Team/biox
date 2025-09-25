from django.contrib import admin
from .models import Event, Registration

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
  list_display = ('event_id', 'title', 'type')
  search_fields = ('title', 'event_id')
  list_filter = ('type',)

@admin.register(Registration)
class RegistrationAdmin(admin.ModelAdmin):
  list_display = ('name', 'email', 'event', 'registration_date')
  search_fields = ('name', 'email', 'event__title')
  list_filter = ('event', 'registration_date')
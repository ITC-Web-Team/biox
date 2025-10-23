from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from .models import Event, EventRegistration, Team, Project, ProjectRegistration, ContactMessage

# Define resources for export/import
class EventResource(resources.ModelResource):
    class Meta:
        model = Event
        fields = ('event_id', 'type', 'title', 'description', 'has_teams', 'min_team_size', 'max_team_size')
        export_order = fields

class EventRegistrationResource(resources.ModelResource):
    class Meta:
        model = EventRegistration
        fields = ('id', 'event__title', 'team__team_name', 'name', 'email', 'phone', 'ldap_id', 'registration_date', 'is_team_leader')
        export_order = fields

class TeamResource(resources.ModelResource):
    class Meta:
        model = Team
        fields = ('team_id', 'team_name', 'event__title', 'created_at')
        export_order = fields

class ProjectResource(resources.ModelResource):
    class Meta:
        model = Project
        fields = ('id', 'title', 'mentor', 'description')
        export_order = fields

class ProjectRegistrationResource(resources.ModelResource):
    class Meta:
        model = ProjectRegistration
        fields = ('id', 'project__title', 'student_name', 'student_email', 'student_phoneno', 'student_sop')
        export_order = fields

class ContactMessageResource(resources.ModelResource):
    class Meta:
        model = ContactMessage
        fields = ('id', 'name', 'email', 'subject', 'message', 'submitted_at', 'is_read')
        export_order = fields

# Event system admin with export
@admin.register(Event)
class EventAdmin(ImportExportModelAdmin):
    resource_class = EventResource
    list_display = ('event_id', 'title', 'type')
    search_fields = ('title', 'event_id')
    list_filter = ('type',)

@admin.register(Team)
class TeamAdmin(ImportExportModelAdmin):
    resource_class = TeamResource
    list_display = ('team_id', 'team_name', 'event', 'created_at')
    search_fields = ('team_name', 'event__title')
    list_filter = ('event', 'created_at')

@admin.register(EventRegistration)
class EventRegistrationAdmin(ImportExportModelAdmin):
    resource_class = EventRegistrationResource
    list_display = ('name', 'email', 'event', 'registration_date', 'is_team_leader')
    search_fields = ('name', 'email', 'event__title')
    list_filter = ('event', 'registration_date', 'is_team_leader')

# Project system admin with export
@admin.register(Project)
class ProjectAdmin(ImportExportModelAdmin):
    resource_class = ProjectResource
    list_display = ('title', 'mentor')
    search_fields = ('title', 'mentor')

@admin.register(ProjectRegistration)
class ProjectRegistrationAdmin(ImportExportModelAdmin):
    resource_class = ProjectRegistrationResource
    list_display = ('student_name', 'student_email', 'project')
    search_fields = ('student_name', 'student_email', 'project__title')
    list_filter = ('project',)

# Contact system admin with export
@admin.register(ContactMessage)
class ContactMessageAdmin(ImportExportModelAdmin):
    resource_class = ContactMessageResource
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

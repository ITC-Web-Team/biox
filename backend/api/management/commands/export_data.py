"""
Export all database data to CSV files

Usage:
    python manage.py export_data
    python manage.py export_data --output ./exports
"""

from django.core.management.base import BaseCommand
from api.models import Event, EventRegistration, Team, Project, ProjectRegistration, ContactMessage
import csv
import os
from datetime import datetime


class Command(BaseCommand):
    help = 'Export all database data to CSV files'

    def add_arguments(self, parser):
        parser.add_argument(
            '--output',
            type=str,
            default='./exports',
            help='Output directory for CSV files (default: ./exports)',
        )

    def handle(self, *args, **options):
        output_dir = options['output']
        
        # Create output directory if it doesn't exist
        os.makedirs(output_dir, exist_ok=True)
        
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        
        self.stdout.write(self.style.SUCCESS(f'\n📊 Exporting database data to: {output_dir}\n'))
        
        # Export Events
        self.export_events(output_dir, timestamp)
        
        # Export Event Registrations
        self.export_event_registrations(output_dir, timestamp)
        
        # Export Teams
        self.export_teams(output_dir, timestamp)
        
        # Export Projects
        self.export_projects(output_dir, timestamp)
        
        # Export Project Registrations
        self.export_project_registrations(output_dir, timestamp)
        
        # Export Contact Messages
        self.export_contact_messages(output_dir, timestamp)
        
        self.stdout.write(self.style.SUCCESS(f'\n✅ Export completed successfully!\n'))
        self.stdout.write(self.style.SUCCESS(f'Files saved in: {output_dir}\n'))

    def export_events(self, output_dir, timestamp):
        filename = os.path.join(output_dir, f'events_{timestamp}.csv')
        events = Event.objects.all()
        
        with open(filename, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow([
                'Event ID', 'Type', 'Title', 'Description', 
                'Has Teams', 'Min Team Size', 'Max Team Size', 'Image'
            ])
            
            for e in events:
                writer.writerow([
                    e.event_id, e.type, e.title, e.description,
                    e.has_teams, e.min_team_size, e.max_team_size,
                    e.image.url if e.image else ''
                ])
        
        self.stdout.write(f'  ✓ Events: {events.count()} records → {filename}')

    def export_event_registrations(self, output_dir, timestamp):
        filename = os.path.join(output_dir, f'event_registrations_{timestamp}.csv')
        registrations = EventRegistration.objects.all().select_related('event', 'team')
        
        with open(filename, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow([
                'Name', 'Email', 'Phone', 'LDAP ID',
                'Event ID', 'Event Title', 'Team Name', 'Is Team Leader',
                'Registration Date'
            ])
            
            for r in registrations:
                writer.writerow([
                    r.name, r.email, r.phone, r.ldap_id or '',
                    r.event.event_id, r.event.title,
                    r.team.team_name if r.team else '',
                    r.is_team_leader,
                    r.registration_date.strftime('%Y-%m-%d %H:%M:%S')
                ])
        
        self.stdout.write(f'  ✓ Event Registrations: {registrations.count()} records → {filename}')

    def export_teams(self, output_dir, timestamp):
        filename = os.path.join(output_dir, f'teams_{timestamp}.csv')
        teams = Team.objects.all().select_related('event')
        
        with open(filename, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow([
                'Team ID', 'Team Name', 'Event ID', 'Event Title',
                'Member Count', 'Created At'
            ])
            
            for t in teams:
                writer.writerow([
                    t.team_id, t.team_name, t.event.event_id, t.event.title,
                    t.get_member_count(), t.created_at.strftime('%Y-%m-%d %H:%M:%S')
                ])
        
        self.stdout.write(f'  ✓ Teams: {teams.count()} records → {filename}')

    def export_projects(self, output_dir, timestamp):
        filename = os.path.join(output_dir, f'projects_{timestamp}.csv')
        projects = Project.objects.all()
        
        with open(filename, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow(['ID', 'Title', 'Mentor', 'Description', 'Image'])
            
            for p in projects:
                writer.writerow([
                    p.id, p.title, p.mentor, p.description,
                    p.image.url if p.image else ''
                ])
        
        self.stdout.write(f'  ✓ Projects: {projects.count()} records → {filename}')

    def export_project_registrations(self, output_dir, timestamp):
        filename = os.path.join(output_dir, f'project_registrations_{timestamp}.csv')
        registrations = ProjectRegistration.objects.all().select_related('project')
        
        with open(filename, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow([
                'Student Name', 'Student Email', 'Phone Number',
                'Project Title', 'Statement of Purpose'
            ])
            
            for r in registrations:
                writer.writerow([
                    r.student_name, r.student_email, r.student_phoneno,
                    r.project.title, r.student_sop
                ])
        
        self.stdout.write(f'  ✓ Project Registrations: {registrations.count()} records → {filename}')

    def export_contact_messages(self, output_dir, timestamp):
        filename = os.path.join(output_dir, f'contact_messages_{timestamp}.csv')
        messages = ContactMessage.objects.all()
        
        with open(filename, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow([
                'Name', 'Email', 'Subject', 'Message',
                'Submitted At', 'Is Read'
            ])
            
            for m in messages:
                writer.writerow([
                    m.name, m.email, m.subject or '', m.message,
                    m.submitted_at.strftime('%Y-%m-%d %H:%M:%S'),
                    m.is_read
                ])
        
        self.stdout.write(f'  ✓ Contact Messages: {messages.count()} records → {filename}')

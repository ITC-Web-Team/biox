#!/usr/bin/env python
"""Helper script to run Django management commands."""
import os
import sys
import django
from django.conf import settings
from django.core.management import execute_from_command_line

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'crud.settings')

if __name__ == '__main__':
    # Run makemigrations
    try:
        django.setup()
        print("Django setup successful")
        from django.core.management import call_command
        print("Running makemigrations...")
        call_command('makemigrations')
        print("Makemigrations completed successfully!")
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
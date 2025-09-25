# Event Management System Views (with authentication)
from rest_framework import viewsets, status
from rest_framework.decorators import action, permission_classes, api_view
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.http import HttpResponse
from .models import Event, EventRegistration, Team, Project, ProjectRegistration
from .serializers import EventSerializer, EventRegistrationSerializer, TeamSerializer, ProjectSerializer, ProjectRegistrationSerializer
import pandas as pd
import uuid

class EventViewSet(viewsets.ModelViewSet):
  queryset = Event.objects.all()
  serializer_class = EventSerializer
  permission_classes = [IsAuthenticated, IsAdminUser]

class EventRegistrationViewSet(viewsets.ModelViewSet):
  queryset = EventRegistration.objects.all()
  serializer_class = EventRegistrationSerializer
  permission_classes = [IsAuthenticated, IsAdminUser]

  @action(detail=False, methods=['get'])
  def by_event(self, request):
    if not request.user.is_staff:
        return Response({"error": "Admin access required"}, status=status.HTTP_403_FORBIDDEN)
    event_id = request.query_params.get('event_id')
    print(f"Received request for event_id: {event_id}")  # Add this for debugging
    
    if not event_id:
        return Response({"error": "event_id parameter is required"}, status=status.HTTP_400_BAD_REQUEST)
    
    # Filter by the event's event_id field
    registrations = EventRegistration.objects.filter(event__event_id=event_id)
    print(f"Found {registrations.count()} registrations")  # Debug
    
    serializer = self.get_serializer(registrations, many=True)
    return Response(serializer.data)

  @action(detail=False, methods=['get'])
  def export_excel(self, request):
      if not request.user.is_staff:
          return Response({"error": "Admin access required"}, status=status.HTTP_403_FORBIDDEN)
      try:
          event_id = request.query_params.get('event_id')
          print(f"Export request for event_id: {event_id}")
          
          if not event_id:
              return Response({"error": "event_id parameter is required"}, status=status.HTTP_400_BAD_REQUEST)
          
          # Check if event exists
          try:
              event = Event.objects.get(event_id=event_id)
              print(f"Found event: {event.title}")
          except Event.DoesNotExist:
              return Response({"error": f"Event with id {event_id} not found"}, status=status.HTTP_404_NOT_FOUND)
          
          # Get registrations
          registrations = EventRegistration.objects.filter(event__event_id=event_id)
          print(f"Found {registrations.count()} registrations for export")
          
          if registrations.count() == 0:
              return Response({"error": "No registrations found for this event"}, status=status.HTTP_404_NOT_FOUND)

          # Prepare data for Excel
          data = []
          for reg in registrations:
              registration_date = reg.registration_date
              if registration_date.tzinfo is not None:
                  registration_date = registration_date.replace(tzinfo=None)
              
              data.append({
                  'Name': reg.name,
                  'Email': reg.email,
                  'Phone': reg.phone,
                  'LDAP ID': reg.ldap_id or 'N/A',
                  'Registration Date': registration_date.strftime('%Y-%m-%d %H:%M:%S')
              })
          
          df = pd.DataFrame(data)
          
          response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
          response['Content-Disposition'] = f'attachment; filename="registrations_{event_id}.xlsx"'
          
          df.to_excel(response, index=False, sheet_name='Registrations', engine='openpyxl')
          
          return response
          
      except ImportError as e:
          print(f"Import error: {e}")
          return Response({"error": "Required packages not installed. Please install pandas and openpyxl."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
      except Exception as e:
          print(f"Unexpected error in export_excel: {str(e)}")
          import traceback
          traceback.print_exc()
          return Response({"error": f"Internal server error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
      
class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    def create(self, request):
        event_id = request.data.get('event_id')
        team_name = request.data.get('team_name')

        if not event_id or not team_name:
            return Response({"error": "event_id and team_name are required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            event = Event.objects.get(event_id=event_id)
            team_id = str(uuid.uuid4())[:8]

            team = Team.objects.create(
                team_id=team_id,
                team_name=team_name,
                event=event
            )

            serializer = self.get_serializer(team)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        except Event.DoesNotExist:
            return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_admin(request):
    return Response({
        'is_admin': request.user.is_staff or request.user.is_superuser,
        'username': request.user.username
    })

@api_view(['POST'])
def logout_view(request):
    from django.contrib.auth import logout
    logout(request)
    return Response({'message': 'Logged out successfully'})


# Project System Views (no authentication required)
@api_view(['GET', 'POST'])
def projects_list(request):
    if request.method == 'GET':
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True, context={'request': request})
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def project_detail(request, pk):
    try:
        project = Project.objects.get(pk=pk)
    except Project.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProjectSerializer(project)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ProjectSerializer(project, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        project.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def project_registrations_list(request):
    if request.method == 'GET':
        registrations = ProjectRegistration.objects.all()
        serializer = ProjectRegistrationSerializer(registrations, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = ProjectRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def project_registration_detail(request, pk):
    try:
        registration = ProjectRegistration.objects.get(pk=pk)
    except ProjectRegistration.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProjectRegistrationSerializer(registration)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ProjectRegistrationSerializer(registration, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        registration.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

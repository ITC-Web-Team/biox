from rest_framework import status, generics
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Event, EventRegistration

User = get_user_model()

class RegisterView(generics.CreateAPIView):
  queryset = User.objects.all()
  permission_classes = [AllowAny]
  serializer_class = RegisterSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def register_for_event(request, event_id):
  try:
    event = Event.objects.get(pk=event_id)

  except Event.DoesNotExist:
    return Response({"error" : "Event not found"}, status=status.HTTP_404_NOT_FOUND)
  
  if EventRegistration.objects.filter(user=request.user, event=event).exists():
    return Response({"message" : "Already registered!"}, status=status.HTTP_200_OK)
  
  EventRegistration.objects.create(user=request.user, event=event)
  return Response({"message" : "Successfully registered!"}, status=status.HTTP_201_CREATED)
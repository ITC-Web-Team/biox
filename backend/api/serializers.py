from rest_framework import serializers
from .models import Event, EventRegistration, Team, Project, ProjectRegistration, ContactMessage

# Event system serializers
class EventSerializer(serializers.ModelSerializer):
  class Meta:
    model = Event
    fields = '__all__'

class EventRegistrationSerializer(serializers.ModelSerializer):
    event_title = serializers.CharField(source='event.title', read_only=True)
    team_name = serializers.CharField(source='team.team_name', read_only=True)
    event_id = serializers.CharField(write_only=True, required=True)
    team_id = serializers.CharField(write_only=True, required=False, allow_null=True)

    class Meta:
        model = EventRegistration
        fields = '__all__'
        extra_kwargs = {
            'event': {'read_only': True},
            'team': {'read_only': True}
        }

    def create(self, validated_data):
        event_id = validated_data.pop('event_id')
        team_id = validated_data.pop('team_id', None)

        try:
            event = Event.objects.get(event_id=event_id)
            validated_data['event'] = event

            if team_id:
                team = Team.objects.get(team_id=team_id)
                validated_data['team'] = team

        except Event.DoesNotExist:
            raise serializers.ValidationError({'event_id': 'Event not found'})
        
        except Team.DoesNotExist:
            raise serializers.ValidationError({'team_id': 'Team not found'})
        
        email = validated_data['email']
        if EventRegistration.objects.filter(event=event, email=email).exists():
            raise serializers.ValidationError({'email': 'This email is already registered for this event.'})
        
        return super().create(validated_data)
  
class TeamSerializer(serializers.ModelSerializer):
  class Meta:
    model = Team
    fields = '__all__'

# Project system serializers
class ProjectSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = '__all__'
    
    def get_image(self, obj):
        if not obj.image:
            return None
        request = self.context.get('request')
        if request:
            # Build full URL including host
            return request.build_absolute_uri(obj.image.url)
        # fallback to relative url
        return obj.image.url

class ProjectRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectRegistration
        fields = '__all__'

# Contact system serializer
class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'subject', 'message']  # Don't expose internal fields

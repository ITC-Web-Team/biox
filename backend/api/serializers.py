from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from .models import Event, EventRegistration

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
  password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

  class Meta:
    model = User
    fields = ('email', 'password')

  def create(self, validated_data):
    user = User.objects.create(email=validated_data['email'])
    user.set_password(validated_data['password'])
    user.save()
    return user
  
class EventSerializer(serializers.ModelSerializer):
  class Meta:
    model = Event
    fields = '__all__'

class EventRegistrationSerializer(serializers.ModelSerializer):
  class Meta:
    model = EventRegistration
    fields = '__all__'
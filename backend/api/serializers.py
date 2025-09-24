from rest_framework import serializers
from .models import Project,Registration 

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


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = '__all__'
        
from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):
    #date_time = serializers.DateTimeField(format='%Y-%m-%dT%H:%M:%S', input_formats=['%Y-%m-%dT%H:%M:%S'])

    class Meta:
        model = Event
        fields = ['id', 'title', 'description', 'date_time']

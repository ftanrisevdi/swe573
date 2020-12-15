from .models import Twit
from rest_framework import serializers


class TwitSerializer(serializers.ModelSerializer):
    user =  serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Twit
        fields = ['id', 'search_key_word', 'created','twits', 'user']


    def create(self, validated_data):
        twit = Twit.objects.create(**validated_data)       
        return twit


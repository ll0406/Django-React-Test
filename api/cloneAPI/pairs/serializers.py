from rest_framework import serializers
from pairs.models import Pair

class PairSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pair
        fields = ('id', 'this_text', 'that_text')
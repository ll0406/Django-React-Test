from django.shortcuts import render
from pairs.models import Pair
from pairs.serializers import PairSerializer
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

import random

# Create your views here.

class PairsList(APIView):
    parser_classes = (JSONParser,)
    """
    Get a random pair of text
    """
    def get(self, request, format=None):
        pairs = Pair.objects.all()
        pair = pairs[random.randint(0, len(pairs)-1)]
        serializer = PairSerializer(pair)
        return Response(serializer.data)

    """
    Post non-duplicate text pair
    """
    def post(self, request, format=None):
        serializer = PairSerializer(data=request.data)
        if serializer.is_valid():
            thisText = serializer.validated_data['this_text']
            if not Pair.objects.filter(this_text=thisText).exists():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
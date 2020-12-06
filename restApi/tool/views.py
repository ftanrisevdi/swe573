from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import User

@api_view(['GET', 'POST', 'DELETE'])
def user_list(request):
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
        
    elif request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
@api_view(['GET', 'PUT', 'DELETE'])
def user_detail(request, pk):
    # find tutorial by pk (id)
    try:
      user = User.objects.get(pk=pk)
    except User.DoesNotExist:
      return Response(status=status.HTTP_404_NOT_FOUND)
 
    # GET / PUT / DELETE tutorial
    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
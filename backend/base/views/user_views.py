from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status




class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for key, value in serializer.items():
            data[key] = value

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)  # because we are not serializing multiple objects  ---> we are returning a single user
    return Response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)  # because we are serializing multiple objects  --->  Product.objects.all()
    return Response(serializer.data)


@api_view(['POST'])
def registerUser(request):
    data = request.data

    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        # when we register the user we want to return the token right away
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
# from django.shortcuts import render
# from django.http import JsonResponse
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated, IsAdminUser
# from rest_framework.response import Response
# from .models  import Product
# from .serializers import ProductSerializer, UserSerializer,  UserSerializerWithToken
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework_simplejwt.views import TokenObtainPairView
# from django.contrib.auth.models import User
# from django.contrib.auth.hashers import make_password
# from rest_framework import status


# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     # @classmethod
#     # def get_token(cls, user):
#     #     token = super().get_token(user)

#     #     # Add custom claims
#     #     token['username'] = user.username  # this user object is already passed
#     #     token["message"] = "Hello World"  # custom added by me, you can add more data here
#     #     # ...

#     #     return token
    
#     # the actual access and remove token come from here
#     def validate(self, attrs):
#         data = super().validate(attrs)
#         ############### we will get these values (access and refresh tokens) by default so dont have to cutomize them ##################

#         # refresh = self.get_token(self.user)

#         # data["refresh"] = str(refresh)
#         # data["access"] = str(refresh.access_token)

#         # if api_settings.UPDATE_LAST_LOGIN:
#         #     update_last_login(None, self.user)
#         ############### ############### ############### ############### ############### ############### ############### 

#         #### we can send data like this  #####
#         # data["username"] = self.user.username
#         # data["email"] = self.user.email

#         serializer = UserSerializerWithToken(self.user).data

#         for key, value in serializer.items():
#             data[key] = value

#         return data
    


# class MyTokenObtainPairView(TokenObtainPairView):
#     serializer_class = MyTokenObtainPairSerializer   # this is defined above


# @api_view(['GET'])
# def getRoutes(request):
#     return Response("Hello")


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getUserProfile(request):
#     user = request.user
#     serializer = UserSerializer(user, many=False)  # because we are serializing not multiple objects  ---> we are returning a single user
#     return Response(serializer.data)


# @api_view(['GET'])
# def getProducts(request):
#     products = Product.objects.all()
#     serializer = ProductSerializer(products, many=True)  # because we are serializing multiple objects  --->  Product.objects.all()
#     return Response(serializer.data)


# @api_view(['GET'])
# def getProduct(request, pk):
#     # product = None
#     # for i in products:
#     #     if i['_id'] == pk:
#     #         product = i
#     #         break
#     product = Product.objects.get(_id=pk)
#     serializer = ProductSerializer(product, many=False)
#     return Response(serializer.data)






# @api_view(['GET'])
# @permission_classes([IsAdminUser])
# def getUsers(request):
#     users = User.objects.all()
#     serializer = UserSerializer(users, many=True)  # because we are serializing multiple objects  --->  Product.objects.all()
#     return Response(serializer.data)


# @api_view(['POST'])
# def registerUser(request):
#     data = request.data

#     try:
#         user = User.objects.create(
#             first_name=data['name'],
#             username=data['email'],
#             email=data['email'],
#             password=make_password(data['password'])
#         )

#         # when we register the user we want to return the token right away
#         serializer = UserSerializerWithToken(user, many=False)
#         return Response(serializer.data)
    
#     except:
#         message = {'detail': 'User with this email already exists'}
#         return Response(message, status=status.HTTP_400_BAD_REQUEST)
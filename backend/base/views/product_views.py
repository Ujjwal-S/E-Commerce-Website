from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models  import Product
from base.serializers import ProductSerializer

from django.contrib.auth.hashers import make_password
from rest_framework import status

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)  # because we are serializing multiple objects  --->  Product.objects.all()
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    # product = None
    # for i in products:
    #     if i['_id'] == pk:
    #         product = i
    #         break
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)
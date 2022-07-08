from rest_framework import serializers
from .models import Product
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)  # s͟o͟ t͟h͟i͟s͟ a͟ k͟i͟n͟d͟ o͟f͟ a͟l͟i͟a͟s͟ b͟e͟i͟n͟g͟ g͟i͟v͟e͟n͟
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id' ,'_id', 'username', 'email', 'name', 'isAdmin']
    
    def get_name(self, obj):    # we wanted a field just called 'name'
                                # to do this we need to create a function with get_  infront of field name
        name = obj.first_name   # so basically jo bhi first_name mai tha voh hi name object mai le aao
        if name == "":
            name = obj.email
        return name
    
    def get__id(self,  obj):    # get_ (from django convention)   _id (name of the field)
        return obj.id           # _id will now return id    # s͟o͟ t͟h͟i͟s͟ a͟ k͟i͟n͟d͟ o͟f͟ a͟l͟i͟a͟s͟ b͟e͟i͟n͟g͟ g͟i͟v͟e͟n͟

    def get_isAdmin(self, obj):
        return obj.is_staff


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id' ,'_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
        
from rest_framework import serializers
from users.models import Product
from django.contrib.auth.models import User

class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = [
            'id', 
            'name',
            'description',
            'image', 
            'created_at',
        ]

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name')
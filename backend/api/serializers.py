from rest_framework import serializers
from django.contrib.auth.models import User
from .models import HealthProgram, Client, Enrollment

# Doctor Signup
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

# Login Serializer
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

# Health Program
class HealthProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthProgram
        fields = '__all__'
        read_only_fields = ['created_by', 'created_at']

# Enrollment
class EnrollmentSerializer(serializers.ModelSerializer):
    program_name = serializers.CharField(source='program.name', read_only=True)
    class Meta:
        model = Enrollment
        fields = ['id', 'program', 'enrollment_date', 'program_name']

# Client
class ClientSerializer(serializers.ModelSerializer):
    # enrollments = EnrollmentSerializer(many=True, read_only=True)
    # class Meta:
    #     model = Client
    #     fields = ['id', 'name', 'date_of_birth', 'gender', 'email', 'phone', 'enrollments']

    enrollments = serializers.SerializerMethodField()
    
    class Meta:
        model = Client
        fields = ['id', 'name', 'date_of_birth', 'gender', 'email', 'phone', 'enrollments']
    
    def get_enrollments(self, obj):
        enrollments = obj.enrollments.all()
        return [{'id': e.id, 'program': {'id': e.program.id, 'name': e.program.name}} for e in enrollments]


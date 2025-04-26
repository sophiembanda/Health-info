from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
# from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

from django.contrib.auth import authenticate

from .models import HealthProgram, Client, Enrollment
from .serializers import (
    HealthProgramSerializer, ClientSerializer, EnrollmentSerializer,
    UserSerializer, LoginSerializer
)

# Signup View
class SignupView(generics.CreateAPIView):
    serializer_class = UserSerializer

# Login View
class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(username=username, password=password)
            if user:
                token, created = Token.objects.get_or_create(user=user)
                return Response({'token': token.key})
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Logout View
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            request.user.auth_token.delete()
            return Response({"message": "Successfully logged out."}, status=status.HTTP_200_OK)
        except:
            return Response({"error": "Something went wrong."}, status=status.HTTP_400_BAD_REQUEST)

# Health Program Views
class HealthProgramCreateView(generics.CreateAPIView):
    queryset = HealthProgram.objects.all()
    serializer_class = HealthProgramSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class HealthProgramListView(generics.ListAPIView):
    queryset = HealthProgram.objects.all()
    serializer_class = HealthProgramSerializer
    permission_classes = [IsAuthenticated]

class ProgramListView(generics.ListAPIView):
    queryset = HealthProgram.objects.all()
    serializer_class = HealthProgramSerializer
    permission_classes = [IsAuthenticated]




# Client Views
class ClientCreateView(generics.CreateAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]

class ClientListView(generics.ListAPIView):
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        queryset = Client.objects.all()
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(name__icontains=search)
        return queryset

class ClientDetailView(generics.RetrieveAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]

# Enrollment Views
class EnrollmentCreateView(generics.CreateAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [IsAuthenticated]
    
    def create(self, request, *args, **kwargs):
        client_id = request.data.get('client')
        program_ids = request.data.get('programs', [])
        
        enrollments = []
        for program_id in program_ids:
            enrollment = Enrollment.objects.create(
                client_id=client_id,
                program_id=program_id
            )
            enrollments.append(enrollment)
        
        serializer = self.get_serializer(enrollments, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class EnrollmentDeleteView(generics.DestroyAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [IsAuthenticated]
    
    def destroy(self, request, *args, **kwargs):
        client_id = self.kwargs.get('client_id')
        program_id = self.kwargs.get('program_id')
        
        try:
            # Instead of get(), use filter() to get all matching enrollments
            enrollments = Enrollment.objects.filter(
                client_id=client_id,
                program_id=program_id
            )
            
            if not enrollments.exists():
                return Response(
                    {"error": "Enrollment not found"}, 
                    status=status.HTTP_404_NOT_FOUND
                )
            
            # Delete all matching enrollments
            count = enrollments.count()
            enrollments.delete()
            
            return Response(
                {"message": f"Successfully removed client from program. Deleted {count} enrollment(s)."}, 
                status=status.HTTP_204_NO_CONTENT
            )
        except Exception as e:
            return Response(
                {"error": str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )



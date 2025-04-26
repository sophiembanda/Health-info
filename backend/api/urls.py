from django.urls import path
from .views import (
    SignupView, LoginView, LogoutView,
    HealthProgramCreateView,
    ClientCreateView, ClientListView, ClientDetailView,
    EnrollmentCreateView,HealthProgramListView
)

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),\
    
    path('programs/create/', HealthProgramCreateView.as_view(), name='create-program'),
    path('programs/', HealthProgramListView.as_view(), name='list-programs'),
    path('clients/register/', ClientCreateView.as_view(), name='register-client'),
    path('clients/', ClientListView.as_view(), name='list-clients'),
    path('clients/<int:pk>/', ClientDetailView.as_view(), name='client-detail'),
    path('enrollments/create/', EnrollmentCreateView.as_view(), name='create-enrollment'),
]

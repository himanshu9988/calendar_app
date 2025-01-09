from django.urls import path
from .views import EventListCreateView, EventDetailView
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

#urlpatterns = [
#    path('events/', EventListCreateView.as_view(), name='event-list-create'),
#    path('events/<int:pk>/', EventDetailView.as_view(), name='event-detail'),
#]

from django.urls import path
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED
from .views import list_events
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from .views import EventListCreateView, EventDetailView, register_user

urlpatterns = [
    # Event-related endpoints
    path('events/', EventListCreateView.as_view(), name='event-list-create'),
    path('events/<int:pk>/', EventDetailView.as_view(), name='event-detail'),

    # User registration endpoint
    path('register/', register_user, name='register'),

    # JWT Token endpoint
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('events/', list_events, name='list-events'),
    path('api/register/', register_user, name='register_user'),
]

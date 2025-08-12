from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, register_for_event

urlpatterns = [
  path('register/', RegisterView.as_view(), name='register'),
  path('login/', TokenObtainPairView.as_view(), name='login'),
  path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  path('event/<int:event_id>/register/', register_for_event, name='register_event'),
]
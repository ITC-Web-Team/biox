from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EventViewSet, RegistrationViewSet, TeamViewSet, check_admin, logout_view

router = DefaultRouter()
router.register(r'events', EventViewSet)
router.register(r'registrations', RegistrationViewSet)
router.register(r'teams', TeamViewSet)

urlpatterns = [
  path('', include(router.urls)),
  path('auth/check_admin/', check_admin, name='check_admin'),
  path('auth/logout/', logout_view, name='logout'),
]
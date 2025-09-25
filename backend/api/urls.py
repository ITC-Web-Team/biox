from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EventViewSet, EventRegistrationViewSet, TeamViewSet, check_admin, logout_view
from . import views

# Event system router
router = DefaultRouter()
router.register(r'events', EventViewSet)
router.register(r'event-registrations', EventRegistrationViewSet)
router.register(r'teams', TeamViewSet)

urlpatterns = [
    # Event system URLs
    path('', include(router.urls)),
    path('auth/check_admin/', check_admin, name='check_admin'),
    path('auth/logout/', logout_view, name='logout'),
    
    # Project system URLs
    path('projects/', views.projects_list),   
    path('projects/<int:pk>/', views.project_detail),
    path('project-registrations/', views.registrations_list),
    path('project-registrations/<int:pk>/', views.registration_detail),
]

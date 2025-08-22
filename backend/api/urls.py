from django.urls import path
from . import views

urlpatterns = [
    path('projects/', views.projects_list),   
    path('projects/<int:pk>/', views.project_detail),
    path('registrations/', views.registrations_list),
    path('registrations/<int:pk>/', views.registration_detail),
]

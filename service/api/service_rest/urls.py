from django.urls import path

from .views import(
    api_list_technicians,
    api_list_appointments,
)

urlpatterns = [
    path("technicians/", api_list_technicians, name="technicians"),
    path("appointments/", api_list_appointments, name="appointments"),
]

from django.urls import path

from .views import(
    api_list_technicians,
    api_list_appointments,
    api_delete_technician,
    api_delete_appointment
)

urlpatterns = [
    path("technicians/", api_list_technicians, name="technicians"),
    path("appointments/", api_list_appointments, name="appointments"),
    path("technicians/<int:pk>/", api_delete_technician, name="delete_technicians"),
    path("appointments/<int:pk>/", api_delete_appointment, name="delete_appointment")
]

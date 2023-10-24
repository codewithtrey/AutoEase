from django.urls import path

from .views import(
    api_list_technicians,
    api_list_appointments,
    api_delete_technician
)

urlpatterns = [
    path("technicians/", api_list_technicians, name="technicians"),
    path("appointments/", api_list_appointments, name="appointments"),
    path("technicians/<int:pk>/", api_delete_technician, name="delete_technicians")
]

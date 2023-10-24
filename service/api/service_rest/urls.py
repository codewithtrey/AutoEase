from django.urls import path

from .views import (
    api_list_technicians,
    api_list_appointments,
    api_show_technician,
    api_show_appointment,
    api_update_appointment_canceled,
    api_update_appointment_finished,
)

urlpatterns = [
    path("technicians/", api_list_technicians, name="technicians"),
    path("appointments/", api_list_appointments, name="appointments"),
    path("technicians/<int:pk>/", api_show_technician, name="show_technicians"),
    path("appointments/<int:pk>/", api_show_appointment, name="show_appointment"),
    path(
        "appointments/<int:pk>/cancel/",
        api_update_appointment_canceled,
        name="cancel_appointment",
    ),
    path(
        "appointments/<int:pk>/finish/",
        api_update_appointment_finished,
        name="finish_appointment",
    ),
]

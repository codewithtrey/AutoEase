import json
from .models import AutomobileVO, Technician, Appointment
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from django.http import JsonResponse


# class AutomobileVODetailEncoder(ModelEncoder):
#     model = AutomobileVO
#     properties = [
#         "vin",
#         "sold",
#     ]


class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = [
        "employee_id",
    ]

    # encoders = {
    #     "automobile": AutomobileVODetailEncoder(),
    # }

class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id"
    ]

    # encoders = {
    #     "automobile": AutomobileVODetailEncoder(),
    # }


class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "customer"
    ]


class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "reason",
        "status",
        "customer",
        "vin",
        "technician"
    ]

    encoders = {
        "technician": TechnicianListEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianDetailEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        # try:
        #     employee_id = f"/api/technicians/{content['employee_id']}/"
        #     technician = Technician.objects.get(employee_id=employee_id)
        #     content["technician"] = technician
        # except Technician.DoesNotExist:
        #     return JsonResponse(
        #         {"message": "Invalid employee id"},
        #         status=400,
        #     )

        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianDetailEncoder,
            safe=False,
        )


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentListEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        print(content)
        try:
            technician = Technician.objects.get(id=content["technician"])
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid employee id"},
                status=400,
            )

        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentDetailEncoder,
            safe=False,
        )

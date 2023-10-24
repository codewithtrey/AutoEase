from django.db import models
from django.urls import reverse

# Create your models here.
class AutomobileVO(models.Model):
    vin = models.CharField(max_length=200)
    sold = models.CharField(max_length=200)


class Technician(models.Model):

    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=200)


    # automobile = models.ForeignKey(
    #     AutomobileVO,
    #     related_name="automobile",
    #     on_delete=models.CASCADE,
    # )

    # def __str__(self):
    #     return self.employee_id

    # def get_api_url(self):
    #     return reverse("api_list_technicians", kwargs={"pk": self.pk})


class Appointment(models.Model):

    date_time = models.DateTimeField()
    reason = models.CharField(max_length=200)
    status = models.CharField(max_length=200)
    vin = models.CharField(max_length=200)
    customer = models.CharField(max_length=200)

    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE,
    )

    # def __str__(self):
    #     return self.date_time

    # def get_api_url(self):
    #     return reverse("api_list_appointments", kwargs={"pk": self.pk})

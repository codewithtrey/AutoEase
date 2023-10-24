from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .encoders import SalespersonEncoder,CustomerEncoder,SaleEncoder
from .models import Salesperson,Sale,Customer,AutomobileVO
import json


@require_http_methods(["GET","POST"])
def list_salespeople(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople" : salespeople},
            encoder = SalespersonEncoder,
            safe = False,
        )
    else:
        content = json.loads(request.body)
        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False,
        )
    

@require_http_methods(["DELETE"])
def delete_salesperson(request,pk):
        try:
            if request.method == "DELETE":
                count, _ = Salesperson.objects.filter(id=pk).delete()
                return JsonResponse({"deleted": count > 0})
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "employee not found"},
                status=404,
            )


@require_http_methods(["GET","POST"])
def list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers" : customers },
            encoder = CustomerEncoder,
            safe = False,
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )


@require_http_methods(["DELETE"])
def delete_customer(request,pk):
    try:
        if request.method == "DELETE":
            count, _ = Customer.objects.filter(id=pk).delete()
            return JsonResponse({"deleted": count > 0})
    except Customer.DoesNotExist:
        return JsonResponse(
                {"message": "Customer not found"},
                status=404,
            )

    
require_http_methods(["GET","POST"])
def list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales" : sales},
            encoder = SaleEncoder,
            safe = False,
        )
    else:
        content = json.loads(request.body)
        try:
            automobile = AutomobileVO.objects.get(vin = content["automobile"])
            salesperson = Salesperson.objects.get(employee_id = content["salesperson"])
            customer = Customer.objects.get(id = content["customer"])
            content["automobile"] = automobile
            content["salesperson"] = salesperson
            content["customer"] = customer

        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "vin not found"},
                status=404,
            )

        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "employee not found"},
                status=404,
            )
        
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "customer not found"},
                status=404,
            )
        
        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False,
        )


def delete_sale(request,pk):
    try:
        if request.method == "DELETE":
            count, _ = Sale.objects.filter(id=pk).delete()
            return JsonResponse(
                {"deleted": count > 0},
                status = 200
        )

    except Sale.DoesNotExist:
        return JsonResponse(
            {"message":"sale not found "},
            status = 404
        )
# CarCar

Team:

- Trey - Service
- Jason - Sales

## Design

## Service microservice

I have 3 models, AutombileVO, Technician, and Appointment. The AutomobileVO connects to the inventory microservice with the incorportation of the poller. When a new vehicle is added to the inventory, the poller updates the AutomobileVO every 60 seconds with the updated VINs from the inventory service. The technician and appointment models are integrated with the service history. I have built in functionality to search by VIN and that specific service history will show. After a specific VIN is entered in the search bar, the application checks to see if that VIN exists in the inventory and marks the customer as a VIP.

## Sales microservice

The sales microservice allows for users to visualize and add customers, salespeople, and sales. A poller is used
to obtain automobile info from the inventory microservice and stored into the AutomobileVO model. This information
is used to help facilitate the completion of the forms.

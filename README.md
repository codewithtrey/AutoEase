# AutoEase

Team:
- Trejon McGee - Services
- Jason Seet - Sales
  
# Technologies Used

[![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)](https://www.python.org/)
[![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)](https://www.javascript.com/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![Django](https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

## Services microservice

- **_Service API_**: RESTful API to handle automobile service appointments.
- **_Service Poller_**: Poller to poll the **Inventory API** for manufacturer, vehiclemodel and automobile.
- **Django**: Backend models, views, and urls. Views have complete CRUD functions for service appointments and technicians. Settings edited to ensure Django app and project are linked, and added CORS permissions.
- **Inventory** **API**: Provides **Manufacturer**, **VehicleModel** and **Automobile** RESTful API endpoints.
- **Database**: PostgreSQL database that holds the data of all microservices.
- **React**: React-based front-end application to interact with services.

- Class components were utilized to create Service appointments, list service appointments, list service history, and create technicians.

## Sales microservice

- **_Sales API_**: RESTful API to handle automobile sales.
- **_Sales Poller_**: Poller to poll the Inventory API to get the automobiles and append the automobileVO.
- **DJANGO**: Backend models, views and urls. Views with completed CRUD functions.

- All forms and lists created in React with functional components.

# Getting the app running

1. Git clone into your local repository: git clone (repo)
2. Change directory: cd autoease
3. Create volume: docker volume create beta-data
4. Build the image: docker compose build
5. Run the containers: docker compose up
6. Open browser to localhost

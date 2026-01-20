# Concessionnaire Automobile – Flask & MySQL

Web application developed to manage the operations of a car dealership using a relational database.  
The project implements a complete backend with Flask and MySQL, along with a frontend interface for managing clients, vehicles, sales, and maintenance records.

This project was developed as part of an academic software/database course and follows a full-stack architecture.

---

## Project Overview

The application allows dealership employees to:
- Manage clients
- Manage vehicles
- Record vehicle sales
- Track vehicle maintenance
- Authenticate users securely

The backend is implemented using Flask and communicates with a MySQL database.
The frontend uses HTML templates, CSS, and JavaScript to interact with the backend API.

---

## Architecture

Frontend (HTML / CSS / JavaScript)  
→ Flask Backend (Python)  
→ MySQL Database  

---

## Main Features

- User authentication with password hashing
- CRUD operations on clients
- CRUD operations on vehicles
- Sales management (linking clients and vehicles)
- Maintenance tracking
- Structured SQL database schema
- Separation between backend, database, and frontend layers

---

## Tech Stack

- Backend: Python (Flask)
- Database: MySQL
- Frontend: HTML, CSS, JavaScript
- Authentication: Password hashing utilities
- Database scripting: SQL
- Architecture: MVC-inspired structure

---

## Database

The database is implemented using MySQL and initialized via SQL scripts.

Tables include:
- Clients
- Vehicles
- Sales
- Maintenance records
- Users (authentication)

The schema enforces relational integrity through primary and foreign keys.

---

## Backend

The backend is built using Flask and provides:
- Routing logic
- Database queries
- Business logic
- User authentication handling

Password security is implemented using hashing utilities.

---

## Frontend

The frontend uses:
- HTML templates rendered by Flask
- JavaScript for dynamic interactions
- CSS for styling

Each functional module (clients, vehicles, sales, maintenance) has its own dedicated JavaScript file.

---

## How to Run the Project

### Prerequisites
- Python 3.x
- MySQL Server
- pip (Python package manager)

### Steps

1. Create the MySQL database using the provided SQL scripts
2. Configure database connection parameters in the backend
3. Install Python dependencies
4. Run the Flask server

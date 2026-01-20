# Car Dealership Management System – Flask & MySQL

Web application developed to manage the operations of a car dealership using a relational database.
The project implements a complete backend with Flask and MySQL, along with a frontend interface for managing clients, vehicles, sales, and maintenance records.

This project was developed as part of an academic software and database course and follows a full-stack architecture.

---

## Project Overview

The application allows dealership employees to:
- Manage clients
- Manage vehicles
- Record vehicle sales
- Track vehicle maintenance
- Authenticate users securely

The backend is implemented using Flask and communicates with a MySQL database.
The frontend uses HTML templates, CSS, and JavaScript to interact with the backend.

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
- Sales management linking clients and vehicles
- Maintenance tracking
- Structured SQL database schema
- Separation between backend, database, and frontend layers

---

## Tech Stack

- Backend: Python (Flask)
- Database: MySQL
- Frontend: HTML, CSS, JavaScript
- Authentication: Password hashing
- Database scripting: SQL
- Architecture: MVC-inspired structure

---

## Database

The MySQL database is initialized using SQL scripts and includes:
- Clients
- Vehicles
- Sales
- Maintenance records
- Users for authentication

Relational integrity is enforced through primary and foreign keys.

---

## Backend

The Flask backend handles:
- Routing and business logic
- Database queries
- User authentication
- Data validation

Passwords are securely stored using hashing techniques.

---

## Frontend

The frontend uses:
- HTML templates rendered by Flask
- JavaScript for dynamic interactions
- CSS for styling

Each functional module has its own dedicated JavaScript logic.

---

## How to Run the Project

### Prerequisites
- Python 3.x
- MySQL Server
- pip

### Steps

1. Create the database using the provided SQL scripts
2. Configure database connection parameters in the backend
3. Install Python dependencies
4. Run the Flask server

Example:
python serveur.py

Then access the application through a web browser.

---

## What I Learned

- Designing and implementing a relational database schema
- Writing structured and maintainable SQL scripts
- Building a full-stack web application with Flask
- Implementing secure user authentication
- Separating concerns between frontend, backend, and database
- Managing CRUD operations in a real-world context
- Understanding how backend systems interact with relational databases

---

## Possible Improvements

- Role-based access control
- Pagination and search functionality
- Improved UI/UX
- API documentation
- Dockerization and CI/CD integration
- Automated testing

---

## Purpose

This project was developed to demonstrate practical skills in full-stack development, relational databases, and backend architecture using Flask and MySQL.

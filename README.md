# Barber Booking App

This is a **frontend React application** built with **React, Vite, TailwindCSS, Axios and Zod** that provides a modern user interface for booking and managing appointments in a barber shop system. It connects to the backend REST API for user authentication, appointment scheduling and admin management of users and barbers.

---

## Technologies Used

| Technology | Description |
|---|---|
| **React** | Component-based UI library |
| **Vite** | Fast dev server and build tool |
| **TailwindCSS** | Utility-first CSS framework |
| **React Router** | Client-side routing with protected routes |
| **Axios** | HTTP client for API requests |
| **Zod** | Schema validation for forms and payloads |
| **JWT (jwt-decode)** | Decode tokens to manage user sessions |

---

## Features

- User and Barber registration & login (JWT based)

- Role-based access control (Admin, Barber, Customer)  

- Appointment creation, cancellation and status updates  

- CRUD operations for Users and Barbers (admin panel)  

- Form validation with Zod  

- Token persistence in local storage  

- Responsive design with TailwindCSS  

---

## Roles & Permissions

**ADMIN**

- Full administrative access

- Can create, update or delete both barbers and users

- Can view all appointments

**BARBER**

- Can view appointments assigned to them

- Can update appointment statuses (e.g. mark as completed or cancelled)

**CUSTOMER**

- Can book new appointments with barbers

- Can view their own appointment history

- Can cancel their upcoming appointments

---

## Demo Credentials

Use these demo accounts to log in and explore the app:

- **Admin** → username: `morfonidis`, password: `12345`

- **Barber** → username: `marcus`, password: `12345`

- **Customer** → username: `bill`, password: `12345`


## Clone the Repository

git clone git@github.com:mariosmorfo/barber-booking-app-frontend.git

cd barber-booking-app-frontend

## Install Dependencies

npm install

## Create .env File

VITE_API_URL=http://localhost:3000

## Run the Application 

npm run dev


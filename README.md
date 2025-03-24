# Meeting Room Booking API

## Overview
This is a **Meeting Room Booking API** built with **Node.js, Express, and MongoDB**. The API allows users to book meeting halls, check availability, and manage bookings. It includes authentication, role-based access control (admin & user), and CORS support.

## Features
- User authentication (Register, Login, Logout)
- Role-based access control (Admin & User)
- Create, fetch, and delete meeting halls (Admin only)
- Check hall availability
- Book and cancel bookings
- Secure routes with JWT authentication

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Authentication:** JWT (JSON Web Tokens)
- **Middleware:** CORS, Cookie Parser, Body Parser
- **Environment Variables:** dotenv

## Installation & Setup
### 1. Clone the Repository
```sh
git clone https://github.com/AakashSuresh2003/meeting_room_booking_backend.git
cd meeting_room_booking_backend
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory and add the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPERIES_IN=ypur_custom_time
```

### 4. Start the Server
#### Production Mode:
```sh
npm start
```
#### Development Mode (with Nodemon):
```sh
npm run start:dev
```

## API Endpoints
### User Routes (`/api/v1/users`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/register` | Register a new user |
| POST   | `/login` | Login user and get JWT token |
| POST   | `/logout` | Logout user |
| GET    | `/profile` | Get logged-in user profile (Protected) |
| GET    | `/listUsers` | Get all users (Admin only) |

### Booking Routes (`/api/v1/bookings`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/availability` | Check hall availability |
| POST   | `/book` | Book a hall (Protected) |
| DELETE | `/cancel/:id` | Cancel a booking (Protected) |
| GET    | `/booked-halls` | Get all booked halls (Protected) |

### Hall Routes (`/api/v1/hallBookings`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/` | Create a new hall (Admin only) |
| GET    | `/` | Get all halls (Protected) |
| DELETE | `/:id` | Delete a hall (Admin only) |

## Middleware
- **Authentication Middleware (`authMiddleware.js`)**
  - `protect` → Protects routes, allowing only authenticated users.
  - `isAdmin` → Restricts access to admin-only routes.

## Scripts
| Command | Description |
|---------|-------------|
| `npm start` | Starts the server |
| `npm run start:dev` | Starts the server with Nodemon |

## License
This project is licensed under the MIT License.


# Expert Booking System

A full-stack real-time expert booking platform built with React Native, Node.js, MongoDB, and Socket.io.

Users can:
- Browse experts
- Search by category
- View available slots
- Book appointments
- Receive real-time slot updates

---

# Project Structure

```txt
.
├── backend/
│   ├── server.js
│   ├── seed.js
│   ├── .env.example
│   ├── package.json
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── models/
│   │   ├── Expert.js
│   │   └── Booking.js
│   │
│   ├── controllers/
│   │   ├── expertController.js
│   │   └── bookingController.js
│   │
│   ├── routes/
│   │   ├── expertRoutes.js
│   │   └── bookingRoutes.js
│   │
│   └── middleware/
│       └── errorHandler.js
│
├── app/
│   ├── android/
│   ├── ios/
│   ├── src/
│   └── package.json
│
├── .gitignore
└── README.md
```

---

# Features

- Browse experts by category
- Search experts by name
- Expert detail page
- Real-time slot updates
- Appointment booking
- Double booking prevention
- MongoDB transactions
- Pagination support
- REST API architecture
- React Native mobile app
- Socket.io integration

---

# Tech Stack

## Frontend
- React Native
- TypeScript
- React Navigation
- Socket.io Client

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.io

---

# Backend Setup

## 1. Navigate to backend

```bash
cd backend
```

## 2. Install dependencies

```bash
npm install
```

## 3. Create environment file

```bash
cp .env.example .env
```

Add your environment variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection
CLIENT_URL=http://localhost:8081
```

## 4. Seed sample data

```bash
node seed.js
```

## 5. Start development server

```bash
npm run dev
```

Backend runs on:

```txt
http://localhost:5000
```

---

# Frontend Setup

## 1. Navigate to app folder

```bash
cd ExpertBooking
```

## 2. Install dependencies

```bash
npm install
```

## 3. Start Metro

```bash
npm start
```

## 4. Run Android

```bash
npm run android
```

## 5. Run iOS

```bash
npm run ios
```

---

# API Endpoints

## Experts

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/experts` | Get all experts |
| GET | `/api/experts/:id` | Get expert details |

### Query Parameters

```txt
?page=1
&limit=9
&category=Health
&search=doctor
```

Example:

```txt
GET /api/experts?page=1&limit=9&category=Health&search=doctor
```

---

## Bookings

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/bookings` | Create booking |
| GET | `/api/bookings?email=user@email.com` | Get user bookings |
| PATCH | `/api/bookings/:id/status` | Update booking status |

---

# Socket.io Events

| Event | Description |
|---|---|
| `slotBooked` | Emitted when a slot is booked |
| `slotRestored` | Emitted when a slot is restored |

Clients receive slot updates instantly without refresh.

---

# Architecture Decisions

## Double Booking Prevention

The application prevents race conditions using:

- MongoDB compound unique index
- MongoDB transactions
- Mongoose sessions

Unique booking constraint:

```txt
(expertId, date, timeSlot)
```

Applied only for statuses:

```txt
pending
confirmed
```

If two users try booking the same slot:
- One booking succeeds
- Second receives HTTP `409 Conflict`

---

# Error Handling

| Error Type | Status Code |
|---|---|
| Validation Error | 400 |
| Invalid ObjectId | 400 |
| Duplicate Booking | 409 |
| Internal Server Error | 500 |

---

# Environment Variables

## Backend `.env`

```env
PORT=5000
MONGODB_URI=
CLIENT_URL=
```

---

# Future Improvements

- JWT Authentication
- Payment integration
- Push notifications
- Admin dashboard
- Video consultation
- Calendar integration
- Email reminders

---

# Author

Built with:
- React Native
- Node.js
- MongoDB
- Socket.io
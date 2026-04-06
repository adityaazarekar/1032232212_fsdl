# Employee Management System

A full-stack CRUD web application built with the **MERN Stack** (MongoDB, Express, React, Node.js).

---

## Features

- Add new employees with all required details
- View all employees in a sortable table
- Search employees in real-time by Employee ID
- Update employee details via a modal form
- Delete employees by Employee ID
- MongoDB Atlas cloud database integration

---

## Tech Stack

| Layer     | Technology                         |
|-----------|------------------------------------|
| Database  | MongoDB Atlas + Mongoose           |
| Backend   | Node.js + Express.js               |
| Frontend  | React.js (functional components)   |
| HTTP      | Fetch API (no Axios)               |
| Styling   | Vanilla CSS                        |

---

## Folder Structure

```
mern-employee-app/
├── backend/
│   ├── controllers/employeeController.js
│   ├── models/employeeModel.js
│   ├── routes/employeeRoutes.js
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── EmployeeForm.js
│   │   │   ├── EmployeeList.js
│   │   │   └── UpdateForm.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
└── README.md
```

---

## Setup Instructions

### Step 1 — Configure MongoDB Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/) and get your connection string.
2. Open `backend/.env` and replace the placeholder:
   ```
   MONGO_URI=your_actual_mongodb_atlas_connection_string
   PORT=4000
   ```

### Step 2 — Start the Backend

```bash
cd mern-employee-app/backend
npm install
npm run dev
```

You should see:
```
MongoDB connected
Server running on port 4000
```

### Step 3 — Start the Frontend

Open a **new terminal** and run:

```bash
cd mern-employee-app/frontend
npm install
npm start
```

### Step 4 — Open the App

Visit: **http://localhost:3000**

---

## API Endpoints

| Method | Endpoint                    | Description              |
|--------|-----------------------------|--------------------------|
| GET    | /api/employees              | Get all employees        |
| GET    | /api/employees/:id          | Get employee by MongoDB _id |
| POST   | /api/employees              | Create new employee      |
| PATCH  | /api/employees/:id          | Update employee by _id   |
| DELETE | /api/employees/:id          | Delete by employeeID     |

---

## Employee Schema

| Field          | Type   | Required | Unique |
|----------------|--------|----------|--------|
| employeeName   | String | ✓        |        |
| employeeID     | String | ✓        | ✓      |
| departmentName | String | ✓        |        |
| phoneNumber    | String | ✓        |        |
| joiningDate    | Date   | ✓        |        |

---

*FSD Lab 07 — MIT World Peace University*

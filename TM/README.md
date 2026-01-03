# Task Management Application

A full-stack Task Management Application built with the MERN stack (MongoDB replaced with PostgreSQL) using React, Node.js, Express.js, PostgreSQL, and Sequelize ORM.

## Features

- **User Authentication**: JWT-based authentication with registration and login
- **Task Management**: Full CRUD operations for tasks
- **Task Status**: Tasks can have three statuses: Todo, In Progress, Completed
- **Dashboard**: Interactive charts using Chart.js to display task statistics
- **Protected Routes**: Secure API endpoints and frontend routes
- **Error Handling**: Comprehensive error handling and validation
- **Responsive Design**: Modern, responsive UI with CSS

## Tech Stack

### Backend
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT (jsonwebtoken)
- bcryptjs (password hashing)

### Frontend
- React 18
- React Router DOM
- Context API (state management)
- Axios (HTTP client)
- Chart.js & react-chartjs-2 (dashboard charts)
- Vite (build tool)

## Project Structure

```
TM/
├── backend/
│   ├── config/
│   │   └── database.js          # Sequelize configuration
│   ├── models/
│   │   ├── User.js               # User model
│   │   └── Task.js               # Task model
│   ├── routes/
│   │   ├── auth.js               # Authentication routes
│   │   └── tasks.js              # Task CRUD routes
│   ├── middleware/
│   │   └── auth.js               # JWT authentication middleware
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   └── taskController.js     # Task CRUD logic
│   ├── utils/
│   │   └── jwt.js                # JWT utility functions
│   ├── server.js                 # Express app entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── TaskForm.jsx      # Create/Edit task form
    │   │   ├── TaskList.jsx      # Task list display
    │   │   ├── TaskItem.jsx      # Individual task card
    │   │   ├── Dashboard.jsx     # Chart.js dashboard
    │   │   ├── Loading.jsx       # Loading indicator
    │   │   └── ErrorMessage.jsx  # Error display
    │   ├── context/
    │   │   ├── AuthContext.jsx   # Authentication state
    │   │   └── TaskContext.jsx   # Task state management
    │   ├── pages/
    │   │   ├── Login.jsx         # Login page
    │   │   ├── Register.jsx      # Registration page
    │   │   └── Home.jsx           # Main task management page
    │   ├── utils/
    │   │   └── api.js             # Axios API client
    │   ├── App.jsx                # Main app component
    │   └── index.jsx              # React entry point
    └── package.json
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_management
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d

PORT=5000
NODE_ENV=development
```

4. Create the PostgreSQL database:
```sql
CREATE DATABASE task_management;
```

5. Start the backend server:
```bash
npm start
# or for development with nodemon
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Tasks (Protected - requires JWT token)
- `GET /api/tasks` - Get all tasks for authenticated user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Usage

1. Start the PostgreSQL database
2. Start the backend server (port 5000)
3. Start the frontend development server (port 3000)
4. Open `http://localhost:3000` in your browser
5. Register a new account or login
6. Create, view, update, and delete tasks
7. View task statistics on the dashboard

## Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT tokens with expiration
- Protected API routes with authentication middleware
- Input validation and sanitization
- CORS configuration

## License

ISC


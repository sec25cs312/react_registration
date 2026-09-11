# Registration Server

Express.js + MongoDB registration API server for the student registration form.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas connection string)
- npm or yarn

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   - Create or update the `.env` file with your MongoDB connection string:
     ```
     MONGO_URI=mongodb://localhost:27017/registration_db
     PORT=5000
     NODE_ENV=development
     ```

   **For MongoDB Atlas:**
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/registration_db
   ```

## Running the Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### 1. Register a Student
- **POST** `/api/register`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "phone": "9876543210",
    "address": "123 Main Street",
    "dob": "2005-01-15",
    "studentId": "REG-2026-90",
    "email": "john@example.com",
    "fatherName": "David Doe",
    "motherName": "Jane Doe",
    "gender": "Male"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Registration Successfully Completed!",
    "data": { ...student details }
  }
  ```

### 2. Get All Students
- **GET** `/api/students`
- **Response:**
  ```json
  {
    "success": true,
    "count": 5,
    "data": [ ...students ]
  }
  ```

### 3. Get a Specific Student
- **GET** `/api/students/:studentId`
- **Example:** `/api/students/REG-2026-90`

### 4. Update a Student
- **PUT** `/api/students/:studentId`
- **Body:** (partial update allowed)
  ```json
  {
    "phone": "9876543211",
    "address": "456 Oak Avenue"
  }
  ```

### 5. Delete a Student
- **DELETE** `/api/students/:studentId`
- **Example:** `/api/students/REG-2026-90`

### 6. Health Check
- **GET** `/health`

## Database Schema

### Student Model
```
{
  name: String (required),
  phone: String (required),
  address: String (required),
  dob: Date (required),
  studentId: String (required, unique),
  email: String (required, unique),
  fatherName: String (required),
  motherName: String (required),
  gender: String (required, enum: ['Male', 'Female', 'Other']),
  registeredAt: Date (default: now),
  timestamps: { createdAt, updatedAt }
}
```

## Features

✅ MongoDB integration with Mongoose ODM  
✅ Express REST API  
✅ CORS enabled for client communication  
✅ Input validation and sanitization  
✅ Duplicate student ID and email prevention  
✅ Error handling and logging  
✅ Auto-timestamps for created/updated records  

## CORS Configuration

The server allows requests from:
- `http://localhost:5173` (Vite default)
- `http://localhost:3000` (Common React dev server port)

To add more origins, update the `cors` configuration in `server.js`

## Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running locally or check your MongoDB Atlas connection string
- Verify the database credentials in `.env`

**Port Already in Use:**
- Change the PORT in `.env` or kill the process using port 5000

**CORS Errors:**
- Add your client's URL to the `cors` configuration in `server.js`

## File Structure
```
server/
├── server.js              # Main server file
├── package.json           # Dependencies
├── .env                   # Environment variables
├── .gitignore            # Git ignore rules
├── config/
│   └── db.js             # MongoDB connection
├── models/
│   └── Student.js        # Student schema
└── routes/
    └── registration.js   # Registration endpoints
```

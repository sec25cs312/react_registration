# Student Registration Form - Full Stack Setup

Complete setup guide for running the Student Registration application with React frontend and Node.js + MongoDB backend.

## Project Structure
```
react_registration/
├── client/              # React Vite Frontend
│   ├── src/
│   │   ├── api/
│   │   │   └── studentApi.js      # API integration
│   │   ├── App.jsx                # Registration form
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
└── server/              # Express + MongoDB Backend
    ├── config/
    │   └── db.js        # MongoDB connection
    ├── models/
    │   └── Student.js   # Student schema
    ├── routes/
    │   └── registration.js # API endpoints
    ├── server.js        # Main server
    ├── package.json
    ├── .env             # Environment variables
    └── README.md        # Server documentation
```

## Prerequisites

- **Node.js** v14+
- **npm** or yarn
- **MongoDB** (local installation or MongoDB Atlas account)

## Installation & Setup

### Step 1: MongoDB Setup

**Option A: Local MongoDB**
1. Install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   - Windows: Search for "Services" → Start "MongoDB"
   - macOS: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`

**Option B: MongoDB Atlas (Cloud)**
1. Create account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a cluster and get connection string
3. Update `.env` in server folder with your connection string

### Step 2: Server Setup

1. **Navigate to server folder:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create/Update `.env` file** with MongoDB connection:
   ```
   MONGO_URI=mongodb://localhost:27017/registration_db
   PORT=5000
   NODE_ENV=development
   ```

4. **Start the server:**
   ```bash
   npm run dev
   ```
   
   Expected output:
   ```
   ✓ MongoDB Connected: localhost
   🚀 Server running on http://localhost:5000
   ```

### Step 3: Client Setup

1. **In a new terminal, navigate to client folder:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   ```
   http://localhost:5173
   ```

## Usage

### Registration Flow
1. Fill out all required fields in the form
2. Submit the form
3. Data is sent to server and saved in MongoDB
4. Success/Error message is displayed
5. Form is reset for next registration

### API Endpoints

**Register Student:**
```bash
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "phone": "9876543210",
    "address": "123 Main St",
    "dob": "2005-01-15",
    "studentId": "REG-2026-90",
    "email": "john@example.com",
    "fatherName": "David Doe",
    "motherName": "Jane Doe",
    "gender": "Male"
  }'
```

**View All Students:**
```bash
curl http://localhost:5000/api/students
```

**Server Health Check:**
```bash
curl http://localhost:5000/health
```

## Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB is running
- Check MONGO_URI in `.env` file
- For Atlas: verify IP whitelist and credentials

### Port 5000 Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### CORS Error
- Server already has CORS enabled for localhost:5173
- If using different port, update CORS settings in `server/server.js`

### Nodemon Not Found
```bash
npm install -g nodemon
# or use: npx nodemon server.js
```

## Development Commands

### Server
```bash
npm run dev      # Development with hot reload
npm start        # Production mode
```

### Client
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Database Validation

Check your MongoDB for saved registrations:

**MongoDB Shell:**
```bash
mongosh
use registration_db
db.students.find()
```

**MongoDB Atlas:**
1. Go to Collections
2. Select database: `registration_db`
3. Select collection: `students`

## Features

✅ React Vite frontend with modern UI  
✅ Express REST API backend  
✅ MongoDB database integration  
✅ Input validation and error handling  
✅ Duplicate prevention (Student ID & Email)  
✅ CRUD operations support  
✅ Responsive design  
✅ Real-time status notifications  

## Next Steps

1. Add authentication/authorization
2. Implement student dashboard to view/edit records
3. Add file upload for documents
4. Implement pagination for students list
5. Add advanced search and filtering
6. Deploy to production (Heroku, AWS, etc.)

## Support

For issues or questions, check the README files in `server/` and `client/` directories.

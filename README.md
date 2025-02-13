# Invoice Management System - Backend

This is the backend for the Invoice Management System, built using Node.js and Express.js. It provides APIs for user authentication and invoice management.

## Technologies Used

- **Node.js**: JavaScript runtime.
- **Express.js**: Web framework for building APIs.
- **Mongoose**: ODM for MongoDB.
- **JWT**: For authentication.
- **bcryptjs**: For hashing passwords.
- **dotenv**: For environment variables.
- **cors**: To enable Cross-Origin Resource Sharing.
- **body-parser**: To handle incoming request bodies.

## Setup

### Steps to Set Up

1. **Navigate to the Backend Directory**:
   ```bash
   cd invoice-backend


   npm install
   
MONGO_URI=<your_mongodb_connection_string>
PORT=5000
JWT_SECRET=<your_jwt_secret>


The backend will be available at http://localhost:5000. 
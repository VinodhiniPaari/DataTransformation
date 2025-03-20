# Microservices Project with JWT Authentication, File Upload, and Data Transformation

This project implements a microservices-based architecture using **Node.js** and **NestJS**. It contains three core microservices: Authentication, File Upload, and Data Transformation. These services communicate via HTTP and use **JWT** for secure authentication.

## 📁 **Project Structure**
```
microservices-nestjs
├── apps
│   ├── auth-service
│   │   ├── src
│   │   │   ├── auth (Authentication APIs)
│   │   │   ├── config (JWT Configuration)
│   │   │   ├── main.ts (Service Entry Point)
│   ├── file-upload-service
│   │   ├── src
│   │   │   ├── upload (File Upload APIs)
│   │   │   ├── middleware (Multer Configuration)
│   │   │   ├── main.ts (Service Entry Point)
│   ├── data-transformation-service
│   │   ├── src
│   │   │   ├── transform (Data Transformation APIs)
│   │   │   ├── utils (Transformation & Mapping Utilities)
│   │   │   ├── main.ts (Service Entry Point)
└── .env (Environment Variables)
```

---

## 🛠️ **Prerequisites**
Ensure you have the following installed:
- **Node.js** (v18+)
- **npm** or **yarn**
- **Docker** (optional for containerization)

---

## 🚀 **Installation**
1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd microservices-nestjs
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in the root directory and configure the following:
    ```env
    # Authentication Service
    JWT_SECRET=your-secret-key

    # File Upload Service
    UPLOAD_DIR=./uploads

    # Data Transformation Service
    DATA_DIR=./data
    ```

---

## 🔎 **Usage**
Run the services using the commands below:

- **Start Authentication Service:**
    ```bash
    npm run start:dev:auth-service
    ```
- **Start File Upload Service:**
    ```bash
    npm run start:dev:file-upload-service
    ```
- **Start Data Transformation Service:**
    ```bash
    npm run start:dev:data-transformation-service
    ```

---

## 🧪 **API Endpoints**
### ✅ **Authentication Service** (`http://localhost:3000`)
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login to get JWT Token

### 📤 **File Upload Service** (`http://localhost:3001`)
- `POST /upload` - Upload a CSV file (Max: 100MB)
- `GET /status/:id` - Check file upload status

### 🔎 **Data Transformation Service** (`http://localhost:3002`)
- `POST /transform` - Transform CSV data using custom mapping

---

## 🛡️ **Security**
- All endpoints (except registration and login) are protected using **JWT tokens**.
- Pass the JWT token as a Bearer Token in the `Authorization` header for secure access.

Example:
```http
Authorization: Bearer <your_jwt_token>
```

## 📧 **Contributing**
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to your branch: `git push origin feature-branch`
5. Submit a pull request.

---



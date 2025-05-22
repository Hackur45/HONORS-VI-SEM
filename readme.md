
# 🔐 Secure Auth Backend

A secure, scalable, and testable backend application built with **Express.js** and **MongoDB Atlas**. Includes authentication with email-based verification, password reset, rate limiting, and unit testing.



## 🚀 Features

- ✅ User Registration with Email Verification (Nodemailer)
- 🔐 Secure Login with JWT
- ♻️ Email-based Password Reset Flow
- ⚙️ Rate Limiting with `express-rate-limit`
- 🧪 Unit Testing with Jest + Supertest
- ⛔ Prevents Simultaneous Logins
- 🛡️ Environment Variables via `.env`
- 🌐 MongoDB Atlas Integration


## 📦 Tech Stack

- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- Nodemailer (Gmail App Password)
- dotenv
- express-rate-limit
- Jest + Supertest


## 🛠 Setup Instructions

### 1. Clone the Repo
```bash
git clone https://github.com/your-username/secure-auth-backend.git
cd secure-auth-backend
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File

```env
PORT=5500
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### 4. Start Server

```bash
npm start
```

Server runs on `http://localhost:5500`

---

## 📮 API Endpoints

### 🔹 Register User

`POST /api/register`

### 🔹 Verify Registration

`POST /api/verify-registration`

### 🔹 Login

`POST /api/login`

### 🔹 Request Password Reset

`POST /api/request-password-reset`

### 🔹 Reset Password

`POST /api/reset-password`

### 🔒 Protected Route

`GET /api/dashboard` (Requires Bearer token)

---

## 🧪 Running Tests

```bash
npm test
```

Runs unit tests using Jest + Supertest.

---

## ⚠️ Notes

* Use Gmail App Passwords (not your main password) for Nodemailer.
* Reset token and verification token are time-limited and secure.
* Rate limiting protects against abuse on login and registration routes.



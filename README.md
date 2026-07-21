# 🔐 Auth Service

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-black?logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-4169E1?logo=postgresql&logoColor=white)

![License](https://img.shields.io/badge/License-MIT-green)

A production-inspired authentication REST API built with **Node.js**, **Express**, and **PostgreSQL**.

The project demonstrates secure authentication practices including JWT authentication, refresh token rotation, password recovery, email verification, and secure token storage.

---

# ✨ Features

- 🔐 JWT Authentication (Access Token & Refresh Token)
- 🔄 Refresh Token Rotation & Revocation
- 🔑 Secure Password Reset
- 📧 Email Verification
- 👤 Current Authenticated User
- 🔒 Change Password
- 🛡️ SHA-256 hashed Refresh, Reset & Verification Tokens
- 🔐 bcrypt Password Hashing
- ⚡ RESTful API Design
- 📂 Modular Project Structure

---

# 🛠 Tech Stack

| Category         | Technology                 |
| ---------------- | -------------------------- |
| Runtime          | Node.js 18+                |
| Framework        | Express 5                  |
| Database         | PostgreSQL 17              |
| Authentication   | JWT (`jsonwebtoken`)       |
| Password Hashing | `bcryptjs`                 |
| Cryptography     | Node.js `crypto` (SHA-256) |
| Environment      | `dotenv`                   |

---

# 📂 Project Structure

```text
src/
├── auth/
├── config/
├── errors/
├── middlewares/
├── app.js
└── server.js
```

---

# 🚀 Getting Started

## Clone the repository

```bash
git clone https://github.com/nguyenstack/auth-service.git
cd auth-service
```

## Install dependencies

```bash
npm install
```

## Configure environment variables

```bash
cp .env.example .env
```

Update the values inside `.env`.

## Start development server

```bash
npm run dev
```

---

# 🗄 Database Setup

Create a PostgreSQL database.

```bash
createdb auth_service
```

Import the schema.

```bash
psql -d auth_service -f database/schema.sql
```

---

# 🔑 Environment Variables

Create a `.env` file from the example.

```bash
cp .env.example .env
```

Example:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=auth_service
DB_PASSWORD=your_password
DB_PORT=5432

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

PORT=3000
```

---

# 📖 API Endpoints

| Method | Endpoint                | Description            |
| ------ | ----------------------- | ---------------------- |
| POST   | `/auth/register`        | Register new user      |
| POST   | `/auth/login`           | User login             |
| POST   | `/auth/logout`          | User logout            |
| POST   | `/auth/refresh-token`   | Refresh access token   |
| GET    | `/auth/me`              | Get current user       |
| PATCH  | `/auth/change-password` | Change password        |
| POST   | `/auth/forgot-password` | Request password reset |
| POST   | `/auth/reset-password`  | Reset password         |
| GET    | `/auth/verify-email`    | Verify email           |

---

# 🔒 Security

- Passwords hashed using **bcrypt**
- JWT Access & Refresh Tokens
- Refresh Token Rotation
- SHA-256 hashed Refresh Tokens
- SHA-256 hashed Password Reset Tokens
- SHA-256 hashed Email Verification Tokens
- Secure Authentication Flow
- Environment Variables for Sensitive Data

---

# 📦 Releases

## v0.1.0

- User Registration
- User Login

## v0.2.0

- Logout
- Refresh Token Rotation
- Current User

## v0.3.0

- Change Password
- Forgot Password
- Reset Password
- Email Verification

---

# 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

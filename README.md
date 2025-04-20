# LectureLink Backend

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v16+-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18+-blue)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)](https://www.mongodb.com/)

## Overview

LectureLink Backend is a robust, scalable REST API that powers the LectureLink platform - an innovative educational content management system designed to streamline lecture delivery, student engagement, and academic resource management. The API provides comprehensive endpoints for authentication, course management, lecture scheduling, assignment submission, attendance tracking, and educational content distribution.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Authentication](#authentication)
- [Data Models](#data-models)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Secure Authentication**: JWT-based authentication with role-based access control
- **User Management**: Registration, profile management, and role assignment
- **Course Management**: Create, update, and manage course information
- **Lecture Handling**: Schedule, update, and track lectures
- **Assignment System**: Create, submit, and grade assignments
- **Attendance Tracking**: Record and report student attendance
- **File Management**: Upload and serve educational materials
- **Notifications**: Event-based notifications for academic activities

## Tech Stack

- **Runtime Environment**: Node.js
- **API Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **File Uploads**: Multer
- **Validation**: Express-validator
- **Security Packages**: Helmet, CORS, Rate Limiting
- **Development Tools**: Nodemon, Morgan

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/RhythmicRhythm/LectureLink_Backend.git
cd LectureLink_Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create the `.env` file based on the provided example:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

### Environment Configuration

Configure the following variables in your `.env` file:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/lecturelink
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
UPLOAD_PATH=./uploads
FRONTEND_URL=http://localhost:3000
```

## API Documentation

The API endpoints are organized around resources:

- **Auth**: `/api/auth` - User registration, login, and authentication
- **Users**: `/api/users` - User management endpoints
- **Courses**: `/api/courses` - Course CRUD operations
- **Lectures**: `/api/lectures` - Lecture management
- **Assignments**: `/api/assignments` - Assignment handling
- **Attendance**: `/api/attendance` - Attendance tracking
- **Files**: `/api/files` - File upload and management

Detailed API documentation with request/response examples is available at `/api/docs` when running the server.

## Project Structure

```
LectureLink_Backend/
│
├── config/             # Configuration files
├── controllers/        # Request handlers
├── middleware/         # Custom middleware
├── models/             # Database models
├── public/             # Static files
├── routes/             # API routes
├── uploads/            # Uploaded files
├── utils/              # Utility functions
├── .env.example        # Environment variables example
├── .gitignore          # Git ignore file
├── package.json        # Project dependencies
└── server.js           # Entry point
```

## Authentication

The API uses JWT for authentication:

1. User signs in through `/api/auth/login`
2. Server validates credentials and returns a JWT token
3. Client includes the token in the Authorization header for subsequent requests
4. Server middleware validates tokens and ensures appropriate access rights

## Data Models

Core data models include:

- **User**: Basic user information with role specification (student, lecturer, admin)
- **Course**: Course details including title, description, and assigned lecturer
- **Lecture**: Lecture scheduling information with materials
- **Assignment**: Assignment details, submissions, and grades
- **Attendance**: Student attendance records for lectures

## Deployment

Deployment instructions for various environments:

### Production Deployment

1. Set environment variables appropriate for production
2. Build the production version:
```bash
npm run build
```
3. Start the production server:
```bash
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and commit: `git commit -m 'Add new feature'`
4. Push to your branch: `git push origin feature/new-feature`
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
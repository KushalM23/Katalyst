# Katalyst - Quiz & Course Assessment Platform

A comprehensive full-stack solution designed to manage course content and assess user progress through interactive quizzes. This project fulfills the requirements for a responsive Quiz Component and a robust Course Management API.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
  - [Frontend: Quiz Component](#frontend-quiz-component)
  - [Backend: Course API](#backend-course-api)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)

## Overview

Katalyst is split into two main components:
1.  **Client**: A Next.js-based frontend providing an engaging, responsive quiz interface.
2.  **Server**: A Node.js/Express REST API that handles course data, serves quiz content, and tracks user progress.

## Features

### Frontend: Quiz Component
Designed as a responsive web interface for taking multiple-choice tests.
*   **Interactive Quizzes**: Displays one question at a time from a set of 5 questions.
*   **Real-time Feedback**: Immediate visual cues (highlighting) for correct or incorrect answers.
*   **Progress Tracking**: Percentage-based progress bar showing current status.
*   **State Persistence**: Uses `localStorage` to save quiz progress, allowing users to resume where they left off.
*   **Accessibility**: Fully navigable via keyboard; designed with accessibility standards in mind.
*   **Responsive Design**: optimized for both desktop and mobile devices.
*   **Score Summary**: Detailed report shown upon quiz completion.

### Backend: Course API
A RESTful API built to manage course lifecycles.
*   **Course Management**: Create and fetch course details, including embedded lessons and quizzes.
*   **Progress Tracking**: Dedicated endpoints to update and retrieve user progress for specific lessons.
*   **Security**: Implements basic authentication simulation using API key headers.
*   **Validation**: Robust input validation and error handling (400/404 responses).
*   **In-Memory Storage**: Lightweight data management for rapid prototyping (configurable to JSON/DB).

## Tech Stack

**Frontend (Client)**
*   **Framework**: Next.js 15+ (App Router)
*   **Library**: React 19
*   **Styling**: Tailwind CSS v4
*   **Language**: TypeScript

**Backend (Server)**
*   **Runtime**: Node.js (>=18.0.0)
*   **Framework**: Express.js 5
*   **Utilities**: `cors`, `body-parser`

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
*   Node.js (v18 or higher)
*   npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/Katalyst.git
    cd Katalyst
    ```

2.  **Setup Backend Server**
    ```bash
    cd server
    npm install
    # Start the server (runs on port 5000 by default)
    npm start
    ```

3.  **Setup Frontend Client**
    Open a new terminal window:
    ```bash
    cd client
    npm install
    # Start the development server
    npm run dev
    ```
    The client will be available at `http://localhost:3000`.

## API Documentation

Base URL: `http://localhost:5000` (default) (Requires strict Authentication headers).

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/courses` | Create a new course with lessons and quizzes. |
| **GET** | `/courses/:id` | Fetch details for a specific course. |
| **POST** | `/courses/:id/progress` | Update user progress for a lesson/quiz. |
| **GET** | `/courses/:id/progress/:userId` | Get a progress report for a specific user. |

**Headers**
Requests typically require a mock API key for authorization:
```http
x-api-key: your-secret-key
```

## Project Structure

```
Katalyst/
├── client/                 # Next.js Frontend
│   ├── app/                # App Router pages and layouts
│   ├── components/         # Reusable UI components (Quiz, ProgressBar, etc.)
│   └── ...config files     # tailwind, postcss, tsconfig
├── server/                 # Express Backend
│   ├── server.js           # Main utility and route handler
│   └── package.json        
├── PRD.md                  # Product Requirements Document
├── DEPLOYMENT.md           # Deployment instructions
└── problem_statement.txt   # Original assessment criteria
```

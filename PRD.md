# Project Requirements Document (PRD): Global Dream Connect Assessment

**Applicant:** Kushaal  
**Role:** Frontend Intern  
**Deadline:** January 16, 2026

## 1. Project Overview

The goal is to develop a Learning Management System (LMS) MVP consisting of a responsive Quiz Interface (Frontend) and a Course Management API (Backend). The system allows users to view courses, take interactive quizzes with immediate feedback, persist their progress locally, and sync completion status to a server.

## 2. Tech Stack

### Frontend (The Client)

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS (recommended for speed and responsiveness)
- **State Management:** React Hooks (`useState`, `useEffect`, `useContext` or simple prop drilling)
- **Persistence:** Browser `localStorage`

### Backend (The Server)

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** In-memory storage (JavaScript variables) or simple JSON file (e.g., `db.json`)
- **Authentication:** Custom Middleware (simulated via Header)

## 3. System Architecture

The project will likely be structured as a monorepo or two separate folders:

```
/client (Next.js application)
/server (Express API)
```

The Frontend will communicate with the Backend via HTTP fetch requests.

## 4. Frontend Specifications (Next.js)

### 4.1. Core Components

- **Quiz Container:** Wrapper component managing the quiz state.
- **Question Card:** Displays the question text and options.
- **ProgressBar:** Visual indicator of `(Current Index + 1) / Total Questions`.
- **ScoreSummary:** Displayed upon completion.

### 4.2. Functional Requirements

- **Data Fetching:** Fetch quiz data from the Backend API (`GET /courses/:id`) on page load.
- **State Persistence (LocalStorage):**
  - **Key:** `quiz_progress_{courseId}`
  - **Value:** `{ currentQuestionIndex: 2, answers: { 0: 'a', 1: 'b' }, score: 1 }`
  - **Logic:** On mount, check if this key exists. If yes, hydrate state to restore the user's spot.
- **Navigation:**
  - **Next Button:** Disabled until an option is selected.
  - **Previous Button:** (Optional/Edge Case) Allows revisiting questions. If revisiting, the previously selected answer must be pre-filled.
- **Immediate Feedback:**
  - Upon selecting a radio button, the UI must immediately indicate success (Green border/icon) or failure (Red border/icon) along with the correct answer if they were wrong.
- **Responsiveness:**
  - **Mobile:** Stacked layout, large touch targets (44px+) for radio buttons.
  - **Desktop:** Centered card layout.
- **Accessibility (A11y):**
  - Use `<fieldset>` for question grouping.
  - Full keyboard navigation (Tab to options, Space to select, Enter to submit).

## 5. Backend Specifications (Express API)

### 5.1. Data Model (JSON Structure)

Since no DB is allowed, use a structure like this in memory:

```json
{
  "courses": [
    {
      "id": "course_101",
      "title": "Frontend Basics",
      "lessons": [
        {
          "id": "lesson_1",
          "title": "HTML Semantics",
          "questions": [
             { "id": 1, "text": "...", "options": [...], "correctAnswer": "..." }
          ]
        }
      ]
    }
  ],
  "progress": {
    "user_123": ["lesson_1", "lesson_5"]
  }
}
```

### 5.2. API Endpoints

1. **Create Course**
   - **Method:** `POST /courses`
   - **Body:** `{ id, title, lessons: [...] }`
   - **Action:** Validates input and pushes to the courses array.

2. **Get Course Details**
   - **Method:** `GET /courses/:id`
   - **Action:** Searches array by ID. Returns the course object.
   - **Error:** Returns 404 if course not found.

3. **Update User Progress**
   - **Method:** `POST /courses/:id/progress`
   - **Body:** `{ userId: "user_123", lessonId: "lesson_1" }`
   - **Action:** Adds `lessonId` to the user's progress array in memory.

4. **Get User Progress**
    - **Method:** `GET /courses/:id/progress/:userId`
    - **Action:** Returns an object, e.g., `{ completedLessons: ["lesson_1"] }`.

### 5.3. Middleware

- **Auth Middleware:**
  - Inspect request headers for `x-api-key`.
  - If missing or invalid (e.g., does not match `secret123`), return 401 Unauthorized.

## 6. Implementation Roadmap (24-Hour Sprint)

### Phase 1: Backend Setup (Estimated: 2 Hours)

- Initialize `npm init -y` inside a `/server` folder.
- Install `express`, `cors`, `body-parser`.
- Create `server.js` and mock data file.
- Implement the 4 endpoints and Auth middleware.
- **Deliverable:** Working API accessible via Postman/Curl.

### Phase 2: Frontend Logic (Estimated: 3-4 Hours)

- Initialize `npx create-next-app@latest client`.
- Create the Quiz component logic (no styling yet).
- Implement `localStorage` hook to save/load index.
- Implement the "Immediate Feedback" logic (comparing selection vs. correct answer).

### Phase 3: UI & Polish (Estimated: 3 Hours)

- Style components using Tailwind.
- Add a progress bar.
- Ensure keyboard navigation works.
- Connect the Frontend to the Backend (replace mock data with fetch calls).

### Phase 4: Final Review

- **Edge Case Check:** What happens if I refresh on the last question?
- **Edge Case Check:** What happens if the API is down? (Show error state).

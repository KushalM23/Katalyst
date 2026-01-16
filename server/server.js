const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.API_KEY || 'secret123';

// Middleware - Updated CORS for production deployment
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://*.vercel.app',
        /\.vercel\.app$/
    ],
    credentials: true
}));
app.use(bodyParser.json());

// Basic Auth Middleware Simulation
const authMiddleware = (req, res, next) => {
    const headerKey = req.headers['x-api-key'];
    if (!headerKey || headerKey !== API_KEY) {
        return res.status(401).json({ error: 'Unauthorized: Invalid or missing API Key' });
    }
    next();
};

app.use(authMiddleware);

/**
 * In-memory Data Store
 * Fields: course ID, title, lessons array (with quiz questions), user progress
 */
const db = {
    courses: [
        {
            id: 'course_101',
            title: 'Frontend Basics',
            lessons: [
                {
                    id: 'lesson_1',
                    title: 'HTML & CSS Intro',
                    questions: [
                        { id: 1, text: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language', 'Hyper Tool Markup Language'], correctAnswer: 'Hyper Text Markup Language' },
                        { id: 2, text: 'Which HTML element is used for the largest heading?', options: ['<heading>', '<h1>', '<h6>', '<head>'], correctAnswer: '<h1>' },
                        { id: 3, text: 'What is the correct HTML for adding a background color?', options: ['<body bg="yellow">', '<body style="background-color:yellow;">', '<background>yellow</background>', '<body color="yellow">'], correctAnswer: '<body style="background-color:yellow;">' },
                        { id: 4, text: 'Which character is used to indicate an end tag?', options: ['<', '/', '*', '^'], correctAnswer: '/' },
                        { id: 5, text: 'How can you make a numbered list?', options: ['<ul>', '<list>', '<ol>', '<dl>'], correctAnswer: '<ol>' }
                    ]
                }
            ]
        },
        {
            id: 'course_102',
            title: 'Backend Basics',
            lessons: [
                {
                    id: 'lesson_2',
                    title: 'Node.js & Express',
                    questions: [
                        { id: 1, text: 'What is Node.js?', options: ['A JavaScript framework', 'A JavaScript runtime built on Chrome\'s V8 engine', 'A database', 'A text editor'], correctAnswer: 'A JavaScript runtime built on Chrome\'s V8 engine' },
                        { id: 2, text: 'Which module is used to create a web server in Node.js?', options: ['fs', 'http', 'url', 'path'], correctAnswer: 'http' },
                        { id: 3, text: 'How do you install Express.js?', options: ['npm install express', 'node install express', 'install express', 'npm express'], correctAnswer: 'npm install express' },
                        { id: 4, text: 'Which method is used to handle GET requests in Express?', options: ['app.fetch()', 'app.get()', 'app.post()', 'app.send()'], correctAnswer: 'app.get()' },
                        { id: 5, text: 'What is the default port for an Express app?', options: ['3000', '8080', '5000', 'It has no default port'], correctAnswer: 'It has no default port' }
                    ]
                }
            ]
        }
    ],
    userProgress: {
        // userId: { courseId: { completedLessons: [], quizScores: { lessonId: score } } }
    }
};

// --- Endpoints ---

/**
 * POST /courses
 * Create course with lessons/quizzes
 */
app.post('/courses', (req, res) => {
    const { id, title, lessons } = req.body;

    // Validation
    if (!id || typeof id !== 'string') return res.status(400).json({ error: 'Valid course ID is required' });
    if (!title || typeof title !== 'string') return res.status(400).json({ error: 'Valid course title is required' });
    if (!Array.isArray(lessons)) return res.status(400).json({ error: 'Lessons must be an array' });

    // Deep validation of lessons
    for (const lesson of lessons) {
        if (!lesson.id || !lesson.title || !Array.isArray(lesson.questions)) {
            return res.status(400).json({ error: `Invalid structure in lesson ${lesson.id || 'unknown'}` });
        }
        for (const q of lesson.questions) {
            if (!q.id || !q.text || !Array.isArray(q.options) || !q.correctAnswer) {
                return res.status(400).json({ error: `Invalid question structure in lesson ${lesson.id}` });
            }
        }
    }

    // Check for duplicates
    if (db.courses.find(c => c.id === id)) {
        return res.status(400).json({ error: 'Course ID already exists' });
    }

    const newCourse = { id, title, lessons };
    db.courses.push(newCourse);
    res.status(201).json(newCourse);
});

/**
 * GET /courses/:id
 * Fetch course details
 */
app.get('/courses/:id', (req, res) => {
    const course = db.courses.find(c => c.id === req.params.id);
    if (!course) {
        return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
});

/**
 * POST /courses/:id/progress
 * Update user progress (userId, lessonId)
 * Requirements: Return scores for quizzes in progress.
 */
app.post('/courses/:id/progress', (req, res) => {
    const courseId = req.params.id;
    const { userId, lessonId, score, completed } = req.body;

    // Validation
    if (!userId) return res.status(400).json({ error: 'userId is required' });
    if (!lessonId) return res.status(400).json({ error: 'lessonId is required' });

    const course = db.courses.find(c => c.id === courseId);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    // Initialize user progress if not exists
    if (!db.userProgress[userId]) db.userProgress[userId] = {};
    if (!db.userProgress[userId][courseId]) {
        db.userProgress[userId][courseId] = {
            completedLessons: [],
            quizScores: {}
        };
    }

    const progress = db.userProgress[userId][courseId];

    // Update Score
    if (score !== undefined) {
        progress.quizScores[lessonId] = score;
    }

    // Update Completion
    if (completed && !progress.completedLessons.includes(lessonId)) {
        progress.completedLessons.push(lessonId);
    }

    res.json({
        message: 'Progress updated successfully',
        currentProgress: progress
    });
});

/**
 * GET /courses/:id/progress/:userId
 * Get user progress report
 */
app.get('/courses/:id/progress/:userId', (req, res) => {
    const { id: courseId, userId } = req.params;

    const userCourseProgress = db.userProgress[userId]?.[courseId];
    if (!userCourseProgress) {
        return res.json({
            completedLessons: [],
            quizScores: {},
            message: 'No progress recorded for this user and course'
        });
    }

    res.json(userCourseProgress);
});

// Start Server
app.listen(PORT, () => {
    console.log(`[KATALYST BACKEND] Running on http://localhost:${PORT}`);
});

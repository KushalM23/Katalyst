"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';
import ScoreSummary from './ScoreSummary';

interface Question {
    id: number;
    text: string;
    options: string[];
    correctAnswer: string;
}

interface Lesson {
    id: string;
    title: string;
    questions: Question[];
}

interface Course {
    id: string;
    title: string;
    lessons: Lesson[];
}

export default function QuizContainer({ course }: { course: Course }) {
    const allQuestions = course.lessons.flatMap(l => l.questions);
    const totalQuestions = allQuestions.length;

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [isFinished, setIsFinished] = useState(false);
    const [score, setScore] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false); // To prevent hydration mismatch or overwrite

    useEffect(() => {
        const fetchProgress = async () => {
            const userId = "user_123";
            const saved = localStorage.getItem(`quiz_progress_${course.id}`);
            
            // Try hydrating from localStorage first
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    setCurrentQuestionIndex(parsed.currentQuestionIndex || 0);
                    setAnswers(parsed.answers || {});
                    setScore(parsed.score || 0);
                    setIsLoaded(true);
                    return;
                } catch (e) {
                    console.error("Failed to parse saved progress", e);
                }
            }

            // If no local storage, try fetching from backend
            try {
                const res = await fetch(`http://localhost:5000/courses/${course.id}/progress/${userId}`, {
                    headers: { 'x-api-key': 'secret123' }
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.quizScores && Object.keys(data.quizScores).length > 0) {
                        // This is a simple hydration logic - usually you'd store individual answers on backend too
                        // but since the backend only stores scores, we mainly rely on localStorage for exact answers.
                        // For this MVP, if localStorage is empty, we start fresh.
                    }
                }
            } catch (e) {
                console.error("Sync fetch failed", e);
            }
            setIsLoaded(true);
        };

        fetchProgress();
    }, [course.id]);

    useEffect(() => {
        if (!isLoaded) return;
        const state = { currentQuestionIndex, answers, score };
        localStorage.setItem(`quiz_progress_${course.id}`, JSON.stringify(state));
    }, [currentQuestionIndex, answers, score, course.id, isLoaded]);

    const handleSelect = (answer: string) => {
        const currentQ = allQuestions[currentQuestionIndex];
        if (answers[currentQ.id]) return;

        const isCorrect = answer === currentQ.correctAnswer;
        const newScore = isCorrect ? score + 1 : score;
        
        setAnswers(prev => ({ ...prev, [currentQ.id]: answer }));
        setScore(newScore);
    };

    const handleNext = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            saveProgressToServer(false);
        } else {
            setIsFinished(true);
            saveProgressToServer(true);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleReset = () => {
        setCurrentQuestionIndex(0);
        setAnswers({});
        setScore(0);
        setIsFinished(false);
        localStorage.removeItem(`quiz_progress_${course.id}`);
    };
    
    const saveProgressToServer = async (isCompleted: boolean = false) => {
         const userId = "user_123";
         for (const lesson of course.lessons) {
             try {
                await fetch(`http://localhost:5000/courses/${course.id}/progress`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': 'secret123'
                    },
                    body: JSON.stringify({ 
                        userId, 
                        lessonId: lesson.id,
                        score: score,
                        completed: isCompleted
                    })
                });
             } catch (e) {
                 console.error("Failed to sync progress", e);
             }
         }
    };

    if (!isLoaded) return <div className="p-4 text-center">Loading progress...</div>;

    if (isFinished) {
        return <ScoreSummary score={score} total={totalQuestions} onReset={handleReset} />;
    }

    const currentQuestion = allQuestions[currentQuestionIndex];
    if (!currentQuestion) return <div className="p-4 text-center">No questions found.</div>;

    const currentAnswer = answers[currentQuestion.id];
    const isAnswered = !!currentAnswer;

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 mt-10">
            {/* Header with Exit Button */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                <div>
                     <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">Katalyst Learning</span>
                     <h1 className="text-2xl font-bold text-gray-900 mt-2">{course.title}</h1>
                </div>
                <Link href="/" className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors" title="Exit Quiz">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </Link>
            </div>

            <ProgressBar current={currentQuestionIndex} total={totalQuestions} />
            
            <QuestionCard 
                question={currentQuestion}
                selectedAnswer={currentAnswer || null}
                onSelect={handleSelect}
                isSubmitted={isAnswered}
            />

            <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-50">
                <button 
                    onClick={handlePrevious} 
                    disabled={currentQuestionIndex === 0}
                    className="flex items-center px-6 py-3 text-gray-600 font-semibold rounded-xl hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    Previous
                </button>
                
                <button 
                    onClick={handleNext} 
                    disabled={!isAnswered}
                    className={`flex items-center px-8 py-3.5 rounded-xl font-bold shadow-lg transition-all transform hover:-translate-y-0.5 ${
                        !isAnswered 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
                        : 'bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300'
                    }`}
                >
                    {currentQuestionIndex === totalQuestions - 1 ? 'Finish Quiz' : 'Next Question'}
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
            </div>
        </div>
    );

}


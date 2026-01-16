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
                    setIsFinished(parsed.isFinished || false);
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
        const state = { currentQuestionIndex, answers, score, isFinished };
        localStorage.setItem(`quiz_progress_${course.id}`, JSON.stringify(state));
    }, [currentQuestionIndex, answers, score, isFinished, course.id, isLoaded]); // Added isFinished to dependencies and saved object

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
    
    // Auto-scroll to top when question changes or quiz finishes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentQuestionIndex, isFinished]);

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
    if (!currentQuestion) return <div className="p-12 text-center font-mono text-red-500 animate-pulse">Error: No questions found in sequence.</div>;

    const currentAnswer = answers[currentQuestion.id];
    const isAnswered = !!currentAnswer;

    return (
        <div className="w-full max-w-4xl mx-auto mt-2 md:mt-10 px-2 md:px-0">
            {/* Header / Meta */}
            <div className="flex items-center justify-between mb-4 md:mb-6 px-2 md:px-4">
                <div className="flex items-center gap-3">
                     <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></span>
                     <div className="flex flex-col">
                        <span className="text-[10px]  text-green-600 uppercase tracking-[0.2em]">Quiz in Progress</span>
                        <h1 className="text-xl  text-green-100 font-sans tracking-wide">{course.title}</h1>
                     </div>
                </div>
                <Link href="/" className="group flex items-center gap-2 px-4 py-2 border border-neutral-800 rounded-full hover:border-red-900 hover:bg-red-950/20 transition-all" title="Exit Quiz">
                    <span className="text-xs font-mono  text-neutral-500 group-hover:text-red-500 uppercase tracking-widest">Exit</span>
                    <svg className="w-4 h-4 text-neutral-600 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </Link>
            </div>

            {/* Main Interface */}
            <div className="relative bg-black/40 backdrop-blur-xl border border-neutral-800 p-3 md:p-10 shadow-2xl overflow-hidden group-hover:border-green-900 transition-colors duration-500 rounded-lg md:rounded-none">
                {/* Visual Effects */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-900/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-900/10 rounded-full blur-[80px] pointer-events-none mix-blend-screen"></div>

                <div className="relative z-10 space-y-8">
                    <ProgressBar current={currentQuestionIndex} total={totalQuestions} />
                    
                    <QuestionCard  
                        question={currentQuestion}
                        selectedAnswer={currentAnswer || null}
                        onSelect={handleSelect}
                        isSubmitted={isAnswered}
                    />

                    <div className="flex justify-between items-center pt-8 border-t border-neutral-800/50">
                        <button 
                            onClick={handlePrevious} 
                            disabled={currentQuestionIndex === 0}
                            className="flex items-center px-4 py-2 text-neutral-500 font-mono text-sm tracking-wider uppercase hover:text-green-400 disabled:opacity-30 disabled:hover:text-neutral-500 transition-all group"
                        >
                            <span className="mr-2 group-hover:-translate-x-1 transition-transform">{'<'}</span>
                            Previous
                        </button>
                        
                        <button 
                            onClick={handleNext} 
                            disabled={!isAnswered}
                            className={`relative px-8 py-3 overflow-hidden font-mono  uppercase tracking-widest text-sm transition-all
                                ${!isAnswered 
                                ? 'bg-neutral-900 text-neutral-600 cursor-not-allowed border border-neutral-800' 
                                : 'bg-green-700 text-black border border-green-500 hover:bg-green-500 shadow-[0_0_15px_rgba(21,128,61,0.4)] hover:shadow-[0_0_25px_rgba(34,197,94,0.6)]'
                                }
                            `}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {currentQuestionIndex === totalQuestions - 1 ? 'Finish' : 'Next'}
                                {currentQuestionIndex !== totalQuestions - 1 && <span>{'>'}</span>}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="mt-8 text-center opacity-30 hover:opacity-100 transition-opacity duration-500">
                 <p className="font-mono text-[10px] text-green-500/50 uppercase tracking-[0.3em]">
                    Progress Automatically Saved
                 </p>
            </div>
        </div>
    );

}


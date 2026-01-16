import React from 'react';

import Link from 'next/link';

interface ScoreSummaryProps {
    score: number;
    total: number;
    onReset: () => void;
}

export default function ScoreSummary({ score, total, onReset }: ScoreSummaryProps) {
    const percentage = Math.round((score / total) * 100);
    let message = "Good effort!";
    if (percentage === 100) message = "Perfect Score!";
    else if (percentage >= 80) message = "Excellent Work!";
    else if (percentage >= 50) message = "Not bad, keep learning!";

    return (
        <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-3xl shadow-xl border border-gray-100 text-center animate-in zoom-in-95 duration-500">
            <div className="mb-8">
                 <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 italic mb-2">Katalyst</h1>
                 <p className="text-gray-400 text-sm uppercase tracking-widest font-semibold">Course Completed</p>
            </div>
            
            <div className="relative w-40 h-40 mx-auto mb-8 flex items-center justify-center">
                {/* Simple Circular Progress using SVG */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#f3f4f6" strokeWidth="8" />
                    <circle 
                        cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" 
                        className="text-indigo-600 transition-all duration-1000 ease-out"
                        strokeDasharray="283"
                        strokeDashoffset={283 - (283 * percentage) / 100}
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-indigo-900">{score}</span>
                    <span className="text-gray-400 text-sm font-medium">of {total}</span>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">{message}</h2>
            <p className="text-gray-500 mb-8">Your progress has been saved to your profile.</p>

            <div className="space-y-3">
                <button 
                    onClick={onReset}
                    className="w-full px-6 py-3.5 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition-all transform hover:-translate-y-0.5"
                >
                    Retake Quiz
                </button>
                <Link href="/" className="block w-full px-6 py-3.5 bg-white text-gray-700 border-2 border-gray-100 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-200 transition-colors">
                    Back to Courses
                </Link>
            </div>
        </div>
    );
}

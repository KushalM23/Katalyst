import React from 'react';

interface ProgressBarProps {
    current: number;
    total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
    const progress = Math.min(100, ((current + 1) / total) * 100);
    return (
        <div className="w-full mb-8">
            <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-bold text-indigo-600 tracking-wide uppercase">Progress</span>
                <span className="text-xs font-medium text-gray-500">{current + 1} of {total} Questions</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
                <div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out shadow-md" 
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
}

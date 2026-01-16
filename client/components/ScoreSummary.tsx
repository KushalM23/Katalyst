import React from 'react';
import Link from 'next/link';

interface ScoreSummaryProps {
    score: number;
    total: number;
    onReset: () => void;
}

export default function ScoreSummary({ score, total, onReset }: ScoreSummaryProps) {
    const percentage = Math.round((score / total) * 100);
    const isPassed = percentage >= 60;
    
    // Circle math
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (circumference * percentage) / 100;

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] animate-in zoom-in-95 duration-500 w-full max-w-2xl mx-auto font-geistSans">
            {/* Main Card: Black background, sharp edges, green border */}
            <div className="relative w-full p-8 md:p-12 bg-black border border-green-900/30 shadow-[0_0_50px_rgba(34,197,94,0.05)] flex flex-col items-center text-center">
                
                {/* Result Circle: Sharp, tech-looking */}
                <div className="relative w-52 h-52 mb-8">
                     <svg className="w-full h-full transform -rotate-90">
                        {/* Track Background */}
                        <circle cx="104" cy="104" r={radius} fill="none" stroke="#1a1a1a" strokeWidth="6" />
                        
                        {/* Progress */}
                        <circle
                            cx="104"
                            cy="104"
                            r={radius}
                            fill="none"
                            stroke={isPassed ? "#22c55e" : "#dc2626"}
                            strokeWidth="6"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="square"
                            className="transition-all duration-1000 ease-out"
                        />
                    </svg>
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                        <span className={`text-5xl  tracking-tighter ${isPassed ? 'text-green-500' : 'text-red-500'} drop-shadow-md`}>
                            {percentage}%
                        </span>
                        <span className={`text-xs uppercase tracking-widest mt-2 ${isPassed ? 'text-green-600' : 'text-red-700'}`}>{isPassed ? 'Passed' : 'Failed'}</span>
                    </div>
                </div>

                <h2 className="text-3xl  mb-6 text-white uppercase tracking-widest">
                    {isPassed ? <span className="text-green-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]">Quiz Completed</span> : <span className="text-red-500">Quiz Failed</span>}
                </h2>
                
                <div className="text-neutral-400 mb-12 max-w-md text-sm leading-relaxed border-l-2 border-green-900/30 pl-6 py-2 text-left">
                     <p>{isPassed 
                        ? "Excellent work. You have demonstrated a strong understanding of the material." 
                        : "You did not meet the passing requirements. Please review the material and try again."}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
                    {/* Retry Button */}
                    <button
                        onClick={onReset}
                        className="group w-full py-4 bg-green-600 hover:bg-green-500 text-black transition-all duration-300"
                    >
                         <span className="flex items-center justify-center gap-2  tracking-widest uppercase text-xs">
                            [ Retry Quiz ]
                         </span>
                    </button>
                    
                    {/* Return Button */}
                    <Link
                        href="/"
                        className="w-full py-4 text-center border border-neutral-800 hover:border-green-800 text-neutral-500 hover:text-green-500 transition-all  tracking-widest uppercase text-xs flex items-center justify-center"
                    >
                        <span>// Return to Hub</span>
                    </Link>
                </div>

            </div>
        </div>
    );
}

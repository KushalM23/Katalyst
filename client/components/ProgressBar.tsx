import React from 'react';

interface ProgressBarProps {
    current: number;
    total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
    const progress = Math.min(100, ((current + 1) / total) * 100);
    return (
        <div className="w-full mb-8 relative">
            <div className="flex justify-between items-end mb-2 font-mono">
                <span className="text-xs  text-green-500 tracking-widest uppercase glow-text">Progress</span>
                <span className="text-xs  text-green-700">{current + 1} / {total}</span>
            </div>
            
            {/* Background Track */}
            <div className="w-full bg-black border border-green-900/50 rounded-none h-4 relative overflow-hidden">
                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(transparent 50%, rgba(34, 197, 94, 0.1) 50%)', backgroundSize: '100% 4px' }}></div>
                
                {/* Progress Fill */}
                <div 
                    className="bg-green-600 h-full transition-all duration-500 ease-out relative" 
                    style={{ width: `${progress}%`, boxShadow: '0 0 15px #22c55e' }}
                >
                    {/* Scanline Effect */}
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-green-400 to-transparent opacity-30 w-full animate-[shimmer_2s_infinite]"></div>
                </div>
            </div>
        </div>
    );
}

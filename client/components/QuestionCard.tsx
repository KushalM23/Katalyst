import React from 'react';

interface Question {
    id: number;
    text: string;
    options: string[];
    correctAnswer: string;
}

interface QuestionCardProps {
    question: Question;
    selectedAnswer: string | null;
    onSelect: (answer: string) => void;
    isSubmitted: boolean; 
}

export default function QuestionCard({ question, selectedAnswer, onSelect, isSubmitted }: QuestionCardProps) {
    const getOptionClass = (option: string) => {
        const base = "relative flex items-center p-3 md:p-5 border cursor-pointer transition-all duration-300 group outline-none font-mono text-sm md:text-base overflow-hidden";
        
        // Submitted State logic
        if (isSubmitted) {
            if (option === question.correctAnswer) {
                return `${base} border-green-500 bg-green-950/30 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]`; 
            }
            if (option === selectedAnswer && option !== question.correctAnswer) {
                return `${base} border-red-900 bg-red-950/20 text-red-500`;
            }
            return `${base} border-neutral-800 bg-black text-neutral-600 opacity-50 cursor-not-allowed`;
        }

        // Active/Selected State Logic
        if (selectedAnswer === option) {
            return `${base} border-green-500 bg-green-900/20 text-green-300 shadow-[0_0_10px_rgba(34,197,94,0.2)] translate-x-2`;
        }
        
        // Default Hover State
        return `${base} border-neutral-800 hover:border-green-700 hover:bg-neutral-900 hover:text-green-400 text-gray-400 hover:translate-x-1`;
    };

    const StatusMarker = ({ option }: { option: string }) => {
        if (!isSubmitted) {
            return (
                <div className={`w-6 h-6 mr-4 flex items-center justify-center border transition-all duration-300 ${selectedAnswer === option ? 'border-green-500 bg-green-500 text-black rotate-90' : 'border-neutral-700 group-hover:border-green-600'}`}>
                    {selectedAnswer === option && <span className=" text-xs">?</span>}
                </div>
            );
        }

        if (option === question.correctAnswer) {
            return (
                <div className="w-6 h-6 mr-4 flex items-center justify-center border border-green-500 bg-green-500 text-black shadow-[0_0_10px_#22c55e]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
            );
        }
        if (option === selectedAnswer) {
             return (
                <div className="w-6 h-6 mr-4 flex items-center justify-center border border-red-800 bg-red-900/50 text-red-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                </div>
            );
        }
        return <div className="w-6 h-6 mr-4 border border-neutral-800 opacity-20" />;
    };

    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="mb-8 p-6 bg-neutral-900/50 border-l-4 border-green-600 backdrop-blur-md shadow-lg">
                 <h3 className="text-xl md:text-2xl  text-green-100 leading-snug tracking-wide font-sans">{question.text}</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.options.map((option, idx) => (
                    <div 
                        key={idx}
                        onClick={() => !isSubmitted && onSelect(option)}
                        className={getOptionClass(option)}
                        role="button"
                        tabIndex={isSubmitted ? -1 : 0}
                        onKeyDown={(e) => {
                            if (!isSubmitted && (e.key === 'Enter' || e.key === ' ')) {
                                e.preventDefault();
                                onSelect(option);
                            }
                        }}
                    >
                        <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-[10px] uppercase tracking-widest text-green-800 font-mono">Select</span>
                        </div>
                        
                        <StatusMarker option={option} />
                        <span className="font-medium text-sm md:text-lg tracking-wide break-words">{option}</span>
                    </div>
                ))}
            </div>

            {isSubmitted && (
                <div className={`mt-4 md:mt-8 p-3 md:p-6 border backdrop-blur-sm animate-in zoom-in-95 duration-300 ${
                    selectedAnswer === question.correctAnswer 
                    ? 'bg-green-950/30 border-green-500/50 text-green-400' 
                    : 'bg-red-950/20 border-red-900/50 text-red-400'
                }`}>
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                         <div className="text-xl md:text-3xl font-mono  opacity-50">
                            {selectedAnswer === question.correctAnswer ? 'CORRECT' : 'INCORRECT'}
                         </div>
                         <div className="h-full w-px bg-current opacity-20 hidden md:block"></div>
                         <div>
                             <p className="mb-0 md:mb-1 text-sm md:text-lg tracking-wider">
                                {selectedAnswer === question.correctAnswer ? 'That is the correct answer.' : 'That is incorrect.'}
                             </p>
                             {selectedAnswer !== question.correctAnswer && (
                                 <p className="font-mono text-xs md:text-sm mt-1 md:mt-2 opacity-80">&gt; Correct Answer: <span className="text-green-400 ">{question.correctAnswer}</span></p>
                             )}
                         </div>
                    </div>
                </div>
            )}
        </div>
    );
}

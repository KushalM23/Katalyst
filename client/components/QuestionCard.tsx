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
        const base = "relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 group outline-none";
        
        // Submitted State logic
        if (isSubmitted) {
            if (option === question.correctAnswer) {
                return `${base} border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm ring-1 ring-emerald-500`; 
            }
            if (option === selectedAnswer && option !== question.correctAnswer) {
                return `${base} border-rose-500 bg-rose-50 text-rose-900 shadow-sm`;
            }
            return `${base} border-gray-100 bg-gray-50 text-gray-400 opacity-60 cursor-not-allowed`;
        }

        // Active/Selected State Logic
        if (selectedAnswer === option) {
            return `${base} border-indigo-600 bg-indigo-50 text-indigo-900 shadow-md ring-1 ring-indigo-600 scale-[1.01]`;
        }
        
        // Default Hover State
        return `${base} border-gray-200 hover:border-indigo-300 hover:bg-white hover:shadow-md hover:scale-[1.01] bg-white text-gray-700`;
    };

    const StatusIcon = ({ option }: { option: string }) => {
        if (!isSubmitted) return <div className={`w-5 h-5 rounded-full border-2 mr-4 flex-shrink-0 transition-colors ${selectedAnswer === option ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300 group-hover:border-indigo-400'}`}>
            {selectedAnswer === option && <div className="w-2 h-2 bg-white rounded-full m-auto mt-1" />}
        </div>;

        if (option === question.correctAnswer) {
            return (
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
            );
        }
        if (option === selectedAnswer) {
             return (
                <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                </div>
            );
        }
        return <div className="w-5 h-5 rounded-full border-2 border-gray-200 mr-4 flex-shrink-0 opacity-50" />;
    };

    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl font-bold mb-8 text-gray-800 leading-snug">{question.text}</h3>
            
            <div className="space-y-3">
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
                        <StatusIcon option={option} />
                        <span className="font-medium text-lg">{option}</span>
                    </div>
                ))}
            </div>

            {isSubmitted && (
                <div className={`mt-6 p-4 rounded-xl text-sm font-medium animate-in zoom-in-95 duration-200 ${
                    selectedAnswer === question.correctAnswer 
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' 
                    : 'bg-rose-50 text-rose-800 border border-rose-100'
                }`}>
                    <div className="flex items-start gap-3">
                         <div className="mt-0.5">
                            {/* Icon placeholder or remove completely */}
                         </div>
                         <div>
                             <p className="font-bold mb-1">
                                {selectedAnswer === question.correctAnswer ? 'Excellent work!' : 'Not quite right.'}
                             </p>
                             {selectedAnswer !== question.correctAnswer && (
                                 <p>The correct answer is <span className="font-bold underline decoration-emerald-500/50 decoration-2 underline-offset-2">{question.correctAnswer}</span>.</p>
                             )}
                         </div>
                    </div>
                </div>
            )}
        </div>
    );
}

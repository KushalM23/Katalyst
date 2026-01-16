import QuizContainer from '@/components/QuizContainer';

async function getCourse(id: string) {
    const res = await fetch(`http://localhost:5000/courses/${id}`, {
        headers: {
            'x-api-key': 'secret123'
        },
        cache: 'no-store'
    });

    if (!res.ok) {
        throw new Error('Failed to fetch course');
    }

    return res.json();
}

type Props = {
    params: Promise<{ id: string }>
}

export default async function CoursePage({ params }: Props) {
    const { id } = await params;
    
    let course;
    try {
        course = await getCourse(id);
    } catch (error) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-black text-center">
                <div className="w-16 h-16 border border-red-900 bg-red-950/20 text-red-500 rounded-full flex items-center justify-center mb-6 animate-pulse">
                    !
                </div>
                <h1 className="text-3xl font-geistSans  text-red-500 mb-2 tracking-widest uppercase">Error</h1>
                <p className="text-neutral-500 font-geistSans text-sm max-w-md mb-8">
                    Could not load the course. The server may be unreachable or the course ID is invalid.
                </p>
                <div className="p-4 bg-neutral-900 border border-neutral-800 text-red-400 font-geistSans text-xs rounded-none w-full max-w-lg overflow-x-auto text-left">
                    <span className="text-neutral-600 mr-2">$</span>
                    {(error as Error).message}
                </div>
                <a href="/" className="mt-8 text-green-500 hover:text-green-400 font-geistSans text-xs uppercase tracking-widest hover:underline decoration-1 underline-offset-4">
                    Return to Hub
                </a>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-black relative flex flex-col pt-12 md:pt-24 pb-12 overflow-hidden">
            {/* Background elements moved to globals or layout, but local overrides here */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900/10 via-black to-black pointer-events-none"></div>
            
            <div className="relative z-10 w-full px-4">
               <QuizContainer course={course} />
            </div>
        </main>
    );
}

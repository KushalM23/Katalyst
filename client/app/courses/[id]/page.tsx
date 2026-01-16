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
            <div className="flex min-h-screen flex-col items-center justify-center p-24">
                <h1 className="text-2xl font-bold text-red-500">Error</h1>
                <p>Could not load course. Is the backend running?</p>
                <code className="mt-4 p-2 bg-gray-200 rounded">{(error as Error).message}</code>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 py-12">
            <QuizContainer course={course} />
        </main>
    );
}

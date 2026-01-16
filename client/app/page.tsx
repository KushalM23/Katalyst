import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <h1 className="text-5xl font-extrabold mb-4 text-center text-blue-600 italic">Katalyst</h1>
      <p className="text-xl text-gray-600 mb-8">Empowering Your Learning Journey</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <Link href="/courses/course_101" className="block">
          <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] border border-blue-100">
             <h2 className="text-2xl font-bold text-gray-800 mb-2">Frontend Basics</h2>
             <p className="text-gray-500 mb-4">Master HTML, CSS, and proper semantics.</p>
             <span className="text-blue-600 font-semibold flex items-center">Start Course &rarr;</span>
          </div>
        </Link>

        <Link href="/courses/course_102" className="block">
          <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] border border-blue-100">
             <h2 className="text-2xl font-bold text-gray-800 mb-2">Backend Basics</h2>
             <p className="text-gray-500 mb-4">A deep dive into Node.js and Express APIs.</p>
             <span className="text-blue-600 font-semibold flex items-center">Start Course &rarr;</span>
          </div>
        </Link>
      </div>
    </main>
  );
}

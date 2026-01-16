import Link from 'next/link';

export default function Home() {
  // Mock data for potential 4 courses to show 2x2 layout, currently displaying 2 real ones.
  // Ideally this would be dynamic.
  return (
    <main className="flex h-screen flex-col items-center justify-center p-4 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#15803d 1px, transparent 1px), linear-gradient(90deg, #15803d 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
      </div>

      <div className="z-10 text-center mb-8 shrink-0">
        <h1 className="text-5xl md:text-7xl font-black mb-2 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-green-400 to-green-800 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]">
          KATALYST
        </h1>
        <p className="text-sm md:text-xl text-green-600 font-geistSans tracking-widest border-t border-b border-green-900 py-1 inline-block">
          LEARNING SYSTEM
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl z-10 flex-1 max-h-[600px]">
        <Link href="/courses/course_101" className="group block h-full">
          <div className="relative h-full flex flex-col justify-between p-6 bg-neutral-900/80 backdrop-blur-sm rounded-xl border border-green-900 group-hover:border-green-500 transition-all duration-500 transform group-hover:scale-[1.02] group-hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
             
             <div>
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl  text-green-400 group-hover:text-green-300 transition-colors font-geistSans">
                    &lt;Frontend /&gt;
                    </h2>
                    <div className="text-green-800 group-hover:text-green-500 transition-colors duration-500">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                </div>
                
                <p className="text-green-700/80 group-hover:text-green-600 mb-4 font-geistSans text-xs md:text-sm leading-relaxed line-clamp-3">
                Master the fundamentals of HTML, CSS, and modern web design techniques.
                </p>
             </div>
             
             <div className="flex items-center text-green-500  group-hover:translate-x-2 transition-transform duration-300 uppercase tracking-wider text-xs">
                <span>Start Course</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
             </div>
          </div>
        </Link>

        <Link href="/courses/course_102" className="group block h-full">
          <div className="relative h-full flex flex-col justify-between p-6 bg-neutral-900/80 backdrop-blur-sm rounded-xl border border-green-900 group-hover:border-green-500 transition-all duration-500 transform group-hover:scale-[1.02] group-hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

             <div>
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl  text-green-400 group-hover:text-green-300 transition-colors font-geistSans">
                    {'{Backend}'}
                    </h2>
                    <div className="text-green-800 group-hover:text-green-500 transition-colors duration-500">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
                    </div>
                </div>
                
                <p className="text-green-700/80 group-hover:text-green-600 mb-4 font-geistSans text-xs md:text-sm leading-relaxed line-clamp-3">
                Understand server-side logic, databases, APIs, and building scalable applications.
                </p>
             </div>
             
             <div className="flex items-center text-green-500  group-hover:translate-x-2 transition-transform duration-300 uppercase tracking-wider text-xs">
                <span>Start Course</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
             </div>
          </div>
        </Link>
        
        {/* Placeholder cards to demonstrate 2x2 if user adds more courses, or distinct visual space */}
         <div className="hidden sm:block opacity-30 border border-green-900/50 rounded-xl p-6 flex flex-col items-center justify-center text-green-900/50">
             <span className="text-4xl mb-2">+</span>
             <span className="font-geistSans text-xs uppercase tracking-widest">Coming Soon</span>
         </div>
         <div className="hidden sm:block opacity-30 border border-green-900/50 rounded-xl p-6 flex flex-col items-center justify-center text-green-900/50">
             <span className="text-4xl mb-2">+</span>
             <span className="font-geistSans text-xs uppercase tracking-widest">Coming Soon</span>
         </div>

      </div>
    </main>
  );
}

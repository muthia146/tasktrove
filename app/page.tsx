import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fafbff] relative overflow-hidden font-sans">
      
      {/* 1. Animated & Dynamic Background Decorators */}
      {/* Dua lingkaran ini akan membesar-mengecil perlahan (breathe animation) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-100 rounded-full blur-[150px] opacity-50 animate-breathe delay-300"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-100 rounded-full blur-[150px] opacity-50 animate-breathe-reverse"></div>

      {/* Navbar Padat */}
      <nav className="relative z-20 flex justify-between items-center px-10 py-5 max-w-6xl mx-auto">
        <div className="text-2xl font-black text-indigo-600 tracking-tighter hover:scale-105 transition-transform">TaskTrove.</div>
        <div className="flex gap-6 items-center">
          <Link href="/login" className="text-sm font-bold text-gray-500 hover:text-indigo-600 transition">Masuk</Link>
          <Link href="/register" className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-md hover:bg-indigo-700 hover:-translate-y-0.5 transition-all">Daftar</Link>
        </div>
      </nav>

      {/* Hero Section - Jarak Lebih Rapat */}
      <main className="relative z-10 flex flex-col items-center justify-center pt-16 pb-24 px-6 text-center animate-fade-in-up">
        
        {/* 2. Interactive Badge with Hover Effect */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-5 group cursor-pointer hover:bg-white hover:border-indigo-200 transition-colors">
          <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse group-hover:animate-bounce"></span>
          <span className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.2em]">Productivity Simplified</span>
        </div>
        
        {/* 3. Text Gradient Animation */}
        <h1 className="text-4xl md:text-7xl font-black text-gray-900 leading-[1.2] md:leading-[1.1] mb-5 tracking-tighter">
          Kelola Tugas <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 animate-text-gradient">
            Tanpa Batas.
          </span>
        </h1>
        
        <p className="text-base md:text-lg text-gray-500 max-w-lg mb-10 leading-relaxed delay-100">
          Simpan, pantau, dan selesaikan semua daftar tugasmu dalam satu tempat yang minimalis dan terorganisir.
        </p>

        {/* 4. Magnetic-like Button Hover */}
        <Link href="/login" className="relative group overflow-hidden px-12 py-4 bg-gray-900 text-white rounded-2xl font-bold text-base shadow-2xl hover:scale-105 transition-all duration-300">
          <span className="relative z-10">Mulai Sekarang — Gratis</span>
          {/* Shine effect inside the button on hover */}
          <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></span>
        </Link>

        {/* Feature Cards - Lebih Padat & Berjejer Rapi (v2 with Staggered Fade-in) */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl w-full px-4">
          <FeatureCard 
            emoji="✨" 
            title="Clean Interface" 
            desc="Fokus sepenuhnya pada apa yang harus dikerjakan hari ini."
            delay="delay-200"
          />
          <FeatureCard 
            emoji="☁️" 
            title="Instant Sync" 
            desc="Akses data tugasmu dari perangkat apa pun secara real-time."
            delay="delay-300"
          />
          <FeatureCard 
            emoji="🎯" 
            title="Task Tracking" 
            desc="Pantau progres tugasmu hingga tuntas dengan mudah."
            delay="delay-400"
          />
        </div>
      </main>

      <footer className="relative z-10 py-8 text-center text-gray-400 text-xs border-t border-gray-50">
        TaskTrove Productivity App • 2026 • © Muthia Anggraeni Rukmawan
      </footer>
    </div>
  )
}

function FeatureCard({ emoji, title, desc, delay }: { emoji: string, title: string, desc: string, delay: string }) {
  return (
    <div className={`group p-8 bg-white rounded-[32px] border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-100/50 hover:-translate-y-3 hover:border-indigo-100 animate-fade-in-up ${delay}`}>
      
      <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center text-3xl mb-5 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
        {emoji}
      </div>
      <h3 className="text-xl font-extrabold text-gray-900 mb-2.5 text-left">{title}</h3>
      <p className="text-gray-500 text-left leading-relaxed text-[11px]">{desc}</p>
    </div>
  )
}
'use client';

import { useEffect, useState } from 'react';

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToContent = () => {
    const contentSection = document.getElementById('main-content');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    // In a real app, this would navigate to an about page
    window.location.href = '/about';
  };

  return (
    <section className="relative py-16 px-4 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating circles with traditional Chinese aesthetics */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-amber-300/20 to-red-300/20 rounded-full animate-float"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-gradient-to-br from-orange-300/20 to-amber-300/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-br from-red-300/20 to-orange-300/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-10 right-1/3 w-28 h-28 bg-gradient-to-br from-amber-300/20 to-yellow-300/20 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>

        {/* Traditional Chinese pattern elements */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-5 animate-spin" style={{ animationDuration: '60s' }}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-amber-600" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-red-600" />
            <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-orange-600" />
            <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-amber-600" />
          </svg>
        </div>

        {/* Traditional Chinese cloud patterns */}
        <div className="absolute top-16 left-1/4 opacity-10">
          <svg width="120" height="60" viewBox="0 0 120 60" className="text-amber-600">
            <path d="M20 40 Q30 20 50 40 Q70 20 90 40 Q100 30 110 40" fill="none" stroke="currentColor" strokeWidth="2"/>
            <path d="M15 45 Q25 25 45 45 Q65 25 85 45 Q95 35 105 45" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </div>

        <div className="absolute bottom-16 right-1/4 opacity-10 transform rotate-180">
          <svg width="120" height="60" viewBox="0 0 120 60" className="text-red-600">
            <path d="M20 40 Q30 20 50 40 Q70 20 90 40 Q100 30 110 40" fill="none" stroke="currentColor" strokeWidth="2"/>
            <path d="M15 45 Q25 25 45 45 Q65 25 85 45 Q95 35 105 45" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </div>

        {/* Zen circle (Enso) */}
        <div className="absolute top-1/3 right-1/4 w-24 h-24 opacity-10 animate-pulse">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M20 50 Q50 10 80 50 Q50 90 20 50" fill="none" stroke="currentColor" strokeWidth="3" className="text-amber-700" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Main Title */}
        <h1 className={`font-serif text-4xl md:text-6xl font-bold text-slate-800 dark:text-slate-100 mb-6 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="bg-gradient-to-r from-amber-600 via-red-600 to-orange-600 bg-clip-text text-transparent">
            ZeJun's Blogs
          </span>
        </h1>

        {/* Subtitle */}
        <p className={`font-sans text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
           在生活的缝隙中发现写什么，留下些什么
        </p>

        {/* Decorative Quote */}
        <div className={`relative mb-8 transition-all duration-1000 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <blockquote className="font-serif text-base md:text-lg text-amber-700 dark:text-amber-300 italic">
            &ldquo;博学之，审问之，慎思之，明辨之，笃行之&rdquo;
          </blockquote>
          <cite className="block mt-2 text-sm text-slate-500 dark:text-slate-400">
            —— 《礼记·中庸》
          </cite>
        </div>
      </div>
    </section>
  );
};

export default Hero;

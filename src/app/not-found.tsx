import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          {/* 404 Illustration */}
          <div className="relative mb-8">
            <div className="w-64 h-64 mx-auto relative">
              {/* Traditional Chinese 404 design */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-serif font-bold text-amber-600 dark:text-amber-400 mb-2">
                    404
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    页面未找到
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 left-4 w-8 h-8 opacity-20">
                <svg viewBox="0 0 100 100" className="w-full h-full text-amber-600">
                  <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </div>
              <div className="absolute bottom-4 right-4 w-6 h-6 opacity-20">
                <svg viewBox="0 0 100 100" className="w-full h-full text-red-600">
                  <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </div>
              <div className="absolute top-1/2 right-2 w-4 h-4 opacity-20">
                <svg viewBox="0 0 100 100" className="w-full h-full text-orange-600">
                  <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              迷失在数字的山水间
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
              您寻找的页面似乎已经消失在虚无缥缈的网络空间中。
              就像古人所说：&ldquo;山重水复疑无路，柳暗花明又一村。&rdquo;
            </p>
            
            {/* Traditional Quote */}
            <blockquote className="font-serif text-base md:text-lg text-amber-700 dark:text-amber-300 italic mb-6">
              &ldquo;道可道，非常道；名可名，非常名。&rdquo;
              <cite className="block mt-2 text-sm text-slate-500 dark:text-slate-400 not-italic">
                —— 《道德经》
              </cite>
            </blockquote>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link
              href="/"
              className="px-8 py-3 bg-gradient-to-r from-amber-600 to-red-600 text-white font-medium rounded-full hover:from-amber-700 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              返回首页
            </Link>
            <Link
              href="/about"
              className="px-8 py-3 border-2 border-amber-600 text-amber-600 dark:text-amber-400 dark:border-amber-400 font-medium rounded-full hover:bg-amber-600 hover:text-white dark:hover:bg-amber-400 dark:hover:text-slate-900 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              了解更多
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 border border-amber-200/50 dark:border-slate-600/50 max-w-md mx-auto">
            <h3 className="font-serif text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
              或许您在寻找
            </h3>
            <div className="space-y-2">
              <Link
                href="/category/tech"
                className="block px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-700 hover:text-amber-600 dark:hover:text-amber-400 rounded-lg transition-colors"
              >
                技术文章
              </Link>
              <Link
                href="/category/culture"
                className="block px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-700 hover:text-amber-600 dark:hover:text-amber-400 rounded-lg transition-colors"
              >
                文化思考
              </Link>
              <Link
                href="/category/thoughts"
                className="block px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-700 hover:text-amber-600 dark:hover:text-amber-400 rounded-lg transition-colors"
              >
                随想感悟
              </Link>
              <Link
                href="/category/life"
                className="block px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-700 hover:text-amber-600 dark:hover:text-amber-400 rounded-lg transition-colors"
              >
                生活美学
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

let dropdownTimeout: NodeJS.Timeout | null = null;

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const categories = [
    { name: '技术', href: '/category/tech' },
    { name: '文化', href: '/category/culture' },
    { name: '思考', href: '/category/thoughts' },
    { name: '生活', href: '/category/life' },
  ];

  useEffect(() => {
    setMounted(true);
    // 检查当前 HTML 元素是否已经有 dark 类
    const isDarkModeActive = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDarkModeActive);

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout);
      }
    };
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const isActiveLink = (href: string) => {
    return pathname === href;
  };

  const handleDropdownEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      dropdownTimeout = null;
    }
    setIsDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 150); // 150ms delay
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-amber-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">Jun</span>
            </div>
            <span className="font-serif text-xl font-semibold text-slate-800 dark:text-slate-200">
              ZeJun's Blogs
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`transition-colors ${
                isActiveLink('/')
                  ? 'text-amber-600 dark:text-amber-400 font-medium'
                  : 'text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400'
              }`}
            >
              首页
            </Link>

            {/* Categories Dropdown */}
            <div
              className="relative dropdown-container"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                className="text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                分类
                <svg className={`ml-1 w-4 h-4 transform transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-lg shadow-lg border border-amber-200 dark:border-slate-600 z-50 animate-fadeInUp">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className={`block px-4 py-2 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        isActiveLink(category.href)
                          ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-700 hover:text-amber-600 dark:hover:text-amber-400'
                      }`}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              className={`transition-colors ${
                isActiveLink('/about')
                  ? 'text-amber-600 dark:text-amber-400 font-medium'
                  : 'text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400'
              }`}
            >
              关于
            </Link>

            {/* Search Button */}
            <Link
              href="/search"
              className={`p-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${isActiveLink('/search')
                ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-amber-100 dark:hover:bg-slate-600 hover:text-amber-600 dark:hover:text-amber-400'
                }`}
              aria-label="搜索文章"
              title="搜索文章"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>

            {/* Dark Mode Toggle */}
            {mounted && (
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-amber-100 dark:bg-slate-700 text-amber-600 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-slate-600 transition-all duration-300 transform hover:scale-105"
                aria-label={isDarkMode ? '切换到浅色模式' : '切换到深色模式'}
              >
                <div className="relative w-5 h-5">
                  <svg
                    className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${isDarkMode ? 'opacity-100 rotate-0' : 'opacity-0 rotate-180'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <svg
                    className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${isDarkMode ? 'opacity-0 -rotate-180' : 'opacity-100 rotate-0'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </div>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-amber-100 dark:hover:bg-slate-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="py-4 border-t border-amber-200 dark:border-slate-700">
            <div className="flex flex-col space-y-2">
              <Link
                href="/"
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isActiveLink('/')
                    ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 font-medium'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                首页
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isActiveLink(category.href)
                      ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 font-medium'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
              <Link
                href="/about"
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isActiveLink('/about')
                    ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 font-medium'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                关于
              </Link>
              <Link
                href="/search"
                className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${isActiveLink('/search')
                    ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 font-medium'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-700'
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>搜索</span>
              </Link>
              {mounted && (
                <button
                  onClick={toggleDarkMode}
                  className="mx-4 mt-2 p-3 rounded-lg bg-amber-100 dark:bg-slate-700 text-amber-600 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-slate-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <div className="relative w-5 h-5">
                    <svg
                      className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${isDarkMode ? 'opacity-100 rotate-0' : 'opacity-0 rotate-180'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <svg
                      className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${isDarkMode ? 'opacity-0 -rotate-180' : 'opacity-100 rotate-0'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  </div>
                  <span>{isDarkMode ? '切换到浅色模式' : '切换到深色模式'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

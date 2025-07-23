'use client';

import { useState, useEffect } from 'react';

export default function TestDarkPage() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 检查当前是否为深色模式
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-white dark:bg-slate-900 text-black dark:text-white transition-colors">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">深色模式测试页面</h1>
        
        <div className="mb-8">
          <button
            onClick={toggleDarkMode}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            {isDark ? '切换到浅色模式' : '切换到深色模式'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-gray-100 dark:bg-slate-800 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">当前状态</h2>
            <p>模式: {isDark ? '深色模式' : '浅色模式'}</p>
            <p>HTML 类: {isDark ? 'dark' : 'light'}</p>
          </div>

          <div className="p-6 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-amber-800 dark:text-amber-200">
              颜色测试
            </h2>
            <p className="text-amber-700 dark:text-amber-300">
              这是一个颜色测试区域，用于验证深色模式下的颜色变化。
            </p>
          </div>

          <div className="p-6 border border-gray-300 dark:border-slate-600 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">边框测试</h2>
            <p>这个区域有边框，用于测试边框颜色在深色模式下的变化。</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">渐变测试</h2>
            <p>这是一个渐变背景测试区域。</p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">调试信息</h2>
          <div className="space-y-2 text-sm font-mono">
            <p>document.documentElement.classList: {mounted ? Array.from(document.documentElement.classList).join(', ') : 'Loading...'}</p>
            <p>localStorage.theme: {mounted ? localStorage.getItem('theme') || 'null' : 'Loading...'}</p>
            <p>prefers-color-scheme: {mounted ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : 'Loading...'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

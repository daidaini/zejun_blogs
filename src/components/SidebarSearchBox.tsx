'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SidebarSearchBoxProps {
  className?: string;
}

const SidebarSearchBox = ({ className = '' }: SidebarSearchBoxProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <div className={`bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 border border-amber-200/50 dark:border-slate-600/50 hover:border-amber-300 dark:hover:border-amber-600 transition-all duration-300 hover:shadow-lg ${className}`}>
      <h3 className="font-serif text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        搜索
      </h3>
      
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="搜索文章..."
          className="w-full px-4 py-2 pl-10 pr-10 bg-amber-50 dark:bg-slate-700 border border-amber-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-800 dark:text-slate-200 placeholder-slate-500 dark:placeholder-slate-400 transition-all duration-200"
        />
        
        {/* 搜索图标 */}
        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        
        {/* 搜索按钮 */}
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
          title="搜索"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>

        {/* 清除按钮 */}
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            title="清除"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </form>

      {/* 搜索提示 */}
      <div className="mt-3">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          按回车或点击箭头搜索
        </p>
      </div>
    </div>
  );
};

export default SidebarSearchBox;

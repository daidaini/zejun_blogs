'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Sidebar from '@/components/Sidebar';
import SearchBox from '@/components/SearchBox';
import SearchResults from '@/components/SearchResults';
import { SearchResult } from '@/lib/search';

// 简化的文章类型，用于客户端
interface Article {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt?: string;
  readTime?: string;
  author?: string;
  content: string;
  isMarkdown: boolean;
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);

  // 初始化文章数据
  useEffect(() => {
    const loadArticles = async () => {
      try {
        const response = await fetch('/api/articles');
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const allArticles = await response.json();
        setArticles(allArticles);
      } catch (error) {
        console.error('Failed to load articles:', error);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  // 处理URL参数中的查询
  useEffect(() => {
    const urlQuery = searchParams.get('q');
    if (urlQuery && urlQuery !== query) {
      setQuery(urlQuery);
      performSearch(urlQuery);
    }
  }, [searchParams, articles, query]);

  // 执行搜索
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setSearching(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  // 处理搜索
  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    
    // 更新URL
    const url = new URL(window.location.href);
    url.searchParams.set('q', newQuery);
    window.history.pushState({}, '', url.toString());
    
    performSearch(newQuery);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <main className="flex-1">
              <div className="animate-pulse">
                <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-6"></div>
                <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded mb-8"></div>
                <div className="space-y-6">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="h-32 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  ))}
                </div>
              </div>
            </main>
            <aside className="lg:w-80">
              <div className="h-96 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
            </aside>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-1">
            {/* 页面标题 */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                搜索文章
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                在 {articles.length} 篇文章中搜索您感兴趣的内容
              </p>
            </div>

            {/* 搜索框 */}
            <div className="mb-8">
              <SearchBox
                articles={articles}
                placeholder="输入关键词搜索文章..."
                onSearch={handleSearch}
                className="max-w-2xl"
              />
            </div>

            {/* 搜索结果 */}
            <div>
              {query ? (
                <>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                      搜索结果: &ldquo;{query}&rdquo;
                    </h2>
                  </div>
                  <SearchResults
                    results={searchResults}
                    query={query}
                    loading={searching}
                  />
                </>
              ) : (
                <div className="text-center py-12">
                  <svg
                    className="w-16 h-16 text-slate-400 dark:text-slate-500 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    开始搜索
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400">
                    输入关键词来搜索相关文章
                  </p>
                </div>
              )}
            </div>
          </main>

          {/* 侧边栏 */}
          <aside className="lg:w-80">
            <Sidebar />
          </aside>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-6"></div>
            <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded mb-8"></div>
          </div>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}

'use client';

import Link from 'next/link';
import { SearchResult } from '@/lib/search';

interface SearchResultsProps {
  results: SearchResult[];
  query?: string;
  loading?: boolean;
}

const SearchResults = ({ results, loading = false }: SearchResultsProps) => {
  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full mb-1"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
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
          没有找到相关文章
        </h3>
        <p className="text-slate-500 dark:text-slate-400">
          尝试使用不同的关键词或检查拼写
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-sm text-slate-600 dark:text-slate-400 mb-6">
        找到 <span className="font-semibold text-amber-600 dark:text-amber-400">{results.length}</span> 篇相关文章
      </div>

      {results.map((result) => (
        <article
          key={result.article.slug}
          className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
        >
          {/* 文章标题 */}
          <h2 className="text-xl font-semibold mb-2">
            <Link
              href={`/article/${result.article.slug}`}
              className="text-slate-900 dark:text-slate-100 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              {result.highlights.title ? (
                <span dangerouslySetInnerHTML={{ __html: result.highlights.title }} />
              ) : (
                result.article.title
              )}
            </Link>
          </h2>

          {/* 文章元信息 */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-3">
            <span>{result.article.date}</span>
            <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-xs">
              {result.article.category}
            </span>
            {result.article.readTime && (
              <span>{result.article.readTime}</span>
            )}
            {result.article.author && (
              <span>作者: {result.article.author}</span>
            )}
          </div>

          {/* 匹配的字段标签 */}
          <div className="flex flex-wrap gap-2 mb-3">
            {result.matchedFields.map((field) => (
              <span
                key={field}
                className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded text-xs"
              >
                匹配: {getFieldDisplayName(field)}
              </span>
            ))}
          </div>

          {/* 文章摘要或内容片段 */}
          <div className="text-slate-700 dark:text-slate-300 leading-relaxed">
            {result.highlights.content ? (
              <p dangerouslySetInnerHTML={{ __html: result.highlights.content }} />
            ) : result.highlights.excerpt ? (
              <p dangerouslySetInnerHTML={{ __html: result.highlights.excerpt }} />
            ) : result.article.excerpt ? (
              <p>{result.article.excerpt}</p>
            ) : (
              <p>{result.article.content.substring(0, 200)}...</p>
            )}
          </div>

          {/* 标签 */}
          {result.article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {result.article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full text-xs hover:bg-amber-100 dark:hover:bg-amber-900/30 hover:text-amber-700 dark:hover:text-amber-300 transition-colors cursor-pointer"
                  onClick={() => {
                    // 可以添加标签搜索功能
                    window.location.href = `/search?q=${encodeURIComponent(tag)}`;
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* 相关性分数（开发模式下显示） */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-2 text-xs text-slate-400">
              相关性分数: {result.score.toFixed(2)}
            </div>
          )}
        </article>
      ))}
    </div>
  );
};

// 字段显示名称映射
function getFieldDisplayName(field: string): string {
  const fieldNames: Record<string, string> = {
    title: '标题',
    content: '内容',
    excerpt: '摘要',
    tags: '标签',
    category: '分类',
    author: '作者',
  };
  return fieldNames[field] || field;
}

export default SearchResults;

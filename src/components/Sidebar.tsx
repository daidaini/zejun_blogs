'use client';

import Link from 'next/link';
import Image from 'next/image';
// 移除服务器端导入，改为使用 props

interface RecentArticle {
  title: string;
  slug: string;
  date: string;
  image?: string;
}

interface Category {
  name: string;
  count: number;
  href: string;
}

interface Tag {
  name: string;
  count: number;
  href: string;
}

interface SidebarProps {
  recentArticles?: RecentArticle[];
  categories?: Category[];
  tags?: Tag[];
}

const Sidebar = ({ recentArticles, categories, tags }: SidebarProps = {}) => {
  // 使用默认数据作为后备
  const defaultRecentArticles: RecentArticle[] = [
    {
      title: "宋代文人的生活美学与现代设计思维",
      slug: "song-dynasty-aesthetics",
      date: "2024-01-15",
      image: "/images/articles/song-aesthetics.jpg"
    },
    {
      title: "禅意编程：在代码中寻找内心的宁静",
      slug: "zen-programming",
      date: "2024-01-10"
    },
    {
      title: "茶道精神在产品设计中的体现",
      slug: "tea-ceremony-design",
      date: "2024-01-05"
    }
  ];

  const defaultCategories: Category[] = [
    { name: "技术", count: 1, href: "/category/tech" },
    { name: "文化", count: 1, href: "/category/culture" },
    { name: "思考", count: 1, href: "/category/thoughts" }
  ];

  const defaultTags: Tag[] = [
    { name: "宋朝美学", count: 1, href: "/tag/宋朝美学" },
    { name: "禅意编程", count: 1, href: "/tag/禅意编程" },
    { name: "传统文化", count: 1, href: "/tag/传统文化" },
    { name: "产品设计", count: 1, href: "/tag/产品设计" }
  ];

  const finalRecentArticles = recentArticles || defaultRecentArticles;
  const finalCategories = categories || defaultCategories;
  const finalTags = tags || defaultTags;

  return (
    <aside className="space-y-8">
      {/* Search */}
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 border border-amber-200/50 dark:border-slate-600/50 hover:border-amber-300 dark:hover:border-amber-600 transition-all duration-300 hover:shadow-lg">
        <h3 className="font-serif text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          搜索
        </h3>
        <div className="relative">
          <input
            type="text"
            placeholder="搜索文章..."
            className="w-full px-4 py-2 pl-10 bg-amber-50 dark:bg-slate-700 border border-amber-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-800 dark:text-slate-200 placeholder-slate-500 dark:placeholder-slate-400 transition-all duration-200"
          />
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      {/* Recent Articles */}
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 border border-amber-200/50 dark:border-slate-600/50 hover:border-amber-300 dark:hover:border-amber-600 transition-all duration-300 hover:shadow-lg">
        <h3 className="font-serif text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center">
          <div className="w-5 h-5 mr-2 text-amber-600 relative">
            <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="absolute inset-0 bg-amber-600/20 rounded-full animate-ping"></div>
          </div>
          最新文章
        </h3>
        <div className="space-y-4">
          {finalRecentArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/article/${article.slug}`}
              className="group flex items-start space-x-3 hover:bg-amber-50 dark:hover:bg-slate-700/50 p-2 rounded-lg transition-colors"
            >
              {article.image ? (
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
                  {article.title}
                </h4>
                <time className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {article.date}
                </time>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 border border-amber-200/50 dark:border-slate-600/50 hover:border-amber-300 dark:hover:border-amber-600 transition-all duration-300 hover:shadow-lg">
        <h3 className="font-serif text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-amber-600 transform hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          分类
        </h3>
        <div className="space-y-2">
          {finalCategories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-amber-50 dark:hover:bg-slate-700/50 transition-colors group"
            >
              <span className="text-slate-700 dark:text-slate-300 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {category.name}
              </span>
              <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-2 py-1 rounded-full">
                {category.count}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 border border-amber-200/50 dark:border-slate-600/50 hover:border-amber-300 dark:hover:border-amber-600 transition-all duration-300 hover:shadow-lg">
        <h3 className="font-serif text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-amber-600 transform hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z" />
          </svg>
          标签
        </h3>
        <div className="flex flex-wrap gap-2">
          {finalTags.map((tag) => (
            <Link
              key={tag.name}
              href={tag.href}
              className="inline-flex items-center px-3 py-1 text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors"
            >
              {tag.name}
              <span className="ml-1 text-amber-600 dark:text-amber-400">
                {tag.count}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

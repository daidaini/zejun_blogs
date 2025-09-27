import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import { getAllArticles, getAllCategories, getAllTags } from '@/lib/articles-fs';

export default async function Home() {
  // 从文件系统获取所有文章
  const allArticles = await getAllArticles();
  const allCategories = await getAllCategories();
  const allTags = await getAllTags();

  // 获取推荐文章（前2篇）
  const featuredArticles = allArticles.slice(0, 2).map(article => ({
    ...article,
    featured: true
  }));

  // 获取最新文章（除了推荐文章之外的文章）
  const recentArticles = allArticles.slice(2);

  // 准备侧边栏数据
  const sidebarRecentArticles = allArticles.slice(0, 5).map(article => ({
    title: article.title,
    slug: article.slug,
    date: article.date,
    image: article.image
  }));

  const categoryNameMap: { [key: string]: string } = {
    '技术': 'tech',
    '文化': 'culture',
    '思考': 'thoughts',
    '生活': 'life'
  };

  const sidebarCategories = allCategories.map(category => ({
    name: category.name,
    count: category.count,
    href: `/category/${categoryNameMap[category.name] || category.name.toLowerCase()}`
  }));

  const sidebarTags = allTags.slice(0, 6).map(tag => ({
    name: tag.name,
    count: tag.count,
    href: `/tag/${encodeURIComponent(tag.name)}`
  }));

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />

      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Articles */}
            <section className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center">
                <span className="w-1 h-6 bg-gradient-to-b from-amber-600 to-red-600 mr-3 rounded-full"></span>
                推荐文章
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {featuredArticles.map((article) => (
                  <ArticleCard key={article.slug} {...article} />
                ))}
              </div>
            </section>

            {/* Recent Articles */}
            <section>
              <h2 className="font-serif text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center">
                <span className="w-1 h-6 bg-gradient-to-b from-amber-600 to-red-600 mr-3 rounded-full"></span>
                最新文章
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recentArticles.map((article) => (
                  <ArticleCard key={article.slug} {...article} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar
              recentArticles={sidebarRecentArticles}
              categories={sidebarCategories}
              tags={sidebarTags}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-serif text-lg font-semibold text-white mb-4">ZeJun的博客</h3>
              <p className="text-sm leading-relaxed">
                记录生活，记录学习，记录进步。
              </p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-4">快速链接</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/about" className="hover:text-amber-400 transition-colors">关于我</a></li>
                <li><a href="/archive" className="hover:text-amber-400 transition-colors">文章归档</a></li>
                <li><a href="/contact" className="hover:text-amber-400 transition-colors">联系方式</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-4">关注我</h4>
              <div className="flex space-x-4">
                <a href="https://github.com/daidaini" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-400 transition-colors">
                  <span className="sr-only">GitHub</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2025 ZeJun的博客. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

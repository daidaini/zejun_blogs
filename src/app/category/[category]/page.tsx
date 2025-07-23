import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import { getArticlesByCategory, getAllCategories } from '@/lib/articles-server';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

// 分类名称映射
const categoryNameMap: { [key: string]: string } = {
  '技术': 'tech',
  '文化': 'culture',
  '思考': 'thoughts',
  '生活': 'life'
};

// 分类描述映射
const categoryDescriptions: { [key: string]: string } = {
  '技术': '探索技术与人文的交汇点，分享编程哲学和技术思考',
  '文化': '传承古韵，品味传统文化的深厚底蕴',
  '思考': '在思辨中成长，在反思中前行',
  '生活': '品味生活的美好，寻找日常中的诗意'
};

// 根据URL参数获取分类数据
const getCategoryData = (categoryParam: string) => {
  // 将URL参数转换为中文分类名
  const categoryName = Object.keys(categoryNameMap).find(
    key => categoryNameMap[key] === categoryParam
  ) || categoryParam;

  const articles = getArticlesByCategory(categoryName);

  if (articles.length === 0 && !categoryDescriptions[categoryName]) {
    return null;
  }

  return {
    name: categoryName,
    description: categoryDescriptions[categoryName] || `${categoryName}相关文章`,
    articles
  };
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryData = getCategoryData(category);

  if (!categoryData) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Category Header */}
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            {categoryData.name}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            {categoryData.description}
          </p>
          <div className="mt-6 flex items-center justify-center">
            <span className="px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-sm font-medium">
              {categoryData.articles.length} 篇文章
            </span>
          </div>
        </div>
      </section>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Articles */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categoryData.articles.map((article) => (
                <ArticleCard key={article.slug} {...article} />
              ))}
            </div>
            
            {/* Empty state if no articles */}
            {categoryData.articles.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-2">暂无文章</h3>
                <p className="text-slate-600 dark:text-slate-400">这个分类下还没有文章，敬请期待。</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </main>
    </div>
  );
}

// Generate static params for all categories
export function generateStaticParams() {
  const categories = getAllCategories();
  const categoryNameMap: { [key: string]: string } = {
    '技术': 'tech',
    '文化': 'culture',
    '思考': 'thoughts',
    '生活': 'life'
  };

  return categories.map((category) => ({
    category: categoryNameMap[category.name] || category.name.toLowerCase(),
  }));
}

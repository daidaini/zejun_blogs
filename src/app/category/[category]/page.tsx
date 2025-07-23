import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

// Mock data for categories and articles
const getCategoryData = (category: string) => {
  const categories = {
    tech: {
      name: '技术',
      description: '探索技术与人文的交汇点，分享编程哲学和技术思考',
      articles: [
        {
          title: "禅意编程：在代码中寻找内心的宁静",
          excerpt: "编程不仅是技术活动，更是一种修行。通过禅意的编程方式，我们可以在代码中找到内心的平静，写出更优雅、更有生命力的程序。",
          category: "技术",
          date: "2024-01-10",
          readTime: "5 分钟",
          slug: "zen-programming"
        },
        {
          title: "函数式编程中的道家思想",
          excerpt: "函数式编程强调无副作用和不可变性，这与道家的无为而治思想不谋而合。探讨如何将古代哲学智慧应用到现代编程实践中。",
          category: "技术",
          date: "2024-01-08",
          readTime: "7 分钟",
          slug: "functional-programming-taoism"
        },
        {
          title: "代码重构的艺术：从混沌到秩序",
          excerpt: "重构代码如同整理思绪，需要耐心和智慧。学习如何通过系统性的方法，将混乱的代码转化为清晰、优雅的艺术品。",
          category: "技术",
          date: "2024-01-05",
          readTime: "6 分钟",
          slug: "code-refactoring-art"
        }
      ]
    },
    culture: {
      name: '文化',
      description: '传承古韵，品味传统文化的深厚底蕴',
      articles: [
        {
          title: "宋代文人的生活美学与现代设计思维",
          excerpt: "探索宋朝文人如何将生活艺术化，以及这种美学理念如何启发现代设计思维。从苏轼的诗词到朱熹的理学，从园林设计到器物制作。",
          category: "文化",
          date: "2024-01-15",
          readTime: "8 分钟",
          image: "/images/articles/song-aesthetics.jpg",
          slug: "song-dynasty-aesthetics",
          featured: true
        },
        {
          title: "传统书法与现代字体设计的对话",
          excerpt: "从王羲之的行书到现代的字体设计，汉字的美学传承从未断绝。探讨传统书法如何为现代字体设计提供灵感和指导。",
          category: "文化",
          date: "2024-01-08",
          readTime: "7 分钟",
          slug: "calligraphy-typography"
        }
      ]
    },
    thoughts: {
      name: '思考',
      description: '在思辨中成长，在反思中前行',
      articles: [
        {
          title: "从《清明上河图》看古代城市规划智慧",
          excerpt: "张择端的《清明上河图》不仅是艺术杰作，更是古代城市规划的智慧结晶。通过分析画中的街道布局、商业分布和人流动线。",
          category: "思考",
          date: "2024-01-12",
          readTime: "6 分钟",
          image: "/images/articles/qingming.jpg",
          slug: "qingming-urban-planning"
        },
        {
          title: "茶道精神在产品设计中的体现",
          excerpt: "茶道讲究的是一期一会，每一次品茶都是独特的体验。这种精神如何应用到产品设计中，创造出更有温度的用户体验？",
          category: "思考",
          date: "2024-01-05",
          readTime: "4 分钟",
          slug: "tea-ceremony-design"
        }
      ]
    },
    life: {
      name: '生活',
      description: '品味生活的美好，寻找日常中的诗意',
      articles: [
        {
          title: "极简主义的东方智慧",
          excerpt: "极简主义并非西方专利，东方文化中的留白美学、禅宗思想都蕴含着极简的智慧。探索东方极简主义的独特魅力。",
          category: "生活",
          date: "2024-01-03",
          readTime: "6 分钟",
          slug: "eastern-minimalism"
        },
        {
          title: "慢生活的艺术：在快节奏中寻找宁静",
          excerpt: "在这个快节奏的时代，如何保持内心的宁静？学习古人的智慧，在日常生活中实践慢生活的艺术。",
          category: "生活",
          date: "2024-01-01",
          readTime: "5 分钟",
          slug: "slow-living-art"
        }
      ]
    }
  };

  return categories[category as keyof typeof categories] || null;
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

// Generate static params for known categories
export function generateStaticParams() {
  return [
    { category: 'tech' },
    { category: 'culture' },
    { category: 'thoughts' },
    { category: 'life' },
  ];
}

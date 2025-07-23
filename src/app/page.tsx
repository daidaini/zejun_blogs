import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';

export default function Home() {
  // Mock data for articles - in a real app, this would come from a CMS or API
  const featuredArticles = [
    {
      title: "宋代文人的生活美学与现代设计思维",
      excerpt: "探索宋朝文人如何将生活艺术化，以及这种美学理念如何启发现代设计思维。从苏轼的诗词到朱熹的理学，从园林设计到器物制作，宋代美学的精髓在于追求简约而不简单的境界。",
      category: "文化",
      date: "2024-01-15",
      readTime: "8 分钟",
      image: "/images/articles/song-aesthetics.jpg",
      slug: "song-dynasty-aesthetics",
      featured: true
    },
    {
      title: "从《清明上河图》看古代城市规划智慧",
      excerpt: "张择端的《清明上河图》不仅是艺术杰作，更是古代城市规划的智慧结晶。通过分析画中的街道布局、商业分布和人流动线，我们可以学到许多现代城市设计的启示。",
      category: "思考",
      date: "2024-01-12",
      readTime: "6 分钟",
      image: "/images/articles/qingming.jpg",
      slug: "qingming-urban-planning"
    }
  ];

  const recentArticles = [
    {
      title: "禅意编程：在代码中寻找内心的宁静",
      excerpt: "编程不仅是技术活动，更是一种修行。通过禅意的编程方式，我们可以在代码中找到内心的平静，写出更优雅、更有生命力的程序。",
      category: "技术",
      date: "2024-01-10",
      readTime: "5 分钟",
      slug: "zen-programming"
    },
    {
      title: "传统书法与现代字体设计的对话",
      excerpt: "从王羲之的行书到现代的字体设计，汉字的美学传承从未断绝。探讨传统书法如何为现代字体设计提供灵感和指导。",
      category: "文化",
      date: "2024-01-08",
      readTime: "7 分钟",
      slug: "calligraphy-typography"
    },
    {
      title: "茶道精神在产品设计中的体现",
      excerpt: "茶道讲究的是一期一会，每一次品茶都是独特的体验。这种精神如何应用到产品设计中，创造出更有温度的用户体验？",
      category: "思考",
      date: "2024-01-05",
      readTime: "4 分钟",
      slug: "tea-ceremony-design"
    },
    {
      title: "极简主义的东方智慧",
      excerpt: "极简主义并非西方专利，东方文化中的留白美学、禅宗思想都蕴含着极简的智慧。探索东方极简主义的独特魅力。",
      category: "生活",
      date: "2024-01-03",
      readTime: "6 分钟",
      slug: "eastern-minimalism"
    }
  ];

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
            <Sidebar />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-serif text-lg font-semibold text-white mb-4">泽君的博客</h3>
              <p className="text-sm leading-relaxed">
                传承古韵，融汇今思。在传统与现代的交汇中寻找智慧的光芒。
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
                <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                  <span className="sr-only">GitHub</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                  <span className="sr-only">微博</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2024 泽君的博客. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

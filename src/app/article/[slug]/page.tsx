import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Sidebar from '@/components/Sidebar';
import MarkdownRenderer from '@/components/MarkdownRenderer';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

// Article interface
interface Article {
  title: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  image?: string;
  tags: string[];
  isMarkdown?: boolean;
}

// Mock article data - in a real app, this would come from a CMS or API
const getArticle = (slug: string): Article | null => {
  const articles = {
    'song-dynasty-aesthetics': {
      title: '宋代文人的生活美学与现代设计思维',
      content: `
        <h2>引言</h2>
        <p>宋代是中国文化史上的一个黄金时代，文人们不仅在诗词、书画方面达到了极高的成就，更在生活美学方面形成了独特的理念和实践。这种美学思想对现代设计思维具有深远的启发意义。</p>
        
        <h2>宋代文人的美学理念</h2>
        <p>宋代文人追求的是一种"雅"的生活方式，这种雅不是奢华，而是一种精神上的富足和审美上的纯净。苏轼曾说："宁可食无肉，不可居无竹。"这体现了宋代文人对精神品质的重视超过物质享受。</p>
        
        <blockquote>
          <p>"简约而不简单，这是宋代美学的精髓所在。"</p>
        </blockquote>
        
        <h2>现代设计的启示</h2>
        <p>宋代的美学理念对现代设计有着重要的启发：</p>
        <ul>
          <li><strong>留白的艺术</strong>：宋代绘画中的留白技法，启发了现代设计中的负空间运用</li>
          <li><strong>功能与美的统一</strong>：宋代器物既实用又美观，体现了设计的本质</li>
          <li><strong>自然与人文的和谐</strong>：宋代园林设计体现了人与自然的和谐共处</li>
        </ul>
        
        <h2>结语</h2>
        <p>宋代文人的生活美学不仅是历史的瑰宝，更是现代设计师可以汲取的智慧源泉。在快节奏的现代生活中，我们更需要这种内敛、优雅、有深度的美学追求。</p>
      `,
      category: '文化',
      date: '2024-01-15',
      readTime: '8 分钟',
      image: '/images/articles/song-aesthetics.jpg',
      tags: ['宋朝美学', '传统文化', '现代设计']
    },
    'qingming-urban-planning': {
      title: '从《清明上河图》看古代城市规划智慧',
      content: `
        <h2>《清明上河图》的城市学价值</h2>
        <p>张择端的《清明上河图》不仅是一幅艺术杰作，更是研究宋代城市规划的珍贵史料。画中详细描绘了北宋都城汴京的城市面貌，为我们了解古代城市规划提供了生动的视觉资料。</p>
        
        <h2>古代城市规划的智慧</h2>
        <p>通过分析《清明上河图》，我们可以发现古代城市规划的几个重要特点：</p>
        
        <h3>1. 水系与城市的有机结合</h3>
        <p>汴河作为城市的主要水道，不仅承担着交通运输的功能，还成为城市景观的重要组成部分。这种水城一体的规划理念，在现代城市设计中仍有重要价值。</p>
        
        <h3>2. 商业与居住的混合布局</h3>
        <p>画中可以看到商铺与住宅交错分布，形成了活力四射的城市空间。这种混合用地的模式，正是现代城市规划所倡导的。</p>
        
        <h3>3. 人性化的街道设计</h3>
        <p>街道宽窄适中，既能满足交通需求，又保持了人性化的尺度。街道两侧的建筑高低错落，形成了丰富的城市天际线。</p>
        
        <h2>对现代城市规划的启示</h2>
        <p>古代城市规划的智慧对现代城市建设具有重要的启发意义：</p>
        <ul>
          <li>重视自然环境与城市建设的协调</li>
          <li>提倡功能混合的城市布局</li>
          <li>注重人性化的空间尺度</li>
          <li>保持城市的文化特色和历史传承</li>
        </ul>
      `,
      category: '思考',
      date: '2024-01-12',
      readTime: '6 分钟',
      image: '/images/articles/qingming.jpg',
      tags: ['城市规划', '传统智慧', '清明上河图']
    },
    'zen-programming': {
      title: '禅意编程：在代码中寻找内心的宁静',
      content: `# 禅意编程：在代码中寻找内心的宁静

## 引言

编程不仅仅是一种技术活动，更是一种修行。当我们以禅意的心态去编写代码时，不仅能够提高代码的质量，更能在这个过程中找到内心的平静和智慧。

## 禅与编程的相通之处

### 专注当下

禅宗强调**活在当下**，编程同样需要我们全神贯注于眼前的问题。当我们完全沉浸在代码的世界中时，外界的喧嚣自然消失，只剩下逻辑的纯净和思维的清晰。

> "程序员最高的境界，就是在编码时忘记自我，与代码融为一体。"

### 简约之美

禅宗追求简约，认为*大道至简*。优秀的代码同样如此：

- **简洁明了**：每一行代码都有其存在的意义
- **逻辑清晰**：结构简单但功能强大
- **易于理解**：如同禅诗一般，言简意赅

### 无我编程

在禅修中，我们学会放下自我。在编程中，这意味着：

1. 不为了炫技而写复杂的代码
2. 优先考虑代码的可读性和维护性
3. 接受他人的建议和代码审查

## 实践禅意编程

### 代码即冥想

\`\`\`javascript
// 禅意的函数命名
function breathe() {
  return {
    inhale: () => console.log('吸气...'),
    exhale: () => console.log('呼气...')
  };
}

// 简洁的逻辑
const meditation = breathe();
meditation.inhale();
meditation.exhale();
\`\`\`

### 重构如整理心境

重构代码就像整理内心一样，需要：

- **耐心**：不急于求成，一步一步来
- **智慧**：知道什么该保留，什么该舍弃
- **勇气**：敢于删除冗余的代码

## 结语

编程是一门艺术，也是一种修行。当我们将禅的智慧融入到编程实践中时，不仅能够写出更好的代码，更能在这个过程中获得内心的成长和平静。

*愿每一位程序员都能在代码中找到属于自己的禅意。*`,
      category: '技术',
      date: '2024-01-10',
      readTime: '5 分钟',
      tags: ['禅意编程', '编程哲学', '技术思考'],
      isMarkdown: true
    }
  };

  return articles[slug as keyof typeof articles] || null;
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Article Content */}
          <article className="lg:col-span-3">
            {/* Article Header */}
            <header className="mb-8">
              <div className="mb-4">
                <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-medium rounded-full">
                  {article.category}
                </span>
              </div>
              
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4 leading-tight">
                {article.title}
              </h1>
              
              <div className="flex items-center text-slate-600 dark:text-slate-400 text-sm space-x-4">
                <time dateTime={article.date} className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {article.date}
                </time>
                
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {article.readTime}
                </span>
              </div>
            </header>

            {/* Article Image */}
            {article.image && (
              <div className="relative h-64 md:h-96 mb-8 rounded-xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center">
                  <svg className="w-16 h-16 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            )}

            {/* Article Content */}
            {article.isMarkdown ? (
              <MarkdownRenderer content={article.content} />
            ) : (
              <div
                className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-serif prose-headings:text-slate-800 dark:prose-headings:text-slate-100 prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-blockquote:border-amber-500 prose-blockquote:text-amber-700 dark:prose-blockquote:text-amber-300 prose-strong:text-slate-800 dark:prose-strong:text-slate-200"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            )}

            {/* Tags */}
            <div className="mt-8 pt-8 border-t border-amber-200 dark:border-slate-600">
              <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">标签</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </main>
    </div>
  );
}

// Generate static params for known articles
export function generateStaticParams() {
  return [
    { slug: 'song-dynasty-aesthetics' },
    { slug: 'qingming-urban-planning' },
    { slug: 'zen-programming' },
  ];
}

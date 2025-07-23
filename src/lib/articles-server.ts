// 服务器端文章数据 - 临时解决方案
// 在实际项目中，这些数据应该从文件系统或数据库中读取

export interface ArticleMeta {
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt?: string;
  readTime?: string;
  image?: string;
  author?: string;
}

export interface Article extends ArticleMeta {
  slug: string;
  content: string;
  isMarkdown: boolean;
}

// 模拟从文件系统读取的文章数据
const articlesData: Article[] = [
  {
    slug: 'zen-programming',
    title: '禅意编程：在代码中寻找内心的宁静',
    date: '2024-01-10',
    category: '技术',
    tags: ['禅意编程', '编程哲学', '技术思考'],
    excerpt: '编程不仅仅是一种技术活动，更是一种修行。当我们以禅意的心态去编写代码时，不仅能够提高代码的质量，更能在这个过程中找到内心的平静和智慧。',
    readTime: '5 分钟',
    author: '泽君',
    isMarkdown: true,
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

*愿每一位程序员都能在代码中找到属于自己的禅意。*`
  },
  {
    slug: 'song-dynasty-aesthetics',
    title: '宋代文人的生活美学与现代设计思维',
    date: '2024-01-15',
    category: '文化',
    tags: ['宋朝美学', '传统文化', '现代设计'],
    excerpt: '探索宋朝文人如何将生活艺术化，以及这种美学理念如何启发现代设计思维。从苏轼的诗词到朱熹的理学，从园林设计到器物制作，宋代美学的精髓在于追求简约而不简单的境界。',
    readTime: '8 分钟',
    image: '/images/articles/song-aesthetics.jpg',
    author: '泽君',
    isMarkdown: true,
    content: `# 宋代文人的生活美学与现代设计思维

## 引言

宋代是中国文化史上的一个黄金时代，文人们不仅在诗词、书画方面达到了极高的成就，更在生活美学方面形成了独特的理念和实践。这种美学思想对现代设计思维具有深远的启发意义。

## 宋代文人的美学理念

### 雅致生活的追求

宋代文人追求的是一种"雅"的生活方式，这种雅不是奢华，而是一种精神上的富足和审美上的纯净。苏轼曾说："宁可食无肉，不可居无竹。"这体现了宋代文人对精神品质的重视超过物质享受。

> "简约而不简单，这是宋代美学的精髓所在。"

### 器物与精神的统一

宋代的器物设计体现了功能与美的完美统一：

- **茶具设计**：简洁的线条，温润的质感
- **文房四宝**：实用性与艺术性并重
- **园林布局**：自然与人工的和谐统一

## 现代设计的启示

宋代的美学理念对现代设计有着重要的启发：

### 1. 留白的艺术

宋代绘画中的留白技法，启发了现代设计中的负空间运用。留白不是空无，而是给观者想象的空间。

### 2. 功能与美的统一

宋代器物既实用又美观，体现了设计的本质：**形式追随功能，但不忘记美感**。

### 3. 自然与人文的和谐

宋代园林设计体现了人与自然的和谐共处，这对现代可持续设计具有重要意义。

## 结语

宋代文人的生活美学不仅是历史的瑰宝，更是现代设计师可以汲取的智慧源泉。在快节奏的现代生活中，我们更需要这种内敛、优雅、有深度的美学追求。`
  },
  {
    slug: 'tea-ceremony-design',
    title: '茶道精神在产品设计中的体现',
    date: '2024-01-05',
    category: '思考',
    tags: ['茶道', '产品设计', '用户体验'],
    excerpt: '茶道讲究的是一期一会，每一次品茶都是独特的体验。这种精神如何应用到产品设计中，创造出更有温度的用户体验？',
    readTime: '4 分钟',
    author: '泽君',
    isMarkdown: false,
    content: `<h1>茶道精神在产品设计中的体现</h1>

<h2>茶道的核心理念</h2>

<p>茶道，不仅仅是泡茶的技艺，更是一种生活哲学。它强调的是<strong>一期一会</strong>的珍贵，每一次茶会都是独一无二的体验，不可复制，也不会重来。</p>

<blockquote>
<p>"一期一会，世当珍惜。" —— 千利休</p>
</blockquote>

<h2>茶道精神的核心要素</h2>

<h3>1. 专注当下</h3>
<p>茶道要求参与者全身心投入到当下的体验中，不被外界干扰。这种专注力在产品设计中体现为：</p>
<ul>
<li><strong>简洁的界面设计</strong>：减少干扰元素，让用户专注于核心功能</li>
<li><strong>流畅的交互体验</strong>：每一个操作都应该自然、直观</li>
<li><strong>沉浸式体验</strong>：创造让用户忘记时间的使用体验</li>
</ul>

<h3>2. 尊重仪式感</h3>
<p>茶道中的每一个动作都有其意义，这种仪式感在产品设计中可以体现为：</p>
<ul>
<li><strong>有意义的动画</strong>：每个动画都应该有其目的，而不是为了炫技</li>
<li><strong>渐进式引导</strong>：像茶道的步骤一样，循序渐进地引导用户</li>
<li><strong>情感化设计</strong>：在关键节点给用户仪式感和成就感</li>
</ul>

<h2>结语</h2>

<p>茶道教会我们的不仅仅是如何泡一壶好茶，更是如何以敬畏之心对待生活中的每一个瞬间。在产品设计中融入这种精神，我们可以创造出不仅功能强大，更有人文温度的产品。</p>`
  }
];

// 获取所有文章
export function getAllArticles(): Article[] {
  return articlesData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// 根据 slug 获取单篇文章
export function getArticleBySlug(slug: string): Article | null {
  return articlesData.find(article => article.slug === slug) || null;
}

// 根据分类获取文章
export function getArticlesByCategory(category: string): Article[] {
  return articlesData.filter(article => 
    article.category.toLowerCase() === category.toLowerCase()
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// 获取所有分类
export function getAllCategories(): { name: string; count: number }[] {
  const categoryMap = new Map<string, number>();

  articlesData.forEach(article => {
    const count = categoryMap.get(article.category) || 0;
    categoryMap.set(article.category, count + 1);
  });

  return Array.from(categoryMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

// 获取所有标签
export function getAllTags(): { name: string; count: number }[] {
  const tagMap = new Map<string, number>();

  articlesData.forEach(article => {
    article.tags.forEach(tag => {
      const count = tagMap.get(tag) || 0;
      tagMap.set(tag, count + 1);
    });
  });

  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

// 服务器端文章数据管理 - 从文件系统读取 Markdown 文件
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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

// 文章目录路径
const articlesDirectory = path.join(process.cwd(), 'src/content/articles');

// 获取所有文章文件名
function getArticleFilenames(): string[] {
  try {
    if (!fs.existsSync(articlesDirectory)) {
      console.warn(`Articles directory not found: ${articlesDirectory}`);
      return [];
    }
    
    const filenames = fs.readdirSync(articlesDirectory);
    return filenames.filter(name => 
      name.endsWith('.md') || name.endsWith('.html')
    );
  } catch (error) {
    console.error('Error reading articles directory:', error);
    return [];
  }
}

// 根据文件名获取 slug
function getSlugFromFilename(filename: string): string {
  return filename.replace(/\.(md|html)$/, '');
}

// 读取单个文章文件
async function readArticleFile(filename: string): Promise<Article | null> {
  try {
    const fullPath = path.join(articlesDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const slug = getSlugFromFilename(filename);
    const isMarkdown = filename.endsWith('.md');

    if (isMarkdown) {
      // 解析 Markdown 文件的 frontmatter
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString().split('T')[0],
        category: data.category || '未分类',
        tags: Array.isArray(data.tags) ? data.tags : [],
        excerpt: data.excerpt,
        readTime: data.readTime,
        image: data.image,
        author: data.author,
        content, // 保持原始 Markdown 内容
        isMarkdown: true
      };
    } else {
      // 处理 HTML 文件
      // 尝试从 HTML 注释中提取元数据
      // 支持两种格式：<!-- META: {...} --> 和 <!-- META {...} -->
      const metaMatch = fileContents.match(/<!--\s*META:?\s*([\s\S]*?)-->/);
      let meta: Record<string, unknown> = {};

      if (metaMatch) {
        try {
          // 清理元数据字符串，移除可能的换行和多余空格
          const metaString = metaMatch[1].trim();
          meta = JSON.parse(metaString);
          console.log(`Successfully parsed meta for ${filename}:`, meta);
        } catch (e) {
          console.warn(`Failed to parse meta for ${filename}:`, e);
          console.warn(`Meta string was:`, metaMatch[1]);
        }
      } else {
        console.warn(`No META comment found in ${filename}`);
      }

      // 移除元数据注释，获取纯 HTML 内容
      const content = fileContents.replace(/<!--\s*META:?[\s\S]*?-->/, '').trim();
      
      return {
        slug,
        title: (meta.title as string) || slug,
        date: (meta.date as string) || new Date().toISOString().split('T')[0],
        category: (meta.category as string) || '未分类',
        tags: Array.isArray(meta.tags) ? meta.tags as string[] : [],
        excerpt: meta.excerpt as string | undefined,
        readTime: meta.readTime as string | undefined,
        image: meta.image as string | undefined,
        author: meta.author as string | undefined,
        content,
        isMarkdown: false
      };
    }
  } catch (error) {
    console.error(`Error reading article file ${filename}:`, error);
    return null;
  }
}

// 获取所有文章
export async function getAllArticles(): Promise<Article[]> {
  const filenames = getArticleFilenames();
  const articles: Article[] = [];
  
  for (const filename of filenames) {
    const article = await readArticleFile(filename);
    if (article) {
      articles.push(article);
    }
  }
  
  // 按日期排序（最新的在前）
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// 根据 slug 获取单篇文章
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const filenames = getArticleFilenames();
  const filename = filenames.find(name => getSlugFromFilename(name) === slug);
  
  if (!filename) {
    return null;
  }
  
  return await readArticleFile(filename);
}

// 根据分类获取文章
export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const allArticles = await getAllArticles();
  return allArticles.filter(article => 
    article.category.toLowerCase() === category.toLowerCase()
  );
}

// 获取所有分类
export async function getAllCategories(): Promise<{ name: string; count: number }[]> {
  const allArticles = await getAllArticles();
  const categoryMap = new Map<string, number>();

  allArticles.forEach(article => {
    const count = categoryMap.get(article.category) || 0;
    categoryMap.set(article.category, count + 1);
  });

  return Array.from(categoryMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

// 获取所有标签
export async function getAllTags(): Promise<{ name: string; count: number }[]> {
  const allArticles = await getAllArticles();
  const tagMap = new Map<string, number>();

  allArticles.forEach(article => {
    article.tags.forEach(tag => {
      const count = tagMap.get(tag) || 0;
      tagMap.set(tag, count + 1);
    });
  });

  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

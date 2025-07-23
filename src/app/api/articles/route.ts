import { NextResponse } from 'next/server';
import { getAllArticles } from '@/lib/articles-fs';

export async function GET() {
  try {
    const articles = await getAllArticles();
    
    // 为了减少传输数据量，我们可以选择性地返回字段
    const articlesForSearch = articles.map(article => ({
      slug: article.slug,
      title: article.title,
      date: article.date,
      category: article.category,
      tags: article.tags,
      excerpt: article.excerpt,
      readTime: article.readTime,
      author: article.author,
      // 只返回内容的前1000个字符用于搜索
      content: article.content.substring(0, 1000),
      isMarkdown: article.isMarkdown,
    }));

    return NextResponse.json(articlesForSearch);
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}

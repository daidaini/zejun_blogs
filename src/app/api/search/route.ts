import { NextRequest, NextResponse } from 'next/server';
import { getAllArticles } from '@/lib/articles-fs';
import { searchArticles } from '@/lib/search';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    const category = searchParams.get('category');
    const tags = searchParams.get('tags')?.split(',').filter(Boolean);

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    // 获取所有文章
    let articles = await getAllArticles();

    // 如果指定了分类，先筛选
    if (category) {
      articles = articles.filter(article =>
        article.category.toLowerCase() === category.toLowerCase()
      );
    }

    // 如果指定了标签，先筛选
    if (tags && tags.length > 0) {
      articles = articles.filter(article =>
        tags.some(tag => article.tags.includes(tag))
      );
    }

    // 执行搜索
    const searchResults = searchArticles(articles, query);

    // 如果指定了限制数量
    const limitedResults = limit ? searchResults.slice(0, limit) : searchResults;

    return NextResponse.json({
      query,
      category,
      tags: tags || [],
      results: limitedResults,
      total: limitedResults.length,
    });
  } catch (error) {
    console.error('Search failed:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}

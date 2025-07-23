import { NextRequest, NextResponse } from 'next/server';
import { getAllArticles } from '@/lib/articles-fs';
import { searchArticles } from '@/lib/search';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    // 获取所有文章
    const articles = await getAllArticles();
    
    // 执行搜索
    const searchResults = searchArticles(articles, query);

    return NextResponse.json({
      query,
      results: searchResults,
      total: searchResults.length,
    });
  } catch (error) {
    console.error('Search failed:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}

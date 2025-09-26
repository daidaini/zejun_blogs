import { NextRequest, NextResponse } from 'next/server';
import { getArticlesByCategory } from '@/lib/articles-fs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await params;

    if (!category) {
      return NextResponse.json(
        { error: 'Category parameter is required' },
        { status: 400 }
      );
    }

    const articles = await getArticlesByCategory(category);

    return NextResponse.json({
      category,
      articles,
      total: articles.length,
    });
  } catch (error) {
    console.error('Failed to fetch articles by category:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles by category' },
      { status: 500 }
    );
  }
}
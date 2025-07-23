import { Article } from './articles-fs';

export interface SearchResult {
  article: Article;
  score: number;
  matchedFields: string[];
  highlights: {
    title?: string;
    content?: string;
    excerpt?: string;
  };
}

// 搜索权重配置
const SEARCH_WEIGHTS = {
  title: 3,
  tags: 2.5,
  category: 2,
  excerpt: 1.5,
  content: 1,
  author: 1,
};

// 高亮文本函数
function highlightText(text: string, query: string): string {
  if (!text || !query) return text;
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark class="bg-amber-200 dark:bg-amber-800 px-1 rounded">$1</mark>');
}

// 计算文本相似度
function calculateSimilarity(text: string, query: string): number {
  if (!text || !query) return 0;
  
  const textLower = text.toLowerCase();
  const queryLower = query.toLowerCase();
  
  // 完全匹配
  if (textLower === queryLower) return 1;
  
  // 包含匹配
  if (textLower.includes(queryLower)) return 0.8;
  
  // 分词匹配
  const queryWords = queryLower.split(/\s+/);
  const textWords = textLower.split(/\s+/);
  
  let matchCount = 0;
  for (const queryWord of queryWords) {
    for (const textWord of textWords) {
      if (textWord.includes(queryWord) || queryWord.includes(textWord)) {
        matchCount++;
        break;
      }
    }
  }
  
  return matchCount / queryWords.length * 0.6;
}

// 提取内容摘要
function extractContentSnippet(content: string, query: string, maxLength: number = 200): string {
  if (!content || !query) return content.substring(0, maxLength);
  
  const queryLower = query.toLowerCase();
  const contentLower = content.toLowerCase();
  
  // 查找查询词在内容中的位置
  const index = contentLower.indexOf(queryLower);
  
  if (index === -1) {
    return content.substring(0, maxLength);
  }
  
  // 计算摘要的开始和结束位置
  const start = Math.max(0, index - 50);
  const end = Math.min(content.length, start + maxLength);
  
  let snippet = content.substring(start, end);
  
  // 添加省略号
  if (start > 0) snippet = '...' + snippet;
  if (end < content.length) snippet = snippet + '...';
  
  return snippet;
}

// 主搜索函数
export function searchArticles(articles: Article[], query: string): SearchResult[] {
  if (!query.trim()) return [];
  
  const queryLower = query.toLowerCase().trim();
  const results: SearchResult[] = [];
  
  for (const article of articles) {
    let totalScore = 0;
    const matchedFields: string[] = [];
    const highlights: SearchResult['highlights'] = {};
    
    // 搜索标题
    const titleScore = calculateSimilarity(article.title, queryLower);
    if (titleScore > 0) {
      totalScore += titleScore * SEARCH_WEIGHTS.title;
      matchedFields.push('title');
      highlights.title = highlightText(article.title, query);
    }
    
    // 搜索标签
    const tagsText = article.tags.join(' ');
    const tagsScore = calculateSimilarity(tagsText, queryLower);
    if (tagsScore > 0) {
      totalScore += tagsScore * SEARCH_WEIGHTS.tags;
      matchedFields.push('tags');
    }
    
    // 搜索分类
    const categoryScore = calculateSimilarity(article.category, queryLower);
    if (categoryScore > 0) {
      totalScore += categoryScore * SEARCH_WEIGHTS.category;
      matchedFields.push('category');
    }
    
    // 搜索摘要
    if (article.excerpt) {
      const excerptScore = calculateSimilarity(article.excerpt, queryLower);
      if (excerptScore > 0) {
        totalScore += excerptScore * SEARCH_WEIGHTS.excerpt;
        matchedFields.push('excerpt');
        highlights.excerpt = highlightText(article.excerpt, query);
      }
    }
    
    // 搜索内容
    const contentScore = calculateSimilarity(article.content, queryLower);
    if (contentScore > 0) {
      totalScore += contentScore * SEARCH_WEIGHTS.content;
      matchedFields.push('content');
      highlights.content = highlightText(
        extractContentSnippet(article.content, query),
        query
      );
    }
    
    // 搜索作者
    if (article.author) {
      const authorScore = calculateSimilarity(article.author, queryLower);
      if (authorScore > 0) {
        totalScore += authorScore * SEARCH_WEIGHTS.author;
        matchedFields.push('author');
      }
    }
    
    // 如果有匹配，添加到结果中
    if (totalScore > 0) {
      results.push({
        article,
        score: totalScore,
        matchedFields,
        highlights,
      });
    }
  }
  
  // 按分数排序
  return results.sort((a, b) => b.score - a.score);
}

// 搜索建议函数
export function getSearchSuggestions(articles: Article[], query: string): string[] {
  if (!query.trim()) return [];
  
  const queryLower = query.toLowerCase().trim();
  const suggestions = new Set<string>();
  
  // 从标题中提取建议
  for (const article of articles) {
    const words = article.title.toLowerCase().split(/\s+/);
    for (const word of words) {
      if (word.includes(queryLower) && word !== queryLower) {
        suggestions.add(word);
      }
    }
    
    // 从标签中提取建议
    for (const tag of article.tags) {
      if (tag.toLowerCase().includes(queryLower) && tag.toLowerCase() !== queryLower) {
        suggestions.add(tag);
      }
    }
  }
  
  return Array.from(suggestions).slice(0, 5);
}

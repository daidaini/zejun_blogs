'use client';

import { useEffect, useState } from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer = ({ content, className = '' }: MarkdownRendererProps) => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    // Simple markdown to HTML converter
    // In a real app, you would use a library like marked or remark
    const convertMarkdownToHtml = (markdown: string) => {
      let html = markdown;

      // Headers
      html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
      html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
      html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

      // Bold
      html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
      html = html.replace(/__(.*?)__/gim, '<strong>$1</strong>');

      // Italic
      html = html.replace(/\*(.*)\*/gim, '<em>$1</em>');
      html = html.replace(/_(.*?)_/gim, '<em>$1</em>');

      // Code blocks
      html = html.replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>');
      html = html.replace(/`(.*?)`/gim, '<code>$1</code>');

      // Links
      html = html.replace(/\[([^\]]*)\]\(([^\)]*)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

      // Images
      html = html.replace(/!\[([^\]]*)\]\(([^\)]*)\)/gim, '<img alt="$1" src="$2" />');

      // Lists
      html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
      html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
      html = html.replace(/^(\d+)\. (.*$)/gim, '<li>$1. $2</li>');

      // Wrap consecutive list items in ul/ol tags
      html = html.replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>');
      html = html.replace(/<\/ul>\s*<ul>/gim, '');

      // Blockquotes
      html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');

      // Line breaks
      html = html.replace(/\n\n/gim, '</p><p>');
      html = html.replace(/\n/gim, '<br>');

      // Wrap in paragraphs
      html = '<p>' + html + '</p>';

      // Clean up empty paragraphs
      html = html.replace(/<p><\/p>/gim, '');
      html = html.replace(/<p>(<h[1-6]>)/gim, '$1');
      html = html.replace(/(<\/h[1-6]>)<\/p>/gim, '$1');
      html = html.replace(/<p>(<blockquote>)/gim, '$1');
      html = html.replace(/(<\/blockquote>)<\/p>/gim, '$1');
      html = html.replace(/<p>(<ul>)/gim, '$1');
      html = html.replace(/(<\/ul>)<\/p>/gim, '$1');
      html = html.replace(/<p>(<pre>)/gim, '$1');
      html = html.replace(/(<\/pre>)<\/p>/gim, '$1');

      return html;
    };

    setHtmlContent(convertMarkdownToHtml(content));
  }, [content]);

  return (
    <div 
      className={`prose prose-lg dark:prose-invert max-w-none 
        prose-headings:font-serif prose-headings:text-slate-800 dark:prose-headings:text-slate-100
        prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed
        prose-blockquote:border-amber-500 prose-blockquote:text-amber-700 dark:prose-blockquote:text-amber-300
        prose-blockquote:bg-amber-50 dark:prose-blockquote:bg-amber-900/20 prose-blockquote:p-4 prose-blockquote:rounded-lg
        prose-strong:text-slate-800 dark:prose-strong:text-slate-200
        prose-em:text-slate-700 dark:prose-em:text-slate-300
        prose-code:bg-amber-100 dark:prose-code:bg-amber-900/30 prose-code:text-amber-800 dark:prose-code:text-amber-200
        prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
        prose-pre:bg-slate-800 dark:prose-pre:bg-slate-900 prose-pre:text-slate-200
        prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
        prose-a:text-amber-600 dark:prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline
        prose-ul:list-disc prose-ol:list-decimal
        prose-li:text-slate-700 dark:prose-li:text-slate-300
        prose-img:rounded-lg prose-img:shadow-md
        ${className}
      `}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default MarkdownRenderer;

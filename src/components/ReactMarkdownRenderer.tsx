'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import Image from 'next/image';
import 'highlight.js/styles/github-dark.css'; // 代码高亮样式

interface ReactMarkdownRendererProps {
  content: string;
  className?: string;
}

// React Markdown 组件类型定义已通过 eslint-disable 处理

const ReactMarkdownRenderer = ({ content, className = '' }: ReactMarkdownRendererProps) => {
  return (
    <div className={`prose prose-slate dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          // 自定义标题渲染
          h1: ({ children }) => (
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-6 mt-8 first:mt-0 border-b border-slate-200 dark:border-slate-700 pb-3">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 dark:text-slate-200 mb-4 mt-8 border-b border-slate-200 dark:border-slate-700 pb-2">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl md:text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-3 mt-6">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg md:text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2 mt-4">
              {children}
            </h4>
          ),
          
          // 自定义段落渲染
          p: ({ children }) => (
            <p className="text-base md:text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
              {children}
            </p>
          ),
          
          // 自定义引用块渲染
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-amber-500 dark:border-amber-400 pl-6 py-2 my-6 bg-amber-50 dark:bg-amber-900/20 rounded-r-lg">
              <div className="text-amber-800 dark:text-amber-200 font-serif italic">
                {children}
              </div>
            </blockquote>
          ),
          
          // 自定义列表渲染
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-2 mb-4 text-slate-700 dark:text-slate-300">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2 mb-4 text-slate-700 dark:text-slate-300">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed">
              {children}
            </li>
          ),
          
          // 自定义代码块渲染
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          code: ({ className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '');
            const inline = !match;

            if (!inline && match) {
              return (
                <div className="relative my-6">
                  <div className="absolute top-0 left-0 bg-slate-700 dark:bg-slate-800 text-slate-300 text-xs px-3 py-1 rounded-tl-lg rounded-tr-lg">
                    {match[1]}
                  </div>
                  <pre className="bg-slate-900 dark:bg-slate-950 text-slate-100 p-4 pt-8 rounded-lg overflow-x-auto">
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                </div>
              );
            }
            
            return (
              <code className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-2 py-1 rounded text-sm font-mono" {...props}>
                {children}
              </code>
            );
          },
          
          // 自定义链接渲染
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          a: ({ href, children }: any) => (
            <a
              href={href}
              className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 underline decoration-amber-300 dark:decoration-amber-600 underline-offset-2 transition-colors"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {children}
            </a>
          ),
          
          // 自定义强调文本渲染
          strong: ({ children }) => (
            <strong className="font-semibold text-slate-900 dark:text-slate-100">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-slate-800 dark:text-slate-200">
              {children}
            </em>
          ),
          
          // 自定义表格渲染
          table: ({ children }) => (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full border border-slate-200 dark:border-slate-700 rounded-lg">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-slate-50 dark:bg-slate-800">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">
              {children}
            </td>
          ),
          
          // 自定义分割线渲染
          hr: () => (
            <hr className="my-8 border-slate-200 dark:border-slate-700" />
          ),
          
          // 自定义图片渲染
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          img: ({ src, alt }: any) => (
            <div className="my-6">
              {src ? (
                <Image
                  src={src}
                  alt={alt || ''}
                  width={800}
                  height={400}
                  className="rounded-lg shadow-lg max-w-full h-auto mx-auto"
                  style={{ width: 'auto', height: 'auto' }}
                />
              ) : (
                <div className="bg-slate-200 dark:bg-slate-700 rounded-lg h-40 flex items-center justify-center">
                  <span className="text-slate-500 dark:text-slate-400">图片加载失败</span>
                </div>
              )}
              {alt && (
                <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-2 italic">
                  {alt}
                </p>
              )}
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default ReactMarkdownRenderer;

'use client';

import Link from 'next/link';
import Image from 'next/image';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image?: string;
  slug: string;
  featured?: boolean;
}

const ArticleCard = ({ 
  title, 
  excerpt, 
  category, 
  date, 
  readTime, 
  image, 
  slug, 
  featured = false 
}: ArticleCardProps) => {
  return (
    <Link href={`/article/${slug}`} className="group block">
      <article className={`
        relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-md hover:shadow-xl
        transition-all duration-500 transform hover:-translate-y-2 border border-amber-200/50 dark:border-slate-600/50
        hover:border-amber-300 dark:hover:border-amber-600 hover:bg-white/90 dark:hover:bg-slate-800/90
        ${featured ? 'md:col-span-2 lg:col-span-2' : ''}
      `}>
        {/* Image */}
        {image && (
          <div className={`relative overflow-hidden ${featured ? 'h-64 md:h-80' : 'h-48'}`}>
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-amber-600/90 text-white text-sm font-medium rounded-full backdrop-blur-sm">
                {category}
              </span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className={`p-6 ${!image ? 'pt-8' : ''}`}>
          {/* Category for no-image cards */}
          {!image && (
            <div className="mb-3">
              <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-medium rounded-full">
                {category}
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className={`
            font-serif font-semibold text-slate-800 dark:text-slate-100 mb-3 
            group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors
            ${featured ? 'text-xl md:text-2xl' : 'text-lg'}
          `}>
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed line-clamp-3">
            {excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
            <time dateTime={date} className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {date}
            </time>
            
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {readTime}
            </span>
          </div>

          {/* Read More Indicator */}
          <div className="mt-4 flex items-center text-amber-600 dark:text-amber-400 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
            <span className="text-sm font-medium">阅读全文</span>
            <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-20 h-20 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-600" />
            <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" className="text-red-600" />
          </svg>
        </div>

        {/* Traditional corner decoration */}
        <div className="absolute bottom-0 left-0 w-16 h-16 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M10 90 Q50 50 90 90" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-600" />
            <path d="M20 90 Q50 60 80 90" fill="none" stroke="currentColor" strokeWidth="1" className="text-red-600" />
          </svg>
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </article>
    </Link>
  );
};

export default ArticleCard;

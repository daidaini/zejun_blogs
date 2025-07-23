'use client';

interface LoadingProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Loading = ({ text = '加载中...', size = 'md' }: LoadingProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Traditional Chinese loading animation */}
      <div className="relative">
        {/* Outer circle */}
        <div className={`${sizeClasses[size]} border-2 border-amber-200 dark:border-amber-800 rounded-full animate-spin`}>
          <div className="absolute inset-0 border-2 border-transparent border-t-amber-600 dark:border-t-amber-400 rounded-full animate-spin"></div>
        </div>
        
        {/* Inner decorative element */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-4 h-4' : 'w-6 h-6'} bg-amber-600 dark:bg-amber-400 rounded-full animate-pulse`}></div>
        </div>
      </div>
      
      {/* Loading text */}
      <p className={`mt-4 ${textSizeClasses[size]} text-slate-600 dark:text-slate-400 font-medium`}>
        {text}
      </p>
      
      {/* Traditional dots animation */}
      <div className="flex space-x-1 mt-2">
        <div className="w-1 h-1 bg-amber-600 dark:bg-amber-400 rounded-full animate-bounce"></div>
        <div className="w-1 h-1 bg-amber-600 dark:bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-1 h-1 bg-amber-600 dark:bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
};

export default Loading;

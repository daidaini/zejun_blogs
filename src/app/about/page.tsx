import Navigation from '@/components/Navigation';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-8 border border-amber-200/50 dark:border-slate-600/50">
          {/* Header */}
          <header className="text-center mb-12">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-2xl">Jun</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              About ZeJun
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              记录生活，记录学习，记录进步。
            </p>
          </header>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-serif prose-headings:text-slate-800 dark:prose-headings:text-slate-100 prose-p:text-slate-700 dark:prose-p:text-slate-300">
            <h2>我的理念</h2>
            <blockquote>
              <p>&ldquo;博学之，审问之，慎思之，明辨之，笃行之&rdquo;</p>
              <cite>—— 《礼记·中庸》</cite>
            </blockquote>
            <p>
              这句话深深影响着我的学习和创作方式。我相信真正的智慧不仅来自于广泛的学习，
              更来自于深入的思考和实践。在这个信息爆炸的时代，我们更需要的是慎思明辨的能力，
              以及将知识转化为智慧的实践精神。
            </p>

            <h2>我的兴趣</h2>
            <ul>
              <li><strong>传统文化</strong>：特别关注宋代文人的生活美学和哲学思想</li>
              <li><strong>现代设计</strong>：探索如何将传统美学融入现代设计理念</li>
              <li><strong>技术哲学</strong>：思考技术发展对人类社会和文化的影响</li>
              <li><strong>禅意生活</strong>：在快节奏的现代生活中寻找内心的宁静</li>
            </ul>

            <h2>我的愿景</h2>
            <p>
              通过这个博客，我希望能够：
            </p>
            <ul>
              <li>分享传统文化与现代思维的融合之美</li>
              <li>探讨技术发展中的人文关怀</li>
              <li>传播简约而不简单的生活理念</li>
              <li>与志同道合的朋友交流思想和见解</li>
            </ul>

            <h2>联系我</h2>
            <p>
              如果你对我的文章有任何想法，或者想要交流关于传统文化、现代设计、技术哲学等话题，
              欢迎通过以下方式联系我：
            </p>
            <ul>
              <li>X：@zejun105</li>
              <li>GitHub：@daidaini</li>
            </ul>

            <div className="mt-12 p-6 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <h3 className="text-amber-800 dark:text-amber-200 mb-3">博客理念</h3>
              <p className="text-amber-700 dark:text-amber-300 mb-0">
                &ldquo;文章千古事，得失寸心知。&rdquo; 每一篇文章都是我对世界的理解和感悟，
                希望能够在这个浮躁的时代，为读者带来一些思考的空间和内心的宁静。
              </p>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}

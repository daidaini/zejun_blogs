# Zejun 博客

一个融合宋朝美学与现代技术的个人博客网站，基于 Next.js 15 构建。

## 技术栈

- **框架**: Next.js 15.4.3 (App Router)
- **样式**: Tailwind CSS 4.0
- **字体**: Noto Serif SC (宋体) + Noto Sans SC
- **语言**: TypeScript
- **部署**: Vercel 就绪

## 主要特性

- **宋朝美学设计**: 传统中文字体、温暖色彩、禅意几何图案
- **双格式文章**: 支持 Markdown 和 HTML 文章格式
- **响应式布局**: 移动端优化，平板和桌面端适配
- **深色模式**: 完整的深色/浅色主题切换
- **智能导航**: 分类下拉菜单、搜索功能、文章标签
- **现代交互**: 平滑动画、悬停效果、键盘导航支持

## 项目结构

```
src/
├── app/                    # Next.js App Router 页面
│   ├── about/page.tsx      # 关于页面
│   ├── article/[slug]/page.tsx    # 文章详情页
│   ├── category/[category]/page.tsx # 分类页面
│   ├── layout.tsx          # 根布局
│   └── page.tsx            # 首页
├── components/             # 可复用组件
│   ├── ArticleCard.tsx     # 文章卡片
│   ├── Hero.tsx            # 首页横幅
│   ├── Navigation.tsx      # 导航栏
│   ├── Sidebar.tsx         # 侧边栏
│   └── MarkdownRenderer.tsx # Markdown 渲染
├── lib/                    # 工具库
│   ├── articles-fs.ts      # 文章文件管理
│   └── search.ts           # 搜索功能
└── content/articles/       # 文章源文件 (MD/HTML)
```

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 运行代码检查
npm run lint

# 类型检查
npm run type-check
```

## 部署

项目已配置为可直接部署到 Vercel 等平台。文章存储在 `src/content/articles/` 目录，支持 Markdown 和 HTML 格式。

## 浏览器支持

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- 移动端浏览器



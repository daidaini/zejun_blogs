# 项目启动脚本使用指南

## 🚀 快速启动

### 开发环境
```bash
# 简单启动
npm run dev

# 智能启动（推荐）
npm run start:dev
```

### 生产环境
```bash
# 构建后启动
npm run build:start

# 完整生产启动
npm run start:prod-full
```

## 🛑 停止服务器

```bash
# 停止所有相关进程
npm run stop
```

## 🔄 重启服务器

```bash
# 重启开发环境
npm run restart

# 重启生产环境
npm run restart:prod
```

## 🧹 清理项目

```bash
# 清理构建文件
npm run clean

# 清理所有文件（包括依赖）
npm run clean:all

# 重置项目（清理+重装依赖）
npm run reset
```

## 📋 所有可用命令

### 开发相关
- `npm run dev` - 启动开发服务器
- `npm run dev:prod` - 生产模式启动开发服务器
- `npm run dev:inspect` - 启动调试模式开发服务器
- `npm run start:dev` - 智能开发环境启动

### 生产相关
- `npm run build` - 构建项目
- `npm run start` - 启动生产服务器
- `npm run start:prod` - 生产模式启动生产服务器
- `npm run build:start` - 构建并启动
- `npm run start:prod-full` - 完整生产环境启动

### 服务器管理
- `npm run stop` - 停止所有服务器
- `npm run restart` - 重启开发环境
- `npm run restart:prod` - 重启生产环境

### 代码质量
- `npm run lint` - 代码检查
- `npm run lint:fix` - 代码检查并修复
- `npm run type-check` - TypeScript类型检查
- `npm run type-check:watch` - 监听类型检查
- `npm run test` - 运行测试
- `npm run format` - 格式化代码
- `npm run format:check` - 检查代码格式

### 项目维护
- `npm run clean` - 清理构建文件
- `npm run clean:all` - 清理所有文件
- `npm run clean:scripts` - 运行清理脚本
- `npm run reset` - 重置项目
- `npm run update:deps` - 更新依赖
- `npm run audit` - 安全审计
- `npm run audit:fix` - 修复安全问题

## 🎯 推荐工作流程

### 日常开发
```bash
# 启动开发环境
npm run start:dev

# 代码检查和格式化
npm run lint:fix
npm run format

# 类型检查
npm run type-check
```

### 部署前
```bash
# 运行测试
npm run test

# 构建项目
npm run build

# 启动生产服务器
npm run start:prod-full
```

### 项目清理
```bash
# 完全重置项目
npm run reset
```

## 🔧 脚本功能说明

### scripts/dev.sh
- 自动检查端口占用
- 自动安装依赖
- 运行类型检查
- 启动开发服务器

### scripts/prod.sh
- 运行测试
- 构建项目
- 启动生产服务器

### scripts/stop.sh
- 停止占用3000端口的进程
- 停止所有Next.js进程

### scripts/restart.sh
- 停止当前服务器
- 根据参数启动对应环境

### scripts/clean.sh
- 清理构建文件
- 清理日志和临时文件
- 清理缓存
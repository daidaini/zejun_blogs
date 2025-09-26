#!/bin/bash

# 开发环境启动脚本
echo "🚀 启动开发环境..."
echo "📍 当前目录: $(pwd)"
echo "🔧 Node.js 版本: $(node --version)"
echo "📦 npm 版本: $(npm --version)"

# 检查端口占用
PORT=3000
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null; then
    echo "⚠️  端口 $PORT 已被占用，正在尝试关闭..."
    lsof -ti:$PORT | xargs kill -9
    echo "✅ 端口 $PORT 已释放"
fi

# 检查依赖是否安装
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖中..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ 依赖安装失败"
        exit 1
    fi
fi

# 运行类型检查
echo "🔍 运行类型检查..."
npm run type-check
if [ $? -ne 0 ]; then
    echo "❌ 类型检查失败"
    read -p "是否继续启动？(y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# 启动开发服务器
echo "🌐 启动开发服务器..."
echo "📍 访问地址: http://localhost:$PORT"
echo "⏹️  按 Ctrl+C 停止服务器"

npm run dev
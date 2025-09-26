#!/bin/bash

# 生产环境启动脚本
echo "🚀 启动生产环境..."
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

# 运行测试
echo "🧪 运行测试..."
npm test
if [ $? -ne 0 ]; then
    echo "❌ 测试失败"
    exit 1
fi

# 构建项目
echo "🔨 构建项目..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ 构建失败"
    exit 1
fi

# 启动生产服务器
echo "🌐 启动生产服务器..."
echo "📍 访问地址: http://localhost:$PORT"
echo "⏹️  按 Ctrl+C 停止服务器"

npm start
#!/bin/bash

# 开发环境启动脚本
echo "🚀 启动开发环境..."
echo "📍 当前目录: $(pwd)"
echo "🔧 Node.js 版本: $(node --version)"
echo "📦 npm 版本: $(npm --version)"

# 检查端口占用
PORT=8080
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

# 启动开发服务器（后台运行）
echo "🌐 启动开发服务器（后台运行）..."
echo "📍 访问地址: http://localhost:$PORT"
echo "📝 查看日志: tail -f logs/dev.log"
echo "⏹️  停止服务器: npm run stop"

# 创建日志目录
mkdir -p logs

# 后台启动开发服务器
nohup npm run dev > logs/dev.log 2>&1 &
DEV_PID=$!

# 保存进程ID
echo $DEV_PID > logs/dev.pid

echo "✅ 开发服务器已启动 (PID: $DEV_PID)"
echo "📋 日志文件: logs/dev.log"
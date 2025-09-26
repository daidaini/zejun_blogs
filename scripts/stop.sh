#!/bin/bash

# 停止开发/生产服务器
echo "🛑 正在停止服务器..."

# 查找并停止占用3000端口的进程
PORT=3000
PIDS=$(lsof -ti:$PORT)

if [ -z "$PIDS" ]; then
    echo "✅ 端口 $PORT 没有被占用"
else
    echo "🔍 找到进程: $PIDS"

    # 尝试优雅关闭
    echo "🔄 尝试优雅关闭..."
    kill $PIDS

    # 等待进程结束
    sleep 2

    # 检查进程是否还在运行
    if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null; then
        echo "⚠️  强制关闭进程..."
        kill -9 $PIDS
    fi

    echo "✅ 服务器已停止"
fi

# 查找Next.js相关进程
echo "🔍 检查Next.js相关进程..."
NEXT_PIDS=$(ps aux | grep -v grep | grep "next" | awk '{print $2}')

if [ -n "$NEXT_PIDS" ]; then
    echo "🛑 停止Next.js进程: $NEXT_PIDS"
    echo $NEXT_PIDS | xargs kill -9
    echo "✅ Next.js进程已停止"
else
    echo "✅ 没有找到Next.js进程"
fi

echo "🎉 服务器已完全停止"
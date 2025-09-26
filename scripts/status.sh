#!/bin/bash

# 检查服务器状态脚本
echo "🔍 检查服务器状态..."

# 检查端口占用
PORT=8080
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null; then
    echo "✅ 端口 $PORT 已被占用"
    PIDS=$(lsof -ti:$PORT)
    echo "📋 进程ID: $PIDS"
    echo "📍 访问地址: http://localhost:$PORT"
else
    echo "❌ 端口 $PORT 未被占用"
fi

# 检查PID文件
echo ""
echo "📁 检查PID文件..."
for server in "dev" "prod"; do
    PID_FILE="logs/${server}.pid"
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE")
        if ps -p $PID > /dev/null; then
            echo "✅ ${server}服务器正在运行 (PID: $PID)"
        else
            echo "⚠️  ${server}服务器进程不存在，但PID文件存在"
        fi
    else
        echo "❌ ${server}服务器PID文件不存在"
    fi
done

# 检查日志文件
echo ""
echo "📄 检查日志文件..."
if [ -f "logs/dev.log" ]; then
    echo "✅ 开发日志文件存在: logs/dev.log"
    echo "📊 开发日志大小: $(du -h logs/dev.log | cut -f1)"
fi

if [ -f "logs/prod.log" ]; then
    echo "✅ 生产日志文件存在: logs/prod.log"
    echo "📊 生产日志大小: $(du -h logs/prod.log | cut -f1)"
fi

# 检查Next.js进程
echo ""
echo "🔍 检查Next.js进程..."
NEXT_PIDS=$(ps aux | grep -v grep | grep "next" | awk '{print $2}')
if [ -n "$NEXT_PIDS" ]; then
    echo "✅ Next.js进程正在运行: $NEXT_PIDS"
else
    echo "❌ 没有找到Next.js进程"
fi
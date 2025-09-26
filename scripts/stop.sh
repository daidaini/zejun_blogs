#!/bin/bash

# 停止开发/生产服务器
echo "🛑 正在停止服务器..."

# 停止通过PID文件记录的进程
for server in "dev" "prod"; do
    PID_FILE="logs/${server}.pid"
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE")
        if ps -p $PID > /dev/null; then
            echo "🛑 停止${server}服务器 (PID: $PID)..."
            kill $PID

            # 等待进程结束
            sleep 2

            # 如果进程还在运行，强制关闭
            if ps -p $PID > /dev/null; then
                echo "⚠️  强制关闭${server}服务器..."
                kill -9 $PID
            fi

            echo "✅ ${server}服务器已停止"
        fi

        # 删除PID文件
        rm -f "$PID_FILE"
    fi
done

# 查找并停止占用8080端口的进程
PORT=8080
PIDS=$(lsof -ti:$PORT)

if [ -z "$PIDS" ]; then
    echo "✅ 端口 $PORT 没有被占用"
else
    echo "🔍 找到占用端口 $PORT 的进程: $PIDS"

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

    echo "✅ 端口 $PORT 的进程已停止"
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
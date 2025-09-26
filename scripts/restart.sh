#!/bin/bash

# 重启服务器脚本
echo "🔄 重启服务器..."

# 停止当前服务器
./scripts/stop.sh

# 等待一秒
sleep 1

# 根据参数决定启动模式
if [ "$1" = "prod" ]; then
    echo "🚀 启动生产环境..."
    ./scripts/prod.sh
else
    echo "🚀 启动开发环境..."
    ./scripts/dev.sh
fi
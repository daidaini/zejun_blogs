#!/bin/bash

# 查看日志脚本
if [ $# -eq 0 ]; then
    echo "📋 可用日志文件:"
    echo "  ./scripts/logs.sh dev   - 查看开发环境日志"
    echo "  ./scripts/logs.sh prod  - 查看生产环境日志"
    echo "  ./scripts/logs.sh all   - 查看所有日志"
    echo ""
    echo "📊 日志文件状态:"
    if [ -f "logs/dev.log" ]; then
        echo "✅ 开发日志: $(du -h logs/dev.log | cut -f1)"
    else
        echo "❌ 开发日志不存在"
    fi
    if [ -f "logs/prod.log" ]; then
        echo "✅ 生产日志: $(du -h logs/prod.log | cut -f1)"
    else
        echo "❌ 生产日志不存在"
    fi
    exit 0
fi

case $1 in
    "dev")
        if [ -f "logs/dev.log" ]; then
            echo "📝 开发环境日志 (实时更新，Ctrl+C 退出):"
            tail -f logs/dev.log
        else
            echo "❌ 开发日志文件不存在"
        fi
        ;;
    "prod")
        if [ -f "logs/prod.log" ]; then
            echo "📝 生产环境日志 (实时更新，Ctrl+C 退出):"
            tail -f logs/prod.log
        else
            echo "❌ 生产日志文件不存在"
        fi
        ;;
    "all")
        echo "📝 所有日志文件内容:"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        if [ -f "logs/dev.log" ]; then
            echo "📄 开发环境日志:"
            echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
            cat logs/dev.log
            echo ""
        fi
        if [ -f "logs/prod.log" ]; then
            echo "📄 生产环境日志:"
            echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
            cat logs/prod.log
            echo ""
        fi
        ;;
    *)
        echo "❌ 未知参数: $1"
        echo "可用参数: dev, prod, all"
        exit 1
        ;;
esac
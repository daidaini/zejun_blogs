#!/bin/bash

# 清理项目脚本
echo "🧹 清理项目..."

# 清理构建文件
echo "🗑️  清理构建文件..."
rm -rf .next out dist

# 清理日志文件
echo "🗑️  清理日志文件..."
find . -name "*.log" -delete

# 清理临时文件
echo "🗑️  清理临时文件..."
find . -name "*.tmp" -delete
find . -name ".DS_Store" -delete

# 清理缓存
echo "🗑️  清理缓存..."
rm -rf .cache
rm -rf node_modules/.cache

echo "✅ 项目清理完成"
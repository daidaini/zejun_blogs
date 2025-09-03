#!/bin/bash

# Next.js 项目自动构建和启动脚本
# 使用方法: ./deploy-nextjs.sh [项目目录] [端口号]

# 设置默认值
PROJECT_DIR=${1:-$(pwd)}
PORT=${2:-3000}
PROJECT_NAME=$(basename "$PROJECT_DIR")
PID_FILE="/tmp/nextjs-${PROJECT_NAME}-${PORT}.pid"
LOG_FILE="/tmp/nextjs-${PROJECT_NAME}-${PORT}.log"

# 颜色输出函数
print_info() {
    echo -e "\033[32m[INFO]\033[0m $1"
}

print_warn() {
    echo -e "\033[33m[WARN]\033[0m $1"
}

print_error() {
    echo -e "\033[31m[ERROR]\033[0m $1"
}

# 检查项目目录是否存在
check_project_dir() {
    if [ ! -d "$PROJECT_DIR" ]; then
        print_error "项目目录不存在: $PROJECT_DIR"
        exit 1
    fi
    
    if [ ! -f "$PROJECT_DIR/package.json" ]; then
        print_error "在 $PROJECT_DIR 中未找到 package.json 文件"
        exit 1
    fi
    
    print_info "项目目录: $PROJECT_DIR"
}

# 检查并停止现有进程
stop_existing_process() {
    print_info "检查端口 $PORT 上的现有进程..."
    
    # 方法1: 通过PID文件检查
    if [ -f "$PID_FILE" ]; then
        OLD_PID=$(cat "$PID_FILE")
        if kill -0 "$OLD_PID" 2>/dev/null; then
            print_warn "发现现有进程 (PID: $OLD_PID), 正在停止..."
            kill -TERM "$OLD_PID"
            sleep 3
            
            # 如果进程仍在运行，强制杀死
            if kill -0 "$OLD_PID" 2>/dev/null; then
                print_warn "进程未响应TERM信号，使用KILL信号强制停止..."
                kill -KILL "$OLD_PID"
                sleep 1
            fi
            print_info "进程已停止"
        fi
        rm -f "$PID_FILE"
    fi
    
    # 方法2: 通过端口检查并停止进程
    EXISTING_PID=$(lsof -ti:$PORT 2>/dev/null)
    if [ ! -z "$EXISTING_PID" ]; then
        print_warn "发现端口 $PORT 被进程 $EXISTING_PID 占用，正在停止..."
        kill -TERM $EXISTING_PID 2>/dev/null
        sleep 3
        
        # 检查进程是否仍在运行
        if kill -0 $EXISTING_PID 2>/dev/null; then
            print_warn "使用KILL信号强制停止进程..."
            kill -KILL $EXISTING_PID 2>/dev/null
        fi
        print_info "端口 $PORT 已释放"
    fi
}

# 安装依赖
install_dependencies() {
    print_info "检查并安装依赖..."
    cd "$PROJECT_DIR"
    
    # 检查是否有yarn.lock，优先使用yarn
    if [ -f "yarn.lock" ]; then
        if command -v yarn >/dev/null 2>&1; then
            print_info "使用 yarn 安装依赖..."
            yarn install --frozen-lockfile
        else
            print_warn "未找到 yarn，使用 npm 安装依赖..."
            npm ci
        fi
    else
        print_info "使用 npm 安装依赖..."
        npm ci
    fi
    
    if [ $? -ne 0 ]; then
        print_error "依赖安装失败"
        exit 1
    fi
}

# 构建项目
build_project() {
    print_info "开始构建项目..."
    cd "$PROJECT_DIR"
    
    # 检查是否有yarn.lock，优先使用yarn
    if [ -f "yarn.lock" ] && command -v yarn >/dev/null 2>&1; then
        yarn build
    else
        npm run build
    fi
    
    if [ $? -ne 0 ]; then
        print_error "项目构建失败"
        exit 1
    fi
    
    print_info "项目构建完成"
}

# 启动项目
start_project() {
    print_info "在后台启动项目 (端口: $PORT)..."
    cd "$PROJECT_DIR"
    
    # 创建日志文件
    touch "$LOG_FILE"
    
    # 在后台启动项目
    if [ -f "yarn.lock" ] && command -v yarn >/dev/null 2>&1; then
        nohup yarn start -p $PORT > "$LOG_FILE" 2>&1 &
    else
        nohup npm start -- -p $PORT > "$LOG_FILE" 2>&1 &
    fi
    
    # 保存进程ID
    echo $! > "$PID_FILE"
    
    print_info "项目已在后台启动 (PID: $!)"
    print_info "日志文件: $LOG_FILE"
    print_info "PID文件: $PID_FILE"
    
    # 等待几秒钟检查启动状态
    sleep 5
    
    if kill -0 $! 2>/dev/null; then
        print_info "✅ 项目启动成功！"
        print_info "🌐 访问地址: http://localhost:$PORT"
        print_info "📋 查看日志: tail -f $LOG_FILE"
        print_info "🛑 停止服务: kill \$(cat $PID_FILE)"
    else
        print_error "❌ 项目启动失败，请检查日志: $LOG_FILE"
        exit 1
    fi
}

# 显示使用帮助
show_help() {
    echo "Next.js 项目自动部署脚本"
    echo ""
    echo "使用方法:"
    echo "  $0 [项目目录] [端口号]"
    echo ""
    echo "参数:"
    echo "  项目目录    Next.js项目的根目录 (默认: 当前目录)"
    echo "  端口号      启动端口 (默认: 3000)"
    echo ""
    echo "示例:"
    echo "  $0                           # 在当前目录启动，使用端口3000"
    echo "  $0 /path/to/project          # 指定项目目录，使用端口3000"
    echo "  $0 /path/to/project 8080     # 指定项目目录和端口"
    echo ""
    echo "管理命令:"
    echo "  查看日志: tail -f /tmp/nextjs-项目名-端口.log"
    echo "  停止服务: kill \$(cat /tmp/nextjs-项目名-端口.pid)"
}

# 主函数
main() {
    # 检查是否请求帮助
    if [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
        show_help
        exit 0
    fi
    
    print_info "🚀 开始 Next.js 项目部署流程..."
    print_info "项目: $PROJECT_NAME"
    print_info "端口: $PORT"
    
#    check_project_dir
    stop_existing_process
 #   install_dependencies
    build_project
    start_project
    
    print_info "🎉 部署完成！"
}

# 执行主函数
main "$@"

---
title: "MCP (Model Context Protocol) 服务器和工具综合指南"
date: "2025-09-22"
category: "技术"
tags: ["mcp", "llm", "claude code"]
excerpt: "关于 MCP (Model Context Protocol) 服务器和工具的综合指南文档"
readTime: "30 分钟"
image: "/images/articles/4e0d35810bce98014c308caf6cd6c3ef.jpg"
---

## 概述

**模型上下文协议 (Model Context Protocol, MCP)** 是一个开源标准，它让大语言模型应用程序能够与外部数据源和工具无缝集成。你可以把 MCP 理解为"AI 应用程序的通用接口" - 它为 AI 系统连接外部资源提供了一套标准化的方法。

## 核心概念

### 主要组件

1. **服务器**：为大语言模型应用程序提供数据和功能
2. **客户端**：连接 MCP 服务器的应用程序 (如 Claude、ChatGPT、Claude Code)
3. **资源**：数据源 (类似于 REST API 中的 GET 端点 (endpoint))
4. **工具**：执行具体操作的函数 (类似于 POST 端点)
5. **提示模板**：用于大语言模型交互的可复用模板

### 架构优势

- **开发者**：降低开发时间和复杂度
- **AI 应用程序**：可以访问丰富的数据源和工具生态
- **终端用户**：获得功能更强大的 AI 应用，能够访问数据并执行实际操作

## 官方 MCP 生态系统

### 核心代码库

1. **主要规范**：https://github.com/modelcontextprotocol/modelcontextprotocol
   - 协议规范和文档
   - 官方 MCP 文档
   - TypeScript 模式定义，兼容 JSON Schema

2. **TypeScript SDK**：https://github.com/modelcontextprotocol/typescript-sdk
   - 官方 TypeScript 实现
   - 完整支持 MCP 规范
   - 标准传输方式 (stdio、Streamable HTTP)

3. **Python SDK**：https://github.com/modelcontextprotocol/python-sdk
   - 官方 Python 实现
   - FastMCP 快速开发框架
   - 多种传输选项

### 可用的开发工具包

MCP 项目提供多种编程语言的 SDK：
- TypeScript/JavaScript
- Python
- Java
- Kotlin
- C#
- Go
- PHP
- Ruby
- Rust
- Swift

## MCP 服务器注册表 (39 个可用服务器)

根据 https://github.com/mcp 上的 MCP 注册表，以下是当前可用的 MCP 服务器：

### 热门 MCP 服务器

1. **文件转换服务器** - 将各种文件格式 (PDF、Word、Excel、图片、音频) 转换为 Markdown
2. **Context7 服务器** - 获取任意代码库的最新版本文档和代码示例
3. **GitHub MCP 服务器** - 连接 AI 工具与 GitHub (读取代码库、管理 issue/PR、分析代码)
4. **Chrome/Playwright 服务器** - 自动化网页浏览器，用于测试和数据提取
5. **代码服务器** - 语义化代码检索和编辑工具
6. **Firecrawl 服务器** - 网页数据提取
7. **Notion 服务器** - Notion API 控制
8. **Unity 服务器** - 通过桥接和本地 Python 服务器控制 Unity 编辑器
9. **Azure 服务器** - Azure 平台集成
10. **Stripe 服务器** - Stripe API 交互

### 企业级开发工具

11. **Terraform 服务器** - 基础设施即代码自动化
12. **Microsoft Learn 服务器** - 访问 Microsoft 官方文档
13. **Azure DevOps 服务器** - Azure DevOps 服务集成
14. **Vite/Nuxt 服务器** - Vite/Nuxt 应用程序理解
15. **MongoDB 服务器** - 连接 MongoDB 数据库和 Atlas
16. **Elasticsearch 服务器** - Elasticsearch 搜索和交互
17. **Neon 服务器** - Neon 管理 API 和数据库
18. **Chroma 服务器** - 向量搜索和数据检索
19. **Sentry 服务器** - 应用程序错误和性能分析
20. **OpenTelemetry 服务器** - 通过 Logfire 访问链路追踪和指标

### AI 与机器学习

21. **Azure AI Foundry 服务器** - 统一的模型、知识库、评估工具
22. **计算机视觉服务器** - 本地图像处理 (OCR、目标检测等)
23. **Hugging Face 服务器** - 访问模型、数据集、Spaces、论文
24. **Dynatrace 服务器** - 实时可观测性和监控

### 云服务与基础设施

25. **AKS 服务器** - Azure Kubernetes Service 访问
26. **Eventhouse/ADX 服务器** - 使用 KQL 查询和管理事件流
27. **Box 服务器** - 安全的企业内容访问
28. **JFrog 服务器** - JFrog 平台服务访问
29. **Dev Box 服务器** - 管理开发环境、配置和资源池

### 商业与协作

30. **Postman 服务器** - Postman 集合自动化
31. **LaunchDarkly 服务器** - 功能开关管理和 A/B 测试
32. **Jira/Confluence 服务器** - 连接 Jira 和 Confluence 与大语言模型
33. **Zapier 服务器** - 访问 8,000+ 应用和 30,000+ 自动化操作
34. **Codacy 服务器** - 代码库质量、覆盖率和安全性
35. **Clarity 服务器** - 获取 Clarity 分析数据
36. **Webflow 服务器** - 设计上下文信息
37. **Devin 服务器** - 为公开代码库自动生成文档

## MCP 开发入门

### 环境要求

- Node.js v18.x 或更高版本 (TypeScript 开发)
- Python 3.8+ (Python SDK 开发)
- JSON-RPC 2.0 基础知识

### Python 快速开始

```python
from mcp.server.fastmcp import FastMCP

# 创建 MCP 服务器
mcp = FastMCP("Demo")

# 添加工具
@mcp.tool()
def add(a: int, b: int) -> int:
    """两数相加"""
    return a + b

# 添加资源
@mcp.resource("greeting://{name}")
def get_greeting(name: str) -> str:
    """获取个性化问候语"""
    return f"你好, {name}!"

# 添加提示模板
@mcp.prompt()
def greet_user(name: str, style: str = "friendly") -> str:
    """生成问候提示"""
    styles = {
        "friendly": "请写一个温暖友好的问候语",
        "formal": "请写一个正式专业的问候语",
    }
    return f"{styles.get(style, styles['friendly'])}，对象是一个名叫 {name} 的人。"

# 启动服务器
mcp.run()
```

### TypeScript 快速开始

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// 创建 MCP 服务器
const server = new McpServer({
    name: "demo-server",
    version: "1.0.0"
});

// 注册工具
server.registerTool(
    "add",
    {
        title: "加法工具",
        description: "计算两个数字的和",
        inputSchema: { a: z.number(), b: z.number() }
    },
    async ({ a, b }) => ({
        content: [{ type: "text", text: String(a + b) }]
    })
);

// 启动服务器
const transport = new StdioServerTransport();
await server.connect(transport);
```

## 高级功能特性

### 1. 资源管理

资源向大语言模型提供数据，类似于 GET 端点：

```python
# 静态资源
@mcp.resource("config://app")
def get_config() -> str:
    return """{"theme": "dark", "language": "zh-CN"}"""

# 动态参数化资源
@mcp.resource("users://{userId}/profile")
def get_user_profile(userId: str) -> str:
    return f"用户 {userId} 的个人资料数据"
```

### 2. 工具函数

工具执行具体操作，可能产生副作用：

```python
@mcp.tool()
def calculate_bmi(weight_kg: float, height_m: float) -> float:
    """计算身体质量指数 (BMI)"""
    return weight_kg / (height_m * height_m)

@mcp.tool()
async def fetch_weather(city: str) -> str:
    """获取指定城市的天气信息"""
    response = await fetch(f"https://api.weather.com/{city}")
    return await response.text()
```

### 3. 提示模板

提示模板是可复用的交互模板：

```python
@mcp.prompt()
def review_code(code: str) -> str:
    """代码审查最佳实践"""
    return f"请审查以下代码的最佳实践：\n\n{code}"
```

### 4. 结构化输出

工具可以返回结构化的数据：
```python
from pydantic import BaseModel

class WeatherData(BaseModel):
    temperature: float
    humidity: float
    condition: str

@mcp.tool()
def get_weather(city: str) -> WeatherData:
    return WeatherData(
        temperature=22.5,
        humidity=45.0,
        condition="晴朗"
    )
```

### 5. 上下文和高级能力

MCP 服务器可以访问上下文信息和高级功能：

```python
@mcp.tool()
async def process_data(data: str, ctx: Context) -> str:
    # 日志记录
    await ctx.info(f"正在处理: {data}")

    # 进度报告
    await ctx.report_progress(progress=0.5, total=1.0)

    # 资源读取
    resource = await ctx.read_resource("config://settings")

    return f"处理完成: {data}"
```

## 传输协议选项

### 1. Stdio (标准输入输出)
- 简单的命令行集成方式
- 通过标准输入输出直接通信
- 最适合本地开发和命令行工具

### 2. Streamable HTTP
- 服务器发送事件 (SSE) 的现代化替代方案
- 支持有状态和无状态模式
- 在多节点部署中具有更好的扩展性
- 支持跨域资源共享 (CORS)，适用于浏览器客户端

### 3. SSE (服务器发送事件)
- 正在逐步淘汰的传统传输方式
- 仍保持向后兼容性支持

## 服务器部署方案

### 开发环境

```bash
# 使用 Python SDK
uv run mcp dev server.py

# 使用 TypeScript SDK
npm run dev
```

### 生产环境部署

#### Streamable HTTP 服务器
```python
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("生产环境服务器")

# 集成到现有 ASGI 应用程序
from starlette.applications import Starlette
from starlette.routing import Mount

app = Starlette(
    routes=[
        Mount("/mcp", app=mcp.streamable_http_app()),
    ]
)
```

#### Claude Desktop 集成
```bash
# 在 Claude Desktop 中安装服务器
uv run mcp install server.py

# 使用自定义名称和环境变量
uv run mcp install server.py --name "我的服务器" -v API_KEY=abc123
```

## 身份认证与安全

### OAuth 2.1 支持

MCP 服务器可以为受保护资源实现 OAuth 2.1 认证：

```python
from mcp.server.auth.provider import AccessToken, TokenVerifier
from mcp.server.auth.settings import AuthSettings

class MyTokenVerifier(TokenVerifier):
    async def verify_token(self, token: str) -> AccessToken | None:
        # 实现令牌验证逻辑
        pass

mcp = FastMCP(
    "受保护的服务器",
    token_verifier=MyTokenVerifier(),
    auth=AuthSettings(
        issuer_url="https://auth.example.com",
        resource_server_url="https://my-server.com",
        required_scopes=["user"]
    )
)
```

## 最佳实践指南

### 1. 工具设计原则
- 保持工具功能单一且专注
- 使用清晰描述性的名称和说明
- 提供完善的输入验证
- 优雅地处理异常情况

### 2. 资源管理策略
- 使用资源来提供数据，而非执行计算
- 实现合理的缓存策略
- 对需要参数的数据使用动态资源

### 3. 错误处理机制
- 提供有意义的错误信息
- 使用恰当的 HTTP 状态码
- 记录错误日志便于调试

### 4. 性能优化建议
- 对复杂数据使用结构化输出
- 为大数据集实现分页功能
- 在 I/O 操作中使用异步编程

## 社区资源

### 官方资源
- **文档站点**：https://modelcontextprotocol.io
- **协议规范**：https://github.com/modelcontextprotocol/modelcontextprotocol
- **服务器注册表**：https://github.com/mcp
- **社区讨论**：https://github.com/modelcontextprotocol/modelcontextprotocol/discussions

### 开发工具
- **MCP Inspector**：测试和调试工具
- **FastMCP**：Python 快速开发框架
- **命令行工具**：服务器管理的命令行界面

### 学习资源
- **代码示例**：SDK 代码库包含完整示例
- **教程文档**：官方文档网站
- **社区支持**：GitHub 讨论区和问题反馈

## 实际应用场景

### 1. 增强型 AI 助手
- 连接 Google Calendar 和 Notion
- 访问个人文件和文档
- 集成各种通信工具

### 2. 开发工具集成
- Claude Code 可从 Figma 设计生成网页应用
- 自动化代码审查和重构
- 数据库集成和数据分析

### 3. 企业级应用
- 连接组织内多个数据库系统
- 集成商业智能分析工具
- 自动化业务流程

### 4. 创意设计工具
- 在 Blender 中实现 AI 驱动的 3D 设计
- 自动化 3D 打印工作流程
- 图像和视频智能处理

## 总结

MCP 为 AI 应用程序连接外部系统提供了强大而标准化的解决方案。凭借其不断壮大的 39+ 服务器生态系统、多种编程语言的完整 SDK 支持，以及在身份认证、传输协议和部署方面的强大功能，MCP 正在成为 AI 应用集成的行业标准。

该协议在设计时优先考虑了安全性、可扩展性和开发者体验，使其既适用于简单的本地工具，也能满足企业级 AI 应用的需求。随着生态系统的持续发展，我们可以期待看到更多专业化的服务器和创新的应用场景不断涌现。

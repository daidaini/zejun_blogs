---
title: "使用Claude Code入门"
date: "2025-08-17"
category: "技术"
tags: ["ai", "claude-code", "ai agent", "vibe coding"]
excerpt: "如何更有效率地使用AI编程工具ClaudeCode"
readTime: "8 分钟"
author: "泽君"
image: "/images/articles/article_1.jpg"  # 文章封面图（可选）
---

## 安装
```
npm install -g @anthropic-ai/claude-code
```

## 使用
```bash
# 以这个选项启动, 可以免除不断的安全确认
claude --dangerously-skip-permissions
```


## 关于CLAUDE.md
`CLAUDE.md` 文件可放在**项目根目录、上级目录以及下级目录。**

- **当前目录及上级目录：​**Claude Code总是从[**当前工作目录**](https://docs.anthropic.com/en/docs/claude-code/memory?ref=ivensliaoblog.com#how-claude-looks-up-memories)开始，向上递归至根目录`/`，并读取找到的所有 CLAUDE.md 或 CLAUDE.local.md 文件。
- **下级目录**：只有当 Claude 读取这些子树中的文件时才会被包含进来

### 一些使用规则
- 使用 `/init` 初始化 CLAUDE.md 文档，Claude Code 会自动在 Project 根目录创建规则文档。
- 使用 `#` 自动修改规则文件
- 使用 `/memory` 快速打开规则文件

### 一个示例
```bash
# Bash 命令
- npm run build：构建项目  
- npm run typecheck：运行类型检查器

# 代码风格
- 使用 ES 模块（import/export）语法，避免使用 CommonJS（require）  
- 尽可能使用解构导入（例如：import { foo } from 'bar'）

# 工作流程
- 完成一系列代码更改后务必运行类型检查  
- 为了性能，优先运行单个测试而不是整个测试套件
```

### 最佳实践

- **具体明确**：与其写“格式化代码”，不如写“使用 2 个空格缩进”这样更具体。
- **使用结构组织内容**：将每条内存格式化为项目符号，并使用有描述性的 Markdown 标题对相关内容进行分组。
- **定期审查**：随着项目发展，及时更新内存，确保 Claude 始终使用最新的信息和上下文。


[小贴士：用文档引用管理大型 CLAUDE.md 文件](https://www.reddit.com/r/ClaudeAI/comments/1lr6occ/tip_managing_large_claudemd_files_with_document/?tl=zh-hans)



## MCP
```shell
# 上下文
claude mcp add --transport http context7 https://mcp.context7.com/mcp

# 搜索
claude mcp add browsermcp npx @browsermcp/mcp@latest

```


## 全局提示词
该提示词也适用于 `Augment`或`Cursor`等等
```markdown
## Code Architecture

- 编写代码的硬性指标，包括以下原则：
  （1）对于 Python、JavaScript、TypeScript 等动态语言，尽可能确保每个代码文件不要超过 200 行
  （2）对于 Java、Go、Rust 等静态语言，尽可能确保每个代码文件不要超过 250 行
  （3）每层文件夹中的文件，尽可能不超过 8 个。如有超过，需要规划为多层子文件夹
- 除了硬性指标以外，还需要时刻关注优雅的架构设计，避免出现以下可能侵蚀我们代码质量的「坏味道」：
  （1）僵化 (Rigidity): 系统难以变更，任何微小的改动都会引发一连串的连锁修改。
  （2）冗余 (Redundancy): 同样的代码逻辑在多处重复出现，导致维护困难且容易产生不一致。
  （3）循环依赖 (Circular Dependency): 两个或多个模块互相纠缠，形成无法解耦的“死结”，导致难以测试与复用。
  （4）脆弱性 (Fragility): 对代码一处的修改，导致了系统中其他看似无关部分功能的意外损坏。
  （5）晦涩性 (Obscurity): 代码意图不明，结构混乱，导致阅读者难以理解其功能和设计。
  （6）数据泥团 (Data Clump): 多个数据项总是一起出现在不同方法的参数中，暗示着它们应该被组合成一个独立的对象。
  （7）不必要的复杂性 (Needless Complexity): 用“杀牛刀”去解决“杀鸡”的问题，过度设计使系统变得臃肿且难以理解。
- 【非常重要！！】无论是你自己编写代码，还是阅读或审核他人代码时，都要严格遵守上述硬性指标，以及时刻关注优雅的架构设计。
- 【非常重要！！】无论何时，一旦你识别出那些可能侵蚀我们代码质量的「坏味道」，都应当立即询问用户是否需要优化，并给出合理的优化建议。
```

## 国产模型嵌入

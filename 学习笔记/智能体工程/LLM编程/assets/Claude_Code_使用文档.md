# Claude Code 使用文档

> Claude Code 是 Anthropic 官方推出的命令行 AI 编程助手，基于 Claude 模型，帮助你在终端中完成软件开发任务。

---

## 目录

1. [简介](#1-简介)
2. [安装与配置](#2-安装与配置)
3. [基本使用](#3-基本使用)
4. [核心功能](#4-核心功能)
5. [Slash 命令](#5-slash-命令)
6. [键盘快捷键](#6-键盘快捷键)
7. [钩子系统 (Hooks)](#7-钩子系统-hooks)
8. [记忆系统](#8-记忆系统)
9. [MCP 服务器](#9-mcp-服务器)
10. [配置文件](#10-配置文件)
11. [最佳实践](#11-最佳实践)
12. [常见问题](#12-常见问题)

---

## 1. 简介

Claude Code 是 Anthropic 推出的**命令行交互式编程助手**，它：

- 直接在终端中运行，与你的开发环境深度集成
- 能够读写文件、执行命令、管理 Git、搜索代码
- 支持多文件编辑、代码重构、Bug 修复、测试编写等常见开发任务
- 使用 **Claude Opus 4.7 / Sonnet 4.6 / Haiku 4.5** 等最新模型
- 支持 Windows、macOS、Linux

### 适用场景

| 场景 | 说明 |
|------|------|
| 代码生成 | 根据描述生成代码文件、函数、组件 |
| Bug 修复 | 分析错误日志、定位问题、修复代码 |
| 代码重构 | 重命名、提取函数、修改架构 |
| 代码审查 | 审查 PR 差异、发现潜在问题 |
| 测试编写 | 生成单元测试、集成测试 |
| 项目初始化 | 搭建项目脚手架、配置文件 |
| 文档生成 | 生成 API 文档、README |
| Git 操作 | 创建提交、推送、创建 PR |

---

## 2. 安装与配置

### 2.1 安装方式

#### 方式一：npm 全局安装（推荐）

```bash
npm install -g @anthropic-ai/claude-code
```

#### 方式二：通过 Claude Code 桌面应用

从 Anthropic 官网下载桌面应用，内置 CLI。

### 2.2 快速启动

在项目目录中运行：

```bash
claude
```

首次启动会提示：
1. 登录 Anthropic 账号
2. 选择工作目录
3. 设置权限模式

### 2.3 权限模式

Claude Code 提供三种权限模式：

| 模式 | 说明 |
|------|------|
| **允许所有** | 自动允许所有命令，适合可信项目 |
| **每次询问** | 每次执行命令前询问确认 |
| **禁止所有** | 阻止所有命令执行，仅对话 |

你可以在 `.claude/settings.json` 中为特定命令设置自动允许。

---

## 3. 基本使用

### 3.1 启动对话

```bash
# 在当前目录启动
claude

# 指定目录启动
claude /path/to/project

# 从标准输入传入提示
echo "解释这个项目" | claude

# 在非交互模式下运行单条命令
claude -p "解释 package.json"
```

### 3.2 对话方式

启动后进入交互式 REPL 模式，你可以：

- **直接输入自然语言指令**：如"帮我创建一个 React 组件"
- **输入 slash 命令**：如 `/help`
- **输入 shell 命令**：以 `!` 开头，如 `!git status`

### 3.3 发送消息

- **Enter**：提交消息（单行）
- **Shift+Enter**：换行（多行消息）
- 消息会被发送给 Claude 处理

---

## 4. 核心功能

### 4.1 文件操作

Claude Code 可以自动读写、编辑、创建文件：

```
帮我创建一个 src/utils/helpers.py 文件，包含日期格式化工具函数
```

底层使用以下工具：
- **Read** — 读取文件内容
- **Write** — 写入/覆盖文件
- **Edit** — 精确字符串替换编辑
- **Glob** — 按模式搜索文件路径
- **Grep** — 按内容搜索文件

### 4.2 命令执行

Claude Code 可以直接运行终端命令：

```
运行测试：pytest tests/
安装依赖：npm install
查看 Git 状态：!git status
```

在对话中直接输入命令，或用 `!` 前缀强制作为 shell 命令。

### 4.3 Git 集成

```
# 查看状态
看一下当前 Git 状态

# 创建提交
帮我提交这些更改，消息是"修复登录页面的样式问题"

# 创建 PR
为当前分支创建一个 Pull Request

# 查看历史
显示最近的 5 次提交
```

Claude Code 会：
- 分析 `git status`、`git diff` 来了解更改
- 根据项目提交风格生成提交消息
- 使用 `gh` CLI 创建 PR

### 4.4 代码搜索与理解

```
# 查找文件
查找所有 React 组件文件

# 搜索代码
搜索所有使用 useState 的地方

# 理解代码
解释 src/auth 目录的架构和职责
```

### 4.5 多文件编辑

Claude Code 擅长跨多个文件进行协调修改：

```
将 UserService 重命名为 AccountService，更新所有引用
```

### 4.6 代理模式 (Agent)

对于复杂任务，Claude Code 可以启动子代理来处理：

```python
# 使用 Agent 工具可以让子代理并行执行任务
# 例如：同时在前端和后端进行修改
```

子代理类型包括：
- **Explore** — 快速只读搜索
- **Plan** — 设计实现方案
- **claude** — 通用任务处理

---

## 5. Slash 命令

Claude Code 提供以下内置命令：

| 命令 | 描述 |
|------|------|
| `/help` | 显示帮助信息 |
| `/clear` | 清除对话历史 |
| `/config` | 查看或修改配置（主题、模型等） |
| `/cost` | 查看当前会话的 token 使用量和费用 |
| `/fast` | 切换快速模式（更快输出，使用 Opus） |
| `/loop <间隔> <命令>` | 按间隔重复执行命令 |
| `/memory` | 查看 Claude Code 记住的信息 |
| `/review` | 审查当前分支的代码更改 |
| `/security-review` | 对当前更改进行安全审查 |

### /loop 命令

```bash
# 每 5 分钟检查一次部署状态
/loop 5m 检查部署是否成功

# 持续监控（自定节奏）
/loop 持续监控测试流水线
```

---

## 6. 键盘快捷键

### 默认快捷键

| 快捷键 | 功能 |
|--------|------|
| **Enter** | 提交消息 |
| **Shift+Enter** | 换行 |
| **Up/Down** | 浏览历史消息 |
| **Ctrl+C** | 取消当前操作 |
| **Ctrl+D** | 退出 Claude Code |
| **Tab** | 自动补全 |

### 自定义快捷键

自定义快捷键配置文件位于 `~/.claude/keybindings.json`：

```json
{
  "keys": [
    {
      "key": "ctrl+s",
      "command": "submit"
    },
    {
      "key": "ctrl+shift+c",
      "command": "cancel"
    },
    {
      "key": "ctrl+r",
      "command": "reject"
    }
  ]
}
```

---

## 7. 钩子系统 (Hooks)

钩子系统允许你在特定事件发生时自动执行脚本。

### 配置文件位置

`.claude/settings.json` 中的 `hooks` 字段：

```json
{
  "hooks": {
    "PreMessage": {
      "command": "./scripts/pre-validate.sh",
      "timeout": 5000
    },
    "PostMessage": {
      "command": "./scripts/post-process.sh"
    },
    "PreToolCall": {
      "command": "./scripts/pre-tool.sh"
    },
    "PostToolCall": {
      "command": "./scripts/post-tool.sh"
    }
  }
}
```

### 钩子类型

| 钩子 | 触发时机 | 用途 |
|------|----------|------|
| `PreMessage` | 消息发送前 | 代码检查、环境准备 |
| `PostMessage` | 消息回复后 | 格式化、通知 |
| `PreToolCall` | 工具调用前 | 权限检查、日志 |
| `PostToolCall` | 工具调用后 | 结果处理、清理 |
| `UserPromptSubmit` | 用户提交提示后 | 内容过滤、增强 |
| `PreResponse` | 响应生成前 | 上下文注入 |

### 用户提示钩子

`UserPromptSubmit` 钩子的标准输出（stdout）返回给 AI，stderr 返回给用户。这允许钩子注入额外的上下文：

```bash
#!/bin/bash
# 检测当前分支信息注入给 AI
echo "当前分支: $(git branch --show-current)"
echo "最新提交: $(git log -1 --oneline)"
```

---

## 8. 记忆系统

Claude Code 拥有基于文件的持久记忆系统，可以在会话间保留信息。

### 存储位置

```
~/.claude/projects/<project-hash>/memory/
├── MEMORY.md        # 索引文件（始终加载到上下文）
├── user_role.md     # 用户角色信息
├── feedback.md      # 行为反馈
├── project_goals.md # 项目目标
└── reference.md     # 外部资源引用
```

### 记忆类型

| 类型 | 用途 | 示例 |
|------|------|------|
| **user** | 用户角色、偏好、知识背景 | "用户是资深 Go 开发者" |
| **feedback** | 行为指导和纠偏 | "不要 mock 数据库" |
| **project** | 项目目标、约束、进展 | "合并冻结到 3月5日" |
| **reference** | 外部系统信息位置 | "Bug 跟踪在 Linear INGEST 项目" |

### 记忆格式

```markdown
---
name: user-role
description: 用户的角色、技术背景和工作职责
metadata:
  type: user
---

用户是全栈开发工程师，熟悉 React 和 Python。
对测试覆盖率要求严格。
偏好简洁的代码风格，不欢迎过多注释。

**关于：** 参考 [[testing-preferences]] 了解测试偏好。
```

---

## 9. MCP 服务器

MCP (Model Context Protocol) 允许 Claude Code 连接外部工具和数据源。

### 配置方式

在 `.claude/settings.json` 中配置 MCP 服务器：

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/dir"],
      "env": {}
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_xxx"
      }
    },
    "database": {
      "command": "node",
      "args": ["./mcp-servers/db-query.js"],
      "env": {}
    }
  }
}
```

### 常用 MCP 服务器

| 服务器 | 功能 | 安装 |
|--------|------|------|
| `filesystem` | 安全的文件系统访问 | `npx @modelcontextprotocol/server-filesystem` |
| `github` | GitHub API 集成 | `npx @modelcontextprotocol/server-github` |
| `postgres` | PostgreSQL 数据库查询 | `npx @modelcontextprotocol/server-postgres` |
| `puppeteer` | 浏览器自动化 | `npx @modelcontextprotocol/server-puppeteer` |
| `brave-search` | 网络搜索 | `npx @modelcontextprotocol/server-brave-search` |

MCP 服务器的配置层级：
1. **项目级**：`.claude/settings.json` — 仅当前项目
2. **用户级**：`~/.claude/settings.json` — 所有项目
3. **全局级**：Claude Code 安装目录下的默认配置

---

## 10. 配置文件

### settings.json

配置文件位置（优先级从高到低）：

1. `.claude/settings.local.json` — 本地覆盖（不提交 Git）
2. `.claude/settings.json` — 项目配置
3. `~/.claude/settings.json` — 用户全局配置

```json
{
  "model": "claude-sonnet-4-6",
  "permissions": {
    "allow": [
      "npm test",
      "npm run build",
      "git status",
      "git diff",
      "git log"
    ],
    "disallow": [
      "rm -rf /"
    ]
  },
  "hooks": {
    "PreMessage": {
      "command": "echo '准备处理你的请求'"
    }
  },
  "mcpServers": {},
  "theme": "dark",
  "maxTokens": 4096
}
```

### CLAUDE.md

项目根目录的 `CLAUDE.md` 文件用于记录项目特定的约定和指南：

```markdown
# 项目指南

## 技术栈
- 前端：React 18 + TypeScript
- 后端：Python 3.11 + FastAPI
- 数据库：PostgreSQL 15

## 代码约定
- 使用函数组件和 Hooks，不使用类组件
- 后端 API 路由使用 `/api/v1/` 前缀
- 所有公共函数必须有类型注解

## 测试
- 前端：Vitest + Testing Library
- 后端：pytest
- 运行测试：npm test（前端）/ pytest（后端）

## 构建与部署
- 构建：npm run build
- Docker：docker-compose up --build
```

---

## 11. 最佳实践

### 11.1 编写有效提示

**不好的提示：**
```
修复这个 bug
```

**好的提示：**
```
src/components/Login.jsx 第 42 行，useEffect 的依赖数组缺少了 
user.id，导致登录状态切换时不会刷新。修复它。
```

### 11.2 任务分解

对于复杂任务，先让 Claude 制定计划再实施：

```
我想给应用添加用户认证功能。先分析代码库结构，然后给出实施方案。
```

或在计划模式下工作：

```
/plan 添加用户认证功能
```

### 11.3 权限管理

- 对可信项目，在 `settings.json` 中配置自动允许命令列表
- 使用 `disallow` 阻止危险命令
- 对于敏感操作（git push --force 等），保持每次确认

### 11.4 高效协作

- **明确范围**：指定要修改的文件和具体位置
- **分步确认**：大任务分多步完成，每步确认结果
- **使用记忆**：让 Claude 记住你的偏好，减少重复说明

### 11.5 上下文管理

- 定期使用 `/clear` 清理对话
- 将项目规范写入 `CLAUDE.md`
- 长时间任务使用 `TaskCreate` 跟踪进度

### 11.6 安全注意事项

- 不要将敏感信息（API 密钥、密码）写入对话
- 使用 `.gitignore` 排除 `settings.local.json`
- 审查 Claude 建议的依赖包版本
- 对自动生成的代码进行安全审查（`/security-review`）

---

## 12. 常见问题

### Q: Claude Code 如何处理大型文件？

对于大文件，Claude Code 会自动分页读取，只读取必要的部分。你也可以指定读取行数范围。

### Q: 如何减少权限提示？

使用 `/fewer-permission-prompts` 命令，Claude 会扫描对话历史并生成权限白名单。

### Q: 可以在 CI/CD 中使用吗？

可以。Claude Code 支持非交互模式：

```bash
claude -p "运行测试并检查覆盖率"
```

### Q: 对话历史存储在哪里？

对话存储在本地，不会自动同步到云端。使用 `/clear` 可以清空当前对话。

### Q: 如何切换模型？

```bash
# 在对话中使用
/config model

# 或启动时指定
claude --model claude-opus-4-7
```

### Q: 支持哪些 Claude 模型版本？

- **Claude Opus 4.7** (`claude-opus-4-7`) — 最强能力，适合复杂任务
- **Claude Sonnet 4.6** (`claude-sonnet-4-6`) — 速度与质量的平衡
- **Claude Haiku 4.5** (`claude-haiku-4-5-20251001`) — 快速响应，适合简单任务

### Q: 如何退出 Claude Code？

- 输入 `exit` 或按 `Ctrl+D`
- 对长时间运行的任务，使用 `TaskStop` 停止

### Q: 安装时遇到权限问题？

```
# 使用 npm 全局安装需要适当权限
npm install -g @anthropic-ai/claude-code
```

在 Windows 上，确保 Node.js 和 npm 已正确安装并添加到 PATH。

---

## 附录

### A. CLI 参数参考

```
Usage: claude [options] [directory]

Options:
  -p, --print <prompt>   非交互模式，处理提示后退出
  --model <model>        指定模型
  --theme <theme>        指定主题
  --verbose              启用详细日志
  -v, --version          显示版本号
  --help                 显示帮助
```

### B. 工具参考

| 工具 | 功能 | 替代的 CLI 命令 |
|------|------|-----------------|
| Read | 读取文件 | cat, head, tail |
| Write | 写入文件 | echo >, cat <<EOF |
| Edit | 编辑文件 | sed, awk |
| Glob | 搜索文件 | find, ls -R |
| Grep | 搜索内容 | grep, rg |
| Bash | 执行命令 | — |
| WebFetch | 获取网页 | curl |
| WebSearch | 搜索网络 | — |

---

> 本文档最后更新：2026-05-21
> Claude Code 版本：最新版
> 更多信息请访问 [Anthropic 官方文档](https://docs.anthropic.com/en/docs/claude-code)

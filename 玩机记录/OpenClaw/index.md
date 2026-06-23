# OpenClaw

## 安装

### 普通安装

> 安装环境：自家 NAS 的虚拟机——Ubuntu server 20.04

1. 安装 Nodejs（软件包版本过低的情况下）

2. 获取模型 API key

3. 脚本安装 OpenClaw，并按照向导部署，可进入快速引导，并跳过大部分

   ```shell
   curl -fsSL https://openclaw.ai/install.sh | bash
   ```

   选择自定义服务器商

4. 安装 qq 插件及渠道

   ```shell
   # 安装 QQ 插件
   openclaw plugins install @sliverp/qqbot@latest
   
   # 添加机器人频道（替换为你的 token）
   openclaw channels add --channel qqbot --token "你的机器人Token"
   
   # 重启网关
   openclaw gateway restart
   ```

### Docker 容器安装

Docker Compose 

```yaml
services:
  openclaw:
    image: ghcr.io/openclaw/openclaw:latest
    container_name: openclaw
    restart: unless-stopped
    ports:
      - "18789:18789"          # Control UI 端口
    volumes:
      - ./config:/home/node/.openclaw
      - /var/run/docker.sock:/var/run/docker.sock
      - /vol2/1000/scripts:/home/node/tintin/scripts
      - /vol1/1000/media/TVs:/home/node/tintin/media/TVs
      - /vol1/1000/media/downloads/stream-rec:/home/node/tintin/media/downloads/stream-rec
    group_add:
      - 994  # 加入docker组 使其获得 socket 的访问权限
    environment:
      HOME: /home/node
      OPENCLAW_HOME: /home/node
      TERM: xterm-256color
      OPENCLAW_STATE_DIR: /home/node/.openclaw
      OPENCLAW_CONFIG_PATH: /home/node/.openclaw/openclaw.json
      OPENCLAW_CONFIG_DIR: /home/node/.openclaw
      OPENCLAW_WORKSPACE_DIR: /home/node/.openclaw/workspace
      #OPENCLAW_GATEWAY_TOKEN: ${OPENCLAW_GATEWAY_TOKEN:-}
      #OPENCLAW_ALLOW_INSECURE_PRIVATE_WS: ${OPENCLAW_ALLOW_INSECURE_PRIVATE_WS:-}
```

进入 openclaw 命令行

```bash
docker exec -it openclaw bash 
```

## 基础操作

```bash
# 查看所有可用命令
openclaw --help
 
# 查看 OpenClaw 版本
openclaw --version

# 升级 OpenClaw 版本
openclaw update
```

## 初始化&配置

初始化

```shell
openclaw onboard --install-daemon
```

后续重新配置

```shell
openclaw configure [--section xxx]
```

手动配置，支持热部署

```bash
nano /home/node/.openclaw/openclaw.json
```

## 本地访问

```shell
# 官方推荐 浏览器里打开 Dashboard
openclaw dashboard
# 终端界面
openclaw tui
```

## 远程访问

由于担心大家所说的安全问题，例如 openclaw 安装在了 NAS 上的 Ubuntu20.04 虚拟机中。而 openclaw 默认情况下，Gateway 服务只监听本地环回地址（`127.0.0.1`）。

因此想要在日常使用的机子上使用 openclaw chat 只有两种方法：

1. 连接 ssh 然后 执行 `openclaw tui` 打开终端界面
2. 在主力机终端中，通过 SSH 转发 openclaw 网关的端口 `ssh -N -L 18789:127.0.0.1:18789 用户名@服务器ip` 建立安全隧道，接着在本机访问网关即可

## 网关操作

```shell
# 启动 OpenClaw 网关服务
openclaw gateway start
 
# 停止网关服务
openclaw gateway stop
 
# 查看网关运行状态
openclaw gateway status
 
# 重启网关服务
openclaw gateway restart
```

## 健康检查

```shell
# 整体状态
openclaw status
# 自检
openclaw doctor
# 自动修复常见问题（权限、目录、配置错误）
openclaw doctor --fix
# 网关状态
openclaw gateway status
# 查看日志
openclaw logs
```

## 模型选择与配置

### 设置模型

1. 使用提供商进行身份验证（通常通过 `openclaw onboard/configure`）。

2. 设置默认模型：

   ```json
   {
     agents: { defaults: { model: { primary: "anthropic/claude-opus-4-6" } } },
   }
   ```

### 性价比模型选择

[最便宜 LLM API 排行榜 2026：免费额度、无需信用卡、低成本 AI API](https://yangmao.ai/zh/tools/cheapest-llm-api-leaderboard/)

##  智能体 Agent 

### Agent 概述

OpenClaw 只运行一个单一智能体 Agent 时，每个 Gateway 网关一个智能体进程，拥有自己的工作区、引导文件和会话存储。

工作区：默认位置：`~/.openclaw/workspace`，包含以下引导文件

* `AGENTS.md`：操作指令
* `SOUL.md`：人设和语气
* `USER.md` - 用户是谁
* `IDENTITY.md` - 名称、气质、emoji
* `TOOLS.md` - 本地工具约定，不控制哪些工具存在；它只是说明你希望如何使用它们。
* `HEARTBEAT.md` - 心跳检查清单
* `BOOT.md` - 启动检查清单
* `BOOTSTRAP.md` - 首次运行仪式
* `memory/YYYY-MM-DD.md` - 每日记忆日志
* `MEMORY.md` - 精选长期记忆（可选）
* `skills/` - 工作区 Skills（可选）
* `canvas/` - Canvas UI 文件（可选）

会话：位置：`~/.openclaw/agents/<agentId>/sessions/<SessionId>.jsonl`

### Agent 工作区



### Agent 技能

每个 Skills 都是一个目录，其中包含带有 YAML frontmatter 和说明的 `SKILL.md`。

OpenClaw 的 Skills 来源，优先级从高到低：

| #    | 来源               | 路径                            |
| :--- | :----------------- | :------------------------------ |
| 1    | 工作区 Skills      | `<workspace>/skills`            |
| 2    | 项目智能体 Skills  | `<workspace>/.agents/skills`    |
| 3    | 个人智能体 Skills  | `~/.agents/skills`              |
| 4    | 托管/本地 Skills   | `~/.openclaw/skills`            |
| 5    | 内置 Skills        | 随安装包提供                    |
| 6    | 额外 Skills 文件夹 | `skills.load.extraDirs`（配置） |

为 OpenClaw 扩展流行的技能：[ClawHub](https://clawhub.ai/)

## 多 Agent 协作

### 多 Agent 架构

OpenClaw 支持运行多个_隔离_智能体，每个智能体都有：

- 工作区：文件、AGENTS.md/SOUL.md/USER.md、本地笔记、人格规则。
- 状态目录：`agentDir`，用于凭证配置、模型注册表和按智能体划分的配置。
- 会话存储：聊天历史 + 路由状态，位于 `~/.openclaw/agents/<agentId>/sessions` 下。

### 多 Agent 的两种组织方式

* Multi-Agent：永久运行，独立配置文件，适用于长期、稳定的角色分工，需要明确划分职责和权限的场景

  * 命令行创建：`openclaw agents add` 命令

    ```bash
    # 1. 添加代理
    openclaw agents add work
    openclaw agents add personal
    
    # 2. 查看代理列表
    openclaw agents list --bindings
    
    # 3. 为每个代理配置通道
    openclaw channels login --channel whatsapp --account work
    openclaw channels login --channel telegram --account personal
    
    # 4. 编辑配置绑定路由
    openclaw config set bindings '[
      {"agentId":"work","match":{"channel":"whatsapp","accountId":"work"}},
      {"agentId":"personal","match":{"channel":"telegram","accountId":"personal"}}
    ]' --strict-json
    
    # 5. 重启生效
    openclaw gateway restart
    ```

  * 直接在 `openclaw.json` 配置文件中声明 Agent

* Main-Agent + Sub-Agent：临时性，任务完成后即销毁，适用于临时、复杂的单一任务，需要灵活拆解和高效并行的场景

  * 通过 `session_spawn` 命令动态创建

### 删除 Agent 

```bash
# 1. 从配置中移除 work 代理
openclaw config unset agents.list[-1]

# 或者如果列表里有多个：
openclaw config set agents.list '[]' --strict-json --replace

# 2. 删除物理文件夹（可选）
rm -rf ~/.openclaw/workspace/work
rm -rf ~/.openclaw/agents/work

# 3. 重启生效
openclaw gateway restart
```

## 会话与记忆管理

聊天窗口内：

- `/new`：开启全新会话，适合切换话题
- `/reset`：清空当前会话的短期上下文，但无法清除长期记忆（如个人信息、使用偏好），适合重置当前话题。
- `/compact`：将较旧的对话历史总结成一个简短的摘要，以此来释放上下文窗口的空间 。
- `/clear`：仅清空聊天窗口显示内容，不会删除历史上下文。

删除智能体的记忆缓存

- memory 目录保存 AI 模型基于过往交互构建的长期记忆（含 SQLite 数据库与 Markdown 摘要），属于隐私高风险数据源。直接删除可彻底抹除模型“记住”的用户行为痕迹。
- `rm -rf ~/.openclaw/memory`

删除智能体的工作区

- workspace 目录存储用户显式执行的任务输入、输出及中间产物，是历史记录最集中区域。该方法适用于 CLI 仍可调用且需保留核心配置（如 API 密钥、状态数据库）的场景。

- ```bash
  openclaw gateway stop
  openclaw uninstall --workspace --yes
  ```

## Hearbeat 机制

Heartbeat 并非轻量级”心跳检测”，而是一个完整的 Agent 轮次。每次触发都会执行诸如以下操作：
1. 加载整个工作区目录和引导文件（AGENTS.md、HEARTBEAT.md 等）
2. 构建完整的会话上下文（包括对话历史、系统提示词）
3. 调用大模型进行处理

OpenClaw 的 Heartbeat 机制会显著消耗 Token。

调整配置如下：

```json
"agents": {
    "defaults": {
      "heartbeat": {
        "every": "0m",           // 降低频率如4h 或 设置 0m 关闭
        "lightContext": true,    // 仅加载HEARTBEAT.md，不加载完整上下文
        "isolatedSession": true,  // 每次独立会话，不携带历史记录
        "model": "openai/gpt-4o-mini",  // 使用轻量模型或本地模型处理心跳
        "activeHours": {    // 仅工作时间运行
          "start": "09:00",
          "end": "22:00",        
          "timezone": "Asia/Shanghai"
        }
      }
    }
  },
```

## 其他问题

下列问题，时不时会出现，可能是某些操作导致网关配置改变。

- Gateway 在接受 Control UI 连接前拒绝了此页面来源。

  ```json
  {
    "gateway": {
      ...
      "controlUi": {
        "allowedOrigins": [
          "http://你的服务器IP地址:18789", 
          "http://你的域名:18789"
        ]
      }
    }
  }
  ```

- 容器部署的 openclaw ，宿主机无法访问其网关

  ```json
  "gateway": {
      "bind": "lan", // 不能是 loopback
  }
  ```

  > Docker note: the default loopback bind listens on 127.0.0.1 inside the container. With Docker bridge networking (-p 18789:18789), traffic arrives on eth0, so the gateway is unreachable. Use --network host, or set bind: "lan" (or bind: "custom" with customBindHost: "0.0.0.0") to listen on all interfaces.

## 卸载

```shell
openclaw uninstall
```

## 参考资料

[OpenClaw 容器化部署指南](https://bujic.cc/blogs/OpenClaw 部署指南)

[OpenClaw 多 Agent 协作完整指南 - 知乎](https://zhuanlan.zhihu.com/p/2013557846005032775)
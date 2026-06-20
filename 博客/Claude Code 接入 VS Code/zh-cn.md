---
title: Claude Code 接入 VS Code
titleEn: Claude Code switch VS Code
date: 2026-01-15
tags: [智能体工程]
tagsEn: [Agent Engineering]
featured: false
---

# Claude Code 接入 IDE

让Claude Code 接入 IDE，可以获得类似于 cursor 一般的体验。

安装claude插件

![image-20260520145723535](assets/image-20260520145723535.png)

配置claude插件，可配置模型接入的 URL 和 Token等信息

![image-20260520145805442](assets/image-20260520145805442.png)

进入 vscode 的 settings.json

```
{
    "claudeCode.environmentVariables": [
        {
            "name": "ANTHROPIC_BASE_URL",
            "value": "你的API URL"
        },
        {
            "name": "ANTHROPIC_AUTH_TOKEN",
            "value": "你的API Token"
        },
        {
            "name": "ANTHROPIC_MODEL",
            "value": "选择模型"
        },
        {
            "name": "CLAUDE_CODE_EFFORT_LEVEL",
            "value": "模型思考深度 low medium max"
        }
    ]
}
```

使用模型

![image-20260520150132845](assets/image-20260520150132845.png)
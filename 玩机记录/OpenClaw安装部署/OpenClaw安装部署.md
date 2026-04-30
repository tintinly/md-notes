## 安装步骤

> 安装环境：自家NAS的虚拟机——Ubuntu server 20.04

1. 安装Nodejs（软件包版本过低的情况下）

2. 获取模型API key

3. 脚本安装OpenClaw，并按照向导部署，可进入快速引导，并跳过大部分

   ```shell
   curl -fsSL https://openclaw.ai/install.sh | bash
   ```

   选择自定义服务器商

4. 安装qq插件及渠道

   ```shell
   # 安装 QQ 插件
   openclaw plugins install @sliverp/qqbot@latest
   
   # 添加机器人频道（替换为你的 token）
   openclaw channels add --channel qqbot --token "你的机器人Token"
   
   # 重启网关
   openclaw gateway restart
   ```

## 常用命令

初始化

```shell
openclaw onboard --install-daemon
```

后续重新配置

```shell
openclaw configure
```

使用

```shell
# 官方推荐 浏览器里打开 Dashboard
openclaw dashboard
# 终端界面
openclaw tui
```

网关操作

```shell
# 重启网关
openclaw gateway restart
```

状态检查

```shell
# 整体状态
openclaw status
# 自检
openclaw doctor
# 网关状态
openclaw gateway status
```

## 问题

**跨域问题**

```
# 允许非安全认证（解决跨域问题）
openclaw config set gateway.controlUi.allowInsecureAuth true
```

**origin not allowed**

```
gateway.controlUi.allowedOrigins 添加地址
```

**control ui requires device identity** 

错误原因：

浏览器安全上下文策略
OpenClaw 的控制界面使用了现代浏览器的 Web Crypto API 来实现设备身份验证。出于安全考虑，这套 API 只能在“安全上下文”中运行。
所谓的“安全上下文”，通常指以下两种情况：

* 本地安全环境：访问 https://localhost 或 https://127.0.0.1。
* 网络安全环境：通过 HTTPS 协议访问，且域名拥有有效的 SSL 证书。
  当你使用 HTTP 协议访问公网地址时，浏览器会判定这是一个“非安全上下文”，从而直接拒绝 OpenClaw 获取设备身份信息，导致访问失败。

```
# 禁用设备身份验证（允许 HTTP 访问）
openclaw config set gateway.controlUi.dangerouslyDisableDeviceAuth true
```







## 免费模型

### 千问 Qwen

启用免费的千问模型插件

```shell
# OpenClaw 中免费层的千问接入方式不是直接填 API Key，而是启用 Qwen 的 OAuth 插件。
openclaw plugins enable qwen-portal-auth
# 需要重启 Gateway 网关
openclaw gateway restart
```

Qwen 登录

```shell
# 触发 Qwen 的设备码 OAuth 流程。你按照终端提示，在浏览器里完成登录授权即可。
openclaw models auth login --provider qwen-portal --set-default
```

## 卸载

```shell
openclaw uninstall
```


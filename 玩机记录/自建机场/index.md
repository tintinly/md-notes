## 服务器选择

**VPS（Virtual Private Server，虚拟专用服务器）**，它就像是你租用的一台位于数据中心的电脑，你可以完全控制它，在上面安装操作系统、软件，并进行配置，通常是一台物理机用虚拟化软件（VMware、KVM、Xen）切成多个虚拟机。比起租用云服务器（多台物理机组成集群，统一调度）灵活性较低，但性价比更高。

VPS 评测来自 [科技 lion 官方网站 - KEJILION](https://kejilion.pro/)，主要考量：**便宜**。

VPS 服务商：[RackNerd - Introducing Infrastructure Stability](https://www.racknerd.com/) 

* 双 IP：无
* 硬盘：25G SSD
* 内存：1 GB RAM (Included)
* CPU：1 CPU Core (Included)
* 操作系统：Ubuntu 24.04 64 Bit
* 位置：New York
* 流量：2TB

## 环境搭建

ssh 连接服务器，根据 VPS 提供商的登录信息连接

更新系统

```shell
apt update && apt upgrade -y
```

修改 SSH 端口（可选），增加安全性

安装常用工具，如 `wget` (用于下载文件)、`curl` (用于发送 HTTP 请求)、`htop` (用于监控系统资源)。

协议选型

## 代理协议选型

### 标准代理

互联网的标准代理协议如 SOCKS、HTTP，本身不具备抗审查特性，主要用于为各种应用程序提供代理服务。

- SOCKS (主要是 SOCKS5)：一个通用的代理协议标准。它工作在传输层，不关心你传输的是什么应用数据，因此能代理几乎所有类型的网络流量（HTTP、FTP、邮件等）。本身不提供任何加密，所有流量都是明文的。
- HTTP：只针对 HTTP 和 HTTPS 流量。它同样本身不加密，可配合 TLS 加密。

### 专用代理

 专用代理型协议如 VMess、VLESS、Trojan、Shadowsocks 专为 **突破网络审查** 设计。它们通过加密、混淆或伪装等手段，让网络流量看起来更“普通”，以绕过防火墙的检测。

- V2Ray：V2Ray 项目的早期官方协议，非常成熟、兼容性好，适合老客户端
  - 集成了复杂的加密和认证机制
  - 协议特征较明显，容易被检测
  - 性能开销相对较大
- VLESS：VMess 的现代化、轻量化升级版，更快、开销更低。
  - 自身不提供加密，如果需要必须依赖 TLS 、XTLS 等外部安全层协议
  - 配合 XTLS 技术，速度和伪装能力都更上一层楼
  - 设计轻量，性能极佳
- Trojan：将流量特征与标准的 HTTPS 流量完全一致，将伪装做到机制。
  - 强制使用 TLS 加密，
  - 完美伪装成 HTTPS 网站，抗封锁能力极强
  - 性能开销较大

- Shadowsocks：经典的轻量级代理协议。历史悠久、生态完善，在很多场景下仍有广泛应用
  - 支持多种加密方式。
  - 无强伪装，高严格网络环境容易受限。
  - 设计简洁，性能好、稳定性高。


### 特殊入站

Dokodemo door（任意门）是一个入站数据协议，它可以监听一个本地端口，并把所有进入此端口的数据发送至指定服务器的一个端口，从而达到端口映射的效果。通常用于其他节点被墙，需要用中转来继续使用，或是某节点直连效果太差，通过中转后降低延迟等场景

## 代理服务端

### V2Ray

官方网站：[Project V · Project V 官方网站](https://www.v2ray.com/)

推荐 **V2Ray**，因为它功能强大、协议多样、安全性高，而且社区支持活跃。

安装教程：[V2Ray 一键搭建详细图文教程 - 233Boy](https://233boy.com/v2ray/v2ray-server/)

```shell
bash <(wget -qO- -o- https://github.com/233boy/v2ray/raw/master/install.sh)
```

安装后，输入 `v2ray` 回车，即可管理 V2Ray

![image-20260503210617896](assets/image-20260503210617896.png)

### X-Ray

Xray-core 最初源自 v2ray-core，但已经长期独立演进，官方网站：Project X。

[vaxilu/x-ui: 支持多协议多用户的 xray 面板](https://github.com/vaxilu/x-ui)

脚本一键安装

```shell
bash <(curl -Ls https://raw.githubusercontent.com/FranzKafkaYu/x-ui/956bf85bbac978d56c0e319c5fac2d6db7df9564/install.sh) 0.3.4.4
```

使用 docker 方式安装：默认端口 54321 默认用户密码 admin/admin

```yaml
version: '3.9'
services:
    x-ui:
        image: 'enwaiax/x-ui:latest'
        restart: unless-stopped
        container_name: x-ui
        volumes:
            - '$PWD/cert/:/root/cert/'
            - '$PWD/db/:/etc/x-ui/'
        networks_mode: host
        tty: true
        stdin_open: true
```

添加入站

![image-20260621034522064](assets/image-20260621034522064.png)

[3x-ui](https://github.com/MHSanaei/3x-ui/blob/main/README.zh_CN.md) 是一个先进的开源 Web 控制面板，用于管理 Xray-core 服务器。

脚本一键安装

```bash
bash <(curl -Ls https://raw.githubusercontent.com/mhsanaei/3x-ui/master/install.sh)
```

使用 docker 方式安装：默认端口 2053 默认用户密码 admin/admin

```yaml
services:
  3xui:
    image: ghcr.io/mhsanaei/3x-ui:latest
    container_name: 3xui
    # hostname: yourhostname <- optional
    # Optional hard memory cap. When set, the panel auto-derives its Go soft
    # limit (GOMEMLIMIT, ~90%) from this so it GCs before the OOM killer fires.
    # mem_limit: 512m
    # The bundled Fail2ban (XUI_ENABLE_FAIL2BAN below) enforces the IP limit
    # with iptables, which needs NET_ADMIN. Without these caps a ban is logged
    # and shown in fail2ban status but never actually applied. NET_RAW covers
    # ip6tables. If you disable Fail2ban, you can drop cap_add.
    cap_add:
      - NET_ADMIN
      - NET_RAW
    volumes:
      - $PWD/db/:/etc/x-ui/
      - $PWD/cert/:/root/cert/
    environment:
      XRAY_VMESS_AEAD_FORCED: "false"
      XUI_ENABLE_FAIL2BAN: "true"
      # Go memory soft limit. If neither is set, the panel auto-detects the
      # cgroup/host limit and targets ~90%. Pin it explicitly with one of:
      # XUI_MEMORY_LIMIT: "400"      # in MiB
      # GOMEMLIMIT: "400MiB"         # Go syntax, takes precedence
      # XUI_PPROF: "true"           # expose pprof on 127.0.0.1:6060 for profiling
      # XUI_INIT_WEB_BASE_PATH: "/"
      # XUI_PORT: "8080"
      # To use PostgreSQL instead of the default SQLite, run:
      #   docker compose --profile postgres up -d
      # and uncomment the two lines below.
      # XUI_DB_TYPE: "postgres"
      # XUI_DB_DSN: "postgres://xui:xui@postgres:5432/xui?sslmode=disable"
    #tty: true
    network_mode: host
    #ports:
      # When XUI_PORT is set, publish the same container port (for example "8080:8080").
      #- "2053:2053"
    restart: unless-stopped

  #postgres:
    #image: postgres:16-alpine
    #container_name: 3xui_postgres
    #profiles: ["postgres"]
    #environment:
      #POSTGRES_USER: xui
      #POSTGRES_PASSWORD: xui
      #POSTGRES_DB: xui
    #volumes:
      #- $PWD/pgdata/:/var/lib/postgresql/data
    #restart: unless-stopped
```

方案选择

| **协议**              | **TLS 握手开销** | **传输层开销** | **CPU 负载**       |
| :-------------------- | :--------------- | :------------- | :----------------- |
| **Trojan**            | 标准 TLS         | 原生 TCP       | 较低（无多路复用） |
| **VLESS+TLS+WS**      | 标准 TLS         | WebSocket 封装 | 中等（WS 额外帧）  |
| **VLESS+TLS+Reality** | 标准 TLS         | Reality 自定义 | 略高（多轮握手）   |



### Sing-box



## 代理客户端

### Clash

点击 https://v2xtls.org/clash_template.yaml 下载模板配置文件，用编辑器打开，找到 v2ray 配置块，把 server、port、uid 等信息改成你 v2ray 科学上网服务端配置。

[clash_template.yaml](assets/clash_template.yaml)

把修改好的配置文件拖到 clash 界面中，然后双击选中拖进来的配置文件(深色表示选中)

接着点击“Proxies”，进入最重要的设置：选择代理模式和使用的节点

![image-20260504015727818](assets/image-20260504015727818.png)

### V2RayN / V2RayU

1. 安装客户端，打开后点击「导入配置」。
2. 选择「从剪贴板导入」（复制 X-UI 导出的节点链接），或「扫描二维码」（适合近距离操作）。
3. 导入成功后，选择该节点，点击「启动代理」。

### Sing-box CLI



## xray 与 nginx 共存

VLESS 如果开启 TLS 加密 ，TLS 流量通常建议使用 443 端口，因为这是标准 HTTPS 服务的端口，伪装效果最好。但是在自己的服务器，如果还想搭建网站或应用，也必须要使用 443 端口。

要想实现 443 端口复用，有以下两个方案：

方案一： Nginx Stream 模块实现 443 端口的 SNI 分流。参考 [VPS 节点搭建系列教程（七）：Nginx Stream SNI 分流实现 443 端口复用与 Xray 最佳伪装 - Pollo](https://blog.pollochen.com/posts/vps-xray-06-nginx-stream-sni)

方案二：VLESS 和 TROJAN 协议提供了 fallback 参数，支持回落 nginx。参考 [xray 与 nginx 多网站共存(443 端口复用方案)-CSDN 博客](https://blog.csdn.net/soladuor/article/details/142302618)

## 参考资料

[VPS 搭建 v2ray 科学上网 ｜ 自建机场 ｜ 附各平台使用教程 - 科技小飞哥](https://www.techxiaofei.com/post/vpn/vpn/#1-windows)

[科学上网：使用 X-UI 面板快速搭建多协议、多用户代理服务，支持 CDN - Look for VPS](https://lookforvps.com/vpstech/x-ui.html)

[从零开始自建节点 | 欢迎来到我的 Zone](https://anluzhangcs.github.io/2023/06/16/tool/从零开始自建节点/)

[♪(^∇^*)欢迎肥来！使用脚本一键搭建 X-UI 面板 | 你好！我是墨泪！](https://www.kiiiii.com/archives/One-ClickSetupofX-UIPanelUsingScripts)

[x-ui 加 nginx 实现 ssl 访问-腾讯云开发者社区-腾讯云](https://cloud.tencent.com/developer/article/2419366)

[xray 与 nginx 多网站共存(443 端口复用方案)-CSDN 博客](https://blog.csdn.net/soladuor/article/details/142302618)

[通过 SNI 回落功能实现伪装与按域名分流 | Project X](https://xtls.github.io/document/level-1/fallbacks-with-sni.html)

[3x-ui面板安装与使用 — Jacin Blog](https://jacin.me/posts/3x-ui-84#可选配置-nginx-反代与-cf-防火墙)

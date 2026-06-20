# VPS 建站指南

## 需求

以下所写方案皆为需求，但基本都是未成规模、学习测试的用途。

## VPS 服务商

VPS 优惠/评测/推荐：[科技 lion 官方网站 - KEJILION](https://kejilion.pro/)

我选择了 RackNerd 1 核 1G 一年 10 刀的极致性价比套餐，这使得我的机器资源比较吃紧，只能省着用，选择最轻量级的部署方式。

![image-20260503214948023](assets/image-20260503214948023.png)

## VPS 机器信息

IP 地址 / 位置：192.3.13.50 / NewYork
内存：1 GB RAM 
CPU：1 CPU Core
操作系统：Ubuntu 20.04 LTS 64 Bit

## 重装 Debian

第一次登录上 VPS 的操作系统为 Ubuntu 24.04，而且可能会有不少预装软件，建议新装一个纯净的 Linux 发行版，如以最小化安装 Ubuntu 20.04/22.04 或 Debian 11/12。其中，Debian将会更加精简

## 开启 Swap 区

查看是否开启

```shell
# 方法1：查看所有激活的swap设备/文件（看是否有输出）
swapon --show
# 方法2：查看内存概览，看Swap那一行的used/total
free -h
# 方法3：查看内核swap统计信息
cat /proc/swaps
```



## 开启防火墙

建议打开 systemctl，默认拒绝所有。但是好似云服务商的具有前置防火墙如安全组 (Security Group) / ACL 规则，这是位于服务器实例以外的“云上虚拟防火墙”。例如只要有安全组规则放行了 22 端口，流量就已经能进入系统，系统内部的 `firewalld` 再怎么阻止也无能为力了。

```shell
# 查看firewalld服务状态
systemctl status firewalld
# 开启
service firewalld start
# 重启
service firewalld restart
# 关闭
service firewalld stop
# 查看防火墙状态
firewall-cmd --state
# 查看防火墙规则
firewall-cmd --list-all
```



## 安装服务面板

（可选）使用服务器控制面板能使搭建服务器平台简单许多，环境一键部署集成环境，不需要额外拼凑环境包。

| 面板名称 | 一句话描述                   | 资源占用 (内存@空载) | 核心亮点                                          |
| :------- | :--------------------------- | :------------------- | :------------------------------------------------ |
| Cockpit  | 官方血统的 "轻量级系统仪表盘" | 极低 (约 50 MB)       | Linux 官方支持，主要用于系统层管理，非建站专用    |
| 1Panel   | 现代化的 Docker 容器管理面板 | 中等 (约 129 MB)      | 现代化界面、开源免费、主打容器化应用管理          |
| 耗子面板 | "轻量党" 的宝藏选择           | 低 (约 70 MB)         | Go 语言开发，极致低占用，对系统修改极少，永久免费 |
| 宝塔面板 | 功能全面的 "老牌瑞士军刀"     | 较高 (约 280 MB)      | 功能最全面，生态最成熟，一键部署对新手的体验极佳  |

1Panel 安装脚本

```shell
bash -c "$(curl -sSL https://resource.fit2cloud.com/1panel/package/v2/quick_start.sh)"
```

## 1panel

查看、修改账号信息

```bash
1pctl user-info # 查看账号信息
1pctl update password # 修改密码
```

服务重启

```
1pctl restart core
1pctl restart agent
1pctl restart all
```



## 自建机场

[自建机场](../自建机场/index.md)

## 安装 Nginx

通过 Nginx 可以作简单的文件服务器，使得我能随时获取机场 yaml 配置。


# 硬件

 暂使用虚拟环境配置，虚拟机软件VMware Workstation Pro

# 安装

## 在docker中安装

* 操作系统：Linux - debian [Debian -- 通用操作系统](https://www.debian.org/index.zh-cn.html)

* 家庭云管理系统：CasaOS [CasaOS - A simple, easy-to-use, elegant open-source home cloud system](https://casaos.io/)

```shell
# 安装
$ wget-qO-https://get.casaos.io | bash

```

http://你的IP 进行访问

* CasaOS内置Docker应用 可自定义

## 直接安装HAOS

下载虚拟机镜像

[Linux - Home Assistant (home-assistant.io)](https://www.home-assistant.io/installation/linux)

1. 创建新的虚拟机
2. 选择“自定义”，使其与工作站和ESX的默认值兼容
3. 选择“我稍后会安装操作系统”，选择“Linux”->“其他 Linux 5.x 或更高版本内核 64 位”
4. 选择“使用桥接网络”
5. 选择“使用现有虚拟磁盘”，然后选择上面的 VMDK 文件，

6. 创建虚拟机后，转到“设置”和“选项”，然后转到“高级”，然后选择“固件类型”到“UEFI”。
7. 启动虚拟机
8. 访问HomeAssistant[homeassistant.local：8123](http://homeassistant.local:8123/)

## 安装HACS插件

安装加载项

![image-20230330214713119](C:\Users\82129\iCloudDrive\Markdowns\Typora From Win\HomeAssistant部署配置\image-20230330214713119.png)

> 安装插件遇到错误
>
> 'AddonManager.install' blocked from execution, system is not healthy - supervisor

![image-20230330214605455](C:\Users\82129\iCloudDrive\Markdowns\Typora From Win\HomeAssistant部署配置\image-20230330214605455.png)

解决方法：

在/etc下新建jobs.json文件，文件内容如下：

```
{"ignore_conditions": ["healthy"]}
```

> 创建文件时报错
>
> read-only FileSystem

![image-20230330215322264](C:\Users\82129\iCloudDrive\Markdowns\Typora From Win\HomeAssistant部署配置\image-20230330215322264.png)

解决方法：

重新挂载分区并增加写权限，增加读写权限即为 -rw 

```sh
$ mount -o remount -w
```




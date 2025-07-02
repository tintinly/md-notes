## 系统文件结构

/bin        二进制文件，系统常规命令
/boot       系统启动分区，系统启动时读取的文件
/dev        设备文件
/etc        大多数配置文件
/home       普通用户的家目录
/lib        32位函数库
/lib64      64位库
/media      手动临时挂载点
/mnt        手动临时挂载点
/opt        第三方软件安装位置
/proc       进程信息及硬件信息
/root       临时设备的默认挂载点
/sbin       系统管理命令
/srv        数据
/var        数据
/sys        内核相关信息
/tmp        临时文件
/usr        用户相关设定

## 系统信息

```shell
uname －a   （Linux查看版本当前操作系统内核信息）
cat /proc/version （Linux查看当前操作系统版本信息）
```



## 软件 

### 切换软件源

```shell
cp /etc/apt/sources.list /etc/apt/sources.list_backup # 备份原软件源列表
```

### 软件包更新

```shell
apt list --upgradable # 可升级包
```

```shell
apt update && apt upgrade -y # 检查新包可用性 更新
```

```shell
apt autoremove # 清除无用包
```

### 软件安装

```shell
# vim
apt-get install vim
```

```shell
# qbittorrent
apt install qbittorrent-nox
qbittorrent-nox # 启动
vim /etc/systemd/system/qbittorrent.service # 配置开机自启动服务
# vim ↓↓↓↓↓↓↓↓
[Unit]
Description=qbittorrent torrent server

[Service]
User=root
ExecStart=/usr/bin/qbittorrent-nox
Restart=on-abort

[Install]
WantedBy=multi-user.target
# vim ↑↑↑↑↑↑↑↑↑

systemctl enable qbittorrent     #开启自启
systemctl start qbittorrent #开启qb
systemctl stop qbittorrent #关闭qb
systemctl restart qbittorrent #重启qb
```



* docker

```shell
# alist
docker run -d --restart=always -v /etc/alist:/opt/alist/data -p 5244:5244 -e PUID=0 -e PGID=0 -e UMASK=022 --name="alist" xhofe/alist:latest 

# emulatorjs
docker run -d --name=emulatorjs -p 3000:3000 -p 8499:80 -v /etc/emulatorjs/config:/config -v /data/emulatorjs/data:/data --restart unless-stopped lscr.io/linuxserver/emulatorjs:latest

# qbittorrent
docker run -d \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Asia/Shanghai \
  -e UMASK_SET=022 \
  -e WEBUI_PORT=8080 \
  -p 6881:6881 \
  -p 6881:6881/udp \
  -p 8080:8080 \
  -v /etc/qbittorrent/config:/config \
  -v /data/qbittorrent/downloads:/downloads \
  --restart unless-stopped \
  linuxserver/qbittorrent:arm32v7-latest
```



### 软件卸载

```shell
apt-get remove –-purge mysql #  卸载软件同时删除配置文件
apt-get remove mysql #   卸载该软件
sudo apt-get clean # 清除缓存 
```



## 文件

### 文件操作

```shell
touch  a.txt         # 在当前目录下创建名为a的txt文件（文件不存在），如果文件存在，将文件时间属性修改为当前系统时间
```

```shell
 rm 文件名              # 删除当前目录下的文件
 rm -f 文件名           # 删除当前目录的的文件（不询问）
```

### 文件权限

![img](C:\Users\82129\iCloudDrive\Markdowns\Typora From Win\经验杂记\linux\file-permissions-rwx.jpg)

![img](C:\Users\82129\iCloudDrive\Markdowns\Typora From Win\经验杂记\linux\rwx-standard-unix-permission-bits.png)



```shell
chmod u+x hello.sh # 加减权限
```

## 磁盘管理

Linux 磁盘管理常用三个命令为 **df**、**du** 和 **fdisk**。

- **df**（英文全称：disk free）：列出文件系统的整体磁盘使用量
- **du**（英文全称：disk used）：检查磁盘空间使用量
- **fdisk**：用于磁盘分区

### 挂载

```shell
fdisk -l # 查看磁盘设备
mkdir /mnt/media ## 创建挂载目录
mount /dev/sda1 /mnt/usb_29.3g # 挂载
# 警告
#Mount is denied because the NTFS volume is already exclusively opened.
#The volume may be already mounted, or another software may use it which
#could be identified for example by the help of the ‘fuser’ command.
fuser -m /dev/sda1 # 查看当前占用进程
```



## shell脚本

`shell` 是一个命令行解释器，它接受并运行命令。如果你以前运行过任何 Linux 命令，那么你已经使用过 shell。

这个应用程序提供了一个界面，用户通过这个界面访问操作系统内核的服务。

当你在 Linux 中打开终端时，你已经在运行系统的默认 shell，大多数Linux 系统默认的 Shell为bash。

`Bash`是“`Bourne-Again shell`”的缩写，它只是 Linux 中许多可用 `shell` 的一种。

```shell
echo $SHELL # 确认当前的shell环境
```

### 示例

```shell
cat > hello.sh
echo 'Hello, World!'
chmod u+x hello.sh 
bash hello.sh # 通过解释器来运行脚本
./hello.sh # 可执行文件运行脚本
```

### ＃！/bin/bash

**#!** 是一个约定的标记，它告诉系统这个脚本需要什么解释器来执行，即使用哪一种 Shell。

使用 `＃！/bin/bash` 表示该脚本是 `bash shell` 脚本，无论系统上正在使用什么 `shell`，都应该使用 `bash` 作为解释器运行。如果你使用的是 `zsh` 特定的语法，你可以通过添加 `#! /bin/zsh` 作为脚本的第一行。

### 变量

```shell
var="hello" # 定义变量
echo $test # 使用变量 
echo '${var}，world!'  # 无效，单引号不解析特殊符号，直接输出字符串
echo "${var}，world!" # 有效，双引号解析特殊符号
readonly var # 只读变量
unset var # 删除变量
```

### 环境变量PATH

使用 `./hello.sh` 来运行脚本；如果省略前导 `./`，需要配置环境变量`PATH`

当你在终端上运行任何命令时，`shell` 就在存储在 `PATH` 变量中的一组目录中查找该命令。

```shell
echo $PATH # 查看变量
export # 查看所有环境变量
export PATH=$PATH:/root/script # 将脚本目录添加到 PATH 变量。
```

## 环境文件.bashrc文件

在大多数 Linux 发行版bash环境中，用户的环境文件通常是 "~/.bashrc" 或 "~/.bash_profile"

每个用户的 home 目录都有这个 shell 脚本。

bash 在每次启动时都会加载 `.bashrc` 文件的内容

```shell
vim ~/.bashrc
export PATH=$PATH:/root/script # 将这句添加到bashrc中
```

.bashrc的加载时靠.profile文件加载的，检查是否确实该文件

.profile文件内容如下：

```shell
# ~/.profile: executed by the command interpreter for login shells.
# This file is not read by bash(1), if ~/.bash_profile or ~/.bash_login
# exists.
# see /usr/share/doc/bash/examples/startup-files for examples.
# the files are located in the bash-doc package.

# the default umask is set in /etc/profile; for setting the umask
# for ssh logins, install and configure the libpam-umask package.
#umask 022

# if running bash
if [ -n "$BASH_VERSION" ]; then
    # include .bashrc if it exists
    if [ -f "$HOME/.bashrc" ]; then
    . "$HOME/.bashrc"
    fi
fi

# set PATH so it includes user's private bin if it exists
if [ -d "$HOME/bin" ] ; then
    PATH="$HOME/bin:$PATH"
fi
```



### 字符串

- 单引号里的任何字符都会原样输出，单引号字符串中的变量是无效的；
- 双引号里可以出现转义字符

```shell
name=noob
echo -e "Hello, I know you are \"$name\"! \n"# 输出 Hello, I know you are \"$name\"! 
echo -e "Hello, I know you are \"$name\"! \n" # 输出 Hello, I know you are "noob"! 
```

* 

```shell
string="abcdef"
echo ${#string}   # 字符串长度 输出 6
echo ${string:1:3} # 子串 输出 bcd
```

### 传递参数

```shell
#!/bin/bash

echo "Shell 传递参数实例！";
echo "执行的文件名：$0";
echo "第一个参数为：$1";
echo "第二个参数为：$2";
echo "第三个参数为：$3";
```

| 参数处理 | 说明                                                         |
| :------- | :----------------------------------------------------------- |
| $#       | 传递到脚本的参数个数                                         |
| $*       | 以一个单字符串显示所有向脚本传递的参数。 如"$*"用「"」括起来的情况、以"$1 $2 … $n"的形式输出所有参数。 |
| $$       | 脚本运行的当前进程ID号                                       |
| $!       | 后台运行的最后一个进程的ID号                                 |
| $@       | 与$*相同，但是使用时加引号，并在引号中返回每个参数。 如"$@"用「"」括起来的情况、以"$1" "$2" … "$n" 的形式输出所有参数。 |
| $-       | 显示Shell使用的当前选项，与[set命令](https://www.runoob.com/linux/linux-comm-set.html)功能相同。 |
| $?       | 显示最后命令的退出状态。0表示没有错误，其他任何值表明有错误。 |

> $* 与 $@ 区别：
>
> - 相同点：都是引用所有参数。
> - 不同点：只有在双引号中体现出来。假设在脚本运行时写了三个参数 1、2、3，则 " * " 等价于 "1 2 3"（传递了一个参数），而 "@" 等价于 "1" "2" "3"（传递了三个参数）。

### 流程控制



## vi/vim

所有的 Unix Like 系统都会内建 vi 文书编辑器。

但目前我们使用比较多的是 vim 编辑器。

vim 具有程序编辑的能力，可以主动的以字体颜色辨别语法的正确性，方便程序设计。

Vim 是从 vi 发展出来的一个文本编辑器。代码补全、编译及错误跳转等方便编程的功能特别丰富，在程序员中被广泛使用。

### 模式

基本上 vi/vim 共分为三种模式，**命令模式（Command Mode）、输入模式（Insert Mode）和命令行模式（Command-Line Mode）**。

若想要编辑文本，只需要启动 Vim，进入了命令模式，按下 **i** 切换到输入模式即可。

在命令模式下按下 **i** 就进入了输入模式，使用 **Esc** 键可以返回到普通模式。

在命令模式下按下 **:**（英文冒号）就进入了底线命令模式。按 **ESC** 键可随时退出底线命令模式。

![img](C:\Users\82129\iCloudDrive\Markdowns\Typora From Win\经验杂记\linux\vim-vi-workmodel.png)

### 键位

![img](C:\Users\82129\iCloudDrive\Markdowns\Typora From Win\经验杂记\linux\vi-vim-cheat-sheet-sch.gif)

## ssh

通过3个步骤的简单设置而无需输入密码就能登录远程[Linux](http://lib.csdn.net/base/linux)主机。 

```shell
ssh -V # 查看版本 使用不同的命令
# openssh（SSH）： ssh-keygen   或者   ssh-keygen -t rsa

# SSH2 ： ssh-keygen2 -t rsa

# 主机
ssh-keygen # 创建公钥和密钥。
scp C:\Users\82129/.ssh/id_rsa.pub root@192.168.31.24:~/.ssh/id_rsa.pub

或者 ssh-copy-id # 把本地主机的公钥复制到远程主机的authorized_keys文件上。

# 远程主机
mv .ssh/id_rsa.pub .ssh/authorized_keys
chmod 600 .ssh/authorized_keys
chmod 700 .ssh
sudo vim /etc/ssh/sshd_config # 修改ssh配置文件
# vim↓↓↓↓
RSAAuthentication yes 
PubkeyAuthentication yes 
AuthorizedKeysFile .ssh/authorized_keys
# vim↑↑↑↑


# 重启服务
service sshd restart
```

## 服务管理

Linux 服务管理两种方式service和systemctl

systemd是Linux系统最新的初始化系统(init),作用是提高系统的启动速度，尽可能启动较少的进程，尽可能更多进程并发启动。

```shell
ps u -p 1
#USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
#root         1  0.0  0.7  33552  7788 ?        Ss   Dec10   3:12 /sbin/init
ll /sbin/init
#lrwxrwxrwx 1 root root 20 Sep 20 00:57 /sbin/init -> /lib/systemd/systemd*
# 系统的 1 号进程的确是 systemd，只不过在 ubuntu 系统中被起了个别名叫 /sbin/init。
```

systemd对应的进程管理命令是systemctl

### 服务资源unit

systemd的Unit放在目录/usr/lib/systemd/system(Centos)或/etc/systemd/system(Ubuntu)

主要有四种类型文件.mount,.service,.target,.wants

* .mount文件定义了一个挂载点，[Mount]节点里配置了What,Where,Type三个数据项

* .service文件定义了一个服务，分为[Unit]，[Service]，[Install]三个小节

```
[Unit]

Description:描述，

After：在network.target,auditd.service启动后才启动

ConditionPathExists: 执行条件

[Service]

EnvironmentFile:变量所在文件

ExecStart: 执行启动脚本

Restart: fail时重启

[Install]

Alias:服务别名

WangtedBy: 多用户模式下需要的
```

* .target定义了一些基础的组件，供.service文件调用
* .wants文件定义了要执行的文件集合，每次执行，.wants文件夹里面的文件都会执行

### 常用命令

```shell
start：立刻启动后面接的 unit。

stop：立刻关闭后面接的 unit。

restart：立刻关闭后启动后面接的 unit，亦即执行 stop 再 start 的意思。

reload：不关闭 unit 的情况下，重新载入配置文件，让设置生效。

enable：设置下次开机时，后面接的 unit 会被启动。

disable：设置下次开机时，后面接的 unit 不会被启动。

status：目前后面接的这个 unit 的状态，会列出有没有正在执行、开机时是否启动等信息。

is-active：目前有没有正在运行中。

is-enabled：开机时有没有默认要启用这个 unit。

kill ：不要被 kill 这个名字吓着了，它其实是向运行 unit 的进程发送信号。

show：列出 unit 的配置。

mask：注销 unit，注销后你就无法启动这个 unit 了。

unmask：取消对 unit 的注销。

systemctl list-units （或者直接 sudo systemctl）列举已经启动的unit
```

## 进程管理

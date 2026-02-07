# Linux 发行版

常带用户界面

Ubuntu、CentOS（开源的RedHat）、Mint、elementary OS、MX Linux、Zorin OS

服务器

* Ubuntu Server：基于Debian架构，使用dpkg (Debian Package)管理工具/APT包管理器。侧重于个人，注重功能与更新。
* Red Hat Enterprise Linux：基于RHEL架构，使用RPM包管理器。侧重于企业，注重稳定与轻便

# Linux 常用综合操作

## 安装SSH服务

```shell
# 更新软件包列表
sudo apt update

# 安装OpenSSH服务器
sudo apt install openssh-server

# 启动SSH服务
sudo systemctl start ssh

# 设置开机自动启动
sudo systemctl enable ssh

# 检查服务状态
sudo systemctl status ssh

# 备份原始配置文件
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.backup

# 编辑配置文件
sudo nano /etc/ssh/sshd_config
```

## 启用/禁用root登录

```shell
# 使用sudo权限设置root密码
sudo passwd root

# 设置root密码后，修改SSH配置允许root登录
sudo nano /etc/ssh/sshd_config

PermitRootLogin yes
# 或者
PermitRootLogin prohibit-password  # 推荐，只允许密钥登录

# 重启SSH服务
sudo systemctl restart ssh

# 推荐
如果需要长时间以root身份操作，使用sudo -i或sudo su
```

## 设置代理

```shell
# 临时设置代理
export http_proxy="http://192.168.1.117:7890"
export https_proxy="http://192.168.1.117:7890"
export ftp_proxy="http://192.168.1.117:7890"
export no_proxy="localhost,127.0.0.1,::1"
echo $http_proxy

# 永久设置代理
sudo vim /etc/profile

export http_proxy="http://192.168.1.117:7890"
export https_proxy="http://192.168.1.117:7890"
export ftp_proxy="http://192.168.1.117:7890"
export no_proxy="localhost,127.0.0.1,::1"

source /etc/profile
```

## 安装Node.js

```shell
######### 默认仓库安装 可能版本较低
# 安装 Node.js
sudo apt install nodejs
# 安装 npm（Node.js 包管理器）
sudo apt install npm

######## 使用 Apt 使用 NodeSource PPA 安装 Node.js



######## 使用 nvm（Node Version Manager）安装 适合需要管理多个 Node.js 版本的开发者。
# Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
# in lieu of restarting the shell
\. "$HOME/.nvm/nvm.sh"
# Download and install Node.js:
nvm install 24
# Verify the Node.js version:
node -v # Should print "v24.13.0".
# Verify npm version:
npm -v # Should print "11.6.2".

```

# Linux 命令大全

## 常用命令

```shell
ls　　        显示文件或目录

     -l           列出文件详细信息l(list)

     -a          列出当前目录下所有文件及目录，包括隐藏的a(all)

mkdir         创建目录

     -p           创建目录，若无父目录，则创建p(parent)

cd               切换目录

touch          创建空文件

echo            创建带有内容的文件。

cat              查看文件内容

cp                拷贝

mv               移动或重命名

rm               删除文件

     -r            递归删除，可删除子目录及文件

     -f            强制删除

find              在文件系统中搜索某文件

wc                统计文本中行数、字数、字符数

grep             在文本文件中查找某个字符串

rmdir           删除空目录

tree             树形结构显示目录，需要安装tree包

pwd              显示当前目录

ln                  创建链接文件

chmod 
	754  				数字模式指定
	(ugoa)(+-=)(rwx)    符号模式指定
	若用 chmod 4755 filename 可使此程序具有 root 的权限。 
	chmod 4755与chmod 755 的区别在于开头多了一位，这个4表示其他用户执行文件时，具有与所有者相当的权限。

more、less  分页显示文本文件内容

head、tail    显示文件头、尾内容

ctrl+alt+F1  命令行全屏模式
运行项目并下载源码
```

## 系统管理命令

```shell
stat              显示指定文件的详细信息，比ls更详细

who               显示在线登陆用户

whoami          显示当前操作用户

hostname      显示主机名

uname           显示系统信息

top                动态显示当前耗费资源最多进程信息

ps                  显示瞬间进程状态 ps -aux

du                  查看目录大小 du -h /home带有单位显示目录信息

df                  查看磁盘大小 df -h 带有单位显示磁盘信息

ifconfig          查看网络情况

ping                测试网络连通

netstat          显示网络状态信息

man                命令不会用了，找男人  如：man ls

clear              清屏

alias               对命令重命名 如：alias showmeit="ps -aux" ，另外解除使用unaliax showmeit

kill                 杀死进程，可以先用ps 或 top命令查看进程的id，然后再用kill命令杀死进程。

shutdown

     -r             关机重启

     -h             关机不重启

     now          立刻关机

halt               关机

reboot          重启
```

## 打包压缩相关

```shell
gzip：				压缩工具，压缩后的文件默认以 .gz 为扩展名

bzip2：				压缩工具，压缩后的文件默认以 .bz2 为扩展名

tar:                将多个文件或目录合并为一个独立的归档文件（归档）的工具，但本身不具备压缩能力，归档后的文件默认以 .tar 为扩展名

     -c              归档操作

     -x              提取归档操作
     
     -t              查看归档内容操作

     -z              调用gzip

     -j              调用bzip2

     -v              显示操作过程 v(view)

     -f              指定文件名

例：

tar -cvf /home/abc.tar /home/abc              只归档，不压缩

tar -czvf /home/abc.tar.gz /home/abc        归档，并用gzip压缩

tar -cjvf /home/abc.tar.bz2 /home/abc      归档，并用bzip2压缩

解压缩就直接替换上面的命令中的“c” 换成“x”

```

## 管道

```shell
将一个命令的标准输出作为另一个命令的标准输入。也就是把几个命令组合起来使用，后一个命令除以前一个命令的结果。

例：grep -r "close" /home/* | more       在home目录下所有文件中查找，包括close的文件，并分页输出。
netstat -a | grep "3306"  查找3306端口的网络状况
```

## 软件包管理

```shell
dpkg (Debian Package)管理工具，软件包名以.deb后缀。这种方法适合系统不能联网的情况下。

比如安装tree命令的安装包，先将tree.deb传到Linux系统中。再使用如下命令安装。

sudo dpkg -i tree_1.5.3-1_i386.deb         安装软件

sudo dpkg -r tree                                     卸载软件

 

注：将tree.deb传到Linux系统中，有多种方式。VMwareTool，使用挂载方式；使用winSCP工具等；

APT（Advanced Packaging Tool）高级软件工具。这种方法适合系统能够连接互联网的情况。

依然以tree为例

sudo apt-get install tree                         安装tree

sudo apt-get remove tree                       卸载tree

sudo apt-get update                                 更新软件

sudo apt-get upgrade        

 

将.rpm文件转为.deb文件

.rpm为RedHat使用的软件格式。在Ubuntu下不能直接使用，所以需要转换一下。

sudo alien abc.rpm

```

## 用户及用户组管理

```shell
/etc/passwd    存储用户账号

/etc/group       存储组账号

/etc/shadow    存储用户账号的密码

/etc/gshadow  存储用户组账号的密码

useradd 用户名

userdel 用户名

adduser 用户名

groupadd 组名

groupdel 组名

passwd root     给root设置密码

su root

su - root 

/etc/profile     系统环境变量

bash_profile     用户环境变量

.bashrc              用户环境变量

su user              切换用户，加载配置文件.bashrc

su - user            切换用户，加载配置文件/etc/profile ，加载bash_profile

sudo chown [-R] owner[:group] {File|Directory} 		更改文件的用户及用户组

例如：还以jdk-7u21-linux-i586.tar.gz为例。属于用户hadoop，组hadoop

要想切换此文件所属的用户及组。可以使用命令。

sudo chown root:root jdk-7u21-linux-i586.tar.gz
```



## vim使用

```shell
vim三种模式：命令模式、插入模式、编辑模式。使用ESC或i或：来切换模式。

命令模式下：

:q                      退出

:q!                     强制退出

:wq                   保存并退出

:set number     显示行号

:set nonumber  隐藏行号

/apache            在文档中查找apache 按n跳到下一个，shift+n上一个

yyp                   复制光标所在行，并粘贴

h(左移一个字符←)、j(下一行↓)、k(上一行↑)、l(右移一个字符→)

```

# 环境变量

| 加载阶段    | 对应配置文件                  | 说明                       |
| :---------- | :---------------------------- | :------------------------- |
| 系统级      | /etc/profile                  | 系统级初始化脚本，最先执行 |
| 用户级      | ~/.bash_profile 或 ~/.profile | 用户登录时执行             |
| 交互式Shell | ~/.bashrc                     | 每次打开终端时执行         |

# Linux 命令大全

## apt 命令

apt（Advanced Packaging Tool）是一个在 Debian 和 Ubuntu 中的 Shell 前端软件包管理器。

apt 命令执行需要超级管理员权限(root)。

```shell
# 连接到配置的软件源，检查更新
sudo apt update
# 常与update搭配 列出可更新的软件包
apt list --upgradeable
# 升级安装包
sudo apt upgrade 
# 一键升级 -y表示当安装过程提示选择全部为"yes"
sudo apt update && sudo apt upgrade -y


# 安装  包名不完整，按下Tab 键，会列出相关的包名
sudo apt install xxx
# 仅升级，不存在不安装
sudo apt install xxx --only-upgrade
# 仅安装，存在不升级
sudo apt install xxx --no-upgrade
# 安装某版本
sudo apt install xxx=<version_number>

# 查找存在的包
apt search xxx
# 获取包的详细信息
apt show xxx

# 移除包
sudo apt remove xxx
# 清理不再使用的依赖和库文件
sudo apt autoremove




```

## apt-get 命令

目前还没有任何 Linux 发行版官方放出 apt-get 将被停用的消息，至少它还有比 apt 更多、更细化的操作功能。对于低级操作，仍然需要 apt-get。

## mkdir 命令

```shell
# 建立目录
mkdir testdir
# 
mkdir -p testdir/testdir2
```



## curl 命令

curl（Client URL）是一个强大的命令行工具，用于在 Linux/Unix 系统中传输数据。它支持多种协议，包括 HTTP、HTTPS、FTP、SFTP 等，是开发者和系统管理员日常工作中不可或缺的工具。

```shell
curl [options] [URL...]
# options：各种可选参数，用于控制 curl 的行为
# URL：要访问的一个或多个网址

# 发送 POST 请求
curl -X POST -d "username=admin&password=123456" https://api.example.com/login
```

**基本参数**

1. 基本请求控制

| 选项 | 说明                              | 示例                                                       |
| :--- | :-------------------------------- | :--------------------------------------------------------- |
| `-X` | 指定 请求方法 默认为GET           | `curl -X POST https://example.com`                         |
| `-d` | 指定 请求体参数body               | `curl -d "name=John" https://example.com`                  |
| `-G` | 将 -d 数据作为 查询参数query 发送 | `curl -G -d "q=keyword" https://search.com`                |
| `-H` | 添加 请求头                       | `curl -H "Content-Type: application/json" https://api.com` |

2. 输出控制

| 选项 | 说明                   | 示例                                       |
| :--- | :--------------------- | :----------------------------------------- |
| `-o` | 将输出保存到文件       | `curl https://example.com -o output.html ` |
| `-O` | 使用远程文件名保存     | `curl -O https://example.com/file.zip`     |
| `-s` | 静默模式（不显示进度） | `curl -s https://api.com/data.json`        |
| `-v` | 显示详细通信过程       | `curl -v https://example.com`              |

3. 认证与安全

| 选项       | 说明              | 示例                                        |
| :--------- | :---------------- | :------------------------------------------ |
| `-u`       | 用户名密码认证    | `curl -u user:pass https://secure.com`      |
| `-k`       | 忽略 SSL 证书验证 | `curl -k https://self-signed.com`           |
| `--cacert` | 指定 CA 证书      | `curl --cacert cert.pem https://secure.com` |

4. 其他实用选项

| 选项           | 说明                                                    | 示例                                                         |
| :------------- | :------------------------------------------------------ | :----------------------------------------------------------- |
| `-L`           | 跟随重定向                                              | `curl -L https://short.url`                                  |
| `-I`           | 只获取头部信息                                          | `curl -I https://example.com`                                |
| `--limit-rate` | 限制传输速度                                            | `curl --limit-rate 100K https://largefile.com`               |
| `-F`           | 用于 multipart/form-data 类型的表单提交，常用于文件上传 | `curl -F "file=@localfile.txt" https:**//**upload.example.com` |

## crontab 命令

Linux crontab 是 Linux 系统中用于设置周期性被执行的指令的命令。

**crond** 命令每分钟会定期检查是否有要执行的工作，如果有要执行的工作便会自动执行该工作。

> **注意：**新创建的 cron 任务，不会马上执行，至少要过 2 分钟后才可以，当然你可以重启 cron 来马上执行。

```shell
# 查看当前用户的 crontab 文件
crontab -l
# 编辑当前用户的 crontab 文件
crontab -e
# 删除当前用户的 crontab 文件
crontab -r
# 列出某个用户的 crontab 文件（需要有相应的权限）
crontab -u username -l
# 编辑某个用户的 crontab 文件（需要有相应的权限）
crontab -u username -e
```

![image-20260118114341806](assets/image-20260118114341806.png)

**定时任务格式**

```shell
f1 f2 f3 f4 f5 program
# * 表示每个单位时间都要执行program
# */n 表示每n个时间单位都要执行program
# a-c 表示从第a时间单位到第c时间单位都要执行program
# a,b,c 表示第a时间单位,第b时间单位,第c时间单位时要执行program
```

![img](assets/EfG2i-BUMAAp_C1.jpeg)

**例子**

```
0 */2 * * * /sbin/service httpd restart  意思是每两个小时重启一次apache 

50 7 * * * /sbin/service sshd start  意思是每天7：50开启ssh服务 

50 22 * * * /sbin/service sshd stop  意思是每天22：50关闭ssh服务 

0 0 1,15 * * fsck /home  每月1号和15号检查/home 磁盘 

1 * * * * /home/bruce/backup  每小时的第一分执行 /home/bruce/backup这个文件 

00 03 * * 1-5 find /home "*.xxx" -mtime +4 -exec rm {} \;  每周一至周五3点钟，在目录/home中，查找文件名为*.xxx的文件，并删除4天前的文件。

30 6 */10 * * ls  意思是每月的1、11、21、31日是的6：30执行一次ls命令
```

> **注意：**当程序在你所指定的时间执行后，系统会发一封邮件给当前的用户，显示该程序执行的内容，若是你不希望收到这样的邮件，请在每一行空一格之后加上 **> /dev/null 2>&1** 即可

**脚本无法执行问题**

如果我们使用 crontab 来定时执行脚本，无法执行，但是如果直接通过命令（如：./test.sh)又可以正常执行，这主要是因为无法读取环境变量的原因。

1. 所有命令需要写成绝对路径形式，如: **/usr/local/bin/docker**。

2. 在 shell 脚本开头使用以下代码：

   ```shell
   #!/bin/sh
   
   . /etc/profile
   . ~/.bash_profile
   ```

   

## date命令

```shell
date [OPTION]... [+FORMAT]
```

**OPTION**

- **-d, --date=STRING**：通过字符串显示时间格式，字符串不能是'now'。
- **-f, --file=DATEFILE**：类似于--date; 一次从DATEFILE处理一行。
- **-I[FMT], --iso-8601[=FMT]**：按照 ISO 8601 格式输出时间，FMT 可以为'date'(默认)，'hours'，'minutes'，'seconds'，'ns'。 可用于设置日期和时间的精度，例如：2006-08-14T02:34:56-0600。
- **-R, --rfc-2822** ： 按照 RFC 5322 格式输出时间和日期，例如: Mon, 14 Aug 2006 02:34:56 -0600。
- **--rfc-3339=FMT**：按照 RFC 3339 格式输出，FMT 可以为'date', 'seconds','ns'中的一个，可用于设置日期和时间的精度， 例如：2006-08-14 02:34:56-06:00。
- **-r, --reference=FILE**：显示文件的上次修改时间。
- **-s, --set=STRING**：根据字符串设置系统时间。
- **-u, --utc, --universal**：显示或设置协调世界时(UTC)。
- **--help**：显示帮助信息。
- **--version**：输出版本信息。

**FORMAT** 

```
%%   输出字符 %
%a   星期几的缩写 (Sun..Sat)
%A   星期的完整名称(Sunday..Saturday)。 
%b   缩写的月份名称（例如，Jan）
%B   完整的月份名称（例如，January）
%c   本地日期和时间（例如，Thu Mar  3 23:05:25 2005）
%C   世纪，和%Y类似，但是省略后两位（例如，20）
%d   日 (01..31)
%D   日期，等价于%m/%d/%y
%e   一月中的一天，格式使用空格填充，等价于%_d
%F   完整的日期；等价于 %Y-%m-%d
%g   ISO 标准计数周的年份的最后两位数字
%G   ISO 标准计数周的年份，通常只对%V有用
%h   等价于 %b
%H   小时 (00..23)
%I   小时 (01..12)
%j   一年中的第几天 (001..366)
%k   小时，使用空格填充 ( 0..23); 等价于 %_H
%l   小时, 使用空格填充 ( 1..12); 等价于 %_I
%m   月份 (01..12)
%M   分钟 (00..59)
%n   新的一行，换行符
%N   纳秒 (000000000..999999999)
%p   用于表示当地的AM或PM，如果未知则为空白
%P   类似 %p, 但是是小写的
%r   本地的 12 小时制时间(例如 11:11:04 PM)
%R   24 小时制 的小时与分钟; 等价于 %H:%M
%s   自 1970-01-01 00:00:00 UTC 到现在的秒数
%S   秒 (00..60)
%t   插入水平制表符 tab
%T   时间; 等价于 %H:%M:%S
%u   一周中的一天 (1..7); 1 表示星期一
%U   一年中的第几周，周日作为一周的起始 (00..53)
%V   ISO 标准计数周，该方法将周一作为一周的起始 (01..53)
%w   一周中的一天（0..6），0代表星期天
%W   一年中的第几周，周一作为一周的起始（00..53）
%x   本地的日期格式（例如，12/31/99）
%X   本地的日期格式（例如，23:13:48）
%y   年份后两位数字 (00..99)
%Y   年
%z   +hhmm 格式的数值化时区格式（例如，-0400）
%:z  +hh:mm 格式的数值化时区格式（例如，-04:00）
%::z  +hh:mm:ss格式的数值化时区格式（例如，-04:00:00）
%:::z  数值化时区格式，相比上一个格式增加':'以显示必要的精度（例如，-04，+05:30）
%Z  时区缩写 （如 EDT）
```


# Shell教程

## Shell是什么

Shell 是一个用 C 语言编写的程序，它是用户使用 Linux 的桥梁。

Shell 可以是命令语言，也可以是程序设计语言。

## Shell脚本

一种为 shell 编写的脚本程序。

## Bash

Linux 的 Shell 种类众多，常见的有：

- Bourne Shell（/usr/bin/sh或/bin/sh）
- Bourne Again Shell（/bin/bash）
- C Shell（/usr/bin/csh）
- K Shell（/usr/bin/ksh）
- Shell for Root（/sbin/sh）

本教程关注的是 Bash，也就是 Bourne Again Shell，由于易用和免费，Bash 在日常工作中被广泛使用。同时，Bash 也是大多数Linux 系统默认的 Shell。

`#!` 告诉系统其后路径所指定的程序即是解释此脚本文件的 Shell 程序。

像 `#!/bin/sh`，它同样也可以改为 `#!/bin/bash`。一般情况不做区分。

## Shell 变量

### 定义变量

Shell变量是Shell 脚本编程中用于存储数据值的名称。

```shell
# 显式赋值
variable_name="runoob"
```

遵守规则：

* 只包含字母、数字和下划线，不能以数字开头
* 避免使用 Shell 关键字（例如 if、then、else、fi、for、while 等）
* 避免使用空格
* 避免使用特殊符号

注意事项：

* 习惯上使用大写字母表示常量
* 变量名不加`$`（PHP语言中变量需要）
* 尽量避免`=`两边的空格

```shell
# 语句给变量赋值
for file in `ls /etc`
for file in $(ls /etc)
```

### 使用变量



```shell
# 打印变量 在变量名前面加美元符号即可，是否花括号圈起是可选的。
echo $variable_name
echo ${variable_name}
echo "I am good at ${skill}Script" # 花括号可以帮助接收器识别变量的边界。
# 只读变量
readonly variable_name
# 删除变量
unset variable_name
```

### 变量类型

```shell
# 字符串 单引号或双引号来定义字符串
variable_string='Hello, World!'
variable_string="Hello, World!"
# 整数变量

```


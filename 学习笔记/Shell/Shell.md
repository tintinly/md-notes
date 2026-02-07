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

> **注意事项：**
>
> * 习惯上使用大写字母表示常量
> * 变量名不加`$`（PHP语言中变量需要）
> * 尽量避免`=`两边的空格

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

**字符串**

```shell
# 字符串 单引号或双引号来定义字符串
variable_string='Hello, World!'
variable_string="Hello, World!"

# 单引号里的任何字符都会原样输出，因此单引号字符串中的变量是无效的
# 双引号里可以有变量和转义字符
your_name="runoob"
str="Hello, I know you are \"$your_name\"! \n" 
echo -e $str # 输出结果Hello, I know you are "runoob"! 


# 拼接字符串 使用单引号或双引号 成对直接拼接
greeting="hello, "$your_name" !"
greeting_2='hello, '$your_name' !'

# 获取字符串长度
echo ${#string}
echo ${#string[0]}

# 提取子字符串 从第2个字符开始截取4个字符
echo ${string:2:4}
```

**整数**

```shell
# 整数变量 一些Shell中，你可以使用 declare 或 typeset 命令来声明整数变量。 typeset 已经被弃用了
declare -i variable_integer=42
```

**数组**

```shell
# 数组变量
variable_array=(1 2 3 4 5) # 索引数组
declare -A variable_array # 关联数组
variable_array2["name"]="John"
variable_array2["age"]=30

# 读取数组
echo ${variable_array[1]}
echo ${variable_array2["name"]}
echo ${variable_array2[age]}

# 获取数组中的所有元素
echo ${variable_array[@]}
echo ${variable_array[*]}

# 获取数组元素的个数
echo ${#variable_array[@]}
echo ${#variable_array[*]}

# 数组前加一个感叹号 ! 可以获取数组的所有键，例如：
echo  ${!variable_array[@]}
echo  ${!variable_array[*]}
echo  ${!variable_array2[@]}
echo  ${!variable_array2[*]}
```

**环境变量**

```shell
# 环境变量 例如PATH 变量包含了操作系统搜索可执行文件的路径
echo $PATH
```

**特殊变量** 

例如 `$0` 表示脚本的名称，`$1`, `$2`, 等表示脚本的参数。`$#`表示传递给脚本的参数数量，`$?` 表示上一个命令的退出状态等。

## Shell 注释

**多行注释**

```shell
:<<EOF
注释内容...
注释内容...
注释内容...
EOF
```

**直接使用 : 号**

由于冒号是一个空命令，这些内容不会被执行。

格式为：: + 空格 + 单引号。

```sell
: '
这是注释的部分。
可以有多行内容。
'
```

## Shell 传递参数

```shell
#!/bin/bash
# author:菜鸟教程
# url:www.runoob.com

echo "Shell 传递参数实例！";
echo "执行的文件名：$0";
echo "第一个参数为：$1";
echo "第二个参数为：$2";
echo "第三个参数为：$3";
```

其他特殊字符用来处理参数

| $#   | 传递到脚本的参数个数                                         |
| ---- | ------------------------------------------------------------ |
| $*   | 以一个单字符串显示所有向脚本传递的参数。 如"$*"用「"」括起来的情况、以"$1 $2 … $n"的形式输出所有参数。 |
| $$   | 脚本运行的当前进程ID号                                       |
| $!   | 后台运行的最后一个进程的ID号                                 |
| $@   | 与$*相同，但是使用时加引号，并在引号中返回每个参数。 如"$@"用「"」括起来的情况、以"$1" "$2" … "$n" 的形式输出所有参数。 |
| $-   | 显示Shell使用的当前选项，与set命令功能相同。                 |
| $?   | 显示上一个命令的退出状态。0表示没有错误，其他任何值表明有错误。 |

## Shell 基本运算符

原生bash不支持简单的数学运算，但是可以通过其他命令来实现，例如 awk 和 expr，expr 最常用。

expr 是一款表达式计算工具，使用它能完成表达式的求值操作。

```shell
#!/bin/bash

val=`expr 2 + 2`
echo "两数之和为 : $val"
```

> **注意：**
>
> * 表达式使用的是反引号\`包含
> * 表达式和运算符之间要有空格

### 算术运算符

假定变量 a 为 10，变量 b 为 20

| 运算符 | 说明                                          | 举例                          |
| :----- | :-------------------------------------------- | :---------------------------- |
| +      | 加法                                          | `expr $a + $b` 结果为 30。    |
| -      | 减法                                          | `expr $a - $b` 结果为 -10。   |
| *      | 乘法                                          | `expr $a \* $b` 结果为  200。 |
| /      | 除法                                          | `expr $b / $a` 结果为 2。     |
| %      | 取余                                          | `expr $b % $a` 结果为 0。     |
| =      | 赋值                                          | a=$b 把变量 b 的值赋给 a。    |
| ==     | 相等。用于比较两个数字，相同则返回 true。     | [ $a == $b ] 返回 false。     |
| !=     | 不相等。用于比较两个数字，不相同则返回 true。 | [ $a != $b ] 返回 true。      |

```shell
#!/bin/bash
# author:菜鸟教程
# url:www.runoob.com

a=10
b=20

val=`expr $a \* $b`
echo "a * b : $val"

if [ $a == $b ]
then
   echo "a 等于 b"
fi
if [ $a != $b ]
then
   echo "a 不等于 b"
fi
```

> **注意：**
>
> - 乘号\*前边可能需要加反斜杠\\才能实现乘法运算；
> - 在 MAC 中 shell 的 expr 语法是：`$((表达式))`，\*不需要转义符号 \\。
> - 条件表达式要放在方括号之间

### 关系运算符

关系运算符只支持数字，不支持字符串，除非字符串的值是数字

| 运算符 | 说明                                                  | 举例                       |
| :----- | :---------------------------------------------------- | :------------------------- |
| -eq    | 检测两个数是否相等，相等返回 true。                   | [ $a -eq $b ] 返回 false。 |
| -ne    | 检测两个数是否不相等，不相等返回 true。               | [ $a -ne $b ] 返回 true。  |
| -gt    | 检测左边的数是否大于右边的，如果是，则返回 true。     | [ $a -gt $b ] 返回 false。 |
| -lt    | 检测左边的数是否小于右边的，如果是，则返回 true。     | [ $a -lt $b ] 返回 true。  |
| -ge    | 检测左边的数是否大于等于右边的，如果是，则返回 true。 | [ $a -ge $b ] 返回 false。 |
| -le    | 检测左边的数是否小于等于右边的，如果是，则返回 true。 | [ $a -le $b ] 返回 true。  |

```shell
#!/bin/bash
# author:菜鸟教程
# url:www.runoob.com

a=10
b=20

if [ $a -eq $b ]
then
   echo "$a -eq $b : a 等于 b"
else
   echo "$a -eq $b: a 不等于 b"
fi
```

### 布尔运算符

| 运算符 | 说明                                                | 举例                                     |
| :----- | :-------------------------------------------------- | :--------------------------------------- |
| !      | 非运算，表达式为 true 则返回 false，否则返回 true。 | [ ! false ] 返回 true。                  |
| -o     | 或运算，有一个表达式为 true 则返回 true。           | [ $a -lt 20 -o $b -gt 100 ] 返回 true。  |
| -a     | 与运算，两个表达式都为 true 才返回 true。           | [ $a -lt 20 -a $b -gt 100 ] 返回 false。 |

```shell
#!/bin/bash
# author:菜鸟教程
# url:www.runoob.com

a=10
b=20

if [ $a -lt 5 -o $b -gt 100 ]
then
   echo "$a 小于 5 或 $b 大于 100 : 返回 true"
else
   echo "$a 小于 5 或 $b 大于 100 : 返回 false"
fi
```

### 逻辑运算符

| 运算符 | 说明       | 举例                                       |
| :----- | :--------- | :----------------------------------------- |
| &&     | 逻辑的 AND | [[ $a -lt 100 && $b -gt 100 ]] 返回 false  |
| \|\|   | 逻辑的 OR  | [[ $a -lt 100 \|\| $b -gt 100 ]] 返回 true |

```shell
#!/bin/bash
# author:菜鸟教程
# url:www.runoob.com

a=10
b=20

if [[ $a -lt 100 && $b -gt 100 ]]
then
   echo "返回 true"
else
   echo "返回 false"
fi
```

### 字符串运算符

| 运算符 | 说明                                         | 举例                     |
| :----- | :------------------------------------------- | :----------------------- |
| =      | 检测两个字符串是否相等，相等返回 true。      | [ $a = $b ] 返回 false。 |
| !=     | 检测两个字符串是否不相等，不相等返回 true。  | [ $a != $b ] 返回 true。 |
| -z     | 检测字符串长度是否为0，为0返回 true。        | [ -z $a ] 返回 false。   |
| -n     | 检测字符串长度是否不为 0，不为 0 返回 true。 | [ -n "$a" ] 返回 true。  |
| $      | 检测字符串是否不为空，不为空返回 true。      | [ $a ] 返回 true。       |

```shell
#!/bin/bash
# author:菜鸟教程
# url:www.runoob.com

a="abc"
b="efg"

if [ $a != $b ]
then
   echo "$a != $b : a 不等于 b"
else
   echo "$a != $b: a 等于 b"
fi
if [ -z $a ]
then
   echo "-z $a : 字符串长度为 0"
else
   echo "-z $a : 字符串长度不为 0"
fi
if [ $a ]
then
   echo "$a : 字符串不为空"
else
   echo "$a : 字符串为空"
fi
```

### 文件测试运算符

用于检测 Unix 文件的各种属性。

| 操作符  | 说明                                                         | 举例                      |
| :------ | :----------------------------------------------------------- | :------------------------ |
| -b file | 检测文件是否是块设备文件，如果是，则返回 true。              | [ -b $file ] 返回 false。 |
| -c file | 检测文件是否是字符设备文件，如果是，则返回 true。            | [ -c $file ] 返回 false。 |
| -d file | 检测文件是否是目录，如果是，则返回 true。                    | [ -d $file ] 返回 false。 |
| -f file | 检测文件是否是普通文件（既不是目录，也不是设备文件），如果是，则返回 true。 | [ -f $file ] 返回 true。  |
| -g file | 检测文件是否设置了 SGID 位，如果是，则返回 true。            | [ -g $file ] 返回 false。 |
| -k file | 检测文件是否设置了粘着位(Sticky Bit)，如果是，则返回 true。  | [ -k $file ] 返回 false。 |
| -p file | 检测文件是否是有名管道，如果是，则返回 true。                | [ -p $file ] 返回 false。 |
| -u file | 检测文件是否设置了 SUID 位，如果是，则返回 true。            | [ -u $file ] 返回 false。 |
| -r file | 检测文件是否可读，如果是，则返回 true。                      | [ -r $file ] 返回 true。  |
| -w file | 检测文件是否可写，如果是，则返回 true。                      | [ -w $file ] 返回 true。  |
| -x file | 检测文件是否可执行，如果是，则返回 true。                    | [ -x $file ] 返回 true。  |
| -s file | 检测文件是否为空（文件大小是否大于0），不为空返回 true。     | [ -s $file ] 返回 true。  |
| -e file | 检测文件（包括目录）是否存在，如果是，则返回 true。          | [ -e $file ] 返回 true。  |
| -S file | 判断某文件是否 socket。                                      |                           |
| -L file | 检测文件是否存在并且是一个符号链接。                         |                           |

### 自增和自减方式

```shell
#!/bin/bash

# 初始化变量
num=5

# 自增
let num++
num=`expr $num + 1`
num=$((num + 1))
((num++))

# 自减
let num--
num=`expr $num - 1`
num=$((num - 1))
((num--))

echo $num
```

## Shell echo 命令

`echo` 是一个内置的 Shell 命令，用于在标准输出（通常是终端）显示一行文本或变量的值。

echo会自动添加换行符。

```shell
echo "Welcome, $name!" # 可以输出变量
echo This is a test # 可以不带引号
```

基本选项

```shell
echo -n "Loading..." # -n 选项：不换行输出
echo -e "First line\nSecond line" # -e 选项：启用转义字符解释
```

高级用法

```shell
# 重定向
echo "This will be saved to file" > output.txt # 输出覆盖至
echo "Additional line" >> output.txt # 输出追加至

# 彩色输出
echo -e "\033[42;31mGreen Background with Red Text\033[0m" # 使用 ANSI 转义码实现彩色文本和彩色背景
# 前景色：30(黑)、31(红)、32(绿)、33(黄)、34(蓝)、35(紫)、36(青)、37(白)
# 背景色：40-47 对应上述颜色
# \033[0m 重置所有属性


# 输出命令的执行结果
echo "Today is $(date)"
```

## Shell printf 命令

`printf`（print formatted）是一个用于格式化输出的 Shell 命令，它源自 C 语言的 `printf()` 函数。

 printf 不会像 echo 自动添加换行符。

```shell
# 简单字符串输出
printf "Hello, World!\n"

# 带变量的输出
name="Alice"
printf "Hello, %s\n" "$name"
```

常用的格式说明符：

- `%s`：字符串
- `%d`：十进制整数
- `%f`：浮点数
- `%c`：字符
- `%x`：十六进制数
- `%o`：八进制数
- `%b`：二进制数
- `%e`：科学计数法表示的浮点数

格式化控制

```shell
# 字段宽度和对齐
printf "|%10s|\n|%-10s|\n" "right" "left"

# 数字前导零
printf "Year: %04d\n" 23

# 浮点数精度
printf "Pi: %.2f\n" 3.14159
```

多参数处理

```shell
printf "%-10s %5d %8.2f\n" "Apple" 5 2.5 "Orange" 3 1.75
```

## Shell test 命令

`test` 命令是 Shell 内置的条件判断工具，用于评估表达式并返回布尔值（真/假），它通常与 `if` 语句结合使用，是 Shell 脚本中实现逻辑控制的基础。

```
test EXPRESSION
# 或
[ EXPRESSION ]  # 注意方括号内必须有空格
```

```shell
#!/bin/bash

file="/etc/passwd"

if [ -e "$file" ]; then
    echo "$file 存在"
    if [ -r "$file" ]; then
        echo "并且可读"
    fi
else
    echo "$file 不存在"
fi
```

常见操作见[运算符](#Shell 基本运算符)

## Shell 流程控制

和 Java、PHP 等语言不一样，sh 的流程控制不可为空

### if else 条件控制 

```shell
a=10
b=20
if [ $a == $b ]
then
   echo "a 等于 b"
elif [ $a -gt $b ]
then
   echo "a 大于 b"
elif [ $a -lt $b ]
then
   echo "a 小于 b"
else
   echo "没有符合的条件"
fi
```

判断语句中**[...]**大于使用 **-gt**，小于使用 **-lt**。

```shell
if [ "$a" -gt "$b" ]; then
    ...
fi
```

使用 **((...))** 作为判断语句，大于和小于可以直接使用 **>** 和 **<**。

```shell
if (( a > b )); then
    ...
fi
```

与 test 命令结合使用

```shell
if test $[a] -gt $[b]; then
    ...
fi
```

### case  多分支选择

case取值后面必须为单词 **in**，每一模式必须以右括号结束，匹配发现取值符合某一模式后，其间所有命令开始执行直至 **;;**，如果无一匹配模式，使用星号 * 捕获该值。

```shell
echo '输入 1 到 4 之间的数字:'
echo '你输入的数字为:'
read aNum
case $aNum in
    1)  echo '你选择了 1'
    ;;
    2)  echo '你选择了 2'
    ;;
    3)  echo '你选择了 3'
    ;;
    4)  echo '你选择了 4'
    ;;
    *)  echo '你没有输入 1 到 4 之间的数字'
    ;;
esac
```

### for 循环

```shell
for loop in 1 2 3 4 5
do
    echo "The value is: $loop"
done
```

### while 语句

```shell
#!/bin/bash
int=1
while(( $int<=5 ))
do
    echo $int
    let "int++"
done
```

### until 循环

```shell
#!/bin/bash
a=0
until [ ! $a -lt 10 ]
do
   echo $a
   a=`expr $a + 1`
done
```

### 循环控制

```shell
#!/bin/bash
# break 跳出所有循环(终止执行)  
# continue 跳出当前循环。
while :
do
    echo -n "输入 1 到 5 之间的数字: "
    read aNum
    case $aNum in
        1|2|3|4|5) echo "你输入的数字为 $aNum!"
        ;;
        *) echo "你输入的数字不是 1 到 5 之间的!"
            continue
        ;;
    esac
    echo "输入正确，游戏结束！"
    break;
done
```

## Shell 函数

```shell
#!/bin/bash
# author:菜鸟教程
# url:www.runoob.com

funWithReturn(){
    echo "这个函数会对输入的两个数字进行相加运算..."
    echo "输入第一个数字: "
    read aNum
    echo "输入第二个数字: "
    read anotherNum
    echo "两个数字分别为 $aNum 和 $anotherNum !"
    return $(($aNum+$anotherNum))
}
funWithReturn
echo "输入的两个数字之和为 $? !"
```

> **注意事项：**
>
> * 所有函数在使用前必须定义
> * **return** 语句只能返回一个介于 0 到 255 之间的整数，超出范围可以直接使用 **echo** 

特殊字符用来处理参数参考[Shell 传递参数](#Shell 传递参数)

## Shell 输入/输出重定向

多数 UNIX 系统命令从你的终端接受输入并将所产生的输出发送回到您的终端。默认情况下，Shell的一个命令输入的接收地和输出的目的地都是终端。

重定向命令列表：

| 命令            | 说明                                               |
| :-------------- | :------------------------------------------------- |
| command > file  | 将输出重定向到 file。                              |
| command < file  | 将输入重定向到 file。                              |
| command >> file | 将输出以追加的方式重定向到 file。                  |
| n > file        | 将文件描述符为 n 的文件重定向到 file。             |
| n >> file       | 将文件描述符为 n 的文件以追加的方式重定向到 file。 |
| n >& m          | 将输出文件 m 和 n 合并。                           |
| n <& m          | 将输入文件 m 和 n 合并。                           |
| << tag          | 将开始标记 tag 和结束标记 tag 之间的内容作为输入。 |

### 输出重定向

```shell
# > 覆盖到文件
who > who.txt
echo "菜鸟教程：www.runoob.com" > runoob.txt
# >> 追加到文件末尾
```

### 输入重定向

```shell
# 统计test.sh文件行数写入到test_word_count.txt文件中
wc -l < test.sh > test_word_count.txt
```

### 标准输入/输出/错误重定向

一般情况下，每个 Unix/Linux 命令运行时都会打开三个文件：

- 标准输入文件(stdin)：stdin的文件描述符为0，Unix程序默认从stdin读取数据。
- 标准输出文件(stdout)：stdout 的文件描述符为1，Unix程序默认向stdout输出数据。
- 标准错误文件(stderr)：stderr的文件描述符为2，Unix程序会向stderr流中写入错误信息。

```shell
# stderr 重定向到 file
command 2>file
#  stdout 和 stderr 合并后重定向到 file
command > file 2>&1
```

### Here Document

Here Document 是 Shell 中的一种特殊的重定向方式，用来将输入重定向到一个交互式 Shell 脚本或程序。

它的作用是将两个 delimiter 之间的内容(document) 作为输入传递给 command。

```shell
wc -l << EOF
    欢迎来到
    菜鸟教程
    www.runoob.com
EOF
3          # 输出结果为 3 行
```

### /dev/null 文件

如果希望执行某个命令，但又不希望在屏幕上显示输出结果，那么可以将输出重定向到 /dev/null

```shell
command > /dev/null
```

/dev/null 是一个特殊的文件，写入到它的内容都会被丢弃

## Shell 脚本引用

和其他语言一样，Shell 也可以包含外部脚本。这样可以很方便的封装一些公用的代码作为一个独立的文件。

```shell
#使用 . 号来引用test1.sh 文件
. ./test1.sh

# 或者使用以下包含文件代码
# source ./test1.sh
```


---
title: "gdb调试coredump记录"
date: "2025-02-17"
category: "技术"
tags: ["gdb", "Linux"]
excerpt: "如何使用gdb调试coredump的笔记记录"
readTime: "8 分钟"
author: "泽君"
image: "https://media.istockphoto.com/id/1093975156/photo/open-source-software-concept-design.webp?s=2048x2048&w=is&k=20&c=haX3Oyq4bS1Hgr1g4iObr_JxZdtdjod6alryKNEknPQ="
---

## 什么是coredump
当程序发生内存越界访问等行为时，会触发OS的保护机制，此时OS会产生一个信号发送给对应的进程。当进程从内核态到用户态切换时，该进程会处理这个信号。

此类信号（比如SEGV）的默认处理行为方式就是生成一个 coredump 文件。
通常情况下，coredump包含了程序运行时的内存，寄存器状态，堆栈指针，内存管理信息等。
可以理解为，把程序工作的当前状态存储成一个文件。

### core dump产生的可能情况
- 内存访问越界
	- 由于使用错误的下标，导致数组访问越界
	- 一些操作字符串的C函数，比如 strcpy、strcat、sprintf等，没有注意结束符，或者没有注意越界
- 多线程程序使用了线程不安全的函数
- 多线程读写的数据未加锁保护
- 非法指针
	- 使用空指针
	- 随意使用指针转换
- 堆栈溢出

## Linux 下怎么生成 core dump
一般新的linux机器，是没有设置过生成coredump的选项的，我们可以使用如下命令查看
```bash
[root@iZuf6htf9lstskbnesc1x8Z ~] ulimit -a
core file size          (blocks, -c)  0
data seg size           (kbytes, -d) unlimited
scheduling priority             (-e) 0
file size               (blocks, -f) unlimited
pending signals                 (-i) 7749
max locked memory       (kbytes, -l) 64
max memory size         (kbytes, -m) unlimited
open files                      (-n) 65535
pipe size            (512 bytes, -p) 8
POSIX message queues     (bytes, -q) 819200
real-time priority              (-r) 0
stack size              (kbytes, -s) 8192
cpu time               (seconds, -t) unlimited
max user processes              (-u) 7749
virtual memory          (kbytes, -v) unlimited
file locks                      (-x) unlimited
```

修改， 打开coredump的设置
```bash
ulimit -c unlimited
```

如果要使给配置永久生效，可以：
```bash
echo "ulimit -c unlimited" >> /etc/profile
```

如果担心程序多次dmp，coredump文件会被覆盖，可以设置生成的coredump文件名，也可以调整文件生成路径

使用如下命令，修改 core_pattern，来调整coredump的生成路径和名称，
```bash
# 在/var/core目录生成，文件名则是 core-程序名-进程pid
echo "/var/core/core-%e-%p" >> /proc/sys/kernel/core_pattern 
echo "core-%e-%p" >> /proc/sys/kernel/core_pattern 
#目录可以是 /var/coredump/
```

另外，还可以通过修改 kernel的参数来达到上面的效果
```bash
vim /etc/sysctl.conf
```
增加如下语句
```txt
kernel.core_pattern = /var/core/core_%e_%p 
# 当前目录 
# kernel.core_pattern = core_%e_%p 
kernel.core_uses_pid = 0
```
使生效:
```bash
sysctl -p /etc/sysctl.conf
```
说明：
如果 `/proc/sys/kernel/core_uses_pid` 这个文件的内容被配置成1，即使 `core_pattern` 中没有设置 `%p` ，最后生成的core文件名仍会加上进程ID。


## gdb调试core
### 启动
```bash
gdb prpgress corefile
```

### 设置断点

```bash
# 查看断点
info b/breaks

# 设置断点
# break [文件:]行号
break 7
# break class:func
break MyClass:SomeFunc

# 条件断点
break some if condtion

# 删除断点
# delete 序号
delete 0

# 禁用/开启断点
disable/enable breakpoint
```


### 执行
```bash
# 运行
run/r

# 继续
continue/c

# 单步调试
next/n
next N
# 执行N次

# 单步进入
step
# 退出函数时使用 
finish

# 强制返回
return 

# 显式堆栈
bt/backtrace

# 推出
quit/q
```

### 变量操作
```bash
# 设置变量
set vlaue=expression

# 监控变量
# 数值改变，暂停运行
watch value

# 被访问或改变时暂停运行
awatch <expression>

# 被访问时暂停运行
rwatch <expression>

# 打印
print/p value
# 打印字符
p "%s",character/expression
```


### 线程相关命令

```shell
# 列出线程
info threads

# 打开所有线程的堆栈信息
thread apply all bt

# 查看指定线程堆栈信息 5为id
thread apply 5 bt

# 进入指定线程栈空间
thread 5

```

[gdb调试coredump](https://zhuanlan.zhihu.com/p/46605905)
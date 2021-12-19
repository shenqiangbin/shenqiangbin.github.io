---
title: Git的使用
category: 代码管理
# 一个页面可以有多个标签
tag:
  - git
---

## Git

大部分的代码管理都使用 Git，还一部分使用 SVN，而使用 Git 又有一部分人喜欢使用命令，而对于记不住命令的则可以使用 **可视化工具**。
我个人建议平时使用 **可视化工具** ，但同时也要熟悉常用的 **Git 命令**，有时候命令比可视化工具快的多。

## 可视化工具

推荐 **SourceTree** 。它的提交历史，以及每次提交的文件修改是非常好用的。反观其他软件都没有这么好用。
SourceTree 只有 Mac 版本和 Windows 版本，没有 Linux 版本，因此在 Ubuntu 下是没有办法使用的。

其它可视化工具推荐 [https://git-scm.com/download/gui/linux](https://git-scm.com/download/gui/linux)

## 配置 SSH 密钥

git 项目可以使用 2 种形式克隆下来，一种是 HTTP 协议形式，一种是 SSH 形式。

**HTTP 形式**：克隆项目的时候需要输入 **用户名** 和 **密码**。   
**SSH 形式**：配置一次 SSH 密钥即可，无需使用 **用户名** 和 **密码**。

**配置SSH**

Mac系统 ：生成公钥和私钥的命令如下：  
```bash
$ ssh-keygen -t ed25519 -C "your_email@example.com"
```

将生成的公钥信息添加到 github 的 SSH 中，存放目录一般在 `~/.ssh/` 目录中。

具体操作如下：  
[https://docs.github.com/cn/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent](https://docs.github.com/cn/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

## 常用操作

### 配置用户名和邮箱

如果使用的是 **SourceTree**，则在 **SourceTree** 中设置即可。
另外，还可以使用命令来设置。

```bash
# 设置用户名为 sqber，邮箱为 sqber@qq.com
git config --global user.name "sqber"
git config --global user.email "sqber@qq.com"

# 查看设置是否正确
git config -l
```

### 克隆项目

```bash
git clone [项目地址]
比如： git clone https://github.com/shenqiangbin/shenqiangbin.github.io
```

### 切换分支

克隆项目下来后，一般都会切换到 `develop` 分支。

### 查看提交记录

```bash
git log --oneline --graph
# 按 q 退出
# --online 简化了日志信息 --graph 使日志以树结构呈现
```

输出效果如下

```bash
qian:shenqiangbin adminqian$ git log --oneline --graph
* 69ad869 (HEAD -> master, origin/master, origin/HEAD) 整理 ubuntu 相关问题
* 107b76f add
* 3ac2745 Merge branch 'master' of github.com:shenqiangbin/shenqiangbin.github.io
*   07da5e0 Merge branch 'master' of github.com:shenqiangbin/shenqiangbin.github.io
|\  
| * 854fad0 添加说明
* | 3ad102b add
* | f5322ef install ubuntu system
|/  
* c09c477 添加 vscode 配置。
* ff6f06c feat: 添加说明
* 015bfe5 人民日报改成更容易阅读的形式
* f4d1e30 add
* 42cfc3a 整理直播相关内容
* 7adb7f9 add video
* 39e9426 Add
```

### 查看状态

```bash
git status
```

### 拉取代码

```bash
git pull
```

### 推送代码

```bash
git push
```

### 修改放入到【暂存】

```bash
# 将当前项目的修改都放入到【暂存】
git add .
```


## 不常用操作

### 配置远程仓库

如果使用的 SourceTree，可以直接在 SourceTree 中修改。【仓库】-【仓库设置】。

下面是使用命令的修改形式。

```bash
# 一般我们配置了 SSH 之后，就可以把仓库的 http 地址修改成 ssh 地址
# 这个和配置用户名和邮箱是一样的语法的
git config remote.origin.url "git@github.com:shenqiangbin/shenqiangbin.github.io.git"

# 查看设置是否正确
git config -l
```

## 参照

[https://zhuanlan.zhihu.com/p/372972441](https://zhuanlan.zhihu.com/p/372972441)


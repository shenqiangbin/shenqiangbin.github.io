---
sidebar: auto
---

# Windwos 和 Ubuntu 双系统

系统安装很简单，但安装之后的问题就比较多了。


## 常用操作

| 说明       | 命令           |
| ------------- |-------------|
| 快速打开终端    | `Ctrl + Alt + T` |
| 自带截图       | `Shift+ Prt Scrn`      |
| 在终端打开目录   | `nautilus .`      |
 

## 安装【微信】和【QQ】


```bash
sudo docker run -d --name qq2 \
    --device /dev/snd --ipc="host"\
    -v $HOME/TencentFiles:/TencentFiles \
    -v /tmp/.X11-unix:/tmp/.X11-unix \
    -e XMODIFIERS=@im=ibus \
    -e QT_IM_MODULE=ibus \
    -e GTK_IM_MODULE=ibus \
    -e DISPLAY=unix$DISPLAY \
    -e AUDIO_GID=`getent group audio | cut -d: -f3` \
    -e VIDEO_GID=`getent group video | cut -d: -f3` \
    -e GID=`id -g` \
    -e UID=`id -u` \
    bestwu/qq:im
```


```bash
sudo docker run -d --name wechat --device /dev/snd --ipc="host"\
    -v /tmp/.X11-unix:/tmp/.X11-unix \
    -v $HOME/WeChatFiles:/WeChatFiles \
    -e DISPLAY=unix$DISPLAY \
    -e XMODIFIERS=@im=ibus \
    -e QT_IM_MODULE=ibus \
    -e GTK_IM_MODULE=ibus \
    -e AUDIO_GID=`getent group audio | cut -d: -f3` \
    -e GID=`id -g` \
    -e UID=`id -u` \
    bestwu/wechat
```

### 问题： docker: unknown server OS: .

解决：要加上 sudo

### 问题： 微信和 QQ 无法输入中文

如果使用的是 fcitx 框架的输入法，则需要将上面 docker 命令中的 ibus 修改成 fcitx，否则则不用修改。

## ibus

输入法经常无法正常使用，这时候就需要重新启动下 `ibus`（我使用的输入法是 `ibus` 框架，而不是 `fcitx` 框架的）

ibus 重启命令如下：

```ibus-daemon -r -d -x```

## 参照：

[https://zhuanlan.zhihu.com/p/372972441](https://zhuanlan.zhihu.com/p/372972441)
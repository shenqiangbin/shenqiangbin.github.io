---
sidebar: auto
---

## bilibili直播

我的直播间 [https://live.bilibili.com/23855393](https://live.bilibili.com/23855393)

### 概述
Mac 下是使用的推流软件 [OBS](https://obsproject.com/zh-cn)，bilibli 直播的时候会有一个地址，填写到 OBS 软件的【推流】配置中即可。

Mac 下不管是视频录制软件，还是直播软件，想录制或播放电脑声音是不行的，需要安装 [Soundflower](https://github.com/mattingalls/Soundflower)，Mac 下软件权限要放开，否则会安装失败（具体请 bing）。

### 详细操作
具体操作可以参照这个网址：
[参照](https://zhuanlan.zhihu.com/p/103842121)


### 我的问题

因 Mac 的分辨率高，当 OBS 的【视频】中基础分辨率设为 2880*1800 的时候会令 CPU 飙升，电脑翁翁作响。
分辨率太低的话，直播又不清楚。因此我作了如下配置。

分辨率调整成 缩放-字体大一些 即可。调成后显示 13.3英寸(2560 × 1600)。  

OBS 的视频设置修改为：  
基础分辨率：2550*1585  
输出分辨率：1272*792  
常用FPS值：30  

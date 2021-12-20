---
title: 平台判断
category: 工具
# 一个页面可以有多个标签
tag:
  - 
---

## 场景

在动态生成某些命令的时候，不同操作系统可能有某些特殊字符需要处理。
比如 mysqldump 时，使用的 > 在 Windows 下则会有问题，因此就需要判断系统类型。

## 判断是 Windows 系统还是 Linux 系统

找的一个 github 上的现有的 java 文件（来源已经忘记了）。内容如下：

```java

package com.sqber;
import java.io.File;

public class Platform {

    private static final String OS_NAME = System.getProperty("os.name", "");

    public enum OS {
        WINDOWS,
        LINUX,
        MACOS,
    }

    private static OS os;
    static {
        if (Platform.isLinux()) {
            os = OS.LINUX;
        }
        if (Platform.isWindows()) {
            os = OS.WINDOWS;
        }
        if (Platform.isMacOSX()) {
            os = OS.MACOS;
        }
    }

    public static boolean isUnix() {
        return File.separatorChar == '/';
    }

    public static boolean isWindows() {
        return File.separatorChar == '\\';
    }

    public static boolean isLinux() {
        return isUnix() && OS_NAME.toLowerCase().contains("linux");
    }

    public static boolean isMacOSX() {
        return isUnix() && (OS_NAME.startsWith("Mac") || OS_NAME.startsWith("Darwin"));
    }

    public static boolean isSolaris() {
        return isUnix() && (OS_NAME.startsWith("SunOS") || OS_NAME.startsWith("Solaris"));
    }

    public static OS getOs() {
        return os;
    }
}
```

### 使用


```java

Platform.OS os = Platform.getOs();

String redirectStr = Platform.isWindows() ? "-r" : ">";

```



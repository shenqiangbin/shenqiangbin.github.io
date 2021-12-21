---
title: 执行bat/sh命令
category: 工具
---

## 场景

通过程序动态生成 bat/sh 命令并执行

## 代码

```java

package cnki.cqsd.base;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class CmdUtil {
    private static final Logger LOG = LoggerFactory.getLogger(CmdUtil.class);

    public static String execCmdSync(String cmd, CmdExecResult callback) throws java.io.IOException, InterruptedException {

        Runtime rt = Runtime.getRuntime();
        Process proc = rt.exec(cmd);

        BufferedReader stdInput = new BufferedReader(new InputStreamReader(proc.getInputStream()));
        BufferedReader stdError = new BufferedReader(new InputStreamReader(proc.getErrorStream()));

        StringBuffer stdout = new StringBuffer();
        StringBuffer errout = new StringBuffer();

        String s = null;
        while ((s = stdInput.readLine()) != null) {
            stdout.append(s);
        }

        while ((s = stdError.readLine()) != null) {
            errout.append(s);
        }

        if (callback == null) {
            return stdInput.toString();
        }

        int exitVal = proc.waitFor();
        callback.onComplete(exitVal == 0, exitVal, errout.toString(), stdout.toString(), cmd);

        return stdInput.toString();
    }

    public interface CmdExecResult{
        void onComplete(boolean success, int exitVal, String error, String output, String originalCmd) throws IOException;
    }
}

```

## 使用


```java

String cmd = "";
CmdUtil.execCmdSync(cmd, (success, exitVal, error, output, originalCmd) -> {
    if (!success) {
        logger.debug("cmd fail", error);
        throw new IOException(error);
    }
});

```

## 感悟

执行 cmd/sh 命令后，对结果会有一个处理操作，因此我们想把 **一个方法当参数传递进去**。 
这里就是将方法定义到一个接口中，参数就是接口即可。

同样的处理形式，还会在 EXCEL 的帮助类中使用。





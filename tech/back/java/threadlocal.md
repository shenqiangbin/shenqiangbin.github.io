---
title: ThreadLocal
category: java
# 一个页面可以有多个标签
tag:
  - ThreadLocal
---

## 示例

这是 Spring 中用到的 ThreadLocal 的一个示例。这里将 SecurityContext 放到了 ThreadLocal 中。  
保证了每个线程都有自己的认证对象信息。

```java

package org.springframework.security.core.context;

import org.springframework.util.Assert;

/**
 * A <code>ThreadLocal</code>-based implementation of
 * {@link SecurityContextHolderStrategy}.
 *
 * @author Ben Alex
 * @see java.lang.ThreadLocal
 * @see org.springframework.security.core.context.web.SecurityContextPersistenceFilter
 */
final class ThreadLocalSecurityContextHolderStrategy implements SecurityContextHolderStrategy {

	private static final ThreadLocal<SecurityContext> contextHolder = new ThreadLocal<>();

	@Override
	public void clearContext() {
		contextHolder.remove();
	}

	@Override
	public SecurityContext getContext() {
		SecurityContext ctx = contextHolder.get();
		if (ctx == null) {
			ctx = createEmptyContext();
			contextHolder.set(ctx);
		}
		return ctx;
	}

	@Override
	public void setContext(SecurityContext context) {
		Assert.notNull(context, "Only non-null SecurityContext instances are permitted");
		contextHolder.set(context);
	}

	@Override
	public SecurityContext createEmptyContext() {
		return new SecurityContextImpl();
	}

}

```
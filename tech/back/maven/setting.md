---
title: Maven 配置
# 一个页面只能有一个分类
category: 项目构建
# 一个页面可以有多个标签
tag:
  - Maven
# 此页面会在文章列表指定
sticky: false
---

## Maven 配置

Maven 的配置文件通常是在 settings.xml 文件中，一般放在当前用户的 .m2 目录下，而 .m2 目录一般是 **隐藏** 的。  
Windows 系统下需要配置显示隐藏目录。  
Mac 下使用快捷键 `Shift+Command+.` 可以显示隐藏目录。  

### Maven 依赖下载入慢

项目依赖的包是从 Maven 仓库下载的，而仓库一般在国外，所以下载比较慢，因此我们会将下载仓库设置为国内的。

下面是将 Maven 仓库设置为阿里的 Maven 仓库，settings.xml 内容如下：

```xml
<settings xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">
	<mirrors>
		<!-- mirror | Specifies a repository mirror site to use instead of a given 
			repository. The repository that | this mirror serves has an ID that matches 
			the mirrorOf element of this mirror. IDs are used | for inheritance and direct 
			lookup purposes, and must be unique across the set of mirrors. | -->
		<mirror>
			<id>nexus-aliyun</id>
			<mirrorOf>central</mirrorOf>
			<name>Nexus aliyun</name>
			<url>http://maven.aliyun.com/nexus/content/groups/public/</url>
		</mirror>
		<mirror>
			<id>nexus-aliyun-thirdparty</id>
			<mirrorOf>thirdparty</mirrorOf>
			<name>Nexus aliyun thirdparty</name>
			<url>http://maven.aliyun.com/nexus/content/repositories/thirdparty/</url>
		</mirror>
	</mirrors>
 
	<profiles>
		<profile>
			<id>default</id>
			<repositories>
				<repository>
		            <id>central</id>
		            <url>https://jitpack.io</url>
		        </repository>
				<repository>
					<id>nexus</id>
					<name>local private nexus</name>
					<url>http://maven.aliyun.com/nexus/content/groups/public/</url>
					<releases>
						<enabled>true</enabled>
					</releases>
					<snapshots>
						<enabled>false</enabled>
					</snapshots>
				</repository>
			</repositories>
			<pluginRepositories>
				<pluginRepository>
					<id>nexus</id>
					<name>local private nexus</name>
					<url>http://maven.aliyun.com/nexus/content/groups/public/</url>
					<releases>
						<enabled>true</enabled>
					</releases>
					<snapshots>
						<enabled>false</enabled>
					</snapshots>
				</pluginRepository>
			</pluginRepositories>
		</profile>
	</profiles>
</settings>
```



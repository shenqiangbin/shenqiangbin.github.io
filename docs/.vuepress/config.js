module.exports = {
  plugins: [
    ['@vuepress/search', {
      searchMaxSuggestions: 10
    }]
  ],
  lang: "zh-CN",
  title: "SQBER",
  description: "个人站点",
  themeConfig: {
    logo: "/imgs/logo.png",
    navbar: [
      {
        text: "习惯",
        link: "/convention",
      },
      {
        text: "Java",
        collapsable: false,
        children: [
          {
            text: "Maven",
            children: [
              {
                text: "构建多模块项目",
                link: "/java/create-project",
              },
              {
                text: "nacos",
                link: "/java/nacos",
              },
              {
                text: "IDEA",
                link: "/java/idea",
              },
              {
                text: "访问数据库",
                link: "/java/database",
              },
            ],
          },
          {
            text: "接口设计",
            link: "/java/interface",
          },
        ],
      },
      {
        text: "Spring Boot",
        link: "/springboot",
      },
      {
        text: "Linux",
        collapsable: false,
        children: [
          {
            text: "基础",
            children: [
              {
                text: "文件上传和下载",
                link: "/linux/file-upload-download",
              },
            ],
          },
          {
            text: 'ubuntu',
            link: '/linux/ubuntu'
          },
          {
            text: 'git',
            link: '/linux/git'
          }
        ],
      },
      // NavbarGroup
      {
        text: "大数据",
        collapsable: false,
        children: [
          {
            text: "Hadoop",
            link: "/bigdata/flume/intro.md",
          },
          {
            text: "Hive",
            link: "/bigdata/flume/intro.md",
          },
          {
            text: "HBase",
            link: "/bigdata/flume/intro.md",
          },
          {
            text: "数据采集",
            children: [
              {
                text: "Flume",
                link: "/bigdata/flume",
              },
            ],
          },
        ],
      },
      {
        text: "软件",
        collapsable: false,
        children: [
          {
            text: "部署",
            children: [
              {
                text: "FTP",
                link: "/soft/centos-ftp.md",
              },
            ],
          },
          {
            text: "vscode",
            link: "/soft/vscode.md",
          },
        ],
      },
      {
        text: "生活",
        collapsable: false,
        children: [
          {
            text: "菜谱",
            link: "/life/recipe.md",
          },
          {
            text: "直播",
            link: "/life/livevideo.md",
          },
          {
            text: "人民日报",
            link: "/life/paper-rmrb.md",
          },
        ],
      },
      {
        text: "关于我",
        link: "/foo/",
      },
    ],
    sidebar: {
      "/bigdata/flume": [
        {
          text: "Flume",
          children: [
            "/bigdata/flume/intro.md",
            "/bigdata/flume/install.md",
            "/bigdata/flume/reference.md",
            "/bigdata/flume/ftp2hdfs.md",
          ],
        },
      ],
      "/convention": [
        {
          text: "习惯",
          children: ["/convention/log.md", "/convention/simpleCode.md"],
        },
      ],
      "/springboot": [
        {
          text: "Spring Boot",
          children: ["/springboot/jdbcTemplate.md"],
        },
      ],
    },
  },
};

const { config } = require("vuepress-theme-hope");

const nav = [
  { text: "首页", link: "/", icon: "home" },
  { text: "待做事项", link: "/todo", icon: "note" },
  { text: "软件功能", link: "/tech/myfunction/", icon: "" },
  { text: "Java", link: "/tech/back/java/", icon: "" },
  { text: "后端技术", prefix: "/tech/", items:[
    { text: "后端", link: '', prefix: "back/", items:[
      { text: "Java", link: "java/" },
      // { text: ".Net", link: "dotnet/" },
      { text: "Maven", link: "maven/" },
      { text: "Spring", link: "spring/" },
      { text: "安全", link: "security/" },
      { text: "Nacos", link: "nacos/" },
      { text: "工具类", link: "myutil/" },
      { text: "ElasticSearch", link: "es/" },
    ] },
    { text: "数据库", prefix: "db/", items:[
      { text: "MySQL", link: "mysql/", icon: "" },
    ] },
    { text: "代码管理", link: '', prefix: "codemgr/", items:[
      { text: "Git", link: "git/" },
    ] },
    { text: "大数据", link: '', prefix: "bigdata/", items:[
      { text: "flume", link: "flume/" },
    ] },
    { text: "其它", link: '', prefix: "other/", items:[
      { text: "ftp", link: "centos-ftp/" },
    ] },
    { text: "开发工具", prefix: "devtool/", items:[
      { text: "IDEA", link: "idea/", icon: "" },
      { text: "vscode", link: "vscode/", icon: "" },
    ] },
  ]},
  { text: "前端技术", prefix: "/tech/", items:[
    { text: "前端", link: '', prefix: "/front/", items:[
      { text: "CSS", link: "css/" },
      { text: "JavaScript", link: "javascript/" },
      { text: "JQuery", link: "jquery" },
      { text: "NPM", link: "npm" },
      { text: "Yarn", link: "yarn" },
      { text: "Vue", link: "vue" },
      { text: "Element", link: "element" },
      { text: "AntDesign", link: "antdesign" },
    ] },
  ]},
  { text: "习惯", link: "/convention/", icon: "" },
  // { text: "项目主页", link: "/home/", icon: "home" },
  { text: "关于我", link: "/intro/", icon: "info" },
  { text: "生活", link: "/life/", icon: "life" },
  { text: "管理", link: "https://sqber-api.vercel.app/ui", icon: "" },
  // { text: "文档", link: "https://vuepress-theme-hope.github.io/", icon: "note" },
]

const sidebar = {
  "/tech/other":[
    {
      title: "其它",
      path: "/tech/other",
      prefix: "other/",
      collapsable: false,
      children: ["centos-ftp"],
    },
  ],
  "/tech/bigdata/flume":[
    {
      title: "flume",
      path: "/tech/bigdata/flume",
      prefix: "flume/",
      collapsable: false,
      children: ["","intro","install","ftp2hdfs"],
    },
  ],
  "/tech/codemgr/git":[
    {
      title: "Git",
      path: "/tech/codemgr/git",
      prefix: "git/",
      collapsable: false,
      children: ["","staging"],
    },
  ],
  "/tech/back/java":[
    {
      title: "Java",
      path: "/tech/back/java",
      prefix: "java/",
      collapsable: false,
      children: ["log4j2-problem","csv-handle","threadlocal"],
    },
  ],
  "/tech/back/es":[
    {
      title: "ElasticSearch",
      path: "/tech/back/es",
      prefix: "es/",
      collapsable: false,
      children: ["mac-es-install","win-es-install","linux-es-install","config",
      "visual","query"],
    },
  ],
  "/tech/back/security":[
    {
      title: "安全",
      path: "/tech/back/security",
      prefix: "security/",
      collapsable: false,
      children: ["interface", "https",
      {
        title: "安全评测",
        collapsable: false,
        children: ["test-linux22"],
      }],
    },
  ],
  "/tech/back/nacos":[
    {
      title: "Nacos",
      path: "/tech/back/nacos",
      prefix: "nacos/",
      collapsable: false,
      children: ["intro"],
    },
  ],
  "/tech/back/myutil":[
    {
      title: "工具类",
      path: "/tech/back/myutil",
      prefix: "myutil/",
      collapsable: false,
      children: [ "myplatform", "cmdUtil" ],
    },
  ],
  "/tech/back/maven":[
    {
      title: "Maven",
      path: "/tech/back/maven",
      prefix: "maven/",
      collapsable: false,
      children: [ "setting", "create-project"],
    },
  ],
  "/tech/back/spring":[
    {
      title: "Spring",
      path: "/tech/back/spring",
      prefix: "spring/",
      collapsable: false,
      children: ["jdbcTemplate"],
    },
  ],
  "/tech/db/mysql":[
    {
      title: "MySQL",
      path: "/tech/db/mysql",
      prefix: "mysql/",
      collapsable: false,
      children: ["mysqldump"],
    },
  ],
  "/tech/devtool":[
    {
      title: "开发工具",
      path: "/tech/devtool",
      prefix: "devtool/",
      collapsable: false,
      children: ["idea","vscode"],
    },
  ],
  "/tech/myfunction":[
    {
      title: "软件功能",
      path: "/tech/myfunction",
      prefix: "myfunction/",
      collapsable: false,
      children: ["unifiedReturnObject","unifiedException","validation","database","queryData",
      "addData","saveData","removeData","uploadFile","importData","exportData","login"],
    },
  ],
  "/convention":[
    {
      title: "习惯",
      path: "convention/",
      prefix: "convention/",
      collapsable: false,
      children: ["log", "simpleCode"],
    },
  ],
  "/": [
    //"",
    // "home",
    //"todo",
    //"intro",
    // "layout",
    // {
    //   title: "使用",
    //   icon: "creative",
    //   prefix: "guide/",
    //   children: ["", "page", "markdown", "disable", "encrypt"],
    // },
  ],
  "":[
    {
      title: "布局",
      icon: "layout",
      prefix: "layout/",
      collapsable: false,
      children: [
        "sidebar",
        "sidebar",
        {
          title: "页面",
          icon: "page",
          collapsable: false,
          children: ["page", "breadcrumb", "footer"],
        },
        "home",
        "slides",
      ],
    }
  ]
}

module.exports = config({
  title: "SQBER",
  description: "个人站点，记录个人生活和相关技术文档，比如 Java、Spring、Linux、代码管理等内容",

  dest: "./dist",

  head: [
    ["meta",{ name: "baidu-site-verification",content: 'code-tF20ewjK6p' }, ],


    // ["script",{ src: "https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" },],
    ["script",{ src: "https://cdnjs.cloudflare.com/ajax/libs/react/17.0.2/umd/react.production.min.js" },],

    // ["script",{src: "https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js",},],
    ["script",{src: "https://cdnjs.cloudflare.com/ajax/libs/react-dom/17.0.2/umd/react-dom.production.min.js",},],
    
    // ["script", { src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js" }],
    ["script", { src: "https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.14/vue.min.js" }],

    // ["script",{ src: "https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js" },],
    ["script",{ src: "https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js" },],
  ],

  locales: {
    "/": {
      lang: "zh-CN",
    },
    // "/zh/": {
    //   title: "Theme Demo",
    //   description: "vuepress-theme-hope 的 demo",
    // },
  },

  themeConfig: {
    logo: "/logo.png",
    hostname: "https://shenqiangbin.github.io/",

    author: "sqber",
    repo: "https://github.com/shenqiangbin/",

    darkmode: 'switch',
    themeColor: false,

    //sidebarDepth: 4,

    sitemap: true,
    copyright: true,

    nav: nav,

    sidebar: sidebar,

    // locales: {
    //   "/zh/": {
    //     nav: [
    //       { text: "博客主页", link: "/zh/", icon: "home" },
    //       { text: "项目主页", link: "/zh/home/", icon: "home" },
    //       {
    //         text: "如何使用",
    //         icon: "creative",
    //         link: "/zh/guide/",
    //       },
    //       {
    //         text: "主题文档",
    //         icon: "note",
    //         link: "https://vuepress-theme-hope.github.io/zh/",
    //       },
    //     ],
    //     sidebar: {
    //       "/zh/": [
    //         "",
    //         "home",
    //         "slides",
    //         "layout",
    //         {
    //           title: "如何使用",
    //           icon: "creative",
    //           prefix: "guide/",
    //           children: ["", "page", "markdown", "disable", "encrypt"],
    //         },
    //       ],
    //     },
    //   },
    // },

    blog: {
      intro: "/intro/",
      sidebarDisplay: "mobile",
      links: {       
        Github: "https://github.com/shenqiangbin/",
        QQ: 'http://wpa.qq.com/msgrd?v=3&uin=1969858717&site=qq&menu=yes'
      },
    },
    footer: {
      display: true,
      content: "冀-ICP备 17029815",
      copyright: 'Copyright © 2017-present SQBER 本文版权归作者所有，欢迎转载，但未经作者同意必须保留此段声明，且在文章页面明显位置给出原文连接，否则保留追究法律责任的权利'
    },

    comment: {
      type: "waline",
      serverURL: "https://sqber-api.vercel.app/",
      meta: ['nick', 'mail', 'link']
    },

    copyright: {
      status: "global",
    },

    git: {
      timezone: "Asia/Shanghai",
    },

    mdEnhance: {
      enableAll: true,
      presentation: {
        plugins: [
          "highlight",
          "math",
          "search",
          "notes",
          "zoom",
          "anything",
          "audio",
          "chalkboard",
        ],
      },
    },

    pwa: {
      favicon: "/favicon.ico",
      cachePic: true,
      apple: {
        icon: "/assets/icon/apple-icon-152.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/assets/icon/ms-icon-144.png",
        color: "#ffffff",
      },
      manifest: {
        icons: [
          {
            src: "/assets/icon/chrome-mask-512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-mask-192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "Guide",
            short_name: "Guide",
            url: "/guide/",
            icons: [
              {
                src: "/assets/icon/guide-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/assets/icon/guide-monochrome.png",
                sizes: "192x192",
                purpose: "monochrome",
                type: "image/png",
              },
            ],
          },
        ],
      },
    },

    // algolia: {
    //   apiKey: "<API_KEY>",
    //   indexName: "<INDEX_NAME>",
    // },

  },
});

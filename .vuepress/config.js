const { config } = require("vuepress-theme-hope");

const nav = [
  { text: "首页", link: "/", icon: "home" },
  { text: "待做事项", link: "/todo/", icon: "note" },
  { text: "习惯", link: "/convention/", icon: "" },
  // { text: "项目主页", link: "/home/", icon: "home" },
  { text: "关于我", link: "/intro/", icon: "info" },
  { text: "管理", link: "https://sqber-api.vercel.app/ui", icon: "" },
  // { text: "文档", link: "https://vuepress-theme-hope.github.io/", icon: "note" },
]

const sidebar = {
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
    "",
    // "home",
    "todo",
    "intro",
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
    [
      "script",
      { src: "https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" },
    ],
    [
      "script",
      {
        src: "https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js",
      },
    ],
    ["script", { src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js" }],
    [
      "script",
      { src: "https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js" },
    ],
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
  },
});

 module.exports = {
     lang: 'zh-CN',
     title: 'SQBER',
     description: '个人站点',
     themeConfig: {
        logo: '/imgs/logo.png',
        navbar: [
            // NavbarItem
            {
              text: 'Java',
              link: '/foo/',
            },
            // NavbarGroup
            {
              text: '大数据',
              collapsable: false,
              children: [
                {
                    text: 'Hadoop',
                    link: '/bigdata/flume/intro.md'
                },
                {
                    text: 'Hive',
                    link: '/bigdata/flume/intro.md'
                },
                {
                    text: 'HBase',
                    link: '/bigdata/flume/intro.md'
                },
                {
                    text: '数据采集',
                    children:[
                        {
                            text: 'Flume',
                            link: '/bigdata/flume'
                        },
                    ]
                }
            
              ],
            },
            {
                text: '部署',
                collapsable: false,
                children: [
                  {
                      text: 'FTP',
                      children:[
                        {
                            text: 'Flume',
                            link: '/soft/centos-ftp.md'
                        },
                    ]
                  }
                ],
            },
            {
                text: '生活',
                collapsable: false,
                children: [
                  {
                      text: '菜谱',
                      link: '/life/recipe.md'
                  }
                ],
            },
            {
                text: '关于我',
                link: '/foo/',
            }
        ],
        sidebar: {
            '/bigdata/flume': [ 
                {
                    text: 'Flume',
                    children: [
                        '/bigdata/flume/intro.md',
                        '/bigdata/flume/install.md',
                        '/bigdata/flume/reference.md',
                        '/bigdata/flume/ftp2hdfs.md',
                    ]                
                }                
            ],

        }
     }
 }
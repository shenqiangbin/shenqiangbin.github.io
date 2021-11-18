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
              collapsable: false,
              children: [
                  {
                      text: 'Maven',
                      children:[
                        {
                            text: '构建多模块项目',
                            link: '/java/create-project'
                        },
                        {
                            text: 'nacos',
                            link: '/java/nacos'
                        },
                        {
                            text: 'IDEA',
                            link: '/java/idea'
                        }
                    ]
                  }
              ]
            },
            {
                text: 'Linux',
                collapsable: false,
                children: [
                    {
                        text: '基础',
                        children:[
                          {
                              text: '文件上传和下载',
                              link: '/linux/file-upload-download'
                          },
                      ]
                    }
                ]
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
                      text: '其它',
                      children:[
                        {
                            text: 'FTP',
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
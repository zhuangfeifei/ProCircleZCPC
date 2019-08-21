
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: '箴创学院-跨境人自己的大学',
    meta: [
      { charset: 'utf-8' },
      { name: '箴创学院', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '速卖通 亚马逊 阿里国际站ebay  wish  lazada 询盘转化 实操运营 爆款打造 店铺引流 线上视频 音频课程 社区交流 在线学习平台 电商讲师 线下活动 外贸人 。箴创学院邀请众多实力讲师、聚焦于跨境电商外贸领域、为外贸跨境人提供实战课程的知识付费平台' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/Newicon.ico' }
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js', ssr: false },
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'assets/app.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    {src:'@/plugins/storage.js',ssr:true}
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],

  server: {
    port: 3000, // default: 3000
    host: '192.168.1.183', // default: localhost
  },

  proxy: [
    [
        '/axios', 
        { 
          target: 'http://192.168.1.194:8002/api', 
          // target: 'https://www.proseer.cn/zcxypctest/api', 
          pathRewrite: { '^/axios' : '' }
        }
    ]
  ],
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    // publicPath:'https://www.proseer.cn/zcxypc',
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}

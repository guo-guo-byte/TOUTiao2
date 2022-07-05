module.exports = {
    plugins: {
      'autoprefixer': {
        browsers: ['Android >= 4.0', 'iOS >= 8']
      },
      'postcss-pxtorem': {
        // 根据设计稿的尺寸/10 得到rootValue的值
        // 我们自己的设计稿75
        // vant组件的rootValue设置为37.5
        rootValue: (arg)=>{
          // 判断 需要处理德阳市是否是vant组建的
          // 如果是37.5 不是返回75 arg里面的file，为文件的路径
          console.log(arg);
          return arg.file.includes('vant')? '37.5':75
        },
       
        propList: ['*']
      }
    }
  }
  
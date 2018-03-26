//index.js
//获取应用实例
var app = getApp()

Page({

  data: {
    tab_change:0,
    lendTime:  0,    //借款时间
    lendMoney: 0,    //借款金额
    all_debx: 0,     //等额本息还款总额
    lixi_debx: 0,    //等额本息利息总额
    count_debx: 0,   //等额本息月还款金额
    count_debjin: 0, //等额本金月还款金额
    all_debjin: 0,   //等额本金总还款金额
    lixi_debjin: 0,  //等额本金总利息金额
    jian_debjin: 0   //等额本金每月递减金额
  },

  /** 
     * 顶部点击切换tab 
     */
  swichNav: function(e){
    var that = this
    if (that.data.tab_change === e.target.dataset.current){
      return false
    }
    else{
      that.setData({
        tab_change : e.target.dataset.current
      })
    }
  },

  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ tab_change: e.detail.current });
  }, 






  onLoad: function (options) {
    console.log(options)

    var that = this

    that.setData({
      lendTime: options.lendTime,
      lendMoney: options.lendMoney,
      lixi_debx: options.lixi_debx,
      all_debx: options.all_debx,
      count_debx: options.count_debx,
      jian_debjin: options.jian_debjin,
      all_debjin: options.all_debjin,
      lixi_debjin: options.lixi_debjin,
      count_debjin: options.count_debjin
    })

    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })

  }

})

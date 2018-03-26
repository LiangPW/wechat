//index.js
//获取应用实例
var app = getApp()
var cun
var huo
Page({

  data: {
    p2pTime: 0, 
    p2pMoney: 0,
    p2pSum: 0,
    p2pLilv: 0
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },



  //获取金额
  bindKeyInput: function (e) {
    this.setData({
      p2pMoney: e.detail.value
    })
  },

  //获取时间
  timeKeyInput: function (e) {
    this.setData({
      p2pTime: parseInt(e.detail.value) / 12
    })
  },

  //获取年化率
  lilvKeyInput: function (e) {
    this.setData({
      p2pLilv: e.detail.value
    })
  },

  
  //计算结果
  p2pResult: function () {
    var that = this;
    if (that.data.p2pMoney == 0) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入投资金额',
      })
    }
    else if (that.data.p2pTime == 0) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入投资时间',
      })
    }
    else if (that.data.p2pLilv == 0) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入投资年化利率',
      })
    }
    else{
      that.cun(that.data.p2pMoney, that.data.p2pTime, that.data.p2pLilv)
    }
    
  },


  /** 
   * 网贷
   */
  cun: function (money, time, actvie) {
    //贷款金额
    var lendMoney = parseInt(money)
    //贷款时间
    var lendTime = parseFloat(time)
    //贷款利率
    var cun_lixi = parseFloat(actvie)
    //还款月数
    var timeSpan = lendTime * 1 / 12;

    var allLixi = Math.round((lendMoney / 100 * lendTime * cun_lixi) * 100) / 100
    var allSum = Math.round((parseFloat(allLixi) + lendMoney) * 100) / 100
    this.setData({
      p2pSum : allLixi
    })


  }




})

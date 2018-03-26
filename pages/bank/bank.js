//index.js
//获取应用实例
var app = getApp()
var cun
var huo
Page({

  data: {
    index: 0,
    lendMoney: 0,
    lendTnterest: 0,
    lendTime: ['点击选择存款时间','3个月','6个月','1年','2年','3年'],   
    cunTime: 0, // 存款时间
    all_lixi: 0,
    sum:0,
    tab_change:0
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },


  /** 
     * 顶部点击切换tab 
     */
  swichNav: function (e) {
    var that = this
    if (that.data.tab_change === e.target.dataset.current) {
      return false
    }
    else {
      that.setData({
        tab_change: e.target.dataset.current,
        lendTnterest: 0,
        index: 0
      })
    }
  },

  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {

    var that = this;
    that.setData({
      tab_change: e.detail.current,
      lendTnterest: 0,
      index: 0
    });
  }, 


  //获取存款金额
  bindKeyInput: function (e) {
    this.setData({
      lendMoney: e.detail.value
    })
  },

  //获取活期存款时间
  huoInput:function(e){
    this.setData({
      cunTime: parseInt(e.detail.value)/12
    })
  },

  //获取定期存款时间
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    
    if (Number(e.detail.value) == 1) {
      this.setData({
        lendTnterest: 1.1,
        cunTime : 0.25
      })
    }
    else if (Number(e.detail.value) == 2) {
      this.setData({
        lendTnterest: 1.3,
        cunTime : 0.5
      })
    }
    else if (Number(e.detail.value) == 3) {
      this.setData({
        lendTnterest: 1.5,
        cunTime: 1
      })
    }
    else if (Number(e.detail.value) == 4) {
      this.setData({
        lendTnterest: 2.1,
        cunTime: 2
      })
    }
    else if (Number(e.detail.value) == 5) {
      this.setData({
        lendTnterest: 2.75,
        cunTime : 3
      })
    }
    this.setData({
      index:e.detail.value
    })
  },

  //活期存款计算结果
  huo: function () {
    var that = this;
    if (that.data.lendMoney == 0) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入存款金额',
      })
    }
    else if (that.data.cunTime == 0) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请选择存款时间',
      })
    }
    else{
      that.cun(that.data.lendMoney, that.data.cunTime, 0.35)
    }
    
  },

  //定期存款计算结果
  ding: function () {
    var that = this;
    if (that.data.lendMoney == 0) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入贷款金额',
      })
    }
    else if (that.data.index == 0) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请选择贷款期限',
      })
    }
    else{
      that.cun(that.data.lendMoney, that.data.cunTime, that.data.lendTnterest)
    }
    
  },


  /** 
   * 银行存款
   */
  cun: function (money, time, actvie) {
    //贷款金额
    var lendMoney = parseInt(money)
    //贷款时间
    var lendTime = parseFloat(time)
    //贷款利率
    var cun_lixi = parseFloat(actvie)
    //还款月数
    var timeSpan = lendTime*1 /12;

    console.log(lendMoney)
    console.log(lendTime)
    console.log(cun_lixi)

    var allLixi = Math.round((lendMoney/100 * lendTime * cun_lixi)*100)/100
    var allSum = Math.round((parseFloat(allLixi) + lendMoney)*100)/100
    this.setData({
      sum: allSum,
      all_lixi: allLixi
    })

    
  }




})

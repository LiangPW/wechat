//index.js
//获取应用实例
var app = getApp()
var debxi
var debjin
Page({

  data: {
    index: 0,
    lendTime: [0,1,2,3,4,5],    //借款时间
    lendTnterest: 0, //借款利率
    lendMoney: 0,    //借款金额
    count_debx: 0,   //等额本息月还款金额
    all_debx: 0,     //等额本息总还款金额
    lixi_debx: 0,    //等额本息总利息金额
    count_debjin: 0, //等额本金月还款金额
    all_debjin: 0,   //等额本金总还款金额
    lixi_debjin: 0,  //等额本金总利息金额
    jian_debjin: 0   //等额本金每月递减金额
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  //获取借款金额
  bindKeyInput: function (e) {
    this.setData({
      lendMoney: e.detail.value
    })
  },



  //获取借款时间
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.data.lendTime = Number(e.detail.value)
    if (Number(e.detail.value) == 1) {
      this.setData({
        lendTnterest: 6.56
      })
    }
    else if (1< Number(e.detail.value) && Number(e.detail.value) < 4) {
      this.setData({
        lendTnterest: 6.65
      })
    }
    else if (4 <= Number(e.detail.value) && Number(e.detail.value) <= 5) {
      this.setData({
        lendTnterest: 6.90
      })
    }
    

    this.setData({
      index: e.detail.value
    })
  },



  //商业贷款计算结果
  lendResultSYD: function () {
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
      that.debxi(that.data.lendMoney, that.data.lendTime, that.data.lendTnterest)
      that.debjin(that.data.lendMoney, that.data.lendTime, that.data.lendTnterest)
      wx.navigateTo({
        url: '../result/result?lendTime=' + that.data.lendTime + '&lendMoney=' + that.data.lendMoney + '&lixi_debx=' + that.data.lixi_debx + '&all_debx=' + that.data.all_debx + '&count_debx=' + that.data.count_debx + '&count_debjin=' + that.data.count_debjin + '&all_debjin=' + that.data.all_debjin + '&lixi_debjin=' + that.data.lixi_debjin + '&jian_debjin=' + that.data.jian_debjin + ''
      })
    }
   
  },

 
  /** 
   * 等额本息
   */
  debxi: function (money, time, actvie) {
    //贷款金额
    var lendMoney = parseInt(Number(money) * 10000)
    //贷款时间
    var lendTime = parseFloat(time)
    //贷款利率
    var lendTnterest = parseFloat(actvie)
    //还款月数
    var timeSpan = lendTime * 12;
    //某种利率
    var active = lendTnterest * 10 / 12 * 0.001;
    var t1 = Math.pow(1 + active, timeSpan);
    var t2 = t1 - 1;
    var tmp = t1 / t2;
    //月利率
    var monthratio = active * tmp;

    //每月支付本息
    var monthBack = lendMoney * monthratio;
    monthBack = Math.round(monthBack * 100) / 100;//取两位小数

    // 总金额，总利息
    var allDebx = Math.round((monthBack * timeSpan) / 10000 * 100) / 100   //总还款金额
    var lixiDebx = Math.round((monthBack * timeSpan - lendMoney) / 10000 * 100) / 100  //总利息
    this.setData({
      count_debx: monthBack,
      all_debx: allDebx,
      lixi_debx: lixiDebx
    })
  },



  /** 
   * 等额本金
   */
  debjin: function (money, time, actvie) {
    var that = this

    //贷款金额
    var lendMoney = parseInt(Number(money) * 10000)
    //贷款时间
    var lendTime = parseFloat(time)
    //贷款利率
    var lendTnterest = parseFloat(actvie)
    //还款月数
    var timeSpan = lendTime * 12
    //某种利率
    var active = lendTnterest * 10 / 12 * 0.001


    var objArray = new Array()
    //月还款额
    var interestM = 0
    //累计还款总额
    var t1
    var interestTotal = 0;
    for (var i = 1; i < timeSpan + 1; i++) {
      t1 = (lendMoney - lendMoney * (i - 1) / timeSpan) * active;//第i月还款利息
      interestM = lendMoney / timeSpan + t1;//第i月还款额
      objArray[i - 1] = interestM;
      interestTotal = interestTotal + interestM;
    }

    interestTotal = Math.round(interestTotal / 10000 * 100) / 100
    objArray[timeSpan] = interestTotal;


    var debjinLixi = interestTotal - lendMoney / 10000
    var debjinJian = parseFloat(objArray[0]) - parseFloat(objArray[1])


    that.setData({
      count_debjin: Math.round(parseFloat(objArray[0]) * 100) / 100,
      jian_debjin: Math.round(debjinJian * 100) / 100,
      all_debjin: interestTotal,
      lixi_debjin: Math.round(debjinLixi * 100) / 100
    })


    return objArray;



  },



})

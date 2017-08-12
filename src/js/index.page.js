/**
 * BEGIN 编写轮播图插件
 * Author:PengLunJian
 * Date:2017-08-07
 * @constructor 构造函数
 */
function SliderBanner() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.sliderTime = arguments['sliderTime'] ? arguments['sliderTime'] : 5;
    this.sliderIndex = arguments['sliderIndex'] ? arguments['sliderIndex'] : 0;
    this.sliderTimer = arguments['sliderTimer'] ? arguments['sliderTimer'] : null;
    this.sliderElement = arguments['sliderElement'] ? arguments['sliderElement'] : '.banner-slider';
    this.sliderChange = arguments['sliderChange'] ? arguments['sliderChange'] : function () {

    }
    this.init();
}
/**
 * BEGIN 初始化方法
 * Author:PengLunJian
 * Date:2017-08-07
 * @returns {SliderBanner} 返回当前对象实现连缀调用
 */
SliderBanner.prototype.init = function () {
    this.startMove();
    return this;
}
/**
 * BEGIN 启动轮播图动画
 * Author:PengLunJian
 * Date:2017-08-07
 * @returns {SliderBanner} 返回当前对象实现连缀调用
 */
SliderBanner.prototype.startMove = function () {
    var _this = this;
    _this.sliderTimer = setInterval(function () {
        var result = _this.sliderIndex < $(_this.sliderElement).length - 1;
        _this.sliderIndex = result ? ( _this.sliderIndex + 1) : 0;
        $(_this.sliderElement).eq(_this.sliderIndex).fadeIn(2000).siblings().fadeOut(2000);
        if ('function' == typeof _this.sliderChange) _this.sliderChange();
    }, _this.sliderTime);
    return this;
}
/**
 * BEGIN 关闭轮播图动画
 * Author:PengLunJian
 * Date:2017-08-07
 * @returns {SliderBanner} 返回当前对象实现连缀调用
 */
SliderBanner.prototype.stopMove = function () {
    if (this.sliderTimer) clearInterval(this.sliderTimer);
    return this;
}
/**
 *
 * @constructor
 */
function HomePage() {
    this.HEADER = arguments['HEADER'] ? arguments['HEADER'] : '#header';
    this.HEADER_ALPHA = arguments['HEADER_ALPHA'] ? arguments['HEADER_ALPHA'] : 0.5;
    this.SLIDER_CONTAINER = arguments['SLIDER_CONTAINER'] ? arguments['SLIDER_CONTAINER'] : '.slider-container';
    this.init();
}
/**
 *
 * @returns {HomePage}
 */
HomePage.prototype.init = function () {
    /**
     * BEGIN 实例化轮播图对象
     * Author:PengLunJian
     * Date:2017-08-07
     * @type {SliderBanner} 轮播图类型
     */
    var sb = new SliderBanner({
        sliderTime: 4000,
        sliderChange: function () {
            console.log('slider changed success!');
        }
    });
    /**
     *
     * @type {Tools}
     */
    var tools = new Tools({
        TAB_BTN: '.tab-btn',
        TAB_BAR: '.tab-bar',
        TARGET_ELEMENT: '.project-block',
        TAB_CHANGED: function () {
            console.log('success');
        }
    });

    // this.scrollMove();
    this.projectIn();
    return this;
}
/**
 *
 * @returns {HomePage}
 */
HomePage.prototype.scrollMove = function () {
    var _this = this;
    $(window).on("scroll", function () {
        var scrollTop = $(this).scrollTop();
        var sliderHeight = $(_this.SLIDER_CONTAINER).outerHeight();
        var rate = scrollTop / sliderHeight >= 1 ? 1 : scrollTop / sliderHeight;
        var backgroundColor = "background-color:rgba(0,0,0," + _this.HEADER_ALPHA * rate + ");";
        $(_this.HEADER).attr("style", backgroundColor);
    });
    return this;
}

/**
 * Author:liyong
 * Date:2017-8-12
 * @returns {HomePage}
 */
HomePage.prototype.projectIn = function () {
    $(".btn-primary").click(function () {
        var _this = this;
        var contractMessage = "";
        var TEMP_HTML='';
        var result = false;
        if (res.check(res.NAME_REG_EXP, $("#index_name input").val())) {
            TEMP_HTML= "输入姓名有误！";
        }else{
            TEMP_HTML = "";
        }
        if (res.check(res.NAME_REG_EXP, $("#index_name input").val())) {
            contractMessage = "输入姓名有误！";
        }else if(res.check(res.PHONE_REG_EXP, $("#index_phone input").val())){
            contractMessage = "输入手机号码有误！";
        }else if(res.check(res.AREA_REG_EXP, $("#index_area input").val())){
            contractMessage = "输入地产面积有误！";
        }else if(res.check(res.CITY_REG_EXP, $("#index_city input").val())){
            console.log($("#index_city input").val());
            contractMessage = "输入所在城市有误！";
        }else if(res.check(res.CITY_REG_EXP, $("#index_address input").val())){
            console.log($("#index_address input").val());
            contractMessage = "输入地产地址有误！";
        } else {
            result=true;
        }
        // else if (regular.check(regular.MONEY_REG_EXP, params['CP_VAL'])) {
        //     contractMessage = "金额输入不正确";
        // } else if (params['PS_VAL'] == "") {
        //     contractMessage = "请输入应支付日";
        // } else {
        //     result = true;
        // }
        if (result) {
            console.log("success");
            // var params = _this.getParams(_this.BAD);
            // _this.ajaxRequestBillAdd(params);
        } else {
            console.log(contractMessage);
            // messageBox.show('提示', contractMessage, MessageBoxButtons.OK, MessageBoxIcons.infomation);
        }
    })
    return this;
}
/**
 *
 * @type {HomePage}
 */
var hp = new HomePage();

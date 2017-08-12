/**
 *
 * @constructor
 */
function Tools() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.TAB_BTN = arguments['TAB_BTN'] ? arguments['TAB_BTN'] : 'tab-btn';
    this.TAB_BAR = arguments['TAB_BAR'] ? arguments['TAB_BAR'] : '.tab-bar';
    this.TAB_BAR_WIDTH = arguments['TAB_BAR_WIDTH'] ? arguments['TAB_BAR_WIDTH'] : 170;
    this.TARGET_ELEMENT = arguments['TARGET_ELEMENT'] ? arguments['TARGET_ELEMENT'] : '.target-element';
    this.TAB_CHANGED = arguments['TAB_CHANGED'] ? arguments['TAB_CHANGED'] : function () {

    };

    this.init();
}
/**
 *
 * @returns {Tools}
 */
Tools.prototype.init = function () {
    this.clickBtnTab();
    return this;
}
/**
 *
 * @returns {Tools}
 */
Tools.prototype.clickBtnTab = function () {
    var _this = this;
    $(this.TAB_BTN).on("click", function () {
        var params = $(this).index();
        $(_this.TAB_BTN).removeClass("active");
        $(this).addClass("active");
        _this.setStatusBarTranslateX(params);
        _this.setTargetElementTranslateX(params);
        if ('function' == typeof _this.TAB_CHANGED) _this.TAB_CHANGED();
    });
    return this;
}
/**
 *
 * @param value
 * @returns {string}
 */
Tools.prototype.getTranslateX = function (value) {
    var translateX = '-webkit-transform: translateX(' + value + 'px);'
        + '-moz-transform: translateX(' + value + 'px);'
        + '-ms-transform: translateX(' + value + 'px);'
        + '-o-transform: translateX(' + value + 'px);'
        + 'transform: translateX(' + value + 'px);';
    return translateX;
}
/**
 *
 * @param params
 * @returns {Tools}
 */
Tools.prototype.setStatusBarTranslateX = function (params) {
    var value = params * this.TAB_BAR_WIDTH;
    var translateX = this.getTranslateX(value);
    $(this.TAB_BAR).attr("style", translateX);
    return this;
}
/**
 *
 * @param params
 * @returns {Tools}
 */
Tools.prototype.setTargetElementTranslateX = function (params) {
    var length = $(this.TAB_BTN).length;
    var targetWidth = $(this.TARGET_ELEMENT).outerWidth() / length;
    var value = -params * targetWidth;
    var translateX = this.getTranslateX(value);
    $(this.TARGET_ELEMENT).attr("style", translateX);
    return this;
}

/**
 *
 * @constructor
 */
function RegularExpress() {
    arguments = arguments.length != 0 ? arguments[0] : arguments;
    // 姓名正则
    this.NAME_REG_EXP = arguments['NAME_REG_EXP'] ? arguments['NAME_REG_EXP'] : /^(([\u4e00-\u9fa5]{1,5})|([a-zA-Z]{1,10}))$/;
    // 手机正则
    this.PHONE_REG_EXP = arguments['PHONE_REG_EXP'] ? arguments['PHONE_REG_EXP'] : /^([\d]{11}|[\d]{10})$/;
    // 面积正则
    this.AREA_REG_EXP = arguments['AREA_REG_EXP'] ? arguments['AREA_REG_EXP'] : /^\d{1,18}(.\d{1,18})?$/;
    // 验证码正则
    this.CODE_REG_EXP = arguments['CODE_REG_EXP'] ? arguments['CODE_REG_EXP'] : /^(\d{4})$/;
    //城市名
    this.CITY_REG_EXP = arguments['CITY_REG_EXP'] ? arguments['CITY_REG_EXP'] : /^([\u4e00-\u9fa5]{1,10})$/;
    // 地产内容
    this.COOP_REG_EXP = arguments['COOP_REG_EXP'] ? arguments['COOP_REG_EXP'] : /^([\u4e00-\u9fa5]{1,10})$/;

}


/**
 *
 * @param reg
 * @param params
 * @returns {boolean}
 */
RegularExpress.prototype.check = function (reg, params) {
    var result = true;
    // 验证通过返回false,不通过返回true执行messageBOX
    if (reg.test(params)) {
        result = false;
    }
    return result;
}

var res = new RegularExpress();
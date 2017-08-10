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

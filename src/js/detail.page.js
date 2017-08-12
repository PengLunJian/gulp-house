/**
 *
 * @constructor
 */
function Carousel() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.CAROUSEL_INDEX = this.CAROUSEL_INDEX ? this.CAROUSEL_INDEX : 0;
    this.CAROUSEL_ITEM = this.CAROUSEL_ITEM ? this.CAROUSEL_ITEM : '.carouse-item';
    this.CAROUSEL_ACTIVE = this.CAROUSEL_ACTIVE ? this.CAROUSEL_ACTIVE : '.active';
    this.CAROUSEL_PREV = this.CAROUSEL_PREV ? this.CAROUSEL_PREV : '.carouse-prev a';
    this.CAROUSEL_NEXT = this.CAROUSEL_NEXT ? this.CAROUSEL_NEXT : '.carouse-next a';
    this.CAROUSEL_MAIN = this.CAROUSEL_MAIN ? this.CAROUSEL_MAIN : '.carouse-main img';
    this.CAROUSEL_BLOCK = this.CAROUSEL_BLOCK ? this.CAROUSEL_BLOCK : '.carouse-block';
    this.init();
}
/**
 *
 * @returns {Carousel}
 */
Carousel.prototype.init = function () {
    this.setContainerWidth();
    this.clickCarouselItem();
    this.clickCarouselPrev();
    this.clickCarouselNext();
    return this;
}
/**
 *
 * @returns {Carousel}
 */
Carousel.prototype.setContainerWidth = function () {
    var length = $(this.CAROUSEL_ITEM).length;
    var iWidth = $(this.CAROUSEL_ITEM).outerWidth();
    this.INIT_STYLE = 'width:' + iWidth * length + 'px;';
    $(this.CAROUSEL_BLOCK).attr('style', this.INIT_STYLE);
    return this;
}
/**
 *
 * @returns {Carousel}
 */
Carousel.prototype.clickCarouselItem = function () {
    var _this = this;
    $(document).on("click", this.CAROUSEL_ITEM, function () {
        var CAROUSEL_ACTIVE = _this.CAROUSEL_ACTIVE.substring(1);
        $(_this.CAROUSEL_ITEM).removeClass(CAROUSEL_ACTIVE);
        $(this).addClass(CAROUSEL_ACTIVE);
        _this.changeCarousel();
    });
    return this;
}
/**
 *
 * @returns {Carousel}
 */
Carousel.prototype.clickCarouselPrev = function () {
    var _this = this;
    $(document).on("click", this.CAROUSEL_PREV, function () {
        var CAROUSEL_ACTIVE = _this.CAROUSEL_ACTIVE.substring(1);
        _this.CAROUSEL_INDEX = $(_this.CAROUSEL_ITEM + _this.CAROUSEL_ACTIVE).index();
        _this.CAROUSEL_INDEX--;
        _this.CAROUSEL_INDEX = _this.CAROUSEL_INDEX <= 0 ? 0 : _this.CAROUSEL_INDEX;
        $(_this.CAROUSEL_ITEM).removeClass(CAROUSEL_ACTIVE);
        $(_this.CAROUSEL_ITEM).eq(_this.CAROUSEL_INDEX).addClass(CAROUSEL_ACTIVE);
        _this.carouselAnimate(false);
        _this.changeCarousel();
    });
    return this;
}
/**
 *
 * @returns {Carousel}
 */
Carousel.prototype.clickCarouselNext = function () {
    var _this = this;
    $(document).on("click", this.CAROUSEL_NEXT, function () {
        var length = $(_this.CAROUSEL_ITEM).length - 1;
        var CAROUSEL_ACTIVE = _this.CAROUSEL_ACTIVE.substring(1);
        _this.CAROUSEL_INDEX = $(_this.CAROUSEL_ITEM + _this.CAROUSEL_ACTIVE).index();
        _this.CAROUSEL_INDEX++;
        _this.CAROUSEL_INDEX = _this.CAROUSEL_INDEX >= length ? length : _this.CAROUSEL_INDEX;
        $(_this.CAROUSEL_ITEM).removeClass(CAROUSEL_ACTIVE);
        $(_this.CAROUSEL_ITEM).eq(_this.CAROUSEL_INDEX).addClass(CAROUSEL_ACTIVE);
        _this.carouselAnimate(true);
        _this.changeCarousel();
    });
    return this;
}
/**
 *
 * @param params
 * @returns {Carousel}
 */
Carousel.prototype.carouselAnimate = function (params) {
    var iTranslatX = this.getTranslateX();
    var itemWidth = $(this.CAROUSEL_ITEM).outerWidth();
    var childWidth = $(this.CAROUSEL_BLOCK).outerWidth();
    var parentWidth = $(this.CAROUSEL_BLOCK).parent().outerWidth();
    if ((childWidth - parentWidth) >= itemWidth) {
        if (params) {
            var targetValue = childWidth - parentWidth - 12;
            itemWidth = Math.abs(iTranslatX) >= targetValue ? 0 : -itemWidth;
        } else {
            itemWidth = iTranslatX >= 0 ? 0 : itemWidth;
        }
        var tools = new Tools();
        var translateX = tools.getTranslateX((itemWidth + iTranslatX));
        $(this.CAROUSEL_BLOCK).attr('style', translateX + this.INIT_STYLE);
        tools = null;
    }
    return this;
}
/**
 *
 * @returns {Number}
 */
Carousel.prototype.getTranslateX = function () {
    var translateX = 0;
    var TEMP_STYLE = $(this.CAROUSEL_BLOCK)[0].style['transform'];
    if (TEMP_STYLE.trim().length != 0) {
        var FIRST_INDEX = TEMP_STYLE.indexOf('(') + 1;
        var LAST_INDEX = TEMP_STYLE.lastIndexOf(')');
        translateX = parseInt(TEMP_STYLE.substring(FIRST_INDEX, LAST_INDEX).trim());
    }
    return translateX;
}
/**
 *
 * @returns {Carousel}
 */
Carousel.prototype.changeCarousel = function () {
    var CAROUSEL_ACTIVE = this.CAROUSEL_ACTIVE.substring(1);
    var TEMP_CAROUSEL = $(this.CAROUSEL_MAIN).not(this.CAROUSEL_ACTIVE);
    var src = $(this.CAROUSEL_ITEM + this.CAROUSEL_ACTIVE).children().attr('src');
    $(this.CAROUSEL_MAIN).removeClass(CAROUSEL_ACTIVE);
    TEMP_CAROUSEL.attr('src', src);
    TEMP_CAROUSEL.addClass(CAROUSEL_ACTIVE);
    return this;
}
/**
 *
 * @type {Carousel}
 */
var carousel = new Carousel();
/**
 *
 * @constructor
 */
function DetailPage() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.BMAP = arguments['BMAP'] ? arguments['BMAP'] : new BMap.Map("BMap");
    this.BMAP_ITEM = arguments['BMAP_ITEM'] ? arguments['BMAP_ITEM'] : '.bmap-item a';
    this.init();
}
/**
 *
 * @returns {HomePage}
 */
DetailPage.prototype.init = function () {
    this.loadBaiduMap();
    this.clickBmapItem();
    return this;
}

DetailPage.prototype.clickBmapItem = function () {
    var _this = this;
    $(document).on("click", this.BMAP_ITEM, function () {
        var text = $(this).next().text().trim();
        _this.BMAP_LOCAL = new BMap.LocalSearch(_this.BMAP, {
            renderOptions: {map: _this.BMAP, panel: "bmap-result"}
        });
        _this.BMAP_LOCAL.search(text);
    });
    return this;
}
/**
 *
 * @returns {DetailPage}
 */
DetailPage.prototype.loadBaiduMap = function () {
    var _this = this;
    var lng = 121.404351;
    var lat = 31.167261;
    var point = new BMap.Point(lng, lat);
    this.BMAP.centerAndZoom(point, 11);
    var myCompOverlay = new ComplexCustomOverlay({
        point: point,
        text: "谷粒软件（徐汇区古美路1515号凤凰大厦19号楼1101室）",
    });
    this.BMAP.addOverlay(myCompOverlay);
    var marker = new BMap.Marker(point);
    this.BMAP.addOverlay(marker);

    this.BMAP_LOCAL = new BMap.LocalSearch(this.BMAP, {
        renderOptions: {map: _this.BMAP, panel: "bmap-result"}
    });
    this.BMAP_LOCAL.search("地铁");
}
/**
 *
 * @constructor
 */
function ComplexCustomOverlay() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.text = arguments['text'] ? arguments['text'] : '';
    this.point = arguments['point'] ? arguments['point'] : null;
    this.tag = $('<div class="bmap-tag"><p>' + this.text + '</p></div>');
}
ComplexCustomOverlay.prototype = new BMap.Overlay();
/**
 *
 * @param map
 * @returns {*}
 */
ComplexCustomOverlay.prototype.initialize = function (map) {
    this.map = map;
    map.getPanes().labelPane.appendChild(this.tag[0]);
    return this.tag[0];
}
/**
 *
 * @returns {ComplexCustomOverlay}
 */
ComplexCustomOverlay.prototype.draw = function () {
    var pixel = this.map.pointToOverlayPixel(this.point);
    this.tag.css("left", pixel.x - $('.bmap-tag').outerWidth() / 2 + "px");
    this.tag.css("top", pixel.y - 70 + "px");
    return this;
}
/**
 *
 * @type {DetailPage}
 */
var hp = new DetailPage();

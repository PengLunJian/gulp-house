/**
 *
 * @constructor
 */
function ProjectPage() {
    this.init();
}
/**
 *init初始化
 * @returns {ProjectPage}
 */
ProjectPage.prototype.init = function () {

    /**
     *
     * @type {Tools}
     */
    var tools = new Tools({
        TAB_BTN: '.tab-btn',
        TAB_BAR: '.tab-bar',
        TAB_BAR_WIDTH: 100,
        TAB_CHANGED: function () {
            console.log('success');
            pp.tabChange();
        }
    });
    return this;
}

/**
 * tab切换
 * @returns {ProjectPage}
 */
ProjectPage.prototype.tabChange = function () {
    // 模拟json数据
    var data = {
        'europe': ['pro_example.png', 'pro_example.png', 'pro_example.png'],
        'freshness': ['project_item01.png', 'project_item02.png', 'project_item03.png'],
        'modern': ['pro_example.png', 'pro_example.png', 'pro_example.png'],
        'kitchen': ['project_item01.png', 'project_item02.png', 'project_item03.png'],
        'toilet': ['pro_example.png', 'pro_example.png', 'pro_example.png'],
        'gym': ['project_item01.png', 'project_item02.png', 'project_item03.png'],
        'public': ['pro_example.png', 'pro_example.png', 'pro_example.png']
    }
    var TEMP_HTML = "";
    var JSON_DATA = data;
    var value = $(".tab-btn.active").attr("data-value");
    for (var i = 0; i < JSON_DATA[value].length; i++) {
        TEMP_HTML += '<div class="item"><img src="images/' + JSON_DATA[value][i] + '" alt=""></div>'
    }
    $(".carousel-inner").html(TEMP_HTML);
    $(".carousel-inner .item").eq(0).addClass('active');
    return this;
}
/**
 *
 * @type {ProjectPage}
 */
var pp = new ProjectPage();

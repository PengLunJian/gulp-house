/**
 * This is gulp config file
 * Created by PengLunJian on 2017-08-09.
 */
var gulp = require('gulp');
var rev = require('gulp-rev');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var less = require('gulp-less');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var minifyCss = require('gulp-minify-css');
var assetRev = require('gulp-asset-rev');
var runSequence = require('run-sequence');
var revCollector = require('gulp-rev-collector');

var path = {
    SRC: {
        ROOT: 'src/',
        JS: 'src/js/*.js',
        HTML: 'src/*.html',
        FONT: 'src/fonts/*',
        LESS: 'src/less/*.less',
        ICONFONT: 'src/iconfont/*',
        IMAGES: 'src/images/*.{png,jpg,gif,ico}',
    },
    DIST: {
        ROOT: 'dist/',
        HTML: 'dist/',
        JS: 'dist/js/',
        CSS: 'dist/css/',
        FONT: 'dist/fonts/',
        IMAGES: 'dist/images/',
        ICONFONT: 'dist/iconfont/',

        VERSION: 'dist/map/',
    },
    BUILD: {
        ROOT: 'build/',
        HTML: 'build/',
        JS: 'build/js/',
        CSS: 'build/css/',
        FONT: 'build/fonts/',
        IMAGES: 'build/images/',
        ICONFONT: 'build/iconfont/',

        VERSION: 'build/map/',
    },
};

gulp.task('clean', function () {
    var url = [
        path.DIST.ROOT + '*',
        path.BUILD.ROOT + '*'
    ];
    return gulp.src(url, {read: false})
        .pipe(clean())
})

gulp.task('build_less', function () {
    return gulp.src(path.SRC.LESS)
        .pipe(less())
        // .pipe(assetRev())
        .pipe(gulp.dest(path.BUILD.CSS));
});

gulp.task('dist_less', function () {
    return gulp.src(path.SRC.LESS)
        .pipe(less())
        .pipe(assetRev())
        .pipe(minifyCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.DIST.CSS));
});

gulp.task('build_js', function () {
    return gulp.src(path.SRC.JS)
        .pipe(jshint())
        .pipe(gulp.dest(path.BUILD.JS));
});

gulp.task('dist_js', function () {
    return gulp.src(path.SRC.JS)
        .pipe(jshint())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.DIST.JS));
});

gulp.task('build_rev_css', function () {
    return gulp.src(path.BUILD.CSS + '*.css')
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest(path.BUILD.VERSION + 'css'));
});

gulp.task('build_rev_js', function () {
    return gulp.src(path.BUILD.JS + '*.js')
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest(path.BUILD.VERSION + 'js'));
});

gulp.task('dist_rev_css', function () {
    return gulp.src(path.DIST.CSS + '*.css')
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest(path.DIST.VERSION + 'css'));
});

gulp.task('dist_rev_js', function () {
    return gulp.src(path.DIST.JS + '*.js')
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest(path.DIST.VERSION + 'js'));
});

gulp.task('build_html', function () {
    return gulp.src(path.SRC.HTML)
        .pipe(gulp.dest(path.BUILD.HTML));
});

gulp.task('dist_html', function () {
    var options = {
        collapseWhitespace: true,  //从字面意思应该可以看出来，清除空格，压缩html，这一条比较重要，作用比较大，引起的改变压缩量也特别大。
        collapseBooleanAttributes: true,  //省略布尔属性的值，比如：<input checked="checked"/>,那么设置这个属性后，就会变成 <input checked/>。
        removeComments: true,  //清除html中注释的部分，我们应该减少html页面中的注释。
        removeEmptyAttributes: true,  //清除所有的空属性。
        removeScriptTypeAttributes: true,  //清除所有script标签中的type="text/javascript"属性。
        removeStyleLinkTypeAttributes: true,  //清楚所有Link标签上的type属性。
        minifyJS: true,  //压缩html中的javascript代码。
        minifyCSS: true  //压缩html中的css代码。
    };
    return gulp.src(path.SRC.HTML)
        .pipe(htmlmin(options))
        .pipe(gulp.dest(path.DIST.HTML));
});

gulp.task('build_rev_html', function () {
    return gulp.src(path.BUILD.HTML + '*.html')
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest(path.BUILD.VERSION + 'html'));
});

gulp.task('dist_rev_html', function () {
    return gulp.src(path.DIST.HTML + '*.html')
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest(path.DIST.VERSION + 'html'));
});

gulp.task('build_replace_html', function () {
    return gulp.src(['build/**/*.json', 'build/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest(path.BUILD.HTML));
});

gulp.task('dist_replace_html', function () {
    return gulp.src(['dist/**/*.json', 'dist/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest(path.DIST.HTML));
});

gulp.task('min_image', function () {
    gulp.src(path.SRC.IMAGES)
        .pipe(imagemin())
        .pipe(gulp.dest(path.BUILD.IMAGES))
        .pipe(gulp.dest(path.DIST.IMAGES));
});

gulp.task('rev_image', function () {
    return gulp.src(path.SRC.IMAGES)
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest(path.BUILD.VERSION + 'images'))
        .pipe(gulp.dest(path.DIST.VERSION + 'images'));
});

gulp.task('font', function () {
    return gulp.src(path.SRC.FONT)
        .pipe(gulp.dest(path.BUILD.FONT))
        .pipe(gulp.dest(path.DIST.FONT));
});

gulp.task('rev_font', function () {
    return gulp.src(path.SRC.FONT)
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest(path.BUILD.VERSION + 'fonts'))
        .pipe(gulp.dest(path.DIST.VERSION + 'fonts'));
});

gulp.task('iconfont', function () {
    return gulp.src(path.SRC.ICONFONT)
        .pipe(gulp.dest(path.BUILD.ICONFONT))
        .pipe(gulp.dest(path.DIST.ICONFONT));
});

gulp.task('rev_iconfont', function () {
    return gulp.src(path.SRC.ICONFONT)
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest(path.BUILD.VERSION + 'iconfont'))
        .pipe(gulp.dest(path.DIST.VERSION + 'iconfont'));
});

gulp.task('test', function (done) {
    runSequence(
        'build_less', 'build_js',
        'build_html', 'build_rev_css',
        'build_rev_js', 'build_rev_html',
        'build_replace_html', 'font',
        // 'rev_image', 'min_image',
        'rev_font', 'iconfont', 'rev_iconfont',
        done);
});

gulp.task('dist', function (done) {
    runSequence(
        'dist_less', 'dist_js',
        'dist_html', 'dist_rev_css',
        'dist_rev_js', 'dist_rev_html',
        'dist_replace_html', 'min_image',
        'rev_image', 'font', 'rev_font',
        'iconfont', 'rev_iconfont',
        done);
});

gulp.task('watch', function () {
    gulp.watch([
        path.SRC.HTML,
        path.SRC.LESS,
        path.SRC.JS,
        path.SRC.FONT,
        path.SRC.IMAGES,
        path.SRC.ICONFONT
    ], ['test']);
    console.log("WATCH SUCCESS!");
});

gulp.task('dev', ['test'], function () {
    console.log("DEV SUCCESS!");
});

gulp.task('build', ['dist'], function () {
    console.log("BUILD SUCCESS!");
});

gulp.task('default', ['test'], function () {
    console.log("DEFAULT SUCCESS!");
});
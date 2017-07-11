/**
 * Created by Administrator on 2017/7/9.
 */
/*引入文件*/
var gulp=require('gulp');
var connect=require('gulp-connect');
var uglify=require('gulp-uglify');
var concat=require('gulp-concat');
var watchPath=require('gulp-watch-path');
var streamCombiner2=require('stream-combiner2');
var sourceMaps=require('gulp-sourcemaps');
var minifyCss=require('gulp-minify-css');
var autoPrefixer=require('gulp-autoprefixer');
var less=require('gulp-less');
var rubysass=require('gulp-ruby-sass');
var imagemin=require('gulp-imagemin');
var gutil=require('gulp-util');
var gclean=require('gulp-clean');
var open=require('open');
/*gulp自带的输出都带事件和颜色，我们利用gulp-util实现同样的效果*/
/*gulp.task('default',function(){
   gutil.log('message');
   gutil.log(gutil.colors.red('error'));
   gutil.log(gutil.colors.green('message'+'some'))
});*/
/*合并js*/
gulp.task('js',function () {
   gulp.src('src/js/**/*.js')
       .pipe(concat('index.js'))
       .pipe(gulp.dest('dist/js'))
       .pipe(uglify())
       .pipe(gulp.dest('build/js'))
       .pipe(connect.reload())

});
gulp.task('lib',function(){
    gulp.src('bower_components/**/*.js')
        .pipe(gulp.dest('build/lib'))
        .pipe(gulp.dest('dist/lib'))
        .pipe(connect.reload())
});
gulp.task('clean',function(){
   gulp.src(['./build/views/*.html','./dist/views/*.html'])
       .pipe(gclean())
});
gulp.task('html',['clean'],function(){
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('build/'))
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
});
/*gulp.task('clean',function(){
   gulp.src('src/views/!*html')
       .pipe(clean());
});*/
gulp.task('build',['html','lib','js']);
gulp.task('server',['build'],function(){
    /*设置服务器*/
    connect.server({
        root:'build',
        livereload:true,
        port:9999
    });
/*监听那些任务*/
gulp.watch('bower_components/**/*',['lib']);
    gulp.watch('src/**/*.html',['html']);
    gulp.watch('src/js/**/*.js',['js']);
    //通过浏览器把指定的地址 （http://localhost:9988）
    open('http://localhost:9999');
});
/*定义默认任务
 * 直接执行gulp 会调用的任务
 * */
gulp.task('default',['server']);
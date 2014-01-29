var lr              = require('tiny-lr'),
    gulp            = require('gulp'),
    clean           = require('gulp-clean'),
    jade            = require('gulp-jade'),
    minifyCss       = require('gulp-minify-css'),
    rename          = require('gulp-rename'),
    sass            = require('gulp-sass'),
    uglify          = require('gulp-uglify'),
    livereload      = require('gulp-livereload'),
    compass         = require('gulp-compass'),
    concat          = require('gulp-concat'),
    server          = lr(),
    serverPort      = 35729;

/** -S пиши для плагинов**/
gulp.task('template:jade', function(){

    return gulp.src('./layouts/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('C:/OpenServer/domains/awesomecms/assets/html'));
});

gulp.task('css:sass', function() {
    gulp.src('./components/styles.scss')
        .pipe(compass({
            css: 'assets/css/',
            sass: 'components/',
            image: 'components/'
        }))
        .pipe(concat('styles.css')) // npm install gulp-concat --save-dev
        .pipe(minifyCss())
        .pipe(gulp.dest('C:/OpenServer/domains/awesomecms/assets/css/'))
});
gulp.task('lr-server', function() {
    server.listen(serverPort, function(err) {
        if(err) return console.log(err);
    });
});

gulp.task('default', function(){
        gulp.run('lr-server');
        gulp.run('template:jade', 'css:sass');
        gulp.watch('./layouts/*.jade', function(){
            gulp.run('template:jade');
        });
        gulp.watch('./components/**/*.scss', function(){
            gulp.run('css:sass');
        });
});
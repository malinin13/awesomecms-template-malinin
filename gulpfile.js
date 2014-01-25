var lr              = require('tiny-lr'),
    gulp            = require('gulp'),
    clean           = require('gulp-clean'),
    jade            = require('gulp-jade'),
    minifyCss       = require('gulp-minify-css'),
    rename          = require('gulp-rename'),
    sass            = require('gulp-sass'),
    uglify          = require('gulp-uglify'),
    livereload      = require('gulp-livereload'),
    server          = lr(),
    serverPort      = 63342;

/** -S пиши для плагинов**/
gulp.task('template:jade', function(){

    return gulp.src('./layouts/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('C:/OpenServer/domains/awesomecms/assets/html'));
});

gulp.task('css:sass', function () {
    gulp.src('./components/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('C:/OpenServer/domains/awesomecms/assets/css/'))
        .pipe(livereload(server));
});
gulp.task('lr-server', function() {
    server.listen(35729, function(err) {
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
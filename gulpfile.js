let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer')

gulp.task('autoprefixer', function() {
    gulp.src('app/scss/**/*.scss')
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('app/css'))
});

gulp.task('scss', function() {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('script', function() {
    return gulp.src('app/js/*.js')
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function() {
    return gulp.src('../gulp-farm/*.html')
    .pipe(browserSync.reload({stream: true}))
});




gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: '../gulp-farm'
        }
    })
});

gulp.task('watch', function() {
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'))
    gulp.watch('../gulp-farm/*.html', gulp.parallel('html'))
    gulp.watch('app/*.js', gulp.parallel('script'))

});

gulp.task('default', gulp.parallel('scss', 'browser-sync', 'watch'))


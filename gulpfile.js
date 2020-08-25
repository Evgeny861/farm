let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat')

gulp.task('autoprefixer', function() {
    gulp.src('../gulp-farm/app/scss/**/*.scss')
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('../gulp-farm/app/css'))
});

gulp.task('scss', function() {
    return gulp.src('../gulp-farm/app/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});
gulp.task('js', function() {
    return gulp.src([
        '../gulp-farm/node_modules/slick-carousel/slick/slick.js',
        '../gulp-farm/node_modules/magnific-popup/dist/jquery.magnific-popup.js',
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('../gulp-farm/app/js'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('script', function() {
    return gulp.src('../gulp-farm/app/js/*.js')
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
    gulp.watch('../gulp-farm/app/scss/**/*.scss', gulp.parallel('scss'))
    gulp.watch('../gulp-farm/*.html', gulp.parallel('html'))
    gulp.watch('../gulp-farm/app/*.js', gulp.parallel('script'))
    gulp.watch('../gulp-farm/app/js/*.js', gulp.parallel('script'))
});

gulp.task('default', gulp.parallel('scss', 'js', 'script', 'browser-sync', 'watch'))


let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat')

gulp.task('autoprefixer', function() {
    gulp.src('./app/scss/**/*.scss')
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('./app/css'))
});

gulp.task('scss', function() {
    return gulp.src('./app/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});
gulp.task('js', function() {
    return gulp.src([
        './node_modules/slick-carousel/slick/slick.js',
        './node_modules/magnific-popup/dist/jquery.magnific-popup.js',
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./app/js'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('script', function() {
    return gulp.src('./app/js/*.js')
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function() {
    return gulp.src('./*.html')
    .pipe(browserSync.reload({stream: true}))
});




gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: '.'
        }
    })
});

gulp.task('watch', function() {
    gulp.watch('./app/scss/**/*.scss', gulp.parallel('scss'))
    gulp.watch('./*.html', gulp.parallel('html'))
    gulp.watch('./app/*.js', gulp.parallel('script'))
    gulp.watch('./app/js/*.js', gulp.parallel('script'))
});

gulp.task('default', gulp.parallel('scss', 'js', 'script', 'browser-sync', 'watch'))


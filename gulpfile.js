"use strict";

var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    runSequence = require('run-sequence'),
    del = require('del'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    rev = require('gulp-rev'),
    revReplace = require('gulp-rev-replace'),
    gulpif = require('gulp-if'),
    cleanCss = require('gulp-clean-css');

var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

var options = {
		sass:{
			precision: 8,
			includePaths: ['node_modules/bootstrap-sass/assets/stylesheets']
		},
		autoprefixer: { add: false, browsers: [
			  "Android 2.3",
			  "Android >= 4",
			  "Chrome >= 20",
			  "Firefox >= 24",
			  "Explorer >= 8",
			  "iOS >= 6",
			  "Opera >= 12",
			  "Safari >= 6"
			] }
};

var src = {
    toString: function () {
        return 'src'
    }
};
src.css = src + '/css';
src.sass = src + '/sass/**/*.scss';
src.fonts = src + '/fonts';
src.images = src + '/img/**/*.{gif,jpg,jpeg,png,webp}';
src.index = src + '/index.html';

var dist = {
    toString: function () {
        return 'dist'
    }
};
dist.scripts = dist + '/js';
dist.fonts = dist + '/fonts';
dist.images = dist + '/img';
dist.css = dist + '/css';


gulp.task('sass', function () {
    gulp.src(src.sass)
        .pipe(sass(options.sass))
        .on('error', function (error) {
            console.error(error);
        })
        .pipe(postcss([ autoprefixer(options.autoprefixer) ]))
        .pipe(gulp.dest(src.css))
        .pipe(browserSync.reload({
                stream: true
            })
        );
});

gulp.task('watch-sass', function () {
    gulp.watch(src.sass, ['sass']);
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'src',
            routes: {
                "/node_modules": "node_modules",
                "/fonts/bootstrap": "node_modules/bootstrap-sass/assets/fonts/bootstrap"
            }
        },
        browser: [],
        reloadOnRestart: true
    })
    
    gulp.watch(src+'/*.html')
	.on('change', browserSync.reload);
});

gulp.task('browserSyncDist', function () {
    browserSync.init({
        server: {
            baseDir: 'dist',
            routes: {
                "/node_modules": "node_modules"
            }
        },
        browser: [],
        reloadOnRestart: true
    })
});

gulp.task('clean', function (cb) {
    return del([
        dist + '/*'
    ], cb);
});

gulp.task('html', function () {
    return gulp.src(src + '/*.html')
        .pipe(gulp.dest('' + dist));
});

gulp.task('css', function () {
    return gulp.src(src.css+'/**/*')
        .pipe(gulp.dest('' + dist.css));
});

gulp.task('fonts', function () {
    return gulp.src([src.fonts + '/**', 'node_modules/bootstrap-sass/assets/fonts/**'])
        .pipe(gulp.dest(dist.fonts));
});

gulp.task('images', function () {
    return gulp.src(src.images)
        .pipe(gulp.dest(dist.images));
});

gulp.task('buildIndex', function () {

    return gulp.src(src.index)
        .pipe(useref({searchPath:['dist','src']}))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.js', rev()))
        .pipe(gulpif('*.css', cleanCss()))
        .pipe(gulpif('*.css', rev()))
        .pipe(revReplace())
        .pipe(gulp.dest('' + dist));
});



gulp.task('build', function () {
    return runSequence(
        'clean',
        'sass',
        'fonts', 
        'images',
        'buildIndex'
    );
});

gulp.task('dist', ['browserSyncDist']);

gulp.task('default', ['sass', 'watch-sass', 'browserSync']);
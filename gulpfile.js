const gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    gcmq = require('gulp-group-css-media-queries'),
    rename = require("gulp-rename"),
    gulpCopy = require('gulp-copy'),
    gulpSequence = require('gulp-sequence'),
    clean = require('gulp-clean'),
    htmlImport = require('gulp-html-import');


let config = {
    app: './app',
    node_modules: './node_modules/',
    css: {
        src: '/scss/**/*.scss',
        dest: '/css',
        libs: '/libs.min.css',
        scss: '/scss',
        main_scss: '/main.scss'
    },
    html: {
        layouts: '/layouts/',
        src: '/src/*.html'
    },
    libs: {
        folder: '/libs',
        node_modules: '/node_modules/'
    },
    js: {
        dest: '/js'
    },
    watcher: {
        src: '/src/*.html',
        import: '/layouts/*.html',
        js: '/js/*.js'
    }
};


// add new libs here ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
gulp.task('copy-modules', function () {
    return gulp
        .src([
            // config.node_modules + 'bootstrap/**/*',
            config.node_modules + 'jquery/**/*'
        ])
        .pipe(gulpCopy(config.app + config.libs.folder));

});
// add new libs here ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



// add new css lib below

gulp.task('css-libs', function () {
    return gulp.src([
        config.app + config.libs.folder + config.libs.node_modules + 'bootstrap/dist/css/bootstrap.css'
    ])
        .pipe(concat('libs.min.css'))
        .pipe(gulp.dest(config.app + config.css.dest))
});

gulp.task('js-libs', function () {
    return gulp.src([
        config.app + config.libs.folder + config.libs.node_modules + 'jquery/dist/jquery.js',
        config.app + config.libs.folder + config.libs.node_modules + 'bootstrap/dist/js/bootstrap.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.app + config.js.dest))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('clean-css-libs', function () {
    return gulp.src(config.app + config.css.dest + config.css.libs)
        .pipe(clean());
});
gulp.task('clean-js-libs', function () {
    return gulp.src(config.app + config.js.dest + '/libs.min.js')
        .pipe(clean());
});

// use gulp.libs for copy new modules and refresh lib files

gulp.task('libs',  gulpSequence('clean-css-libs', 'clean-js-libs', 'copy-modules', 'css-libs', 'js-libs'));


gulp.task('css-build', function () {
    gulp.src(config.app + config.css.scss + config.css.main_scss)
        .pipe(sourcemaps.init())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['> 0.1%'],
            cascade: false
        }))
        .pipe(gcmq())
        .pipe(cleanCSS({keepBreaks: false}))
        .pipe(sourcemaps.write('app/css', {addComment: true}))

        .pipe(gulp.dest(config.app + config.css.dest))

        .pipe(browserSync.reload({
            stream: true
        }));
});



gulp.task('import', function () {
    gulp.src(config.app + config.html.src)
        .pipe(htmlImport(config.app + config.html.layouts))
        .pipe(gulp.dest(config.app))
        .pipe(browserSync.reload({
            stream: true
        }));
});


gulp.task('watch', ['browser-sync', 'import'], function () {
    gulp.watch(config.app + config.css.src, ['css-build']);
    gulp.watch('app/src/*.html', ['import']);
    gulp.watch('app/layouts/*.html', ['import']);
    gulp.watch(config.app + config.watcher.import, browserSync.reload);
    gulp.watch(config.app + config.watcher.js, browserSync.reload);
    gulp.watch('app/layouts/*.html', browserSync.reload);
    gulp.watch('app/src/*.html', browserSync.reload);
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: config.app
        }
    });
});

'use strict';

var gulp	     = require('gulp'),
	sass	     = require('gulp-sass'),
    rigger       = require('gulp-rigger'),
    sourcemaps   = require('gulp-sourcemaps'),
    imagemin     = require('gulp-imagemin'),
    prefixer     = require('gulp-autoprefixer'),
    //notify       = require('gulp-notify'),
    //plumber      = require('gulp-plumber'),
    browserSync  = require("browser-sync"),
	del		     = require('del'),
    reload       = browserSync.reload;
	

//Дефолтный таск ---------------------------------------------------+
gulp.task('default', ['clean', 'build', 'webserver', 'watch']);

// Сервер ----------------------------------------------------------+
var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: false,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
};
gulp.task('webserver', ()=> {
    browserSync(config);
});

//Чистка -----------------------------------------------------------+
gulp.task('clean', ()=> {
	del.sync('build/*');
});

// PATH ------------------------------------------------------------+
var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: { //Пути откуда брать исходники
        html: 'src/*.html',//'src/[^_]*.html',  //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/*.js',
        style: 'src/*.sass',
        img: 'src/img/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'src/fonts/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        js: 'src/**/*.js',
        style: 'src/**/*.sass',// 'src/**/*.sass',
        img: 'src/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    //clean: './build'
};

// Сборка html -----------------------------------------------------+
gulp.task('html:build', ()=> {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});
// Сборка css ------------------------------------------------------+
gulp.task('style:build', ()=>{
    gulp.src(path.src.style)
        .pipe(sass({outputStyle:'expanded'}).on('error',sass.logError))
        //.pipe(plumber())
        .pipe(prefixer())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

// Сборка js -------------------------------------------------------+
gulp.task('js:build', ()=> {
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(rigger()) //Прогоним через rigger
        //.pipe(sourcemaps.init()) //Инициализируем sourcemap
        //.pipe(uglify()) //Сожмем наш js
        //.pipe(sourcemaps.write()) //Пропишем карты
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(reload({stream: true})); //И перезагрузим сервер
});

// Сборка изображений ----------------------------------------------+
gulp.task('image:build', ()=> {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            //use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        .pipe(reload({stream: true}));
});

// Сборка шрифтоф --------------------------------------------------+
gulp.task('fonts:build', ()=> {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

// Сборка тасков build ---------------------------------------------+
gulp.task('build', [
    'html:build',
    'style:build',
    //'js:build',
    'image:build',
    'fonts:build'
]);

// Отслеживание изменений ------------------------------------------+
gulp.task('watch', ()=> {
    gulp.watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    gulp.watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    // gulp.watch([path.watch.js], function(event, cb) {
    //     gulp.start('js:build');
    // });
    gulp.watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    gulp.watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});






'use strict';

var gulp	    = require('gulp'),
	sass	    = require('gulp-sass'),
    rigger      = require('gulp-rigger'),
    sourcemaps  = require('gulp-sourcemaps'),
    browserSync = require("browser-sync"),
	del		    = require('del'),
    reload      = browserSync.reload;
	

//Дефолтный таск ---------------------------------------------------+
gulp.task('default', ['build', 'webserver', 'watch']);

//Работа со стилями ------------------------------------------------+
// gulp.task('sass', ()=> {
// 	gulp.src(['', 'css/*.scss']) //выбираем все исходники
// 		.pipe(sass({outputStyle:'expanded'}).on('error',sass.logError)) //компилируем и выводим ошибки
// 		.pipe(gulp.dest('build/css'));
// });

// Сервер ----------------------------------------------------------+
var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
};
gulp.task('webserver', function () {
    browserSync(config);
});

//Чистка -----------------------------------------------------------+
gulp.task('clean', ()=> {
	del.sync('build/*');
});

gulp.task('test', ()=> {
	console.log("test!!!");
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
        html: 'src/[^_]*.html',//'src/[^_]*.html',  //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/*.js',
        style: 'src/**/*.sass',
        img: 'src/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'src/fonts/**/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/*.html',
        js: 'src/**/*.js',
        style: 'src/**/*.sass',
        img: 'src/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    //clean: './build'
};

// Сборка html -----------------------------------------------------+
gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});
// Сборка css ------------------------------------------------------+
gulp.task('style:build', function () {
    gulp.src(path.src.style) //Выберем наш main.scss
        .pipe(sourcemaps.init()) //То же самое что и с js
        .pipe(sass()) //Скомпилируем
        //.pipe(prefixer()) //Добавим вендорные префиксы
        //.pipe(cssmin()) //Сожмем
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css)) //И в build
        .pipe(reload({stream: true}));
});

// Сборка js -------------------------------------------------------+
gulp.task('js:build', ()=> {
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(rigger()) //Прогоним через rigger
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        //.pipe(uglify()) //Сожмем наш js
        .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(reload({stream: true})); //И перезагрузим сервер
});

// Сборка тасков build ---------------------------------------------+
gulp.task('build', [
    'html:build',
    'style:build',
    'js:build'
    //'fonts:build',
    //'image:build'
]);

// Отслеживание изменений ------------------------------------------+
gulp.task('watch', function(){
    gulp.watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    gulp.watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    gulp.watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    // watch([path.watch.img], function(event, cb) {
    //     gulp.start('image:build');
    // });
    // watch([path.watch.fonts], function(event, cb) {
    //     gulp.start('fonts:build');
    // });
});
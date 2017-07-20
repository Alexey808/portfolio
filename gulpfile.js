var gulp	= require('gulp'),
	sass	= require('gulp-sass'),
    rigger  = require('gulp-rigger'),
	del		= require('del');
	

//Дефолтный таск ---------------------------------------------------+
// gulp.task('default', ['clean', 'html:build']);

//Работа со стилями ------------------------------------------------+
// gulp.task('sass', ()=> {
// 	gulp.src(['', 'css/*.scss']) //выбираем все исходники
// 		.pipe(sass({outputStyle:'expanded'}).on('error',sass.logError)) //компилируем и выводим ошибки
// 		.pipe(gulp.dest('build/css'));
// });

//Чистка -----------------------------------------------------------+
gulp.task('clear', ()=> {
	del.sync('build/*');
});

gulp.task('test', ()=> {
	console.log("test!!!");
});

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: { //Пути откуда брать исходники
        html: 'src/[^_]*.html', //'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/main.js',
        style: 'src/**/.scss',
        img: 'src/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'src/fonts/**/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/*.html',
        js: 'src/**/*.js',
        style: 'src/**/*.scss',
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
        //.pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});
// Сборка css ------------------------------------------------------+
gulp.task('style:build', function () {
    gulp.src(path.src.style) //Выберем наш main.scss
        //.pipe(sourcemaps.init()) //То же самое что и с js
        .pipe(sass()) //Скомпилируем
        //.pipe(prefixer()) //Добавим вендорные префиксы
        //.pipe(cssmin()) //Сожмем
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css)) //И в build
        //.pipe(reload({stream: true}));
});
// Сборка js -------------------------------------------------------+
gulp.task('js:build', function () {
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(rigger()) //Прогоним через rigger
        //.pipe(sourcemaps.init()) //Инициализируем sourcemap
        //.pipe(uglify()) //Сожмем наш js
        //.pipe(sourcemaps.write()) //Пропишем карты
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        //.pipe(reload({stream: true})); //И перезагрузим сервер
});
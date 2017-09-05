/*
Данный скрипт выводит список файлов "get_files.txt" расположенных в указанном каталоге "myCatalog", 
если данный путь не найден то список файлов будет составлятся от корневого каталога, 
где находится этот скрипт.
*/

var fs = require('fs');
var path = require('path');

var getFiles = function (dir, files_){
  files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } 

        /* --- все расширения --- */
        //files_.push(name);
        
        /* --- для .js --- */
        // else if (name.toString().indexOf('.js')!== -1) {
        //   files_.push(name);
        // } 

        /* --- для .scss --- */
        else if (name.toString().indexOf('.scss')!== -1) {
          files_.push(name);
        }

        /* --- для .html --- */
        // else if (name.toString().indexOf('.html')!== -1) {
        //   files_.push(name);
        // }

    }
    return files_;
};


var mf;
var myCatalog = '/folder';

if (fs.existsSync(process.cwd() + myCatalog)) {
    mf = getFiles(process.cwd() + myCatalog);
} else {
    mf = getFiles(process.cwd());
}

fs.writeFileSync("get_files.txt", 
    mf.toString()
      .split(process.cwd() + '/')
      .join('\n' + "'")
      .split(',')
      .join("';")
      .split('.scss')
      .join('')
);

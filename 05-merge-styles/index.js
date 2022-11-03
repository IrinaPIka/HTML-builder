/*
В файле index.js напишите скрипт собирающий в единый файл содержимое папки styles. 
Выходной файл должен носить имя bundle.css и находиться внутри папки project-dist.

 После завершения работы скрипта в папке project-dist должен находиться файл bundle.css содержащий стили из всех файлов папки styles.
 При добавлении/удалении/изменении файлов стилей в папке styles и повторном запуске скрипта файл bundle.css перезаписывается и содержит актуальные стили.
 Любые файлы имеющие расширение отличное от css или директории игнорируются.
 Стили находящиеся в файле bundle.css созданном в процессе сборки не должны быть повреждены.

Импорт всех требуемых модулей
Чтение содержимого папки styles
Проверка является ли объект файлом и имеет ли файл нужное расширение
Чтение файла стилей
Запись прочитанных данных в массив
Запись массива стилей в файл bundle.css
*/
const fs = require('fs');
const path = require('path');

fs.unlink(path.join(__dirname,'project-dist','bundle.css'), (err) => {  // удаляем старый файл
    if (err) { 
        if(err.errno == '-4058') { // пропускаем ошибку "не найден " 
        } else   throw err;
    }
});

const outfile = fs.createWriteStream(path.join(__dirname, 'project-dist','bundle.css'));
 
 fs.readdir(path.join(__dirname,'styles'), (err, files) => {  // в массиве files - названия файлов директории
        if (err) throw err; 
        
        files.forEach(file => {    
            fs.stat(path.join(__dirname,'styles',file), (err, stats) => {
                if (err) throw err; 
                let info= path.parse(file);
                if(stats.isFile() && info.ext=='.css') {

                    const input = fs.createReadStream(path.join(__dirname,'styles',file), 'utf-8');
                    input.pipe(outfile);
                }// isFile
            })// stat
        }); //foreach
    }); // readdir*/
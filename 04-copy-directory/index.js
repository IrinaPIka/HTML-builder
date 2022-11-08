/*После завершения работы функции создаётся папка files-copy содержимое которой является точной копией исходной папки files.
При добавлении/удалении/изменении файлов в папке files и повторном запуске node 04-copy-directory содержимое папки files-copy актуализируется.
Запрещается использование fsPromises.cp()

Импорт всех требуемых модулей
Создание папки files-copy в случае если она ещё не существует
Чтение содержимого папки files
Копирование файлов из папки files в папку files-copy
*/
const fs = require('fs');
const path = require('path');

    fs.rm(path.join(__dirname,'files-copy'), { recursive: true, force: true },  (err) => { 
        if (err) throw err;
        fs.mkdir(path.join(__dirname,'files-copy'), { recursive: true }, (err) => { 
            if (err) throw err; 
            fs.readdir(path.join(__dirname,'files'), (err, files) => {  
                if (err) throw err; 
                files.forEach(file => {    
                    fs.stat(path.join(__dirname,'files',file), (err, stats) => {
                        if (err) throw err; 
                        if(stats.isFile()) {
                            fs.copyFile(path.join(__dirname,'files',file), path.join(__dirname,'files-copy',file), (err) => {  // собственно копируем из в
                                if (err) throw err;
                                console.log(`${file} was copied to directory files-copy`);
                            });
                        } // stats.isFile
                  }); // callback stat
                }); // foreach
            }); // readdir
        }) //mkdir
    });  //rm

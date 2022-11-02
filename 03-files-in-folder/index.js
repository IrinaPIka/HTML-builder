/*
выводим информацию о файлах из 03-files-in-folder/secret-folder. 
формате <имя файла>-<расширение файла>-<вес файла>. Пример: example - txt - 128.369kb (округлять не нужно, конвертация в кб по желанию!)
 
Порядок действий для выполнения задачи:
        Импорт всех требуемых модулей
        Чтение содержимого папки secret-folder
        Получение данных о каждом объекте который содержит папка secret-folder
        Проверка объекта на то, что он является файлом
        Вывод данных о файле в консоль
*/
const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname,'secret-folder'), (err, files) => {
    if (err)
      console.log(err);
    else {
      console.log("\nFiles from secret-folder:");
      files.forEach(file => {
        let info= path.parse(file);
        var str=info.name + ' - ' + info.ext.replace('.','') + ' - ';
        var size="";
        fs.stat(path.join(__dirname,'secret-folder',file), (err, stats) => {
            if (err) {
              console.error(err);
              return;
            }
            if(stats.isFile()) {
            str= str + stats.size+'b';
            console.log(str);
            }
          });
       
      })
    }
  });
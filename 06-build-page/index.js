const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');
const emitter = new EventEmitter();
var template;


function copyfiles(prefix, curdir, pathfrom) {
    fs.mkdir(path.join(prefix, curdir), { recursive: true },  (err) => { 
      if (err) throw err;  
        fs.readdir(pathfrom, (err, files) => {  
            if (err) throw err; 
            files.forEach(file => {    
                fs.stat(path.join(pathfrom, file), (err, stats) => {
                    if(stats.isFile()) 
                        fs.copyFile(path.join(pathfrom, file), path.join(prefix, curdir, file), (err) => {if (err) throw err; });
                    else if(stats.isDirectory()) 
                        copyfiles(path.join(prefix, curdir), file, path.join(pathfrom, file));
                }) // stats
            }) // foreach
        }) // read dir
    }) // mk dir
} 

async function writetempl (outfile) {
    try {    
        outfile.write(template);    
        outfile.end();
    } 
    catch(err) {      console.error(err);   }
  }


fs.mkdir(path.join(__dirname,'project-dist'), { recursive: true },  (err) => { 
    if (err) throw err; 
    emitter.emit('project-dist_created'); 
});

emitter.on('project-dist_created', () => {   //  1 - подставляем темплейты в шаблон  
    fs.readFile( path.join(__dirname, 'template.html'), 'utf-8', (err, data) => { 
    if (err) throw err;
    template=data.toString();  
    
    fs.readdir(path.join(__dirname,'components'), (err, files) => { 
        if (err)  throw err;
          files.forEach(file => {
          fs.stat(path.join(__dirname,'components',file), (err, stats) => { 
                if (err) throw err;
                 let info= path.parse(file);
                if(stats.isFile() && info.ext==='.html') {  
                    fs.readFile( path.join(__dirname, 'components',file), 'utf-8', (err, component) => { 
                        if (err) throw err;
                         template=template.replace(`{{${info.name}}}`,component.toString());
                         const outfile= fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
                         writetempl (outfile);
                           }) // readFile
                } // это файл и компонент
            }) // stat 
        }) // foreach 
    }) // readdir
}) // readfile template
}); // emitter.on

emitter.on('project-dist_created', () => {   // 2 - копируем assets 
    copyfiles(path.join(__dirname,'project-dist'), 'assets', path.join(__dirname,'assets'));
     });

emitter.on('project-dist_created', () => {   // 3 - слияие стилей
  const outfile = fs.createWriteStream(path.join(__dirname, 'project-dist','style.css'));
    fs.readdir(path.join(__dirname,'styles'), (err, files) => {  
      if (err) throw err; 
      files.forEach(file => {    
        fs.stat(path.join(__dirname,'styles',file), (err, stats) => {
          if (err) throw err; 
          let info= path.parse(file);
          if(stats.isFile() && info.ext=='.css') {
            const input = fs.createReadStream(path.join(__dirname,'styles',file), 'utf-8');
            input.pipe(outfile);
           }
        })// stat
       }) //foreach
   }) // readdir
}); // emitter

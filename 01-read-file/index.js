const { stdout } = process; //Для ввода и вывода информации (I/O - input/output) в Node.js существуют стандартные потоки ввода и вывода:

const fs = require('fs');
const path = require('path');
const stream = fs.createReadStream( path.join(__dirname, 'text.txt'), 'utf-8');

stream.pipe(stdout);


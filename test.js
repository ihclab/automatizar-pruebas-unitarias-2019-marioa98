const fs = require('fs');

function readFile(){
    fs.readFile('/Users/dcl18/Desktop/automatizar-pruebas-unitarias-2019-marioa98/CasosPrueba.txt','utf8', function(err, data){
        console.log(data);
    });
}
readFile();
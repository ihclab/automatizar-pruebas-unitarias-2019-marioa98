const fs = require('fs');

function readFile(){
    let datos;

    fs.readFile('/Users/dcl18/Desktop/automatizar-pruebas-unitarias-2019-marioa98/CasosPrueba.txt','utf8', function(err, data){
        datos = data.split('\r\n');
        datos.forEach(element => {
            parseFile(element);
        });
    });

    
}

function parseFile(file){
    let process = file.split(':');
    console.log(process);
}
readFile();
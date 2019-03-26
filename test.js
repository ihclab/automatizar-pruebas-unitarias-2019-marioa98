const fs = require('fs');
const medias = require('./medias');

class Test {

    constructor(path) {
        this.path = path;
        this.media = new medias();
    }

    readFile() {
        let datos;
        let parseFile = this.parseFile;
        fs.readFile(this.path, 'utf8', function (err, result) {
            datos = result.split('\r\n');
            datos.forEach(function (element) {
                parseFile(element);
            });
        });
    }

    parseFile(file) {
        let process = file.split(':'); //Hasta aqui si jala

        Test.pickNumbers(process);
    }

    static pickNumbers(arr) {
        let inputs = arr[2];
        inputs = inputs.split(' ');
        console.log(inputs.map(Number));

    }

}
let testing = new Test('C:/Users/mario/OneDrive/Escritorio/automatizar-pruebas-unitarias-2019-marioa98/CasosPrueba.txt');
testing.readFile();
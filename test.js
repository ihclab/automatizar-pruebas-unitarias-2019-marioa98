const fs = require('fs');
const medias = require('./medias');

class Test {

    constructor(path) {
        this.path = path;
        this.media = new medias();
    }

    readFile() {
        let datos;
        fs.readFile(this.path, 'utf8', (err, result) => {
            datos = result.split('\r\n');
            datos.forEach((element) => {
                this.parseFile(element);
            });
        });
    }

    parseFile(file) {
        let process = file.split(':');

        this.pickNumbers(process);
    }

    pickNumbers(arr) {
        let problem = arr[0];
        let method = arr[1];
        let inputs = arr[2];
        let output = arr[3];

        inputs = inputs.split(' ');
        inputs = inputs.map(Number); //Convierte a número los valores del array

        //Try catch para que no falle el sistema
        try {
            if (medias[method]) { //Llamando a metodos de clase

                let m = medias[method](inputs);

                if (m == output) {
                    console.log('Result ' + problem + ': Success');
                } else {
                    console.log('Result ' + problem + ': Failed');
                }

            } else if (this.media[method]) { //Llamando a metodos de instancia

                let m = this.media[method];
                if (m == output) {
                    console.log('Result ' + problem + ': Success');
                } else {
                    console.log('Result ' + problem + ': Failed');
                }

            } else {
                console.log('Result ' + problem + ': This method does not exists, failed'); //Si no pasa ninguno de los dos, el método no existe

            }
        } catch (e) {
            console.log('Result ' + problem + ': ' + e.message + ', failed');

        }

    }

}
let testing = new Test('C:/Users/mario/OneDrive/Escritorio/automatizar-pruebas-unitarias-2019-marioa98/CasosPrueba.txt');
testing.readFile();
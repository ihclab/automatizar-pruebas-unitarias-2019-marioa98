const fs = require('fs');
const medias = require('./medias');
const performance = require('perf_hooks').performance;

class Test {

    constructor(path) {
        this.path = path;
        this.media = new medias();
    }

    //Se lee todo el archivo en formato utf8 y lo separa por enters
    readFile() {

        let datos;
        fs.readFile(this.path, 'utf8', (err, result) => {

            if (err) {
                console.log('File not found');

            } else {
                datos = result.split('\r\n');
                datos.forEach((element) => {
                    this.parseFile(element);
                });
            }
        });
    }

    //Divide cada una de las líneas en donde se encuentre el ':'
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

        let processStarts = performance.now();
        let processEnds;

        //Try catch para que no falle el sistema
        try {
            if (medias[method]) { //Llamando a metodos de clase

                let m = medias[method](inputs);

                if (m == output) {
                    processEnds = performance.now();
                    //Color del texto: Verde
                    console.log('\x1b[32m', 'Result ' + problem + ': Success ' + m + ' ' + output + ' ' + (processEnds - processStarts).toFixed(3) + 'ms');
                } else {
                    processEnds = performance.now();
                    //Color del texto: Rojo
                    console.log('\x1b[31m', 'Result ' + problem + ': Failed ' + m + ' ' + output + ' ' + (processEnds - processStarts).toFixed(3) + 'ms');
                }

            } else if (this.media[method]) { //Llamando a metodos de instancia

                let m = this.media[method](inputs);
                if (m == output) {
                    processEnds = performance.now();
                    //Color del texto: Verde                    
                    console.log('\x1b[32m', 'Result ' + problem + ': Success ' + m + ' ' + output + ' ' + (processEnds - processStarts).toFixed(3) + 'ms');
                } else {
                    processEnds = performance.now();
                    //Color del texto: Rojo
                    console.log('\x1b[31m', 'Result ' + problem + ': Failed ' + m + ' ' + output + ' ' + (processEnds - processStarts).toFixed(3) + 'ms');
                }

            } else {
                processEnds = performance.now();
                //Color del texto: Rojo
                console.log('\x1b[31m', 'Result ' + problem + ': This method does not exist, failed ' + (processEnds - processStarts).toFixed(3) + 'ms'); //Si no pasa ninguno de los dos, el método no existe

            }
        } catch (e) {
            processEnds = performance.now();
            //Color del texto: Rojo
            console.log('\x1b[31m', 'Result ' + problem + ': ' + e.message + ', failed ' + (processEnds - processStarts).toFixed(3) + 'ms');

        }

        this.changeColor();
    }

    changeColor() {
        console.log('\x1b[37m'); //Color del texto: Blanco
    }

}

let testing = new Test('C:/Users/mario/OneDrive/Escritorio/automatizar-pruebas-unitarias-2019-marioa98/CasosPrueba.txt');
testing.readFile();
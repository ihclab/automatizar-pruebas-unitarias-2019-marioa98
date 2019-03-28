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

        console.log(' ID   Resultado Método           Detalles');
        console.log('==========================================================\n');

        let datos;
        fs.readFile(this.path, 'utf8', (err, result) => {

            if (err) {
                console.log('File not found');

            } else {

                let success = 0;
                let failed = 0;

                datos = result.split('\r\n');
                datos.forEach((element) => {
                    let value = this.parseFile(element);

                    if (value == 1) {
                        success++;
                    } else {
                        failed++;
                    }
                });

                console.log('\n========= Fin de la prueba ==========\n');
                console.log('Éxito = ' + success + '      Falla = ' + failed);

            }
        });

    }

    //Divide cada una de las líneas en donde se encuentre el ':'
    parseFile(file) {
        let process = file.split(':');

        return this.pickNumbers(process);
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

        let value = 1;

        //Try catch para que no falle el sistema
        try {
            if (medias[method]) { //Llamando a metodos de clase

                let m = medias[method](inputs);

                if (m == output) {
                    processEnds = performance.now();
                    //Color del texto: Verde
                    console.log('\x1b[32m', problem + '    Éxito    ' + method + ' = ' + m + ' T.E: ' + (processEnds - processStarts).toFixed(3) + ' ms');
                } else {
                    value = 0;
                    processEnds = performance.now();
                    //Color del texto: Rojo
                    console.log('\x1b[31m', problem + '   *Falla*   ' + method + ' = ' + m + ' Esperado = ' + output + ' T.E: ' + (processEnds - processStarts).toFixed(3) + ' ms');
                }

            } else if (this.media[method]) { //Llamando a metodos de instancia

                let m = this.media[method](inputs);
                if (m == output) {
                    processEnds = performance.now();
                    //Color del texto: Verde                    
                    console.log('\x1b[32m', problem + '    Éxito    ' + method + ' = ' + m + ' T.E: ' + (processEnds - processStarts).toFixed(3) + ' ms');
                } else {
                    value = 0;
                    processEnds = performance.now();
                    //Color del texto: Rojo
                    console.log('\x1b[31m', problem + '   *Falla*   ' + method + ' = ' + m + ' Esperado = ' + output + ' T.E: ' + (processEnds - processStarts).toFixed(3) + ' ms');
                }

            } else {
                value = 0;
                processEnds = performance.now();
                //Color del texto: Rojo
                console.log('\x1b[31m', problem + '             ' + method + ' Método no encontrado'); //Si no pasa ninguno de los dos, el método no existe

            }
        } catch (e) {
            value = 0;
            processEnds = performance.now();
            //Color del texto: Rojo
            console.log('\x1b[31m', problem + '             ' + method + ' Método no implementado');

        }

        this.changeColor();

        return value;
    }

    changeColor() {
        console.log('\x1b[37m'); //Color del texto: Blanco
    }

}

let testing = new Test('C:/Users/mario/OneDrive/Escritorio/automatizar-pruebas-unitarias-2019-marioa98/CasosPrueba.txt');
testing.readFile();
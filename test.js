const fs = require('fs');
const medias = require('./medias');
const performance = require('perf_hooks').performance;

let date = new Date();
let fileName = 'Mario Armando Martínez Barajas ' + date.getDay() + '-' + date.getMonth() + '-' +
    date.getFullYear() + '  ' + date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds() + '.txt';
let file = fs.createWriteStream(fileName);
let message;

class Test {

    constructor(path) {
        this.path = path;
        this.media = new medias();
    }

    //Se lee todo el archivo en formato utf8 y lo separa por enters
    readFile() {

        let datos;

        message = ' ID   Resultado Método           Detalles\n==========================================================\n';

        console.log(message);
        file.write(message);

        fs.readFile(this.path, 'utf8', (err, result) => {

            if (err) {
                message = 'File not found';

                console.log(message);
                file.write(message);
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

                message = '\n========= Fin de la prueba ==========\n' + '\nÉxito = ' + success + '      Falla = ' + failed
                console.log(message);
                file.write(message);
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
                    message = problem + '    Éxito    ' + method + ' = ' + m + ' T.E: ' + (processEnds - processStarts).toFixed(3) + ' ms\n';
                    //Color del texto: Verde
                    console.log('\x1b[32m', message);
                    file.write(message);
                } else {
                    value = 0;
                    processEnds = performance.now();
                    message = problem + '   *Falla*   ' + method + ' = ' + m + ' Esperado = ' + output + ' T.E: ' + (processEnds - processStarts).toFixed(3) + ' ms\n'
                    //Color del texto: Rojo
                    console.log('\x1b[31m', message);
                    file.write(message);
                }

            } else if (this.media[method]) { //Llamando a metodos de instancia

                let m = this.media[method](inputs);
                if (m == output) {
                    message = problem + '    Éxito    ' + method + ' = ' + m + ' T.E: ' + (processEnds - processStarts).toFixed(3) + ' ms\n';
                    processEnds = performance.now();
                    //Color del texto: Verde                    
                    console.log('\x1b[32m', message);
                    file.write(message);
                } else {
                    value = 0;
                    processEnds = performance.now();
                    message = problem + '   *Falla*   ' + method + ' = ' + m + ' Esperado = ' + output + ' T.E: ' + (processEnds - processStarts).toFixed(3) + ' ms\n'
                    //Color del texto: Rojo
                    console.log('\x1b[31m', message);
                    file.write(message);
                }

            } else {
                value = 0;
                processEnds = performance.now();
                message = problem + '             ' + method + ' Método no encontrado\n';
                //Color del texto: Rojo
                console.log('\x1b[31m', message); //Si no pasa ninguno de los dos, el método no existe
                file.write(message);
            }
        } catch (e) {
            value = 0;
            processEnds = performance.now();
            message = problem + '             ' + method + ' Método no implementado\n'
            //Color del texto: Rojo
            console.log('\x1b[31m', message);
            file.write(message);
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
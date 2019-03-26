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
        inputs = inputs.map(Number); //Hasta aqui si jala

        //Try catch para que no falle el sistema
        try {
            if (medias[method]) { //Llamando a metodos de clase
                // console.log(medias[method](inputs));

                if (medias[method](inputs) == output) {
                    console.log('Exito');
                } else {
                    console.log('Fracaso');

                }

            } else if (this.media[method]) { //Llamando a metodos de instancia
                // console.log(this.media[method](inputs));

                let m = this.media[method];
                if (m == output) {
                    console.log('Exito');
                } else {
                    console.log('Fracaso');

                }
            } else {
                console.log('Método no existente');

            }
        } catch (e) {
            console.log(e.message);

        }

    }

}
let testing = new Test('C:/Users/mario/OneDrive/Escritorio/automatizar-pruebas-unitarias-2019-marioa98/CasosPrueba.txt');
testing.readFile();
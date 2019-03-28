 class Medias {

     static mediaAritmetica(values) {

         //Verifica si no hay valores NaN dentro del array
         if (values.filter(e => Number.isNaN(e)).length > 0) {
             let zero = 0;
             return zero.toFixed(4);
         } else {
             let media = 0;

             for (let index = 0; index < values.length; index++) {
                 media += values[index];
             }

             media = media / values.length;
             return media.toFixed(4);
         }
     }

     static raizEnesima(x, n) {
         let pw = Math.pow(x, (1 / n));
         return pw.toFixed(4);
     }

     mediaGeometrica(values) {

         //Verifica si no hay valores NaN dentro del array
         if (values.filter(e => Number.isNaN(e)).length > 0) {
             let zero = 0;
             return zero.toFixed(4); //Si hay NaN, devuelve 0.0000
         } else {
             let media = 1;
             for (let index = 0; index < values.length; index++) {
                 media *= values[index];
             }
             return (Medias.raizEnesima(media, values.length));
         }
     }

     static mediaArmonica(values) {

         throw {
             name: 'NotImplemented',
             message: 'Not implemented method'
         }
         let media = 0;
         for (let index = 0; index < values.length; index++) {
             media += 1 / values[index];
         }

         media = values.length / media;
         return media;
     }

 }

 module.exports = Medias;
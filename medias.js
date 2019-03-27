 class Medias {

     static mediaAritmetica(values) {

         if (Number.isNaN(values)) {
             return NaN;
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

         if (Number.isNaN(x)) {
             return NaN;
         } else {
             let pw = Math.pow(x, (1 / n));
             return pw.toFixed(4);
         }
     }

     mediaGeometrica(values) {

         let media = 1;
         for (let index = 0; index < values.length; index++) {
             media *= values[index];
         }
         return (this.raizEnesima(media, values.length));
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
 // let values = [2, 4, 6, 12, 18];
 // console.log(mediaAritmetica(values));
 // console.log(mediaGeometrica(values));
 // console.log(mediaArmonica(values));
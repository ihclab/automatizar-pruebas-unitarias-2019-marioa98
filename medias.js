 
 class Medias{

    static mediaAritmetica(values){

        let media = 0;
    
        for(index = 0; index<values.length; index++){
            media += values[index];
        }
    
        media = media/values.length;
        return media;
    }

    static raizEnesima(x, n){
        return Math.pow(x,(1/n));
    }

    mediaGeometrica(values){
        let media = 1;
        for(index = 0; index < values.length; index++){
            media *= values[index];
        }
        return(raizEnesima(media, values.length));
    
    }

    mediaArmonica(values){

        let media = 0;
        for(index = 0; index<values.length;index++){
            media += 1/values[index];
        }
    
        media = values.length/media;
        return media;
    }
     
 }
// let values = [2, 4, 6, 12, 18];
// console.log(mediaAritmetica(values));
// console.log(mediaGeometrica(values));
// console.log(mediaArmonica(values));

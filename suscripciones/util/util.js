module.exports = class Util {

    /**
     * es una funcion async que recorre un arreglo y por cada elemento invoca 
     * un metodo que regresa una promesa, espera a que se resuelva la promesa 
     * por cada elemento.
     * Nota:la logica de que hacer con la respuesta se pone en el callback
     * @param {un arreglo comun y corriente} array 
     * @param {es la funcion la cual se ejecutara con cada elemento del array} callback 
     */
    static async asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array)
        }
    }
}
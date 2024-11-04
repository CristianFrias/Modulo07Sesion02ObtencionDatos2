const errorFormato = (error) => {
    // CONDICIONAL PARA SABER CUÁL ES EL ERROR
    let respuesta = {}
    switch (error.code) {
        case "42P01": // CASO CUANDO LA TABLA A CONSULTAR NO EXISTE
            respuesta = {
                message: error.message,
                code: error.code,
                event: 'TABLA_NO_EXISTENTE'
            }
            break;
        case "42601": // CASO CUANDO HAY ERROR DE SINTAXIS
            respuesta = {
                message: error.message,
                code: error.code,
                event: 'ERROR_SINTAXIS'
            }
            break;
        case "42703": // CASO CUANDO LA COLUMNA A CONSULTAR NO EXISTE
            respuesta = {
                message: error.message,
                code: error.code,
                event: 'COLUMNA_NO_EXISTENTE'
            }
        default:
            respuesta = {
                message: error.message,
                code: error.code,
                event: 'ERROR_DESCONOCIDO'
                }
            break;
    }
    return respuesta
}

module.exports = { errorFormato }
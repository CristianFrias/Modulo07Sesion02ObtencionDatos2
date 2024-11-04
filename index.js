const { Pool } = require("pg"); // DEPENDENCIA PARA CONECTARSE A BD
const { errorFormato } = require("./functions.js")

const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    port: 5432,
    database: 'dvdrental',
    host: 'localhost'
});


// (() => {
//     pool.query("SELECT * FROM actor LIMIT $1", [15], (error, resultado) => {
//         console.log(resultado.rowCount); // CANTIDAD DE REGISTROS OBTENIDOS
//         console.log(resultado.rows);
//     })
// })()

(async () => {
    // EJEMPLO DE CONSULTA A LA BD DE FORMA ASINCRONA CON CALLBACK
    pool.query("SELECT * FROM actor LIMIT $1", [15], (error, resultado) => {
        // console.log({error: error});
        if (error) return console.log(errorFormato(error));
        console.log(resultado.rowCount); // CANTIDAD DE REGISTROS OBTENIDOS
        console.log(resultado.rows);
    })

    // EJEMPLO DE CONSULTA A LA BD DE FORMA SINCRONA CON TRY CATCH
    // const argumentos = {
    //     text: "SELECT * FROM actor LIMIT $1",
    //     values: [15
    //     ]
    // }
    // try {
    //     const resultado = await pool.query(argumentos);
    //     console.log(resultado.rows);
    // } catch (error) {
    //     console.log(errorFormato(error));
    // }
})()
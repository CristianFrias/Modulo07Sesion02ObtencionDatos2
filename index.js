const { Pool, Client } = require("pg"); // DEPENDENCIA PARA CONECTARSE A BD
const Cursor = require("pg-cursor");
const { errorFormato } = require("./functions.js");

const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    port: 5432,
    database: 'dvdrental',
    host: 'localhost'
});

const client = new Client({
    user: 'postgres',
    password: 'postgres',
    port: 5432,
    database: 'dvdrental',
    host: 'localhost'
});

const dormir = (duracion) => {
    return new Promise((resolver, rechazar) => {
        setTimeout(() => {
            resolver()
        }, duracion * 1_000);
    });
}

// (() => {
//     pool.query("SELECT * FROM actor LIMIT $1", [15], (error, resultado) => {
//         console.log(resultado.rowCount); // CANTIDAD DE REGISTROS OBTENIDOS
//         console.log(resultado.rows);
//     })
// })()

(async () => {
    // EJEMPLO DE CONSULTA A LA BD DE FORMA ASINCRONA CON CALLBACK
    // pool.query("SELECT * FROM actor LIMIT $1", [15], (error, resultado) => {
    //     // console.log({error: error});
    //     if (error) return console.log(errorFormato(error));
    //     console.log(resultado.rowCount); // CANTIDAD DE REGISTROS OBTENIDOS
    //     console.log(resultado.rows);
    // })

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

    // EJEMPLO DE CURSOR, PUEDE SER UTILIZADO EN POOL O CLIENT, HAY QUE HACER CONECT DE MANERA ESPECIFICA
    client.connect();
    const cursorDefinicion = new Cursor("SELECT * FROM actor LIMIT $1", [100])
    const resultado = client.query(cursorDefinicion);
    // console.log(resultado.read(3));

    // EJEMPLO OPCION MENOS VIABLE ASINCRONO CALLBACL
    // resultado.read(3).then(resultado => {
    //     console.log(resultado);
    //     client.end()
    // })

    // EJEMPLO SINCRONO (USO DE AWAIT)
    console.log(await resultado.read(3));
    await dormir(5)
    console.log(await resultado.read(2));
    client.end()
    
})();
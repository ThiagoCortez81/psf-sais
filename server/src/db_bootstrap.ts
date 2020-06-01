require('dotenv-safe').config({
    allowEmptyValues: true
});
import * as mysql from 'mysql';

// console.log('Inicializando acesso ao banco de dados no endereço ' + PSFSaisServerConfiguration.dbConfig());
// console.log('process.env', process.env);
export let conn = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERBD,
    password: process.env.PASSWORDBD,
    database: process.env.DATABASE
});

conn.connect();

// TODO: Criar conexao com mysql

conn.on('error', errorHandling);

function errorHandling(err) {
    console.error('-------------------------------------------');
    console.error('ERRO AO CONECTAR NO BANCO!');
    console.error('Tentando reconectar em 5 segundos.....');
    console.error(err);
    console.error('-------------------------------------------');

    setTimeout(() => {
        conn.connect();
    }, 5000);
}

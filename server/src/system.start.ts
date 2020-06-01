import * as http from 'http';
import { PSFSaisServerConfiguration } from './config/config';
import { App } from './app';

const consoleOptions = {
    pattern: 'dd/mm/yyyy HH:MM:ss',
    colors: {
        stamp: 'yellow',
        label: 'green',
    }
};
require('dotenv-safe').config({
    allowEmptyValues: true
});
require('console-stamp')(console, consoleOptions);
const port = process.env.PORT || 5000;

export function PSFSaisServerStart() {

    const app = new App().express;
    app.set('port', port);
    const server = http.createServer(app);

    server.timeout = 3600000;

    server.listen(port, () => {
    });

    console.clear();
    console.log('---------------------------------------------------------');
    console.log(`[BFF] SERVER PSF SAIS - http://localhost:${port}`);
    // console.log(`(Banco de dados: ${PSFSaisServerConfiguration.dbConfig()})`);
    console.log('---------------------------------------------------------');
}

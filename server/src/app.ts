import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { PSFRouter } from './routes/psf.router';

export class App {

    public express;

    path: string;

    constructor() {
        this.express = express();
        this.mountRoutes();
    }

    private mountRoutes() {
        // Parsers
        this.express.use(cors());
        this.express.use(bodyParser.json());
        this.express.use(bodyParser({extended: false, limit: '100mb'}));
        this.express.use(bodyParser.urlencoded({extended: false, limit: '100mb'}));
        this.express.use(bodyParser());

        // Rotas
        this.express.get('/', (req, res) => {
            res.json({'message': 'It works!'});
        });
        this.express.use('/api/psf', PSFRouter);
    }

}

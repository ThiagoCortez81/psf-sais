import * as moment from "moment";
import * as jwt from 'jsonwebtoken';
import { Response } from 'express';
import { LoginResponse } from "../models";

export class PSFSaisServerConfiguration {
    static authenticationMiddleware(req, res: Response, next) {
        const loginResponse = new LoginResponse();

        var token = req.headers['x-authentication-token'];
        console.log('token', token);
        if (!token) {
            loginResponse.stats = false;
            loginResponse.message = "Favor realizar o login antes de continuar."
            return res.status(401).send(loginResponse);
        }

        jwt.verify(token, process.env.SECRET, function (err, decoded) {
            if (err) {
                loginResponse.stats = false;
                loginResponse.message = "Favor realizar o login antes de continuar."
                return res.status(401).send(loginResponse);
            }

            // se tudo estiver ok, salva no request para uso posterior
            next();
        });
    }
}



import { Router } from "express";
import { PSFSaisServerConfiguration } from "../config/config";
import { Request, Response } from 'express';
import * as Bussiness from './bussiness/index'

const router: Router = Router();

router.get('/list',  listPerfil);
// router.get('/list/:id', PSFSaisServerConfiguration.authenticationMiddleware, listPerfil);
// router.post('/add', PSFSaisServerConfiguration.authenticationMiddleware, addPerfil);
router.get('/list/:id', listPerfil);
router.post('/add', addPerfil);

async function listPerfil(req: Request, res: Response) {
    res.send(await Bussiness.listPerfil());
}

async function addPerfil(req: Request, res: Response) {
    res.send(await Bussiness.addPerfil(req));

}

export const PerfilRouter: Router = router;

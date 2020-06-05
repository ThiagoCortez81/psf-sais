import { Router } from "express";
import { PSFSaisServerConfiguration } from "../config/config";
import { Request, Response } from 'express';
import * as Bussiness from './bussiness/index'

const router: Router = Router();

router.get('/list',  listPerfil);
router.get('/list/:id', listPerfil);
router.post('/add', addPerfil);
router.put('/update', updatePerfil);
router.delete('/delete/:id', deletePerfil);

async function listPerfil(req: Request, res: Response) {
    let idPerfil: number = parseInt(req.params.id);
    res.send(await Bussiness.listPerfil(idPerfil));
}

async function addPerfil(req: Request, res: Response) {
    res.send(await Bussiness.addPerfil(req.body));
}

async function updatePerfil(req: Request, res: Response) {
    res.send(await Bussiness.updatePerfil(req.body));
}

async function deletePerfil(req: Request, res: Response) {
    let idPerfil: number = parseInt(req.params.id);
    res.send(await Bussiness.deletePerfil(idPerfil));
}

export const PerfilRouter: Router = router;

import { Router } from "express";
import { PSFSaisServerConfiguration } from "../config/config";
import { Request, Response } from 'express';
import * as Bussiness from './bussiness/index'

const router: Router = Router();

router.get('/list',  listFuncionario);
router.get('/list/:id', listFuncionario);
router.post('/add', addFuncionario);
router.put('/update', updateFuncionario);
router.delete('/delete/:id', deleteFuncionario);

async function listFuncionario(req: Request, res: Response) {
    let idFuncionario: number = parseInt(req.params.id);
    res.send(await Bussiness.listFuncionario(idFuncionario));
}

async function addFuncionario(req: Request, res: Response) {
    res.send(await Bussiness.addFuncionario(req.body));
}

async function updateFuncionario(req: Request, res: Response) {
    res.send(await Bussiness.updateFuncionario(req.body));
}

async function deleteFuncionario(req: Request, res: Response) {
    // let idPerfil: number = parseInt(req.params.id);
    res.send(await Bussiness.deleteFuncionario());
}

export const FuncionarioRouter: Router = router;

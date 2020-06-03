import { Router } from "express";
import { PSFSaisServerConfiguration } from "../config/config";
import { Request, Response } from 'express';
import * as Bussiness from './bussiness/index'

const router: Router = Router();

router.get('/list',  listFuncionario);
router.get('/list/:id', PSFSaisServerConfiguration.authenticationMiddleware, listFuncionario);
router.post('/add', PSFSaisServerConfiguration.authenticationMiddleware, addFuncionario);
router.put('/update', PSFSaisServerConfiguration.authenticationMiddleware, updateFuncionario);
router.delete('/delete/:id', PSFSaisServerConfiguration.authenticationMiddleware, deleteFuncionario);

async function listFuncionario(req: Request, res: Response) {
    res.send(await Bussiness.listFuncionario());
    // const response = new ResponseData();
    // const reqBody: EntregaOrdemFiltro = req.body.filtroEntregas;

    // if (Utils.isNotNullUndefinedEmpty(reqBody) && Utils.isNotNullUndefinedEmpty(reqBody.conta)) {
    //     let entregas = await searchEntregasDataByFilter(reqBody);
    //     if (reqBody.carregarListPontos || reqBody.carregarListPontosFalhos) {
    //         entregas = await processarEntregas(entregas, reqBody.carregarListPontos, reqBody.carregarListPontosFalhos);
    //     }
    //     if (Utils.listTest(entregas)) {
    //         response.status = true;
    //         response.listEntregas = entregas;
    //     } else {
    //         response.status = true;
    //         response.listEntregas = [];
    //     }
    // } else {
    //     response.status = false;
    //     response.mensagem = 'Envie uma conta para a busca.';
    //     response.listEntregas = [];
    // }

    // res.send(response);
}

async function addFuncionario(req: Request, res: Response) {

}

async function updateFuncionario(req: Request, res: Response) {

}

async function deleteFuncionario(req: Request, res: Response) {

}

export const FuncionarioRouter: Router = router;

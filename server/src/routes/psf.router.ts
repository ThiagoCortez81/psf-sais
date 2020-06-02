import { Router } from "express";
import { PSFSaisServerConfiguration } from "../config/config";
import { Request, Response } from 'express';
import * as Bussiness from './bussiness/index'

const router: Router = Router();

router.get('/list',  listPSF);
router.get('/list/:id', PSFSaisServerConfiguration.authenticationMiddleware, listPSF);
router.post('/add', PSFSaisServerConfiguration.authenticationMiddleware, addPSF);
router.put('/update', PSFSaisServerConfiguration.authenticationMiddleware, updatePSF);
router.delete('/delete/:id', PSFSaisServerConfiguration.authenticationMiddleware, deletePSF);

async function listPSF(req: Request, res: Response) {
    res.send(await Bussiness.listPSF());
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

async function addPSF(req: Request, res: Response) {
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

async function updatePSF(req: Request, res: Response) {
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

async function deletePSF(req: Request, res: Response) {
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

export const PSFRouter: Router = router;

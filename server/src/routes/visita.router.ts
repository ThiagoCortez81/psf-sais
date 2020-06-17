import { Router } from "express";
import { PSFSaisServerConfiguration } from "../config/config";
import { Request, Response } from 'express';
import * as Bussiness from './bussiness/index'
import { VisitaModel, LoginResponse } from "../models";

const router: Router = Router();

router.get('/list', listVisita);
router.get('/list/:id'/*, PSFSaisServerConfiguration.authenticationMiddleware*/, listVisita);
router.post('/add'/*, PSFSaisServerConfiguration.authenticationMiddleware*/, addVisita);
router.put('/update/:id'/*, PSFSaisServerConfiguration.authenticationMiddleware*/, updateVisita);
//router.delete('/delete/:id'/*, PSFSaisServerConfiguration.authenticationMiddleware*/, deletePSF);

async function listVisita(req: Request, res: Response) {
    const id = req.params.id;

    res.send({data: await Bussiness.listVisita(id)});
}

async function addVisita(req: Request, res: Response) {
    const vst: VisitaModel = req.body;
    const response: LoginResponse = new LoginResponse();

    if (vst.dataAgendada != null) {
        if (await Bussiness.addVisita(vst)) {
            response.message = 'Visita inserida com sucesso!';
            response.stats = true;
        } else {
            response.message = 'Erro ao inserir visita, tente novamente.';
            response.stats = false;
        }
    } else {
        response.message = 'Preencha todos os campos obrigatórios e tente novamente.';
        response.stats = false;
    }

    res.send(response);
}

async function updateVisita(req: Request, res: Response) {
    const id = req.params.id;
    const vst: VisitaModel = req.body;
    const response: LoginResponse = new LoginResponse();

    if (vst.dataAgendada != null ) {
        if (await Bussiness.updateVisita(id, vst)) {
            response.message = 'Visita atualizada com sucesso!';
            response.stats = true;
        } else {
            response.message = 'Erro ao atualizar a visita, tente novamente.';
            response.stats = false;
        }
    } else {
        response.message = 'Preencha todos os campos obrigatórios e tente novamente.';
        response.stats = false;
    }

    res.send(response);
}

export const VisitaRouter: Router = router;

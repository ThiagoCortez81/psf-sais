import { Router } from "express";
import { PSFSaisServerConfiguration } from "../config/config";
import { Request, Response } from 'express';
import * as Bussiness from './bussiness/index'
import { VisitaModel, LoginResponse } from "../models";

const router: Router = Router();

router.get('/list', PSFSaisServerConfiguration.authenticationMiddleware, listVisita);
router.get('/list/:id', PSFSaisServerConfiguration.authenticationMiddleware, listVisita);
router.get('/listFunc/:id', PSFSaisServerConfiguration.authenticationMiddleware, listVisitaFunc);
router.get('/listFuncMorador', PSFSaisServerConfiguration.authenticationMiddleware, listVisitaFuncMorador);
router.post('/add', addVisita);
router.put('/update/:id', updateVisita);
router.put('/finaliza/:id', finalizaVisita);
router.put('/cancela/:id', cancelaVisita);
//router.delete('/delete/:id', deletePSF);

async function listVisita(req: Request, res: Response) {
    const id = (req.params.id);
    const idFunc = req['user']['ID_func'];

    console.log(idFunc);
    res.send({data: await Bussiness.listVisita(id)});
}

async function listVisitaFunc(req: Request, res: Response) {
    const id = (req.params.id);

    res.send({data: await Bussiness.listVisitaFunc(id)});
}

async function listVisitaFuncMorador(req: Request, res: Response) {
    const id = req['user']['ID_func'];

    res.send(await Bussiness.listVisitaFuncMorador(id));
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

async function finalizaVisita(req: Request, res: Response) {
    const id = req.params.id;
    const vst: VisitaModel = req.body;
    const response: LoginResponse = new LoginResponse();

    if (vst.obs != null) {
        if (await Bussiness.finalizaVisita(id, vst)) {
            response.message = 'Visita finalizada com sucesso!';
            response.stats = true;
        } else {
            response.message = 'Erro ao finalizar a visita, tente novamente.';
            response.stats = false;
        }
    } else {
        response.message = 'Preencha todos os campos obrigatórios e tente novamente.';
        response.stats = false;
    }

    res.send(response);
}

async function cancelaVisita(req: Request, res: Response) {
    const id = req.params.id;
    const obs: VisitaModel = req.body;
    const response: LoginResponse = new LoginResponse();

    if (id != null && id != '' && obs != null && obs.obs != null && obs.obs != '') {
        if (await Bussiness.cancelaVisita(id, obs.obs)) {
            response.message = 'Visita cancelada com sucesso!';
            response.stats = true;
        } else {
            response.message = 'Erro ao cancelar a visita, tente novamente.';
            response.stats = false;
        }
    }
    res.send(response)
}

export const VisitaRouter: Router = router;

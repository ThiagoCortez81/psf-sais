import { Router } from "express";
import { PSFSaisServerConfiguration } from "../config/config";
import { Request, Response } from 'express';
import * as Bussiness from './bussiness/index'
import { PSFModel, LoginResponse } from "../models";

const router: Router = Router();

router.get('/list', listPSF);
router.get('/list/:id'/*, PSFSaisServerConfiguration.authenticationMiddleware*/, listPSF);
router.post('/add'/*, PSFSaisServerConfiguration.authenticationMiddleware*/, addPSF);
router.put('/update/:id'/*, PSFSaisServerConfiguration.authenticationMiddleware*/, updatePSF);
router.delete('/delete/:id'/*, PSFSaisServerConfiguration.authenticationMiddleware*/, deletePSF);

async function listPSF(req: Request, res: Response) {
    const id = req.params.id;

    res.send({data: await Bussiness.listPSF(id)});
}

async function addPSF(req: Request, res: Response) {
    const psf: PSFModel = req.body;
    const response: LoginResponse = new LoginResponse();

    if (psf.nome != "" && psf.logradouro != "" && psf.numero != "" && psf.bairro != "" && psf.cep != "" && psf.cidade != "" && psf.estado != "") {
        if (await Bussiness.addPSF(psf)) {
            response.message = 'PSF inserido com sucesso!';
            response.stats = true;
        } else {
            response.message = 'Erro ao inserir PSF, tente novamente.';
            response.stats = false;
        }
    } else {
        response.message = 'Preencha todos os campos obrigatórios e tente novamente.';
        response.stats = false;
    }

    res.send(response);
}

async function updatePSF(req: Request, res: Response) {
    const id = req.params.id;
    const psf: PSFModel = req.body;
    const response: LoginResponse = new LoginResponse();

    if (id && psf.nome != "" && psf.logradouro != "" && psf.numero != "" && psf.bairro != "" && psf.cep != "" && psf.cidade != "" && psf.estado != "") {
        if (await Bussiness.updatePSF(id, psf)) {
            response.message = 'PSF atualizado com sucesso!';
            response.stats = true;
        } else {
            response.message = 'Erro ao atualizar PSF, tente novamente.';
            response.stats = false;
        }
    } else {
        response.message = 'Preencha todos os campos obrigatórios e tente novamente.';
        response.stats = false;
    }

    res.send(response);
}

async function deletePSF(req: Request, res: Response) {
    const id = req.params.id;
    const response: LoginResponse = new LoginResponse();

    if (id) {
        if (await Bussiness.deletePSF(id)) {
            response.message = 'PSF inativado com sucesso!';
            response.stats = true;
        } else {
            response.message = 'Erro ao inativar PSF, tente novamente.';
            response.stats = false;
        }
    } else {
        response.message = 'Preencha todos os campos obrigatórios e tente novamente.';
        response.stats = false;
    }

    res.send(response);
}

export const PSFRouter: Router = router;

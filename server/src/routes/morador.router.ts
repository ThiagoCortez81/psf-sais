import { Router } from "express";
import { PSFSaisServerConfiguration } from "../config/config";
import { Request, Response } from 'express';
import * as Bussiness from './bussiness/index'
import { MORADORModel, LoginResponse } from "../models";

const router: Router = Router();

router.get('/list', listMorador);
router.get('/list/:id', /*PSFSaisServerConfiguration.authenticationMiddleware*/ listMorador);
router.post('/add', /*PSFSaisServerConfiguration.authenticationMiddleware*/addMorador);
router.put('/update/:id', /*PSFSaisServerConfiguration.authenticationMiddleware*/ updateMorador);
router.delete('/delete/:id'/*, PSFSaisServerConfiguration.authenticationMiddleware*/, deleteMorador);

async function listMorador(req: Request, res: Response) {

    const id = req.params.id;

    res.send({ data: await Bussiness.listMorador(id) });

}

async function addMorador(req: Request, res: Response) {
    const morador: MORADORModel = req.body;
    const response: LoginResponse = new LoginResponse();
    
    console.log(morador.dataNascimeto + "morador-router");

    if (morador.cpf != "" && morador.nome != "" && morador.sexo != "" && morador.dataNascimeto != null && morador.telefone != "" && morador.nrCartaoSUS && morador.logradouro != "" && morador.numero != null && morador.bairro != "" && morador.cep != "" && morador.cidade != "" && morador.estado != "" && morador.ativo != -1 &&morador.ID_PSF != null) {
       
        
        if (await Bussiness.addMorador(morador)) {
            response.message = 'Morador inserido com sucesso!';
            response.stats = true;
        } else {
            response.message = 'Erro ao inserir Morador, tente novamente.';
            response.stats = false;
        }
    } else {
        response.message = 'Preencha todos os campos obrigatórios e tente novamente.';
        response.stats = false;
    }

    res.send(response);
}


async function updateMorador(req: Request, res: Response) {
    const id = req.params.id;
    const morador: MORADORModel = req.body;
    const response: LoginResponse = new LoginResponse();
 
    

    if (morador.cpf != "" && morador.nome != "" && morador.sexo != "" && morador.dataNascimeto != null && morador.telefone != "" && morador.nrCartaoSUS && morador.logradouro != "" && morador.numero != null && morador.bairro != "" && morador.cep != "" && morador.cidade != "" && morador.estado != "" && morador.ativo != null && morador.ID_PSF != null) {
        if (await Bussiness.updateMorador(id, morador)) {
            response.message = 'Morador atualizado com sucesso!';
            response.stats = true;
        } else {
            response.message = 'Erro ao atualizar Morador, tente novamente.';
            response.stats = false;
        }
    } else {
        response.message = 'Preencha todos os campos obrigatórios e tente novamente.';
        response.stats = false;
    }

    res.send(response);

}
async function deleteMorador(req: Request, res: Response) {
    const id = req.params.id;
    const response: LoginResponse = new LoginResponse();

    if (id) {
        if (await Bussiness.deleteMorador(id)) {
            response.message = 'Morador inativado com sucesso!';
            response.stats = true;
        } else {
            response.message = 'Erro ao inativar Morador, tente novamente.';
            response.stats = false;
        }
    } else {
        response.message = 'Preencha todos os campos obrigatórios e tente novamente.';
        response.stats = false;
    }

    res.send(response);

}







export const MORADORRouter: Router = router;
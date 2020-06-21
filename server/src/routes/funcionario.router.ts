import { Router } from "express";
import { PSFSaisServerConfiguration } from "../config/config";
import { Request, Response } from 'express';
import * as Bussiness from './bussiness/index'
import { FuncionarioModel, LoginResponse } from "../models";

const router: Router = Router();

router.get('/list',  listFuncionario);
router.get('/list/:id', listFuncionario);
router.get('/listPSF/:id', listFuncPSF);
router.post('/add', addFuncionario);
router.put('/update/:id', updateFuncionario);
router.put('/updatePassword/:id', updatePassword);
router.delete('/delete/:id', deleteFuncionario);

async function listFuncionario(req: Request, res: Response) {
    const idFuncionario: number = parseInt(req.params.id);

    res.send({data: await Bussiness.listFuncionario(idFuncionario)});
}

async function listFuncPSF(req: Request, res: Response) {
    const id = (req.params.id);

    res.send({data: await Bussiness.listFuncPSF(id)});
}

async function addFuncionario(req: Request, res: Response) {
    const funcionario: FuncionarioModel = req.body;
    const response: LoginResponse = new LoginResponse();

    if(funcionario.ID_perfil != "" && funcionario.nome != "" && funcionario.cpf != "" && funcionario.sexo != "" && funcionario.dataNascimento != "" && funcionario.logradouro != "" && funcionario.numero != "" && funcionario.bairro != "" && funcionario.cidade != "" && funcionario.cep != "" && funcionario.estado != "" && funcionario.login != ""){
        if(await Bussiness.addFuncionario(funcionario)) {
            response.message = 'Funcionário inserido com sucesso!';
            response.stats = true;
        } else {
            response.message = 'Erro ao inserir Funcionário, tente novamente.';
            response.stats = false;
        }
    } else {
        response.message = 'Preencha todos os campos obrigatórios e tente novamente.';
        response.stats = false;
    }

    res.send(response);
}

async function updateFuncionario(req: Request, res: Response) {
    const id = req.params.id;
    const funcionario: FuncionarioModel = req.body;
    const response: LoginResponse = new LoginResponse();

    if(id && funcionario.ID_perfil != "" && funcionario.nome != "" && funcionario.cpf != "" && funcionario.sexo != "" && funcionario.ID_PSF !="" && funcionario.dataNascimento != "" && funcionario.logradouro != "" && funcionario.numero != "" && funcionario.bairro != "" && funcionario.cidade != "" && funcionario.cep != "" && funcionario.estado != "" && funcionario.login != ""){
        if(await Bussiness.updateFuncionario(id, funcionario)) {
            response.message = 'Funcionário atualizado com sucesso!';
            response.stats = true;
        } else {
            response.message = 'Erro ao atualizar Funcionário, tente novamente.';
            response.stats = false;
        }
    } else {
        response.message = 'Preencha todos os campos obrigatórios e tente novamente.';
        response.stats = false;
    }

    res.send(response);
}

async function updatePassword(req: Request, res: Response) {
    const id = req.params.id;
    const funcionario: FuncionarioModel = req.body;
    const response: LoginResponse = new LoginResponse();

    if(await Bussiness.updatePassword(id, funcionario)) {
        response.message = 'Senha atualizada com sucesso!';
        response.stats = true;
    } else {
        response.message = 'Erro ao atualizar senha, tente novamente.';
        response.stats = false;
    }


    res.send(response);
}

async function deleteFuncionario(req: Request, res: Response) {
    const idFuncionario = req.params.id;
    const response: LoginResponse = new LoginResponse();

    if(idFuncionario){
        if(await Bussiness.deleteFuncionario(idFuncionario)){
            response.message = 'Funcionário desativado com sucesso!';
            response.stats = true;
        } else {
            response.message = 'Erro ao desativar Funcionário, tente novamente!';
            response.stats = false;
        }
    } else {
        response.message = 'Preencha todos os campos obrigatórios e tente novamente.';
        response.stats = false;
    }
    res.send(response);
}

export const FuncionarioRouter: Router = router;

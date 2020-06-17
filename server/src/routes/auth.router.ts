// var token = jwt.sign({ id }, process.env.SECRET, {
//     expiresIn: 300 // expires in 5min
//   });
import { Router } from "express";
import { PSFSaisServerConfiguration } from "../config/config";
import { Request, Response } from 'express';
import * as Bussiness from './bussiness/index'
import * as jwt from 'jsonwebtoken';
import { LoginResponse, LoginReq, AlteraSenhaPrimeiroAcesso } from "../models";

const router: Router = Router();

router.post('/login', login);
router.post('/alteraSenhaPrimeiroAcesso', PSFSaisServerConfiguration.authenticationMiddleware, alteraSenhaPrimeiroAcesso);

async function login(req: Request, res: Response) {
    const loginResponse = new LoginResponse();
    const reqBody: LoginReq = req.body;

    const funcionarios = await Bussiness.loginFuncionario(reqBody);

    if (funcionarios != null) {
        if (funcionarios[0] != null) {
            const funcionario = JSON.parse(JSON.stringify(funcionarios[0]));
            delete funcionario.senha;

            if (funcionario.ativo == 1) {
                loginResponse.stats = true;
                loginResponse.message = 'Logado com sucesso!';
                loginResponse.dadosUsuario = funcionario;
                const token = jwt.sign(loginResponse.dadosUsuario, process.env.SECRET, {
                    expiresIn: '1d'
                });
                loginResponse.token = token;
            } else {
                loginResponse.stats = false;
                loginResponse.message = "Usuario desativado";
            }
        } else {
            loginResponse.stats = false;
            loginResponse.message = "Login ou senha incorretos.";
        }
    } else {
        loginResponse.stats = false;
        loginResponse.message = "Login ou senha incorretos.";
    }

    res.send(loginResponse);
}

async function alteraSenhaPrimeiroAcesso(req: Request, res: Response) {
    const loginResponse = new LoginResponse();
    const reqBody: AlteraSenhaPrimeiroAcesso = req.body;

    if (req['user'] != null) {
        const idFunc = req['user']['ID_func'];
        if (idFunc != null && !isNaN(parseInt(idFunc))) {
            if (reqBody.senha == reqBody.confirmarSenha) {
                const atualizaSenhaFuncionario = await Bussiness.atualizaSenhaFuncionario(idFunc, reqBody.senha);
                if (atualizaSenhaFuncionario) {
                    loginResponse.stats = true;
                    loginResponse.message = 'Senha alterada com sucesso!';
                } else {
                    loginResponse.stats = false;
                    loginResponse.message = 'Erro ao atualizar senha, tente novamente mais tarde!';
                }
            } else {
                loginResponse.stats = false;
                loginResponse.message = 'Erro ao atualizar senha, as senhas inseridas não conferem!';
            }
        } else {
            loginResponse.stats = false;
            loginResponse.message = 'Erro ao atualizar senha, faça o login primeiro!';
        }
    } else {
        loginResponse.stats = false;
        loginResponse.message = 'Erro ao atualizar senha, faça o login primeiro!';
    }

    res.send(loginResponse);
}

export const AuthRouter: Router = router;

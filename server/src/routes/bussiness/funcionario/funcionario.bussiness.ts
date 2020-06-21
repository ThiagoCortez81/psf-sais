import { conn } from "../../../db_bootstrap";
import { FuncionarioModel, LoginReq } from "../../../models";

export async function loginFuncionario(loginData: LoginReq) {
    return new Promise(function (resolve, reject) {
        if (loginData) {
            conn.query(`SELECT f.* FROM Funcionario f JOIN Perfil p ON p.id_perfil = f.id_perfil WHERE login = ? AND senha = MD5(?)`, [loginData.login, loginData.senha], function (err, results, fields) {
                if (err) return resolve();
                return resolve(results);
            });
        }
    });
}

export async function atualizaSenhaFuncionario(idFuncionario: number, novaSenha: string) {
    return new Promise(function (resolve, reject) {

        let query: string = `
        UPDATE Funcionario 
        SET senha = MD5(?), primeiroAcesso = 0, dataModificacao = NOW()
        WHERE Id_Func = ?
        `;

        conn.query(query, [novaSenha, idFuncionario], function (err, results, fields) {
            if (err) { console.log(err); return resolve(false); }
            return resolve(true);
        });
    });
}

export async function listFuncionario(idFuncionario: number) {
    return new Promise(function (resolve, reject) {

        if (idFuncionario) {
            conn.query(`SELECT * FROM Funcionario WHERE Id_func = ?`, [idFuncionario], function (err, results, fields) {
                if (err) return resolve();
                return resolve(results);
            });
        } else {
            conn.query(`SELECT * FROM Funcionario`, function (err, results, fields) {
                if (err) return resolve();
                return resolve(results);
            });
        }

    });
}

export async function listFuncPSF(idFuncionario: string) {
    return new Promise(function (resolve, reject) {
        let query = `
        SELECT Func_PSF.*, nome 
        FROM Func_PSF
        INNER JOIN PSF
            ON PSF.ID_PSF = Func_PSF.ID_PSF
        WHERE ID_func = ? AND Func_PSF.ativo = 1
        `;
        conn.query(query, [idFuncionario], function (err, results, fields) {
            if (err) { console.log(err); return resolve([]); }
            return resolve(results);
        });
    });
}

export async function addFuncionario(funcionario: FuncionarioModel) {
    return new Promise(function (resolve, reject) {
        let query: string = `INSERT INTO Funcionario(ID_perfil, nome, cpf, sexo, dataNascimento, logradouro,
                numero, bairro, cidade, cep, estado, ativo, login, senha, dataCriacao, dataModificacao) VALUES (
                ${funcionario.ID_perfil}, '${funcionario.nome}', '${funcionario.cpf}', '${funcionario.sexo}', 
                '${funcionario.dataNascimento}', '${funcionario.logradouro}',  '${funcionario.numero}', '${funcionario.bairro}', '${funcionario.cidade}',  '${funcionario.cep}',   '${funcionario.estado}',
                ${funcionario.ativo}, '${funcionario.login}', MD5('${funcionario.senha}'), NOW(), NOW()
            )`;

        conn.query(query, function (err, results, fields) {
            if (err) { console.log(err); return resolve(false); }

            const ID_func = results.insertId;

            query = `
                INSERT INTO Func_PSF(ID_func, ID_PSF, ativo) VALUES (?)
            `;

            funcionario.ID_PSF.forEach(element => {
                conn.query(query, [[ID_func, element, 1]], function (err, results, fields) {
                    if (err) { console.log(err); return resolve(false); }
                });
            });
            return resolve(true);
        });
    });
}

export async function updateFuncionario(idFuncionario: string, funcionario: FuncionarioModel) {
    return new Promise(function (resolve, reject) {

        let query: string = `
        UPDATE Funcionario 
        SET ID_perfil = ?, nome = ?, cpf = ?, sexo = ?, dataNascimento = ?, logradouro = ?, numero = ?, 
        bairro = ?, cidade = ?, cep = ?, estado = ?, ativo = ?, login = ?,dataModificacao = NOW()
        WHERE Id_Func = ?;

        UPDATE Func_PSF SET ativo = 0 WHERE ID_func = ?;
        `;

        conn.query(query, [funcionario.ID_perfil, funcionario.nome, funcionario.cpf, funcionario.sexo, funcionario.dataNascimento,
        funcionario.logradouro, funcionario.numero, funcionario.bairro, funcionario.cidade, funcionario.cep, funcionario.estado,
        funcionario.ativo, funcionario.login, idFuncionario, idFuncionario], function (err, results, fields) {

            if (err) { console.log(err); return resolve(false); }

            funcionario.ID_PSF.forEach(ID_PSF => {
                conn.query(`
                INSERT INTO Func_PSF(ID_func, ID_PSF, ativo) VALUES (?, ?, 1)
                ON DUPLICATE KEY UPDATE ativo = 1
                `, [idFuncionario, ID_PSF], function (err, results, fields) {
                    if (err) { console.log(err); return resolve(false); }
                });
            });

            return resolve(true);
        });
    });
}

export async function updatePassword(idFuncionario: string, funcionario: FuncionarioModel) {
    return new Promise(function (resolve, reject) {

        let query: string = `
        UPDATE Funcionario 
        SET senha= MD5(?), primeiroAcesso = 1 ,dataModificacao = NOW()
        WHERE Id_Func = ?;
        `;

        conn.query(query, [funcionario.senha, idFuncionario], function (err, results, fields) {

            if (err) { console.log(err); return resolve(false); }

            return resolve(true);
        });
    });
}

export async function deleteFuncionario(idFuncionario: string) {
    return new Promise(function (resolve, reject) {
        conn.query("UPDATE Funcionario SET ativo = ? WHERE Id_func = ?", [0, idFuncionario], function (err, results, fields) {
            if (err) { console.log(err); return resolve(false); }
            return resolve(true);
        });
    });
}
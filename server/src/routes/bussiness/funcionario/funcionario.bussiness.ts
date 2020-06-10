import { conn } from "../../../db_bootstrap";
import { FuncionarioModel } from "../../../models";

export async function listFuncionario(idFuncionario: number) {
    return new Promise(function (resolve, reject) {

        if(idFuncionario) {
            conn.query(`SELECT * FROM Funcionario WHERE Id_func = ?`, [idFuncionario], function (err, results, fields) {
                if (err) return resolve();
                return resolve(results);
              });
        }else {
            conn.query(`SELECT * FROM Funcionario`, function (err, results, fields) {
                if (err) return resolve();
                return resolve(results);
              });
        }

    });
}

export async function addFuncionario(funcionario: FuncionarioModel) {
    return new Promise(function (resolve, reject) {
        let query: string = `INSERT INTO Funcionario(id_perfil, nome, cpf, sexo, dataNascimento, logradouro,
                numero, bairro, cidade, cep, estado, ativo, dataCriacao, dataModificacao) VALUES (
                ${funcionario.id_perfil}, '${funcionario.nome}', '${funcionario.cpf}', '${funcionario.sexo}', 
                '${funcionario.dataNascimento}', '${funcionario.logradouro}',  '${funcionario.numero}', '${funcionario.bairro}', '${funcionario.cidade}',  '${funcionario.cep}',   '${funcionario.estado}',
                ${funcionario.ativo}, NOW(), NOW()
            )`;
            
        conn.query(query, function (err, results, fields) {
            if (err) { console.log(err); return resolve(false); }
            return resolve(true);
        });
    });
}

export async function updateFuncionario(idFuncionario: string, funcionario: FuncionarioModel) {
    return new Promise(function (resolve, reject) {

        let query: string = `
        UPDATE Funcionario 
        SET id_perfil = ?, nome = ?, cpf = ?, sexo = ?, dataNascimento = ?, logradouro = ?, numero = ?, 
        bairro = ?, cidade = ?, cep = ?, estado = ?, ativo = ?, dataModificacao = NOW()
        WHERE Id_Func = ?
        `;
       
        conn.query(query, [funcionario.id_perfil, funcionario.nome, funcionario.cpf, funcionario.sexo, funcionario.dataNascimento, 
            funcionario.logradouro, funcionario.numero, funcionario.bairro, funcionario.cidade, funcionario.cep, funcionario.estado, 
            funcionario.ativo, idFuncionario], function (err, results, fields) {
            
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
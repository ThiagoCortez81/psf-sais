import { conn } from "../../../db_bootstrap";
import { MORADORModel } from "../../../models";

export async function listMorador(ID_morador: string) {
    return new Promise(function (resolve, reject) {
        if (ID_morador)
            conn.query("SELECT * FROM Morador WHERE ID_morador = ?", [ID_morador], function (err, results, fields) {
                if (err) { console.log(err); return resolve([]); }
                return resolve(results);
            });
        else
            conn.query("SELECT * FROM Morador", function (err, results, fields) {
                if (err) { console.log(err); return resolve([]); }
                return resolve(results);
            });
    });
}

export async function addMorador(moradorModel: MORADORModel) {
    return new Promise(function (resolve, reject) {
        conn.query("INSERT INTO Morador(cpf, nome, sexo, dataNascimento, telefone, nrCartaoSUS, logradouro, numero, bairro, cidade, cep, estado, ativo, ID_PSF) VALUES (?)", [[moradorModel.cpf, moradorModel.nome, moradorModel.sexo, moradorModel.dataNascimeto, moradorModel.telefone, moradorModel.nrCartaoSUS, moradorModel.logradouro, moradorModel.numero, moradorModel.bairro, moradorModel.cidade, moradorModel.cep, moradorModel.estado, moradorModel.ativo, moradorModel.ID_PSF]], function (err, results, fields) {
            if (err) { console.log(err); return resolve(false); }
            return resolve(true);
        });
    });
}

export async function deleteMorador(id: string) {
    return new Promise(function (resolve, reject) {
        conn.query("UPDATE Morador SET ativo = ? WHERE ID_Morador = ?", [0, id], function (err, results, fields) {
            if (err) { console.log(err); return resolve(false); }
            return resolve(true);
        });
    });
 
}

export async function updateMorador(id: string, moradorModel: MORADORModel) {
    return new Promise(function (resolve, reject) {
       // console.log(`eu aqui na data ${moradorModel.dataNascimeto}`);
        let query = `UPDATE Morador SET cpf = ? , nome = ?, sexo = ?, dataNascimento = ?, telefone = ?, nrCartaoSUS = ?,   logradouro = ?, numero = ?, bairro = ?, cidade = ?, cep = ?, estado = ?, ativo = ?, ID_PSF = ? WHERE  ID_morador = ?;
        `;
        
        

        conn.query(query, [moradorModel.cpf, moradorModel.nome, moradorModel.sexo, moradorModel.dataNascimeto, moradorModel.telefone , moradorModel.nrCartaoSUS, moradorModel.logradouro, moradorModel.numero, moradorModel.bairro, moradorModel.cidade, moradorModel.cep, moradorModel.estado, moradorModel.ativo, moradorModel.ID_PSF, id], function (err, results, fields) {
            if (err) { console.log(err); return resolve(false); }
            return resolve(true);
        });
    });

}


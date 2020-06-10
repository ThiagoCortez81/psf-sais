import { conn } from "../../../db_bootstrap";
import { PSFModel } from "../../../models";

export async function listPSF(idPSF?: string) {
    return new Promise(function (resolve, reject) {
        if (idPSF)
            conn.query("SELECT * FROM PSF WHERE ID_PSF = ?", [idPSF], function (err, results, fields) {
                if (err) { console.log(err); return resolve([]); }
                return resolve(results);
            });
        else
            conn.query("SELECT * FROM PSF", function (err, results, fields) {
                if (err) { console.log(err); return resolve([]); }
                return resolve(results);
            });
    });
}

export async function addPSF(psfModel: PSFModel) {
    return new Promise(function (resolve, reject) {
        conn.query("INSERT INTO PSF(nome, logradouro, numero, bairro, cidade, cep, estado, ativo) VALUES (?)", [[psfModel.nome, psfModel.logradouro, psfModel.numero, psfModel.bairro, psfModel.cidade, psfModel.cep, psfModel.estado, psfModel.ativo]], function (err, results, fields) {
            if (err) { console.log(err); return resolve(false); }
            return resolve(true);
        });
    });
}

export async function deletePSF(id: string) {
    return new Promise(function (resolve, reject) {
        conn.query("UPDATE PSF SET ativo = ? WHERE ID_PSF = ?", [0, id], function (err, results, fields) {
            if (err) { console.log(err); return resolve(false); }
            return resolve(true);
        });
    });
}

export async function updatePSF(id: string, psfModel: PSFModel) {
    return new Promise(function (resolve, reject) {
        conn.query("UPDATE PSF SET nome = ?, logradouro = ?, numero = ?, bairro = ?, cidade = ?, cep = ?, estado = ?, ativo = ? WHERE ID_PSF = ?", [psfModel.nome, psfModel.logradouro, psfModel.numero, psfModel.bairro, psfModel.cidade, psfModel.cep, psfModel.estado, psfModel.ativo, id], function (err, results, fields) {
            if (err) { console.log(err); return resolve(false); }
            return resolve(true);
        });
    });
}

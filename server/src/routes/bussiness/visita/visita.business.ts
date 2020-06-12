import { conn } from "../../../db_bootstrap";
import { VisitaModel } from "../../../models";

export async function listVisita(idVisita?: string) {
    return new Promise(function (resolve, reject) {
        if (idVisita)
            conn.query("SELECT * FROM VISITA WHERE ID_VISITA = ?", [idVisita], function (err, results, fields) {
                if (err) { console.log(err); return resolve([]); }
                return resolve(results);
            });
        else
            conn.query("SELECT * FROM VISITA", function (err, results, fields) {
                if (err) { console.log(err); return resolve([]); }
                return resolve(results);
            });
    });
}

export async function addVisita(visitaModel: VisitaModel) {
    return new Promise(function (resolve, reject) {
        conn.query("INSERT INTO VISITA(dataHora, dataRetorno, localizacao, tipo, necInjetaveis, necEspecialista, necEnfermeiro, necCurativo, usaFarmPopular, morNaoEncontrado, obs) VALUES (?)", [[visitaModel.dataHora, visitaModel.dataRetorno, visitaModel.localizacao, visitaModel.tipoVisita, visitaModel.necInjetaveis, visitaModel.necEspecialista, visitaModel.necEnfermeiro, visitaModel.necCurativo, visitaModel.usaFarmPopular, visitaModel.obs]], function (err, results, fields) {
            if (err) { console.log(err); return resolve(false); }
            return resolve(true);
        });
    });
}

export async function updateVisita(id: string, visitaModel: VisitaModel) {
    return new Promise(function (resolve, reject) {
        conn.query("UPDATE VISITA SET dataHora = ?, dataRetorno = ?, localizacao = ?, tipo = ?, necInjetaveis = ?, necEspecialista = ?, necEnfermeiro = ?, necCurativo = ?, usaFarmPopular = ?, morNaoEncontrado = ?, obs = ? WHERE ID_VISITA = ?", [visitaModel.dataHora, visitaModel.dataRetorno, visitaModel.localizacao, visitaModel.tipoVisita, visitaModel.necInjetaveis, visitaModel.necEspecialista, visitaModel.necEnfermeiro, visitaModel.necCurativo, visitaModel.usaFarmPopular, visitaModel.obs], function (err, results, fields) {
            if (err) { console.log(err); return resolve(false); }
            return resolve(true);
        });
    });
}

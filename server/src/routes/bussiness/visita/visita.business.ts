import { conn } from "../../../db_bootstrap";
import { VisitaModel } from "../../../models";

export async function listVisita(idVisita?: string) {
    return new Promise(function (resolve, reject) {
        let query = `
        SELECT Visita.*, Morador.nome, Morador.telefone, Morador.logradouro, Morador.numero, Morador.bairro, Morador.cidade, Morador.cep, Morador.estado
        FROM Visita
        INNER JOIN Morador 
        ON Visita.ID_morador = Morador.ID_morador
        `;
        if (idVisita) {
            query += `WHERE ID_VISITA = ?`;
            conn.query(query, [idVisita], function (err, results, fields) {
                if (err) { console.log(err); return resolve([]); }
                return resolve(results);
            });
        }
        else { 
            conn.query(query, function (err, results, fields) {
                if (err) { console.log(err); return resolve([]); }
                return resolve(results);
            });
        }
    });
}

export async function listVisitaFunc(idVisita: string) {
    return new Promise(function (resolve, reject) {
        let query = `
        SELECT Visita_Func.*, nome 
        FROM Visita_Func
        INNER JOIN Funcionario
            ON Funcionario.ID_func = Visita_Func.ID_func
        WHERE ID_visita = ?
        `;
        conn.query(query, [idVisita], function (err, results, fields) {
            if (err) { console.log(err); return resolve([]); }
            return resolve(results);
        });
    });
}

export async function addVisita(visitaModel: VisitaModel) {
    return new Promise(function (resolve, reject) {
        let query = `
            INSERT INTO Visita(dataAgendada, tipo, status, ID_morador) VALUES (?)
        `;

        conn.query(query, [[visitaModel.dataAgendada, visitaModel.tipo, 'Agendada', visitaModel.ID_morador]], function (err, results, fields) {
            if (err) { console.log(err); return resolve(false); }
            const ID_Visita = results.insertId;

            query = `
                INSERT INTO Visita_Func(ID_Visita, ID_Func) VALUES (?)
            `;

            conn.query(query, [[ID_Visita, visitaModel.ID_funcionario]], function (err, results, fields) {
                if (err) { console.log(err); return resolve(false); }
            });  

            return resolve(true);
        });

    });
}

export async function cancelaVisita(id: string, obs: string) {
    return new Promise(function (resolve, reject) {
        const query = `UPDATE Visita SET status = 'Cancelada', observacao = ? WHERE ID_Visita = ?`;
        conn.query(query, [obs, id], function (err, results, fields) {
            if (err) { console.log(err); return resolve(false); }
            return resolve(true);
        })
    })
}
/*
export async function addVisita(visitaModel: VisitaModel) {
    return new Promise(function (resolve, reject) {
        let query: string =  `INSERT INTO Visita (dataAgendada, dataRealizada, localizacao, tipo, necessidadeInjetaveis, necessidadeEspecialista, necessidadeEnfermeiro, necessidadeCurativo, usaFarmaciaPopular, status, observacao, ID_morador) VALUES (${visitaModel.dataAgendada}, ${visitaModel.dataRealizada}, '${visitaModel.localizacao}', '${visitaModel.tipo}', ${visitaModel.necInjetaveis}, ${visitaModel.necEspecialista}, ${visitaModel.necEnfermeiro}, ${visitaModel.necCurativo}, ${visitaModel.usaFarmPopular}, '${visitaModel.status}', '${visitaModel.obs}', ${visitaModel.ID_morador})`;
        conn.query(query, function (err, results, fields) {
            if (err) { console.log(err); return resolve(false); }
            return resolve(true);
        });
    });   
}*/

export async function updateVisita(id: string, visitaModel: VisitaModel) {
    return new Promise(function (resolve, reject) {
        let query: string = `
        UPDATE Visita
        SET dataAgendada = ?, tipo = ?, ID_morador = ?
        WHERE ID_visita = ?
        `
        conn.query(query, [visitaModel.dataAgendada, visitaModel.tipo, visitaModel.ID_morador, visitaModel.ID_visita], function (err, results, fields) {
            if (err) { console.log(err); return resolve(false); }
            return resolve(true);
        });
    });
}

export async function deleteVisita(id: string) {
    return new Promise(function (resolve, reject) {
        conn.query("UPDATE Visita SET ativo = ? WHERE ID_PSF = ?", [0, id], function (err, results, fields) {
            if (err) { console.log(err); return resolve(false); }
            return resolve(true);
        });
    });
}

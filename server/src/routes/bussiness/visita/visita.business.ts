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

export async function listVisitaPerfil(idFunc: string) {
    return new Promise(function (resolve, reject) {
        let query = `
            SELECT ID_perfil FROM Funcionario WHERE ID_func = ?
        `;

        conn.query(query, [idFunc], function (err, results, fields) {
            if (err) { console.log(err); return resolve([]); }
            const ID_perfil = results[0].ID_perfil;

            query = `
            SELECT Visita.*, Morador.nome, Morador.telefone, Morador.logradouro, Morador.numero, Morador.bairro, Morador.cidade, Morador.cep, Morador.estado
            FROM Visita
            INNER JOIN Morador 
            ON Visita.ID_morador = Morador.ID_morador
            `;

            if (ID_perfil == 2 || ID_perfil == 3 || ID_perfil == 5) {
                query += `
                INNER JOIN Visita_Func VF ON VF.ID_visita = Visita.ID_visita
                WHERE VF.ID_func = ?`;
                conn.query(query, [idFunc], function (err, results, fields) {
                    if (err) { console.log(err); return resolve([]); }
                    return resolve(results);
                });
            } else {
                conn.query(query, function (err, results, fields) {
                    if (err) { console.log(err); return resolve([]); }
                    return resolve(results);
                });
            }

        });
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

export async function listVisitaMorador(idMorador: string) {
    return new Promise(function (resolve, reject) {
        let query = `
        SELECT Visita.*, Morador.nome, Morador.telefone, Morador.logradouro, Morador.numero, Morador.bairro, Morador.cidade, Morador.cep, Morador.estado
        FROM Visita
        INNER JOIN Morador 
        ON Visita.ID_morador = Morador.ID_morador
        WHERE Visita.ID_morador = ?
        `;
        conn.query(query, [idMorador], function (err, results, fields) {
            if (err) { console.log(err); return resolve([]); }
            return resolve(results);
        });
    });
}

export async function listVisitaFuncionario(idMorador: string) {
    return new Promise(function (resolve, reject) {
        let query = `
        SELECT V.*, Morador.nome, Morador.telefone, Morador.logradouro, Morador.numero, Morador.bairro, Morador.cidade, Morador.cep, Morador.estado
        FROM Visita_Func 
        INNER JOIN Visita V ON Visita_Func.ID_visita = V.ID_visita
        INNER JOIN Funcionario F ON Visita_Func.ID_func = F.ID_func
        INNER JOIN Morador  on Morador.ID_morador = V.Id_morador 
        WHERE Visita_Func.ID_func =  ?
                `;
        conn.query(query, [idMorador], function (err, results, fields) {
            if (err) { console.log(err); return resolve([]); }
            return resolve(results);
        });
    });
}

export async function listVisitaFuncMorador(idFuncionario: string) {
    return new Promise(function (resolve, reject) {
        let query = `
        SELECT v.*, m.* FROM Visita_Func vf 
            JOIN Visita v ON v.ID_visita = vf.ID_visita 
            JOIN Morador m ON v.ID_morador = m.ID_morador 
        WHERE vf.ID_func = ? AND DATE_FORMAT(CONVERT_TZ(NOW(), @@session.time_zone, '-03:00'),'%y-%m-%d') = DATE_FORMAT(v.dataAgendada,'%y-%m-%d') AND v.status = 'AGENDADA'
        `;
        conn.query(query, [idFuncionario], function (err, results, fields) {
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

            // Para cada funcionário que vier no Array, insere em Visita_Func para o ID_visita que retorno no insert acima
            visitaModel.ID_funcionario.forEach(element => {
                conn.query(query, [[ID_Visita, element]], function (err, results, fields) {
                    if (err) { console.log(err); return resolve(false); }
                });
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

export async function updateVisita(id: string, visitaModel: VisitaModel) {
    return new Promise(function (resolve, reject) {
        let query: string = `
        UPDATE Visita
        SET dataAgendada = ?, tipo = ?, ID_morador = ?
        WHERE ID_visita = ?;

        DELETE FROM Visita_Func WHERE ID_visita = ?
        `
        conn.query(query, [visitaModel.dataAgendada, visitaModel.tipo, visitaModel.ID_morador, visitaModel.ID_visita, visitaModel.ID_visita], function (err, results, fields) {
            if (err) { console.log(err); return resolve(false); }

            query = `
            INSERT INTO Visita_Func(ID_Visita, ID_Func) VALUES (?) 
            `;

            // Para cada funcionário que vier no Array, insere em Visita_Func para o ID_visita que retorno no insert acima
            visitaModel.ID_funcionario.forEach(element => {
                conn.query(query, [[visitaModel.ID_visita, element]], function (err, results, fields) {
                    if (err) { console.log(err); return resolve(false); }
                });
            });

            return resolve(true);
        });
    });
}

export async function finalizaVisita(id: string, visitaModel: VisitaModel) {
    return new Promise(function (resolve, reject) {
        let query: string = `
        UPDATE Visita SET 
            dataAgendada = ?,
            dataRealizada = ?,
            localizacao = ?,
            tipo = ?,
            necessidadeInjetaveis = ?,
            necessidadeEspecialista = ?,
            necessidadeEnfermeiro = ?,
            necessidadeCurativo = ?,
            usaFarmaciaPopular = ?,
            status = ?,
            observacao = ?
        WHERE ID_visita = ?;
        `;
        
        conn.query(query, [visitaModel.dataAgendada, visitaModel.dataRealizada, visitaModel.localizacao, visitaModel.tipo, visitaModel.necInjetaveis,  visitaModel.necEspecialista, visitaModel.necEnfermeiro, visitaModel.necCurativo, visitaModel.usaFarmPopular, visitaModel.status, visitaModel.obs, id], function (err, results, fields) {
            if (err) { console.log(err); return resolve(false); }
            
            return resolve(true);
        });
    });
}


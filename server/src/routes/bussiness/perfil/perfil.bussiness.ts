import { conn } from "../../../db_bootstrap";

export async function listPerfil(idPerfil: number,) {
    return new Promise(function (resolve, reject) {
        conn.query(`SELECT * FROM Perfil WHERE Id_Perfil = ${idPerfil ? idPerfil : 'Id_Perfil'}`, function (err, results, fields) {
          if (err) return reject(err);
          return resolve(results);
        });
      });
}

export async function addPerfil(reqBody) {
    return new Promise(function (resolve, reject) {

        let Descricao_Perfil: string = reqBody.desc_perfil_func;

        if(!Descricao_Perfil)  return resolve();

        conn.query(`INSERT INTO Perfil(desc_perfil_func) VALUES ('${Descricao_Perfil}')`, function (err, results, fields) {
          if (err) return resolve(err);
          return resolve(results);
        });

      });
}

export async function updatePerfil(reqBody) {
    return new Promise(function (resolve, reject) {

        let Descricao_Perfil: string = reqBody.desc_perfil_func;
        let idPerfil: number = parseInt(reqBody.idPerfil);

        if(!idPerfil || !Descricao_Perfil)  return resolve();

        conn.query(`UPDATE Perfil SET desc_perfil_func = '${Descricao_Perfil}' WHERE Id_perfil = ${idPerfil}`, function (err, results, fields) {
          if (err) return resolve(err);
          return resolve(results);
        });

      });
}

export async function deletePerfil(idPerfil: number,) {
    return new Promise(function (resolve, reject) {

        if(!idPerfil)  return resolve();

        conn.query(`DELETE FROM Perfil WHERE Id_perfil = ${idPerfil}`, function (err, results, fields) {
          if (err) return resolve(err);
          return resolve(results);
        });

      });
}


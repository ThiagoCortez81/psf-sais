import { conn } from "../../../db_bootstrap";

export async function listPerfil(idPSF?: string,) {
    // const rows = await conn.query('SELECT * FROM Perfil');
    // console.log(rows);
    // return rows.values;
    return new Promise(function (resolve, reject) {
        conn.query("SELECT * FROM Perfil", function (err, results, fields) {
          if (err) return reject(err);
          return resolve(results);
        });
      });
}

export async function addPerfil(reqBody) {
    return new Promise(function (resolve, reject) {
        console.log(reqBody);
        conn.query("INSERT INTO Perfil(desc_perfil_func) VALUES ('Médico')", function (err, results, fields) {
          if (err) return reject(err);
          return resolve(results);
        });
      });
}


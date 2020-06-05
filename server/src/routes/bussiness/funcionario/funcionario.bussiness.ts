import { conn } from "../../../db_bootstrap";

export async function listFuncionario(idFuncionario: number) {
    const rows = await conn.query('SELECT 1 as ID ', []);
    return rows.values;
}

export async function addFuncionario(reqBody) {
    
}

export async function deleteFuncionario() {
    
}

export async function updateFuncionario(reqBody) {
    
}

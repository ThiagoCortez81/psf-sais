import { conn } from "../../../db_bootstrap";

export async function listFuncionario(idFuncionario?: string) {
    const rows = await conn.query('SELECT 1 as ID ', []);
    return rows.values;
}

export async function addFuncionario(reqBody) {
    
}

export async function deleteFuncionario(idPosicao: string) {
    
}

export async function updateFuncionario(idPosicao: string, reqBody) {
    
}

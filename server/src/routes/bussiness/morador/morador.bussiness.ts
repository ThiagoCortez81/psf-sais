import { conn } from "../../../db_bootstrap";

export async function listMorador(idPSF?: string) {
    const rows = await conn.query('SELECT * FROM PSF', []);
    return rows.values;
}

export async function addMorador(reqBody) {
    
}

export async function deleteMorador(idPosicao: string) {
    
}

export async function updateMorador(idPosicao: string, reqBody) {
    
}

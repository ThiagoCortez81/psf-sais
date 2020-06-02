import { conn } from "../../../db_bootstrap";

export async function listPSF(idPSF?: string) {
    const rows = await conn.query('SELECT * FROM PSF', []);
    return rows.values;
}

export async function addPSF(reqBody) {
    
}

export async function deletePSF(idPosicao: string) {
    
}

export async function updatePSF(idPosicao: string, reqBody) {
    
}

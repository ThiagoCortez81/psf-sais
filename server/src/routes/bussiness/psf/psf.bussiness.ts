import { conn } from "../../../db_bootstrap";

export async function listPSF(idPSF?: string) {
    const query = await conn.query('SELECT * FROM PSF');
    console.log(query);
    return query;
}

export async function addPSF(reqBody) {
    
}

export async function deletePSF(idPosicao: string) {
    
}

export async function updatePSF(idPosicao: string, reqBody) {
    
}

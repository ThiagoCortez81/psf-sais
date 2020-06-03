import { Router } from "express";
import { PSFSaisServerConfiguration } from "../config/config";
import { Request, Response } from 'express';
import * as Bussiness from './bussiness/index'

const router: Router = Router();

router.get('/list',  listMorador);
router.get('/list/:id', PSFSaisServerConfiguration.authenticationMiddleware, listMorador);
router.post('/add', PSFSaisServerConfiguration.authenticationMiddleware, addMorador);
router.put('/update', PSFSaisServerConfiguration.authenticationMiddleware, updateMorador);
router.delete('/delete/:id', PSFSaisServerConfiguration.authenticationMiddleware, deleteMorador);

async function listMorador(req: Request, res: Response){
    res.send(await Bussiness.listMorador());



}

async function addMorador( req: Request,  res: Response){
    res.send(await( Bussiness.addMorador))


}


async function updateMorador( req:Request , res: Response){
    // res.send(await Bussiness.updateMorador());

}
async function deleteMorador( req: Request,  res: Response){

    
    
}
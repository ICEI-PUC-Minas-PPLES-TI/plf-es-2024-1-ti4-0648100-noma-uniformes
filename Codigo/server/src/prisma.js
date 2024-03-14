import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config({path:'../.env'});

console.log(process.env.PRISMA_URL); // confirmar que o env está sendo lido

const prisma = new PrismaClient(); // instanciar o prisma

export default prisma; 
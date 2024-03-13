import { Router } from 'express';
import prisma from './prisma.js';

const router = Router();

router.post("/user", async (req, res) => {
    const { nome, senha } = req.body

    const user = await prisma.usuario.create({
        data: {
            nome,
            senha
        }
    })

    return res.json(user)
})

export { router }
import { Router } from 'express';
import prisma from './prisma.js';

const router = Router(); // instanciar o router

/* ROTAS DE USUÁRIO */

//Criar usuário
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

//Obter todos os usuários
router.get("/users", async (req, res) => {
    const users = await prisma.usuario.findMany()

    return res.json(users)
})

//Obter usuário por id
router.get("/user/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    
    if (isNaN(id)) return res.status(400).json({ error: "Id inválido" })

    const user = await prisma.usuario.findUnique({
        where:{
            id: id
        }
    })

    if(!user) return res.status(404).json({erro: "Usuário não encontrado"})

    return res.json(user)
})

//Deletar usuário
router.delete("/user/:id", async (req, res) => {
    const id = parseInt(req.params.id)
        
    if (isNaN(id)) return res.status(400).json({ error: "Id inválido" })

    const user = await prisma.usuario.delete({
        where: {
            id: id
        }
    })

    if(!user) return res.status(404).json({erro: "Usuário não encontrado"})

    return res.json(user)
})

/* ROTAS COSTUREIRAS */

//Criar costureira
router.post("/costureira", async (req, res) => {
    const { nome, demandaQnt, dataEntrega, endereco} = req.body

    const costureira = await prisma.costureira.create({
        data: {
            nome,
            demandaQnt,
            dataEntrega: new Date(dataEntrega),
            endereco
        }
    })

    return res.json(costureira)
})

//Obter todas as costureiras
router.get("/costureiras", async (req, res) => {
    const costureiras = await prisma.costureira.findMany()

    if(!costureiras || costureiras.length == 0) return res.status(404).json({erro: "Costureiras não encontradas"})

    return res.json(costureiras)
})

//Obter costureira por id
router.get("/costureira/:id", async (req, res) => {
    const id = parseInt(req.params.id)

    if (isNaN(id)) return res.status(400).json({ error: "Id inválido" })

    const costureira = await prisma.costureira.findUnique({
        where:{
            id: id
        }
    })

    if (!costureira) return res.status(404).json({erro: "Costureira não encontrada"})

    return res.json(costureira)
})

//Deletar costureira
router.delete("/costureira/:id", async (req, res) => {
    const id = parseInt(req.params.id)

    if (isNaN(id)) return res.status(400).json({ error: "Id inválido" })

    const costureira = await prisma.costureira.delete({
        where: {
            id: id
        }
    })

    if (!costureira) return res.status(404).json({erro: "Costureira não encontrada"})
    
    return res.json(costureira)
})

//Atualizar costureira
router.patch("/costureira/:id", async (req, res) => {
    
    const id = parseInt(req.params.id)
    const { nome, demandaQnt, dataEntrega, endereco } = req.body

    if (isNaN(id)) return res.status(400).json({ error: "Id inválido" })

    const updateData = {
        ...(nome !== undefined && {nome}),
        ...(demandaQnt !== undefined && {demandaQnt}),
        ...(dataEntrega !== undefined && {dataEntrega: new Date(dataEntrega)}),
        ...(endereco !== undefined && {endereco})
    }

    const costureira = await prisma.costureira.update({
        where: {
            id: id
        },
        data: updateData
    })

    if (!costureira) return res.status(404).json({erro: "Costureira não encontrada"})

    return res.json(costureira)
})

export { router }
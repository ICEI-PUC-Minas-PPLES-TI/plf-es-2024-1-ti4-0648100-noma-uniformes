import prisma from "../prisma.js";

export default{

    //Criar costureira
    async criarCostureira(req, res) {
        try {
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
        }
        catch (error){
            return res.status(400).json({error: "Erro ao criar costureira", errorMessage: error.message})
        }
    },

    //Obter todas as costureiras
    async obterCostureiras(req, res) {
        try {
            const costureiras = await prisma.costureira.findMany()
    
            if(!costureiras || costureiras.length == 0) return res.status(404).json({erro: "Costureiras não encontradas"})
    
            return res.json(costureiras)
        }
        catch (error){
            return res.status(400).json({error: "Erro ao obter costureiras", errorMessage: error.message})
        } 
    },

    //Obter costureira por id
    async obterCostureira(req, res) {
        try {
            const id = parseInt(req.params.id)
    
            if (isNaN(id)) return res.status(400).send({ error: "Id inválido" })
    
            const costureira = await prisma.costureira.findUnique({
                where:{
                    id: id
                }
            })
    
            if (!costureira) return res.status(404).send({erro: "Costureira não encontrada"})
    
            return res.json(costureira)
        }   
        catch (error){
            return res.status(400).json({error: "Erro ao obter costureira", errorMessage: error.message})
        } 
    },

    //Deletar costureira
    async deletarCostureira(req, res) {
        try{
            const id = parseInt(req.params.id)
    
            if (isNaN(id)) return res.status(400).send({ error: "Id inválido" })
    
            const costureira = await prisma.costureira.delete({
                where: {
                    id: id
                }
            })
    
            if (!costureira) return res.status(404).send({erro: "Costureira não encontrada"})
            
            return res.json(costureira)
        }
        catch (error){
            return res.status(400).json({error: "Erro ao deletar costureira", errorMessage: error.message})
        }
    },

    //Atualizar costureira
    async atualizarCostureira(req, res) {
    
        try {
            const id = parseInt(req.params.id)
            const { nome, demandaQnt, dataEntrega, endereco } = req.body
    
            if (isNaN(id)) return res.status(400).send({ error: "Id inválido" })
    
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
    
            if (!costureira) return res.status(404).send({erro: "Costureira não encontrada"})
    
            return res.json(costureira)
        }
        catch (error){
            return res.status(400).json({error: "Erro ao atualizar costureira", errorMessage: error.message})
        }
    }
}
import prisma from "../prisma.js";

export default{

    //Criar usuário
    async criarUsuario(req, res) {
    
        try{
            const { nome, senha } = req.body
            
            const user = await prisma.usuario.create({
                data: {
                    nome,
                    senha
                }
            })
    
            return res.json(user)
        }
        catch (error){
            return res.status(400).json({error: "Erro ao criar usuário", errorMessage: error.message})
        }
    },

    //Obter todos os usuários
    async obterUsuarios(req, res) {
        try{
            const users = await prisma.usuario.findMany()
    
            return res.json(users)
        }
        catch (error){
            return res.status(400).json({error: "Erro ao obter usuários", errorMessage: error.message})
        }
    },

    //Obter usuário por id
    async obterUsuario(req, res) {
        try {    
            const id = parseInt(req.params.id)
            
            if (isNaN(id)) return res.status(400).json({ error: "Id inválido" })
    
            const user = await prisma.usuario.findUnique({
                where:{
                    id: id
                }
            })
    
            if(!user) return res.status(404).json({erro: "Usuário não encontrado"})
    
            return res.json(user)
        }    
        catch (error){
            return res.status(400).json({error: "Erro ao obter usuário", errorMessage: error.message})
        }
    },

    //Deletar usuário
    async deletarUsuario(req, res) {
        try {
            const id = parseInt(req.params.id)
                
            if (isNaN(id)) return res.status(400).json({ error: "Id inválido" })
    
            const user = await prisma.usuario.delete({
                where: {
                    id: id
                }
            })
    
            if(!user) return res.status(404).json({erro: "Usuário não encontrado"})
    
            return res.json(user)
        }
        catch (error){
            return res.status(400).json({error: "Erro ao deletar usuário", errorMessage: error.message})
        } 
    }
}
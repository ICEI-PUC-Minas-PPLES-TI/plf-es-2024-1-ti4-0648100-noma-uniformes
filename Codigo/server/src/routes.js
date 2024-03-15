import { Router } from 'express';
import UserController from './controllers/UserController.js';
import CostureiraController from './controllers/CostureiraController.js';

const router = Router(); // instanciar o router
const user = UserController; // instanciar o controller
const costureira = CostureiraController; // instanciar o controller

/* ROTAS DE USUÁRIO */

router.post("/user", user.criarUsuario)

router.post("/loginUser", user.obterUsuarioNomeSenha)

router.get("/users", user.obterUsuarios)

router.get("/getUser/:id", user.obterUsuario)

router.delete("/deleteUser/:id", user.deletarUsuario)

/* ROTAS COSTUREIRAS */

router.post("/costureira", costureira.criarCostureira)

router.get("/costureiras", costureira.obterCostureiras)

router.get("/getCostureira/:id", costureira.obterCostureira)

router.delete("/deleteCostureira/:id", costureira.deletarCostureira)

router.patch("/updateCostureira/:id", costureira.atualizarCostureira)

export { router }
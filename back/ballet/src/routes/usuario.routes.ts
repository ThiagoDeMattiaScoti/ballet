import { Request, Response, Router } from "express";
import { LoginController } from "../controller/loginController";
import { UsuarioController } from "../controller/usuarioController";
import { AuthMiddleware } from "../controller/middleware/authMiddleware";

const usuarioRouter = Router()
const loginController = new LoginController()
const usuarioController = new UsuarioController()
const authMiddleware = new AuthMiddleware()

usuarioRouter.post('/login', (req: Request, res: Response) => loginController.login(req, res))
usuarioRouter.post('/criarSenha', authMiddleware.auth, (req: Request, res: Response) => usuarioController.updateSenha(req, res))
usuarioRouter.post('/criarUsuario', (req: Request, res: Response) => usuarioController.criarUsuario(req, res))

export default usuarioRouter
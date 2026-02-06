import { Request, Response, Router } from "express"
import { CadastroEscolaController } from "../controller/escolaController"
import { AuthMiddleware } from "../controller/middleware/authMiddleware"

const escolaRouter = Router()
const escolaController = new CadastroEscolaController()
const authMiddleware = new AuthMiddleware()

escolaRouter.post('/cadastrar', authMiddleware.auth, (req: Request, res: Response) => escolaController.cadastrarEscola(req, res))
escolaRouter.get('/listaUtilizadores', authMiddleware.auth, (req: Request, res: Response) => escolaController.listaUtilizadores(req, res))

export default escolaRouter
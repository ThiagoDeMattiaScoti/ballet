import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma/client";
import { AuthService } from "../../services/autenticacao/authService";
import { PrismaPg } from "@prisma/adapter-pg";
import { AuthRepository } from "../../repository/authRepository";
import { Usuario } from "../../domain/entity/Usuario.entity";

export class AuthMiddleware {
    public async auth(req: Request, res: Response, next: NextFunction) {
        try {
            const infos = req.headers['x-user-data']
            if (!infos) {
                return res.status(401).json({ message: 'Token não fornecido' })
            }
            const infosObjeto = JSON.parse(infos as string)
            const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
            const prisma = new PrismaClient({ adapter });
            const authRepository = new AuthRepository(prisma);
            const authService = new AuthService(authRepository);
            const infosFormatadas = {
                email: infosObjeto.email,
                senha: infosObjeto.senha
            }
            const autorizado = await authService.auth(infosFormatadas)
            if (!autorizado) {
                return res.status(401).json({ message: 'Usuário não autorizado' })
            }
            next()
        } catch (err) {
            return res.status(401).json({ message: 'Usuário não autorizado' })
        }
    }
}
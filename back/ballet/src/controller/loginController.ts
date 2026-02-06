import { LoginDTO } from "../domain/DTO/loginDTO";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { UsuarioRepository } from "../repository/usuarioRepository";
import { Request, Response } from "express";
import { LoginUseCase } from "../services/usuario/loginUseCase";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

export class LoginController {
    updateSenha(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): unknown {
        throw new Error("Method not implemented.");
    }

    public async login(req: Request, res: Response) {
        try {
            const login: {
                email: string,
                senha: string
            } = req.body.login;
            if(!login) {
                return res.status(400).json({ message: "Necessário informar todos os campos obrigatórios" });
            }
            const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
            const prisma = new PrismaClient({ adapter });
            const repositoryUsuario = new UsuarioRepository(prisma);
            const useCase = new LoginUseCase(repositoryUsuario);
            const loginFeito = await useCase.execute(login);
            if(!loginFeito) {
                return res.status(400).json({ message: "Usuário ou senha incorretos" });
            }
            res.set('x-user-data', JSON.stringify(loginFeito))
            if (loginFeito.senhaTemporaria){
                return res.status(200).json({ message: "Login realizado com sucesso, por favor, atualize sua senha", login: loginFeito });
            }
            return res.status(200).json({ message: "Login realizado com sucesso", login: loginFeito });
        } catch (error: any) {
            if(error.message === 'Usuário ou senha incorretos'){
                return res.status(400).json({message: 'Usuário ou senha incorretos'})
            }
            if(error.message === 'Email ou senha incorretos'){
                return res.status(400).json({message: 'Email ou senha incorretos'})
            }
            return res.status(500).json({ message: "Erro ao fazer login" });
        }
    }


}
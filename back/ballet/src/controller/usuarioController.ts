import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { UsuarioRepository } from "../repository/usuarioRepository";
import { Request, Response } from "express";
import { CriarSenhaUseCase } from "../services/usuario/criarSenhaUseCase";
import { CriarUsuarioUseCase } from "../services/usuario/criarUseCase";

export class UsuarioController {

    public async updateSenha(req: Request, res: Response) {
        try {
            const login: {
                email: string,
                senha: string
            } = req.body.login;
            if (!login) {
                return res.status(400).json({ message: "Necessário informar todos os campos obrigatórios" });
            }
            const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
            const prisma = new PrismaClient({ adapter });
            const repositoryUsuario = new UsuarioRepository(prisma);
            const useCase = new CriarSenhaUseCase(repositoryUsuario);
            const loginFeito = await useCase.execute(login);
            if (!loginFeito) {
                return res.status(400).json({ message: "Usuário ou senha incorretos" });
            }
            res.set('x-user-data', JSON.stringify(loginFeito))
            return res.status(200).json({ message: "Senha atualizada com sucesso", login: loginFeito });
        } catch (error: any) {
            if (error.message === 'Usuário ou senha incorretos') {
                return res.status(400).json({ message: 'Usuário ou senha incorretos' })
            }
            if (error.message === 'Email ou senha incorretos') {
                return res.status(400).json({ message: 'Email ou senha incorretos' })
            }
            return res.status(500).json({ message: "Erro ao fazer login" });
        }
    }

    public async criarUsuario(req: Request, res: Response) {
        try {
            const usuario: {
                nome: string,
                email: string,
                idEscola: number
            } = req.body.usuario;
            if (!usuario) {
                return res.status(400).json({ message: "Necessário informar todos os campos obrigatórios" });
            }
            const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
            const prisma = new PrismaClient({ adapter });
            const repositoryUsuario = new UsuarioRepository(prisma);
            const useCase = new CriarUsuarioUseCase(repositoryUsuario);
            const novoUsuario = await useCase.execute(usuario);
            if (!novoUsuario) {
                return res.status(400).json({ message: "Erro ao criar usuário" });
            }
            return res.status(200).json({ message: "Usuário criado com sucesso", senha: novoUsuario.senha });
        } catch (error: any) {
            if (error.message === 'Erro ao criar usuário') {
                return res.status(400).json({ message: 'Erro ao criar usuário' })
            }
            console.log(error)
            return res.status(500).json({ message: "Erro ao criar usuário" });
        }
    }
}
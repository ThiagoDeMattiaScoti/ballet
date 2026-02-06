import { EscolaDTO } from "../domain/DTO/escolaDTO";
import { CadastrarEscolaUseCase } from "../services/escola/cadastroEscolaUseCase";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { EscolaRepository } from "../repository/escolaRepository";
import { Request, Response } from "express";
import { UsuarioRepository } from "../repository/usuarioRepository";
import { ListaUtilizadoresUseCase } from "../services/escola/listarUtilizadoresUseCase";
import { Usuario } from "../domain/entity/Usuario.entity";

export class CadastroEscolaController {
    public async cadastrarEscola(req: Request, res: Response) {
        try {
            const escola: EscolaDTO = req.body as unknown as EscolaDTO;
            if(!escola) {
                return res.status(400).json({ message: "Necessário informar todos os campos obrigatórios" });
            }
            const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
            const prisma = new PrismaClient({ adapter });
            const repositoryEscola = new EscolaRepository(prisma);
            const repositoryUsuario = new UsuarioRepository(prisma);
            const useCase = new CadastrarEscolaUseCase(repositoryEscola, repositoryUsuario);

            const criados = await useCase.execute(escola);
            return res.status(201).json({ message: "Escola e Usuário cadastrados com sucesso", senha: criados});
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Erro ao cadastrar escola" });
        }
    }

    public async listaUtilizadores(req: Request, res: Response) {
        try {
            const usuario = req.headers['x-user-data'];
            const ususarioObjeto = JSON.parse(usuario as string) as Usuario;
            const idEscola = ususarioObjeto.idEscola;
            const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
            const prisma = new PrismaClient({ adapter });
            const repositoryEscola = new EscolaRepository(prisma);
            const useCase = new ListaUtilizadoresUseCase(repositoryEscola);
            const utilizadores = await useCase.execute(idEscola);
            return res.status(200).json(utilizadores);
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Erro ao listar utilizadores" });
        }   
    }
}
import { PrismaClient } from "../generated/prisma/client";
import { Escola } from "../domain/entity/Escola.entity";
import { IEscolaRepository } from "./IRepository/IEscolaRepository";
import { Usuario } from "../domain/entity/Usuario.entity";

export class EscolaRepository implements IEscolaRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async criarEscola(escola: Escola): Promise<Escola> {
        const novaEscola = await this.prisma.escola.create({
            data: {
                ...escola,
                responsavel: JSON.stringify(escola.responsavel),
            },
        });

        const escolaEntity = new Escola({
            idEscola: novaEscola.id,
            nomeEscola: novaEscola.nomeEscola,
            responsavel: JSON.parse(novaEscola.responsavel),
            email: novaEscola.email,
            telefone: novaEscola.telefone,
            taxaRoylties: novaEscola.taxaRoylties,
            diaPagamento: novaEscola.diaPagamento,
            cidade: novaEscola.cidade,
            uf: novaEscola.uf,
            bairro: novaEscola.bairro,
            cep: novaEscola.cep,
            createdAt: novaEscola.createdAt,
        });
        return escolaEntity;
    }

    async listaUtilizadores(idEscola: number): Promise<Usuario[]> {
        const utilizadores = await this.prisma.usuarios.findMany({
            where: {
                idEscola: idEscola
            }
        });
        return utilizadores;
    }
}
import { EscolaRepository } from "../../repository/escolaRepository";
import { Usuario } from "../../domain/entity/Usuario.entity";

export class ListaUtilizadoresUseCase {
    constructor(private repository: EscolaRepository) { }

    async execute(idEscola: number): Promise<Usuario[]> {
        const utilizadores = await this.repository.listaUtilizadores(idEscola);
        return utilizadores;
    }
}
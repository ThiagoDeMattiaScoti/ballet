import { Escola } from "../../domain/entity/Escola.entity";
import { Usuario } from "../../domain/entity/Usuario.entity";

export interface IEscolaRepository {
    criarEscola(escola: Escola): Promise<Escola>;
    listaUtilizadores(idEscola: number): Promise<Usuario[]>;
}
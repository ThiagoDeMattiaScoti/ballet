import { EscolaDTO } from "../../domain/DTO/escolaDTO";
import { Escola } from "../../domain/entity/Escola.entity";
import { Usuario } from "../../domain/entity/Usuario.entity";
import { IEscolaRepository } from "../../repository/IRepository/IEscolaRepository";
import { IUsuarioRepository } from "../../repository/IRepository/IUsuarioRepository";
import { randomBytes } from "crypto";

export class CadastrarEscolaUseCase {
    constructor(
        private readonly escolaRepository: IEscolaRepository,
        private readonly usuarioRepository: IUsuarioRepository
    ) { }

    async execute(escola: EscolaDTO): Promise<String> {
        const escolaEntity: Escola = Escola.criar({
            nomeEscola: escola.nomeEscola,
            responsavel: {
                nome: escola.responsavel.nome,
                email: escola.responsavel.email,
            },
            email: escola.email,
            telefone: escola.telefone,
            taxaRoylties: escola.taxaRoylties,
            diaPagamento: escola.diaPagamento,
            cidade: escola.cidade,
            uf: escola.uf,
            bairro: escola.bairro,
            cep: escola.cep,
        });
        const escolaCriada = await this.escolaRepository.criarEscola(escolaEntity);

        const usuarioEntity = Usuario.criar({
            email: escola.responsavel.email,
            nome: escola.responsavel.nome,
            idEscola: escolaCriada.idEscola!,
            createdAt: new Date(),
            senha: randomBytes(16).toString('hex'),
            senhaTemporaria: true,
        });
        await this.usuarioRepository.registraUsuario(usuarioEntity);
        if (!usuarioEntity.senha) {
            throw new Error('Erro ao criar senha');
        }
        return usuarioEntity.senha
    }
}
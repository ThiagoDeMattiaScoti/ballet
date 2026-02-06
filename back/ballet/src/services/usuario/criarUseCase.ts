import { randomBytes } from "crypto";
import { UsuarioDTO } from "../../domain/DTO/usuarioDTO";
import { Usuario } from "../../domain/entity/Usuario.entity";
import { IUsuarioRepository } from "../../repository/IRepository/IUsuarioRepository";

export class CriarUsuarioUseCase {
    constructor(
        private readonly usuarioRepository: IUsuarioRepository
    ) { }

    async execute(usuario: UsuarioDTO): Promise<Usuario> {
        const usuarioEntity = Usuario.criar({
            email: usuario.email,
            nome: usuario.nome,
            idEscola: usuario.idEscola,
            createdAt: new Date(),
            senha: randomBytes(16).toString('hex'),
            senhaTemporaria: true,
        });
        const novoUsuario = await this.usuarioRepository.registraUsuario(usuarioEntity);
        return novoUsuario as unknown as Usuario;
    }
}   
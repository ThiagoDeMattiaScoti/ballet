import { LoginDTO } from "../../domain/DTO/loginDTO";
import { Usuario } from "../../domain/entity/Usuario.entity";
import { IUsuarioRepository } from "../../repository/IRepository/IUsuarioRepository";

export class CriarSenhaUseCase {
    constructor(private repositoryUsuario: IUsuarioRepository) { }

    async execute(data: LoginDTO): Promise<Usuario> {
        try {
            const usuario = await this.repositoryUsuario.updateSenha(data);
            return usuario;
        } catch (error) {
            throw error;
        }
    }
}
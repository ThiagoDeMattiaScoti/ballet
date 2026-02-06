import { LoginDTO } from "../../domain/DTO/loginDTO";
import { Usuario } from "../../domain/entity/Usuario.entity";

export interface IUsuarioRepository {
    registraUsuario(usuario: Usuario): Promise<Usuario>;

    loginUsuario(data: LoginDTO): Promise<Usuario>;

    updateSenha(data: LoginDTO): Promise<Usuario>;
}
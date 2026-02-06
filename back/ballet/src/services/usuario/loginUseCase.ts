import { LoginDTO } from "../../domain/DTO/loginDTO";
import { IUsuarioRepository } from "../../repository/IRepository/IUsuarioRepository";

export class LoginUseCase{
    constructor(private usuarioRepository: IUsuarioRepository){}

    async execute(data: LoginDTO){
        const usuario = await this.usuarioRepository.loginUsuario(data)
        if(!usuario){ throw new Error('Email ou senha incorretos')}
        return usuario
    }
}
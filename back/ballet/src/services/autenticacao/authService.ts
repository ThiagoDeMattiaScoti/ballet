import { AuthRepository } from "../../repository/authRepository"

export class AuthService {
    constructor(private readonly authRepository: AuthRepository) { }
    public async auth(data: {email: string, senha: string}) {
        try{
            const infos = await this.authRepository.autenticaUsuario(data)
            return infos
        }catch(err){
            throw new Error('Usuário inválido')
        }
    }
}
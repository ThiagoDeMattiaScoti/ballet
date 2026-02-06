import { Usuario } from "../domain/entity/Usuario.entity"
import { PrismaClient } from "../generated/prisma/client"

export class AuthRepository {
    constructor(private prisma: PrismaClient) { }

    async autenticaUsuario(data: {email: string, senha: string}) {
        try{
            const usuario = await this.prisma.usuarios.findUnique({
                where:{
                    email: data.email,
                    senha: data.senha
                }
            })
            return usuario as Usuario
        }catch(err){
            throw new Error('Usuário ou senha incorretos')
        }
    }
}
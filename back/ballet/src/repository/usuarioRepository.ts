import { LoginDTO } from "../domain/DTO/loginDTO";
import { Usuario } from "../domain/entity/Usuario.entity";
import { PrismaClient } from "../generated/prisma/client";
import { IUsuarioRepository } from "./IRepository/IUsuarioRepository";

export class UsuarioRepository implements IUsuarioRepository {
    constructor(private prisma: PrismaClient) { }

    async registraUsuario(usuario: Usuario): Promise<Usuario> {
        const novoUsuario = await this.prisma.usuarios.create({
            data: {
                email: usuario.email,
                nome: usuario.nome,
                senha: usuario.senha!,
                senhaTemporaria: usuario.senhaTemporaria,
                idEscola: usuario.idEscola!,
                createdAt: usuario.createdAt
            }
        });
        return novoUsuario as Usuario;
    }

    async loginUsuario(data: LoginDTO): Promise<Usuario> {
        try {
            console.log(data)
            const usuario = await this.prisma.usuarios.findFirst({
                where: {
                    email: data.email,
                    senha: data.senha
                }
            })
            return usuario as Usuario
        } catch (err) {
            console.log(err)
            throw new Error('Usuário ou senha incorretos')
        }
    }

    async updateSenha(data: LoginDTO): Promise<Usuario> {
        try {
            const usuario = await this.prisma.usuarios.update({
                where: {
                    email: data.email
                },
                data: {
                    senha: data.senha,
                    senhaTemporaria: false
                }
            })
            return usuario as Usuario
        } catch (err) {
            console.log(err)
            throw new Error('Usuário ou senha incorretos')
        }
    }
}
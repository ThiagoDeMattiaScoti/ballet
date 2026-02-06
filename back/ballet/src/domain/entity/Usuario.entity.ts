export class Usuario {
    public email!: string
    public nome!: string
    public senha?: string
    public senhaTemporaria?: boolean
    public idEscola?: number
    public createdAt?: Date = new Date()
    constructor(data: Usuario) {
        Object.assign(this, data);
    }

    static criar(data: Usuario): Usuario {
        return new Usuario(data);
    }
}
export class Escola {
    public idEscola?: number;
    public nomeEscola!: string;
    public responsavel!: {
        nome: string;
        email: string;
    };
    public email!: string;
    public telefone!: string;
    public taxaRoylties!: number;
    public diaPagamento!: number;
    public cidade!: string;
    public uf!: string;
    public bairro!: string;
    public cep!: string;
    public createdAt?: Date;
    constructor(data: Escola) {
        Object.assign(this, data);
    }

    static criar(data: Escola): Escola {
        return new Escola(data);
    }
}
export class EscolaDTO {
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
}
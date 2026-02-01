export interface Usuario {
    id: number;
    email: string;
    nome: string;
    senhaTemporaria: boolean;
    idEscola: number | null;
    createdAt: string;
}

export interface Escola {
    id: number;
    nomeEscola: string;
    responsavel: string;
    email: string;
    telefone: string;
    taxaRoylties: number;
    diaPagamento: number;
    cidade: string;
    uf: string;
    bairro: string;
    cep: string;
    usuarios?: Usuario[];
}

export interface LoginResponse {
    message: string;
    login: Usuario;
}

export interface EscolaDTO {
    nomeEscola: string;
    responsavel: {
        nome: string;
        email: string;
    };
    email: string;
    telefone: string;
    taxaRoylties: number;
    diaPagamento: number;
    cidade: string;
    uf: string;
    bairro: string;
    cep: string;
}

export interface UtilizadoresResponse {
    escola: Escola;
    utilizadores: Usuario[];
}

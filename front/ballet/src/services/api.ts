const API_BASE_URL = 'http://localhost:3333';

export const api = {
    async login(email: string, senha: string) {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login: { email, senha } }),
        });

        const data = await response.json();
        const userData = response.headers.get('x-user-data');

        if (!response.ok) {
            throw new Error(data.message || 'Erro ao fazer login');
        }

        return { ...data, userData };
    },

    async criarSenha(email: string, senha: string, userData: string) {
        const response = await fetch(`${API_BASE_URL}/criarSenha`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-user-data': userData,
            },
            body: JSON.stringify({ login: { email, senha } }),
        });

        const data = await response.json();
        const newUserData = response.headers.get('x-user-data');

        if (!response.ok) {
            throw new Error(data.message || 'Erro ao criar senha');
        }

        return { ...data, userData: newUserData };
    },

    async cadastrarEscola(escola: Record<string, unknown>, userData: string) {
        const response = await fetch(`${API_BASE_URL}/cadastrar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-user-data': userData,
            },
            body: JSON.stringify(escola),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Erro ao cadastrar escola');
        }

        return data;
    },

    async listarUtilizadores(userData: string) {
        const response = await fetch(`${API_BASE_URL}/listaUtilizadores`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-user-data': userData,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Erro ao listar utilizadores');
        }

        return data;
    },
};

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CadastrarUsuarioPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:3333/criarUsuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    usuario: {
                        nome: formData.nome,
                        email: formData.email,
                        idEscola: user?.idEscola,
                    }
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erro ao cadastrar usuário');
            }

            setSuccess(`Usuário cadastrado com sucesso! Senha temporária: ${data.senha}`);
            setFormData({ nome: '', email: '' });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao cadastrar usuário');
        } finally {
            setIsLoading(false);
        }
    };

    if (!user) {
        router.push('/login');
        return null;
    }

    if (!user.idEscola) {
        router.push('/cadastrar-escola');
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50">
            <Header />

            <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Card className="border-pink-100 shadow-xl bg-white/90 backdrop-blur-sm">
                    <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-t-lg">
                        <CardTitle className="text-2xl text-white flex items-center gap-3">
                            <span className="text-3xl">👤</span>
                            Cadastrar Novo Utilizador
                        </CardTitle>
                        <CardDescription className="text-white/80">
                            Adicione um novo utilizador à sua escola
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="nome">Nome Completo</Label>
                                    <Input
                                        id="nome"
                                        name="nome"
                                        value={formData.nome}
                                        onChange={handleChange}
                                        placeholder="Nome do utilizador"
                                        className="border-pink-200 focus:border-pink-400"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="email@exemplo.com"
                                        className="border-pink-200 focus:border-pink-400"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
                                <p className="text-sm text-purple-700">
                                    <strong>Nota:</strong> O utilizador receberá uma senha temporária por email
                                    e precisará alterá-la no primeiro acesso.
                                </p>
                            </div>

                            {error && (
                                <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                                    <p className="text-red-600 text-center">{error}</p>
                                </div>
                            )}

                            {success && (
                                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                                    <p className="text-green-600 text-center">{success}</p>
                                </div>
                            )}

                            <div className="flex gap-4 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.push('/usuarios')}
                                    className="flex-1 border-pink-200 text-pink-600 hover:bg-pink-50"
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold shadow-lg"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Cadastrando...' : 'Cadastrar Utilizador'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}

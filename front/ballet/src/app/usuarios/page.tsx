'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { PasswordModal } from '@/components/PasswordModal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { api } from '@/services/api';
import { Usuario, Escola } from '@/types';

export default function UsuariosPage() {
    const router = useRouter();
    const { user, userData, isLoading: authLoading } = useAuth();
    const [escola, setEscola] = useState<Escola | null>(null);
    const [utilizadores, setUtilizadores] = useState<Usuario[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
            return;
        }

        if (user && userData && user.idEscola) {
            loadUtilizadores();
        } else if (user && !user.idEscola) {
            setIsLoading(false);
        }
    }, [user, userData, authLoading, router]);

    const loadUtilizadores = async () => {
        try {
            const data = await api.listarUtilizadores(userData!);
            // A API retorna um array de utilizadores diretamente
            if (Array.isArray(data)) {
                setUtilizadores(data);
            } else {
                setEscola(data.escola);
                setUtilizadores(data.utilizadores || data || []);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCadastrar = () => {
        if (user?.idEscola) {
            router.push('/cadastrar-usuario');
        } else {
            router.push('/cadastrar-escola');
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-pink-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50">
            <Header />

            {user?.senhaTemporaria && (
                <PasswordModal isOpen={true} userEmail={user.email} />
            )}

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                        Dashboard
                    </h2>
                    <Button
                        onClick={handleCadastrar}
                        className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        {user?.idEscola ? '+ Cadastrar Utilizador' : '+ Cadastrar Escola'}
                    </Button>
                </div>

                {error && (
                    <div className="p-4 rounded-lg bg-red-50 border border-red-200 mb-6">
                        <p className="text-red-600">{error}</p>
                    </div>
                )}

                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500" />
                    </div>
                ) : !user?.idEscola ? (
                    <Card className="border-pink-100 shadow-lg bg-white/80 backdrop-blur-sm">
                        <CardContent className="pt-8 pb-8 text-center">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                                <span className="text-4xl">🏫</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                Nenhuma escola vinculada
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Você ainda não possui uma escola cadastrada. Cadastre sua escola para começar.
                            </p>
                            <Button
                                onClick={() => router.push('/cadastrar-escola')}
                                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
                            >
                                Cadastrar Escola
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {/* Info da Escola */}
                        {escola && (
                            <Card className="border-pink-100 shadow-lg bg-white/80 backdrop-blur-sm">
                                <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-t-lg">
                                    <CardTitle className="text-white flex items-center gap-3">
                                        <span className="text-2xl">🏫</span>
                                        {escola.nomeEscola}
                                    </CardTitle>
                                    <CardDescription className="text-white/80">
                                        Informações da escola
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <div className="p-4 rounded-lg bg-pink-50">
                                            <p className="text-sm text-gray-500">Responsável</p>
                                            <p className="font-semibold text-gray-800">{escola.responsavel}</p>
                                        </div>
                                        <div className="p-4 rounded-lg bg-purple-50">
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="font-semibold text-gray-800">{escola.email}</p>
                                        </div>
                                        <div className="p-4 rounded-lg bg-pink-50">
                                            <p className="text-sm text-gray-500">Telefone</p>
                                            <p className="font-semibold text-gray-800">{escola.telefone}</p>
                                        </div>
                                        <div className="p-4 rounded-lg bg-purple-50">
                                            <p className="text-sm text-gray-500">Cidade</p>
                                            <p className="font-semibold text-gray-800">{escola.cidade} - {escola.uf}</p>
                                        </div>
                                        <div className="p-4 rounded-lg bg-pink-50">
                                            <p className="text-sm text-gray-500">Bairro</p>
                                            <p className="font-semibold text-gray-800">{escola.bairro}</p>
                                        </div>
                                        <div className="p-4 rounded-lg bg-purple-50">
                                            <p className="text-sm text-gray-500">Dia de Pagamento</p>
                                            <p className="font-semibold text-gray-800">Dia {escola.diaPagamento}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Lista de Utilizadores */}
                        <Card className="border-pink-100 shadow-lg bg-white/80 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                                    <span>👥</span>
                                    Utilizadores
                                </CardTitle>
                                <CardDescription>
                                    Lista de utilizadores vinculados à escola
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {utilizadores.length === 0 ? (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500">Nenhum utilizador cadastrado ainda.</p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-pink-100">
                                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Nome</th>
                                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Criado em</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {utilizadores.map((util) => (
                                                    <tr key={util.id} className="border-b border-pink-50 hover:bg-pink-50/50 transition-colors">
                                                        <td className="py-3 px-4 text-gray-800">{util.nome}</td>
                                                        <td className="py-3 px-4 text-gray-600">{util.email}</td>
                                                        <td className="py-3 px-4">
                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${util.senhaTemporaria
                                                                ? 'bg-yellow-100 text-yellow-700'
                                                                : 'bg-green-100 text-green-700'
                                                                }`}>
                                                                {util.senhaTemporaria ? 'Senha Temporária' : 'Ativo'}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 px-4 text-gray-500 text-sm">
                                                            {new Date(util.createdAt).toLocaleDateString('pt-BR')}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                )}
            </main>
        </div>
    );
}

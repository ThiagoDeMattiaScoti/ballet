'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await api.login(email, senha);
            login(response.login, response.userData);
            router.push('/usuarios');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao fazer login');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-pink-100 p-4">
            {/* Decorative elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-32 h-32 bg-pink-200/40 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-300/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>

            <Card className="w-full max-w-md shadow-2xl border-pink-100 bg-white/80 backdrop-blur-sm relative z-10">
                <CardHeader className="text-center space-y-4">
                    <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-lg">
                        <span className="text-4xl">🩰</span>
                    </div>
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                        Ballet Studio
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                        Entre com suas credenciais para acessar o sistema
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="seu@email.com"
                                className="border-pink-200 focus:border-pink-400 focus:ring-pink-400 transition-all duration-300"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="senha" className="text-gray-700 font-medium">Senha</Label>
                            <Input
                                id="senha"
                                type="password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                placeholder="••••••••"
                                className="border-pink-200 focus:border-pink-400 focus:ring-pink-400 transition-all duration-300"
                                required
                            />
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                                <p className="text-sm text-red-600 text-center">{error}</p>
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-3 text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Entrando...
                                </span>
                            ) : 'Entrar'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

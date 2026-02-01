'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';

interface PasswordModalProps {
    isOpen: boolean;
    userEmail: string;
}

export function PasswordModal({ isOpen, userEmail }: PasswordModalProps) {
    const { userData, updateUser } = useAuth();
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (novaSenha !== confirmarSenha) {
            setError('As senhas não coincidem');
            return;
        }

        if (novaSenha.length < 6) {
            setError('A senha deve ter no mínimo 6 caracteres');
            return;
        }

        setIsLoading(true);

        try {
            const response = await api.criarSenha(userEmail, novaSenha, userData!);
            updateUser({ ...response.login, senhaTemporaria: false }, response.userData || userData!);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao atualizar senha');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen}>
            <DialogContent
                className="sm:max-w-md bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200"
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                        Atualize sua senha
                    </DialogTitle>
                    <DialogDescription className="text-center text-gray-600">
                        Por segurança, você precisa criar uma nova senha para continuar.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="novaSenha" className="text-gray-700">Nova Senha</Label>
                        <Input
                            id="novaSenha"
                            type="password"
                            value={novaSenha}
                            onChange={(e) => setNovaSenha(e.target.value)}
                            placeholder="••••••••"
                            className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmarSenha" className="text-gray-700">Confirmar Senha</Label>
                        <Input
                            id="confirmarSenha"
                            type="password"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            placeholder="••••••••"
                            className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-500 text-center">{error}</p>
                    )}

                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-2 transition-all duration-300"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Atualizando...' : 'Atualizar Senha'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

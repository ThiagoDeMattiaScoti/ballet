'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { api } from '@/services/api';
import { EscolaDTO } from '@/types';

export default function CadastrarEscolaPage() {
    const router = useRouter();
    const { userData, user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [isCepLoading, setIsCepLoading] = useState(false);
    const [error, setError] = useState('');
    const [senhaTemporaria, setSenhaTemporaria] = useState<string | null>(null);

    const [formData, setFormData] = useState<EscolaDTO>({
        nomeEscola: '',
        responsavel: {
            nome: '',
            email: '',
        },
        email: '',
        telefone: '',
        taxaRoylties: 0,
        diaPagamento: 1,
        cidade: '',
        uf: '',
        bairro: '',
        cep: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name.startsWith('responsavel.')) {
            const field = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                responsavel: {
                    ...prev.responsavel,
                    [field]: value,
                },
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: name === 'taxaRoylties' || name === 'diaPagamento' ? Number(value) : value,
            }));
        }
    };

    const handleCepKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const cep = formData.cep.replace(/\D/g, '');

            if (cep.length !== 8) {
                setError('CEP deve ter 8 dígitos');
                return;
            }

            setIsCepLoading(true);
            setError('');

            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();

                if (data.erro) {
                    setError('CEP não encontrado');
                    return;
                }

                setFormData(prev => ({
                    ...prev,
                    cidade: data.localidade || '',
                    uf: data.uf || '',
                    bairro: data.bairro || '',
                }));
            } catch {
                setError('Erro ao buscar CEP');
            } finally {
                setIsCepLoading(false);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await api.cadastrarEscola(formData as unknown as Record<string, unknown>, userData!);
            // Mostra a senha temporária retornada pelo backend
            setSenhaTemporaria(response.senha);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao cadastrar escola');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseModal = () => {
        setSenhaTemporaria(null);
        router.push('/usuarios');
    };

    const copyToClipboard = () => {
        if (senhaTemporaria) {
            navigator.clipboard.writeText(senhaTemporaria);
        }
    };

    if (!user) {
        router.push('/login');
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50">
            <Header />

            {/* Modal de Senha Temporária */}
            <Dialog open={!!senhaTemporaria} onOpenChange={() => { }}>
                <DialogContent
                    className="sm:max-w-md bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
                    onPointerDownOutside={(e) => e.preventDefault()}
                    onEscapeKeyDown={(e) => e.preventDefault()}
                >
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-center text-green-700">
                            ✅ Escola Cadastrada com Sucesso!
                        </DialogTitle>
                        <DialogDescription className="text-center text-gray-600">
                            A senha temporária do responsável foi gerada. Anote-a antes de continuar!
                        </DialogDescription>
                    </DialogHeader>

                    <div className="mt-4 p-4 rounded-lg bg-white border-2 border-dashed border-green-300">
                        <p className="text-sm text-gray-500 mb-2 text-center">Senha Temporária:</p>
                        <p className="text-xl font-mono font-bold text-center text-gray-800 break-all select-all">
                            {senhaTemporaria}
                        </p>
                    </div>

                    <div className="flex gap-3 mt-4">
                        <Button
                            onClick={copyToClipboard}
                            variant="outline"
                            className="flex-1 border-green-300 text-green-700 hover:bg-green-50"
                        >
                            📋 Copiar
                        </Button>
                        <Button
                            onClick={handleCloseModal}
                            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold"
                        >
                            Continuar
                        </Button>
                    </div>

                    <p className="text-xs text-center text-gray-500 mt-2">
                        O responsável deverá trocar esta senha no primeiro login.
                    </p>
                </DialogContent>
            </Dialog>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Card className="border-pink-100 shadow-xl bg-white/90 backdrop-blur-sm">
                    <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-t-lg">
                        <CardTitle className="text-2xl text-white flex items-center gap-3">
                            <span className="text-3xl">🏫</span>
                            Cadastrar Nova Escola
                        </CardTitle>
                        <CardDescription className="text-white/80">
                            Preencha os dados para cadastrar uma nova escola de ballet
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Dados da Escola */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-700 border-b border-pink-100 pb-2">
                                    Dados da Escola
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <Label htmlFor="nomeEscola">Nome da Escola</Label>
                                        <Input
                                            id="nomeEscola"
                                            name="nomeEscola"
                                            value={formData.nomeEscola}
                                            onChange={handleChange}
                                            placeholder="Studio de Ballet..."
                                            className="border-pink-200 focus:border-pink-400"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="email">Email da Escola</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="contato@escola.com"
                                            className="border-pink-200 focus:border-pink-400"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="telefone">Telefone</Label>
                                        <Input
                                            id="telefone"
                                            name="telefone"
                                            value={formData.telefone}
                                            onChange={handleChange}
                                            placeholder="(11) 99999-9999"
                                            className="border-pink-200 focus:border-pink-400"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Dados do Responsável */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-700 border-b border-pink-100 pb-2">
                                    Dados do Responsável
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="responsavel.nome">Nome do Responsável</Label>
                                        <Input
                                            id="responsavel.nome"
                                            name="responsavel.nome"
                                            value={formData.responsavel.nome}
                                            onChange={handleChange}
                                            placeholder="Nome completo"
                                            className="border-pink-200 focus:border-pink-400"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="responsavel.email">Email do Responsável</Label>
                                        <Input
                                            id="responsavel.email"
                                            name="responsavel.email"
                                            type="email"
                                            value={formData.responsavel.email}
                                            onChange={handleChange}
                                            placeholder="responsavel@email.com"
                                            className="border-pink-200 focus:border-pink-400"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Dados Financeiros */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-700 border-b border-pink-100 pb-2">
                                    Dados Financeiros
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="taxaRoylties">Taxa de Royalties (%)</Label>
                                        <Input
                                            id="taxaRoylties"
                                            name="taxaRoylties"
                                            type="number"
                                            step="0.01"
                                            value={formData.taxaRoylties}
                                            onChange={handleChange}
                                            placeholder="5.00"
                                            className="border-pink-200 focus:border-pink-400"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="diaPagamento">Dia de Pagamento</Label>
                                        <Input
                                            id="diaPagamento"
                                            name="diaPagamento"
                                            type="number"
                                            min="1"
                                            max="31"
                                            value={formData.diaPagamento}
                                            onChange={handleChange}
                                            placeholder="10"
                                            className="border-pink-200 focus:border-pink-400"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Endereço */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-700 border-b border-pink-100 pb-2">
                                    Endereço
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <Label htmlFor="cep">CEP</Label>
                                        <div className="relative">
                                            <Input
                                                id="cep"
                                                name="cep"
                                                value={formData.cep}
                                                onChange={handleChange}
                                                onKeyDown={handleCepKeyDown}
                                                placeholder="00000-000"
                                                className="border-pink-200 focus:border-pink-400"
                                                required
                                            />
                                            {isCepLoading && (
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                    <div className="animate-spin h-4 w-4 border-2 border-pink-500 rounded-full border-t-transparent"></div>
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Pressione Enter para buscar</p>
                                    </div>
                                    <div>
                                        <Label htmlFor="cidade">Cidade</Label>
                                        <Input
                                            id="cidade"
                                            name="cidade"
                                            value={formData.cidade}
                                            placeholder="Preenchido automaticamente"
                                            className="border-pink-200 bg-gray-50 cursor-not-allowed"
                                            readOnly
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="uf">UF</Label>
                                        <Input
                                            id="uf"
                                            name="uf"
                                            value={formData.uf}
                                            placeholder="UF"
                                            maxLength={2}
                                            className="border-pink-200 bg-gray-50 cursor-not-allowed"
                                            readOnly
                                            required
                                        />
                                    </div>
                                    <div className="md:col-span-3">
                                        <Label htmlFor="bairro">Bairro</Label>
                                        <Input
                                            id="bairro"
                                            name="bairro"
                                            value={formData.bairro}
                                            placeholder="Preenchido automaticamente"
                                            className="border-pink-200 bg-gray-50 cursor-not-allowed"
                                            readOnly
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {error && (
                                <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                                    <p className="text-red-600 text-center">{error}</p>
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
                                    {isLoading ? 'Cadastrando...' : 'Cadastrar Escola'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}

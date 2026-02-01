'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function Header() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <header className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                            <span className="text-2xl">🩰</span>
                        </div>
                        <h1 className="text-xl font-bold text-white tracking-wide">
                            Ballet Studio
                        </h1>
                    </div>

                    {user && (
                        <div className="flex items-center gap-4">
                            <span className="text-white/90 text-sm hidden sm:block">
                                Olá, <span className="font-semibold">{user.nome}</span>
                            </span>
                            <Button
                                onClick={handleLogout}
                                variant="outline"
                                className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white transition-all duration-300"
                            >
                                Sair
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

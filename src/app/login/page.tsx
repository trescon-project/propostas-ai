'use client';

import React, { Suspense } from 'react';
import { login, signup } from './actions';
import { useSearchParams } from 'next/navigation';

function LoginForm() {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');
    const message = searchParams.get('message');

    return (
        <form className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-wider text-white/40 font-bold ml-1">E-mail</label>
                <input
                    name="email"
                    type="email"
                    required
                    placeholder="seu@email.com"
                    className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0B95DA] transition-colors text-white"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-wider text-white/40 font-bold ml-1">Senha</label>
                <input
                    name="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0B95DA] transition-colors text-white"
                />
            </div>

            {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs text-center">
                    {error}
                </div>
            )}

            {message && (
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs text-center">
                    {message}
                </div>
            )}

            <div className="flex flex-col gap-3 mt-4">
                <button
                    formAction={login}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#0B95DA] to-[#AC12E1] font-bold text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                >
                    Entrar
                </button>
                <button
                    formAction={signup}
                    className="w-full py-4 rounded-xl bg-white/5 border border-white/10 font-bold text-white hover:bg-white/10 transition-all text-sm"
                >
                    Criar conta da equipe
                </button>
            </div>
        </form>
    );
}

export default function LoginPage() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#000528] relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#0B95DA]/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#AC12E1]/20 blur-[120px] rounded-full" />

            <div className="w-full max-w-md p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl z-10 shadow-2xl">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-[#0B95DA] to-[#AC12E1] bg-clip-text text-transparent mb-2">
                        UX Proposta
                    </h1>
                    <p className="text-white/60">Entre para gerenciar suas propostas</p>
                </div>

                <Suspense fallback={<div className="text-white/20 text-center">Carregando formulário...</div>}>
                    <LoginForm />
                </Suspense>

                <div className="mt-8 pt-8 border-t border-white/10 text-center">
                    <p className="text-xs text-white/40">
                        Plataforma Exclusiva para Times de UX
                    </p>
                </div>
            </div>
        </div>
    );
}

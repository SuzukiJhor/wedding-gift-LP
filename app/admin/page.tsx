"use client";

import { useRouter } from 'next/navigation';
import { Button } from '../components/ui/button';
import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { getAdminData, Gift, Guest, logout } from './actions';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Users, CheckCircle2, LogOut, Search,
    Gift as GiftIcon, MoreHorizontal, Heart, TrendingUp,
    Loader2,
    Baby,
    UserPlus
} from 'lucide-react';

export default function AdminPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [rsvpData, setRsvpData] = useState<Guest[]>([]);
    const [giftsData, setGiftsData] = useState<Gift[]>([]);

    // Carregar dados da Action
    useEffect(() => {
        async function loadData() {
            try {
                const { rsvpData, giftsData } = await getAdminData();
                setRsvpData(
                    rsvpData.map((g) => ({
                        ...g,
                        convidados: (g as any).convidados ?? g.totalPessoasNoConvite ?? 0,
                        status: g.status === "Confirmado" ? "Confirmado" : "Pendente",
                    })) as Guest[]
                );
                setGiftsData(giftsData);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    // Cálculos baseados nos dados buscados
    const stats = useMemo(() => {
        // 1. Total de Convites (linhas na tabela)
        const totalConvites = rsvpData.length;

        // 2. Convites que já confirmaram
        const convitesConfirmados = rsvpData.filter(g => g.status === 'Confirmado').length;

        // 3. Total de Pessoas (Soma de todos os titulares + acompanhantes de convites confirmados)
        const totalPessoasConfirmadas = rsvpData
            .filter(g => g.status === 'Confirmado')
            .reduce((acc, curr) => acc + curr.totalPessoasNoConvite, 0);

        return [
            {
                label: 'Total de Convites',
                value: totalConvites.toString(),
                icon: Heart,
                color: 'text-purple-600',
                bg: 'bg-purple-50'
            },
            {
                label: 'Convites Confirmados',
                value: convitesConfirmados.toString(),
                icon: CheckCircle2,
                color: 'text-emerald-600',
                bg: 'bg-emerald-50'
            },
            {
                label: 'Total de Pessoas, Convidados + Acompanhantes + Filhos',
                value: totalPessoasConfirmadas.toString(),
                icon: Users,
                color: 'text-blue-600',
                bg: 'bg-blue-50'
            },
        ];
    }, [rsvpData]);

    const filteredRSVP = rsvpData.filter(item =>
        item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.codigo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center bg-[#FDFCFB]">
                <Loader2 className="w-8 h-8 text-rose-500 animate-spin mb-4" />
                <p className="text-slate-500 font-serif italic">Carregando os detalhes do grande dia...</p>
            </div>
        );
    }

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            router.push('/login');
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFCFB] text-slate-900 pb-12">
            <header className="bg-white/70 backdrop-blur-lg border-b border-slate-200/60 sticky top-0 z-50">
                <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
                        <div className="w-10 h-10 bg-rose-50 rounded-full flex items-center justify-center border border-rose-100 shadow-sm">
                            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                        </div>
                        <div>
                            <h1 className="font-serif text-xl text-slate-800 leading-none">Painel Administrativo</h1>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold mt-1">Gestão do Casamento</p>
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-all rounded-full"
                    >
                        <LogOut size={18} className="mr-2" />
                        <span className="hidden sm:inline font-medium">Sair</span>
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Métricas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {stats.map((stat, index) => (
                        <motion.div key={stat.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                            <Card className="border-none shadow-sm overflow-hidden group">
                                <CardContent className="p-6 flex items-center justify-between relative">
                                    <div className="space-y-1 relative z-10">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
                                        <h3 className="text-3xl font-serif text-slate-800 tracking-tight">{stat.value}</h3>
                                    </div>
                                    <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                                        <stat.icon size={28} />
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Tabela de Convidados */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <h2 className="text-2xl font-serif text-slate-800 flex items-center gap-2">
                                <TrendingUp className="text-rose-400 w-5 h-5" />
                                Lista de Presença
                            </h2>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Pesquisar..."
                                    className="w-full sm:w-64 pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-100 outline-none transition-all shadow-sm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <Card className="border-none shadow-sm overflow-hidden border border-slate-100">
                            <div className="overflow-x-auto text-sm">
                                <table className="w-full">
                                    <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase text-[10px] font-bold tracking-widest">
                                        <tr>
                                            <th className="px-6 py-4 text-left">Convidado</th>
                                            <th className="px-6 py-4 text-left hidden md:table-cell">Código</th>
                                            <th className="px-6 py-4 text-left">Status</th>
                                            <th className="px-6 py-4 text-right">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50 bg-white">
                                        <AnimatePresence mode="popLayout">
                                            {filteredRSVP.map((item) => (
                                                <motion.tr layout key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <p className="font-bold text-slate-700">{item.nome}</p>
                                                        <p className="text-[11px] text-slate-400">{item.convidados} pessoas</p>
                                                    </td>
                                                    <td className="px-6 py-4 hidden md:table-cell">
                                                        <span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-500">{item.codigo}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${item.status === 'Confirmado' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                                            }`}>
                                                            {item.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="rounded-full hover:text-rose-500 hover:bg-rose-50">
                                                                    <MoreHorizontal size={18} />
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent className="sm:max-w-md bg-white">
                                                                <DialogHeader>
                                                                    <DialogTitle className="font-serif text-xl border-b pb-2">
                                                                        Detalhes do Convite: {item.nome}
                                                                    </DialogTitle>
                                                                </DialogHeader>

                                                                <div className="space-y-6 py-4">
                                                                    {/* Acompanhantes Adultos */}
                                                                    <div>
                                                                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                                                                            <UserPlus size={14} className="text-blue-500" />
                                                                            Acompanhantes ({item.companion_names?.length || 0})
                                                                        </h4>
                                                                        {item.companion_names && item.companion_names.length > 0 ? (
                                                                            <ul className="space-y-2">
                                                                                {item.companion_names.map((name, i) => (
                                                                                    <li key={i} className="text-sm text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100">
                                                                                        {name}
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        ) : (
                                                                            <p className="text-xs italic text-slate-400">Nenhum acompanhante adulto.</p>
                                                                        )}
                                                                    </div>

                                                                    {/* Filhos / Crianças */}
                                                                    <div>
                                                                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                                                                            <Baby size={14} className="text-rose-500" />
                                                                            Crianças/Filhos ({item.children_names?.length || 0})
                                                                        </h4>
                                                                        {item.children_names && item.children_names.length > 0 ? (
                                                                            <ul className="space-y-2">
                                                                                {item.children_names.map((name, i) => (
                                                                                    <li key={i} className="text-sm text-slate-700 bg-rose-50/30 p-2 rounded-lg border border-rose-100/50">
                                                                                        {name}
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        ) : (
                                                                            <p className="text-xs italic text-slate-400">Nenhuma criança listada.</p>
                                                                        )}
                                                                    </div>

                                                                    <div className="pt-4 border-t flex justify-between items-center">
                                                                        <span className="text-[10px] font-bold text-slate-400 uppercase">Código: {item.codigo}</span>
                                                                        <Button
                                                                            variant="destructive"
                                                                            size="sm"
                                                                            className="h-8 text-xs"
                                                                            onClick={() => {/* Sua lógica de deleteGuest aqui */ }}
                                                                        >
                                                                            Excluir Convite
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </DialogContent>
                                                        </Dialog>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </AnimatePresence>
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>

                    {/* Feed de Presentes */}
                    <div className="lg:col-span-4 space-y-6">
                        <h2 className="text-2xl font-serif text-slate-800 flex items-center gap-2">
                            <GiftIcon className="text-rose-400 w-5 h-5" />
                            Presentes
                        </h2>
                        <div className="space-y-4 max-h-150 overflow-y-auto pr-2 custom-scrollbar">
                            {giftsData.map((gift) => (
                                <Card key={gift.id} className="border-none shadow-sm hover:translate-x-1 transition-transform border-l-4 border-l-rose-200">
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <p className="text-sm font-bold text-slate-800">{gift.de}</p>
                                            <span className="text-xs font-bold text-rose-500">{gift.valor}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 mb-2 font-medium">{gift.item}</p>
                                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                                            <p className="text-[11px] text-slate-400 italic">&quot;{gift.msg}&quot;</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #f1f1f1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #e2e8f0; }
      `}</style>
        </div>
    );
}
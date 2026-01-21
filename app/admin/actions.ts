// app/admin/actions.ts
"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// Função auxiliar para conexão (centralizada)
async function getSupabase() {
    const cookieStore = await cookies();
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
        {
            cookies: {
                getAll() { return cookieStore.getAll(); },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        cookieStore.set(name, value, options);
                    });
                },
            },
        }
    );
}

export interface Guest {
    id: string;
    nome: string;
    codigo: string;
    convidados: number;
    status: 'Confirmado' | 'Pendente';
    data: string;
    totalPessoasNoConvite: number;
}

export interface Gift {
    id: string;
    de: string;
    item: string;
    valor: string;
    msg: string;
}

export async function getAdminData() {
    const supabase = await getSupabase();

    // 1. Busca Convidados (Igual anterior)
    const { data: guestsRaw } = await supabase
        .from('guests')
        .select('*');

    // 2. Busca Presentes RECEBIDOS (Ligando com a tabela de produtos)
    // Usamos a sintaxe 'gift:gift_id(title)' para buscar o nome do produto automaticamente
    const { data: receivedRaw, error: giftError } = await supabase
        .from('received_gifts')
        .select(`
            id,
            sender_name,
            message,
            amount_paid,
            created_at,
            gift:gift_id (title)
        `)
        .order('created_at', { ascending: false });

    if (giftError) console.error("Erro ao buscar presentes:", giftError);

    // Mapeamento dos Convidados
    const rsvpData = (guestsRaw || []).map(g => ({
        id: g.id,
        nome: g.name,
        codigo: g.invitation_code,
        status: g.confirmed ? 'Confirmado' : 'Pendente',
        totalPessoasNoConvite: 1 + (g.companion_names?.length || 0),
        data: g.created_at ? new Date(g.created_at).toLocaleDateString('pt-BR') : "---"
    }));

    // Mapeamento dos Presentes Recebidos para o Feed lateral
    const giftsData = (receivedRaw || []).map(rg => ({
        id: rg.id,
        de: rg.sender_name,
        item: rg.gift?.title || "Presente em Dinheiro",
        valor: new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(rg.amount_paid || 0),
        msg: rg.message || ""
    }));

    return { rsvpData, giftsData };
}

export async function deleteGuest(id: string) {
    const supabase = await getSupabase();
    const { error } = await supabase.from('guests').delete().eq('id', id);

    if (!error) revalidatePath('/admin');
    return { success: !error };
}

export async function logout() {
    const cookieStore = await cookies();
    // Remove o cookie do Supabase Auth
    const allCookies = cookieStore.getAll();
    const authCookie = allCookies.find(c => c.name.includes('auth-token'));

    if (authCookie) {
        cookieStore.delete(authCookie.name);
    }

    redirect("/login");
}
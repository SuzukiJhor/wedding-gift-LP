"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

async function getSupabase() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );
}

export async function findGuestByCode(code: string) {
  const supabase = await getSupabase();
  const { data: datat, error: errorT } = await supabase
    .from("guests")
    .select("*")
  console.log("DATA TESTE", datat, errorT);
  // 1. Você PRECISA do await aqui
  // 2. Você PRECISA do .eq() para filtrar pelo código
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("invitation_code", code.toUpperCase())
    .maybeSingle();

  // Agora o log vai mostrar os dados reais
  console.log("🔍 [DEBUG BANCO]:", { data, error });

  if (error) {
    return { error: "Erro na comunicação com o banco" };
  }

  if (!data) {
    return { error: "Código não encontrado no banco de dados" };
  }

  return { guest: data };
}

export async function submitRSVP(data: {
  guest_id: string;
  name: string;              // Adicionado para atualizar o nome se necessário
  will_attend: boolean;
  companions_count: number;
  companion_names: string[];
  children_names: string[];
  special_notes?: string;    // Alterado de 'message' para 'special_notes'
}) {
  const supabase = await getSupabase();

  // Limpeza: remove nomes vazios dos arrays antes de salvar
  const cleanCompanions = data.companion_names.filter((n) => n && n.trim() !== "");
  const cleanChildren = data.children_names.filter((n) => n && n.trim() !== "");

  // 1. Atualizamos a tabela 'guests' com os campos reais do seu banco
  const { error: updateError } = await supabase
    .from("guests")
    .update({
      name: data.name,                // Atualiza o nome principal
      confirmed: true,                // Marca como confirmado
      companion_names: cleanCompanions,
      children_names: cleanChildren,
      special_notes: data.special_notes, // Salva na coluna correta
      // Se sua tabela tiver a coluna 'email', você poderia adicionar aqui também
    })
    .eq("id", data.guest_id);

  if (updateError) {
    console.error("Erro ao atualizar convidado:", updateError);
    return { error: "Não foi possível salvar sua confirmação no banco de dados." };
  }

  // 2. Inserimos o log na tabela 'rsvps' para histórico (Opcional)
  // Certifique-se de que a tabela 'rsvps' existe ou comente este bloco
  const { error: rsvpError } = await supabase.from("rsvps").insert({
    guest_id: data.guest_id,
    will_attend: data.will_attend,
    companions_count: data.companions_count,
    message: data.special_notes, // Aqui no log mantivemos o campo 'message'
  });

  if (rsvpError) {
    console.warn("Log de RSVP falhou, mas a confirmação principal foi salva com sucesso.");
  }

  return { success: true };
}
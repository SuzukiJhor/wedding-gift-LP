"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function getSupabase() {
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

  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("invitation_code", code.toUpperCase())
    .maybeSingle();

  console.log("🔍 [DEBUG BANCO]:", { data, error });

  if (error) return { error: "Erro na comunicação com o banco" };

  if (!data) return { error: "Código não encontrado no banco de dados" };

  return { guest: data };
}

export async function submitRSVP(data: {
  guest_id: string;
  name: string;
  will_attend: boolean;
  companions_count: number;
  companion_names: string[];
  children_names: string[];
  special_notes?: string;
}) {
  const supabase = await getSupabase();
  const cleanCompanions = data.companion_names.filter((n) => n && n.trim() !== "");
  const cleanChildren = data.children_names.filter((n) => n && n.trim() !== "");

  const { error: updateError } = await supabase
    .from("guests")
    .update({
      name: data.name,
      confirmed: true,
      companion_names: cleanCompanions,
      children_names: cleanChildren,
      special_notes: data.special_notes,
    })
    .eq("id", data.guest_id);

  if (updateError) {
    console.error("Erro ao atualizar convidado:", updateError);
    return { error: "Não foi possível salvar sua confirmação no banco de dados." };
  }

  const { error: rsvpError } = await supabase.from("rsvps").insert({
    guest_id: data.guest_id,
    will_attend: data.will_attend,
    companions_count: data.companions_count,
    message: data.special_notes,
  });

  if (rsvpError)
    console.warn("Log de RSVP falhou, mas a confirmação principal foi salva com sucesso.");

  return { success: true };
}
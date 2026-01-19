"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function getSupabase() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async getAll() {
          return (await cookieStore).getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(async ({ name, value, options }) => {
            (await cookieStore).set(name, value, options);
          });
        },
      },
    }
  );
}

// STEP 1 — Buscar convidado
export async function findGuestByCode(code: string) {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("invitation_code", code)
    .single();

  if (error) {
    return { error: "Código inválido" };
  }

  return { guest: data };
}

// STEP 2 — Salvar RSVP
export async function submitRSVP(data: {
  guest_id: string;
  will_attend: boolean;
  companions_count: number;
  message?: string;
}) {
  const supabase = getSupabase();

  const { error } = await supabase.from("rsvps").insert({
    guest_id: data.guest_id,
    will_attend: data.will_attend,
    companions_count: data.companions_count,
    message: data.message,
  });

  if (error) {
    console.error(error);
    return { error: "Erro ao salvar RSVP" };
  }

  return { success: true };
}

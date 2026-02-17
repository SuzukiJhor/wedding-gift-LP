"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function RedirectToError() {
  const router = useRouter();
  useEffect(() => {
    router.push("/erro");
  }, [router]);
  return null;
}
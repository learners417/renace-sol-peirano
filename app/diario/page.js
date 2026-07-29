"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Diario() {
  const router = useRouter();
  useEffect(() => { router.replace("/mi-renacer"); }, [router]);
  return null;
}

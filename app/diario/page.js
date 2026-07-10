"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function DiarioRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace("/mi-renacer"); }, [router]);
  return <div className="app" style={{ minHeight: "100dvh" }} />;
}

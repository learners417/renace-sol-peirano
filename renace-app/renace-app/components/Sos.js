"use client";
import { useRouter } from "next/navigation";
export default function Sos() {
  const router = useRouter();
  return (
    <button className="sos-fab" onClick={() => router.push("/sos")}>🕊 SOS Calma</button>
  );
}

"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser, getOnboarding } from "@/lib/estado";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (!getUser()) router.replace("/acceso");
    else if (!getOnboarding()) router.replace("/onboarding");
    else router.replace("/hoy");
  }, [router]);
  return (
    <div className="app center" style={{ display: "grid", placeItems: "center", minHeight: "100dvh" }}>
      <div>
        <div className="display" style={{ color: "var(--luna)" }}>R.E.N.A.C.E.</div>
        <p className="muted">Un momento…</p>
      </div>
    </div>
  );
}

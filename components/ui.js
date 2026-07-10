"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/hoy", ic: "☀️", label: "Hoy" },
  { href: "/mi-camino", ic: "🌙", label: "Mi camino" },
  { href: "/mi-renacer", ic: "🌿", label: "Mi renacer" },
  { href: "/serena", ic: "🤍", label: "Serena" },
];

export function Nav() {
  const path = usePathname() || "";
  return (
    <nav className="nav">
      <div className="nav-inner">
        {TABS.map((t) => (
          <Link key={t.href} href={t.href} className={path.startsWith(t.href) ? "on" : ""}>
            <span className="ic">{t.ic}</span>
            {t.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function Video({ url, titulo }) {
  if (!url) return (
    <div className="card" style={{ textAlign: "center", color: "var(--ink-2)" }}>
      El video de esta clase se carga pronto 🌙
    </div>
  );
  return (
    <div className="video">
      <iframe src={url} title={titulo || "Clase"} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
    </div>
  );
}

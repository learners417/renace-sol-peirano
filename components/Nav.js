"use client";
import { usePathname, useRouter } from "next/navigation";

const items = [
  { href: "/", label: "Hoy", icon: "✿" },
  { href: "/jardin", label: "Jardín", icon: "🌷" },
  { href: "/circulo", label: "Círculo", icon: "🤍" },
  { href: "/serena", label: "Serena", icon: "💬" },
];

export default function Nav() {
  const path = usePathname();
  const router = useRouter();
  return (
    <nav className="nav">
      <div className="navin">
        {items.map((it) => {
          const active = it.href === "/" ? path === "/" : path.startsWith(it.href);
          return (
            <button key={it.href} className={"navi" + (active ? " active" : "")} onClick={() => router.push(it.href)}>
              <span className="ni">{it.icon}</span>{it.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

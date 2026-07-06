import "./globals.css";

export const metadata = {
  title: "R.E.N.A.C.E. · Volvé a vos",
  description: "Tu camino de 12 semanas para volver a vos. 10 minutos por día.",
  manifest: "/manifest.json",
  icons: { icon: "/icon-192.png", apple: "/icon-192.png" },
  appleWebApp: { capable: true, statusBarStyle: "default", title: "RENACE" },
};
export const viewport = { width: "device-width", initialScale: 1, themeColor: "#FBF7F2" };

export default function RootLayout({ children }) {
  return (<html lang="es"><body>{children}</body></html>);
}

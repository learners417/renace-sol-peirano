import "./globals.css";

export const metadata = {
  title: "El Camino R.E.N.A.C.E.",
  description: "Nueve lunas para volver a vos. Un programa de Sol Peirano.",
  manifest: undefined,
};

export const viewport = {
  themeColor: "#FBF7F2",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&family=Nunito+Sans:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

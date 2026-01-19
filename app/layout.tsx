import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Larissa & Gabriel | Nosso Casamento",
  description: "Compartilhando com você cada momento do nosso grande dia.",
  icons: {
    icon: [
      {
        url: "/logo.png",
        type: "image/png",
        sizes: "512x512"
      },
    ],
    apple: [
      {
        url: "/apple-icon.png",
        type: "image/png",
        sizes: "512x512"
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="light" style={{ colorScheme: 'light' }}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import "./globals.css";

const inter = { className: '' };

export const metadata: Metadata = {
  title: "GUILD - Your AI Life Operating System",
  description: "Elite AI advisor ecosystem. Manage grades, budgets, habits & daily schedules.",
  openGraph: {
    title: "GUILD - AI Life OS",
    description: "Assemble your elite team of AI agents.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="h-full bg-[#09090B] text-zinc-100">
        {children}
      </body>
    </html>
  );
}

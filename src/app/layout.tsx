import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CustomCursor } from "@/components/custom-cursor";
import { ScrollProgressBar } from "@/components/loading-screen";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: `${siteConfig.name} — AWS & DevOps Engineer`,
  description:
    "Portfolio of an AWS & DevOps Engineer specializing in cloud architecture, Kubernetes, Terraform, CI/CD automation, and observability.",
  keywords: [
    "AWS Engineer",
    "DevOps Engineer",
    "Kubernetes",
    "Terraform",
    "CI/CD",
    "Cloud Architecture",
    "Site Reliability Engineering",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: `${siteConfig.name} — AWS & DevOps Engineer`,
    description: siteConfig.tagline,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — AWS & DevOps Engineer`,
    description: siteConfig.tagline,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollProgressBar />
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

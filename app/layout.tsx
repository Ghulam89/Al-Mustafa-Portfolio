import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ghulam-mustafa-portfolio.vercel.app"),
  title: {
    default: "Ghulam Mustafa | Full Stack MERN Developer",
    template: "%s | Ghulam Mustafa",
  },
  description:
    "Professional full stack MERN portfolio showcasing production-grade web, mobile, backend, and DevOps projects.",
  keywords: [
    "Ghulam Mustafa",
    "Full Stack MERN Developer",
    "Next.js portfolio",
    "React developer",
    "Node.js",
    "MongoDB",
    "AWS",
  ],
  openGraph: {
    title: "Ghulam Mustafa | Full Stack MERN Developer",
    description:
      "Explore selected full stack projects, experience, services, and contact options.",
    url: "https://ghulam-mustafa-portfolio.vercel.app",
    siteName: "Ghulam Mustafa Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ghulam Mustafa | Full Stack MERN Developer",
    description:
      "Modern portfolio built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

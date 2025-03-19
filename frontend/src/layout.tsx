import type { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "HireSenseAI",
  icons: "/favicon.ico",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>{children}</body>
    </html>
  );
}

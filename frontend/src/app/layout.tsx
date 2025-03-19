"use client";
import '@/app/globals.css';
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
      {/* <AuthProvider> */}
          {/* <CandidateProvider> */}
            {children}
          {/* </CandidateProvider> */}
        {/* </AuthProvider> */}
        </body>
      </html>
    </ClerkProvider>
  );
}

import "react-toastify/dist/ReactToastify.css";
import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Theme, Container } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { ToastContainer } from "react-toastify";

import NavBar from "./navbar/NavBar";
import AuthProvider from "./AuthProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Next Authentication",
  description: "Simple authentication application",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.variable}>
        <AuthProvider session={session}>
          <Theme appearance="light" accentColor="violet">
            <Container px="5">
              <NavBar />
              <main>{children}</main>
              <ToastContainer />
            </Container>
          </Theme>
        </AuthProvider>
      </body>
    </html>
  );
}

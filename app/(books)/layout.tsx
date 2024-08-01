import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/global/header";
import Sidebar from "@/components/global/sidebar";
import { cn } from "@/lib/utils";

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function BooksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={cn("font-sans antialiased", fontSans.variable)}>
      <Header />
      <Sidebar />
      <div className='container mx-auto flex h-screen lg:ml-64 hide-scrollbar'>
        {children}
      </div>
    </main>
  );
}
